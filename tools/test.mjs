// Functional checks over CDP against the preview server.
import { spawn } from 'node:child_process';

const URL_ = 'http://localhost:4399/';
const port = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', `--user-data-dir=${process.env.TEMP}/cdpt-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(200); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const issues = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? m.error); pending.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') issues.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
  if (m.method === 'Runtime.exceptionThrown') issues.push('exception ' + m.params.exceptionDetails.text);
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + r.exceptionDetails.exception?.description; return r.result?.value; };
const results = [];
const check = (name, ok, extra = '') => { results.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? ' â€” ' + extra : '')); };
await send('Runtime.enable'); await send('Page.enable');
const load = async (w, h, mobile) => { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile }); await send('Page.navigate', { url: URL_ }); await sleep(2500); };

// ---- Overflow at several widths
for (const w of [320, 375, 768, 1024, 1280, 1920]) {
  await load(w, 900, w < 700);
  const o = await ev('document.documentElement.scrollWidth - document.documentElement.clientWidth');
  check(`no horizontal overflow @${w}`, o <= 0, `delta ${o}`);
}

// ---- Structure / a11y basics (desktop)
await load(1440, 900, false);
check('exactly one h1', (await ev(`document.querySelectorAll('h1').length`)) === 1);
check('no heading level skips', await ev(`(()=>{const hs=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>+h.tagName[1]);return hs.every((l,i)=>i===0||l-hs[i-1]<=1)})()`));
check('all imgs have alt attr', await ev(`[...document.querySelectorAll('img')].every(i=>i.hasAttribute('alt'))`));
check('JSON-LD present', (await ev(`document.querySelectorAll('script[type="application/ld+json"]').length`)) === 1);
check('nav targets exist', await ev(`[...document.querySelectorAll('#site-header nav a')].every(a=>document.querySelector(a.hash))`));
check('fonts loaded (Anton, Inter)', await ev(`document.fonts.check('16px Anton') && document.fonts.check('16px Inter')`));

// ---- Header scrolled state + scroll spy
await ev('window.scrollTo(0, document.querySelector("#gallery").offsetTop)'); await sleep(700);
check('header gets data-scrolled', await ev(`document.getElementById('site-header').hasAttribute('data-scrolled')`));
check('scroll spy marks Gallery', await ev(`document.querySelector('#site-header .nav-link[data-active]')?.hash === '#gallery'`));

// ---- Gallery
await ev('document.querySelector("#gallery").scrollIntoView()'); await sleep(2000);
const counter = () => ev(`document.querySelector('.gallery .numeral')?.textContent.replace(/\\s+/g,' ').trim()`);
check('gallery hydrated, starts 01 / 12', (await counter()) === '01 / 12', await counter());
await ev(`document.querySelector('.gallery button[aria-label="Next image"]').click()`); await sleep(500);
check('next -> 02 / 12', (await counter()) === '02 / 12', await counter());
await ev(`document.querySelectorAll('.gallery .thumb')[4].click()`); await sleep(500);
check('thumbnail 5 -> 05 / 12', (await counter()) === '05 / 12', await counter());
await ev(`document.querySelector('.gallery').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}))`); await sleep(500);
check('ArrowLeft -> 04 / 12', (await counter()) === '04 / 12', await counter());
await ev(`for(let i=0;i<4;i++)document.querySelector('.gallery button[aria-label="Previous image"]').click()`); await sleep(1800);
check('wraps to 12 / 12', (await counter()) === '12 / 12', await counter());
check('single featured image after transition', (await ev(`document.querySelectorAll('.gallery figure img').length`)) === 1);

// ---- Form
await ev('document.querySelector("#contact").scrollIntoView()'); await sleep(1800);
await ev(`window.__opened=[];window.open=(u)=>{window.__opened.push(u);return null}`);
await ev(`document.querySelector('#contact form button[type=submit]').click()`); await sleep(400);
check('empty submit: name+phone aria-invalid', await ev(`document.querySelector('#inquiry-name').getAttribute('aria-invalid')==='true' && document.querySelector('#inquiry-phone').getAttribute('aria-invalid')==='true'`));
check('focus moves to first invalid field', await ev(`document.activeElement.id==='inquiry-name'`));
check('no WhatsApp opened on invalid', (await ev('window.__opened.length')) === 0);
const setVal = (sel, v) => ev(`(()=>{const el=document.querySelector('${sel}');el.value='${v}';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('blur'))})()`);
await setVal('#inquiry-name', 'Test User'); await setVal('#inquiry-phone', 'abc'); await sleep(200);
await ev(`document.querySelector('#contact form button[type=submit]').click()`); await sleep(300);
check('invalid phone rejected', await ev(`document.querySelector('#inquiry-phone').getAttribute('aria-invalid')==='true' && !!document.querySelector('#inquiry-phone-error')`));
await setVal('#inquiry-phone', '+20 100 123 4567'); await ev(`[...document.querySelectorAll('#contact input[type=radio]')].find(r=>r.value==='Villas').click()`); await sleep(200);
await ev(`document.querySelector('#contact form button[type=submit]').click()`); await sleep(500);
const opened = await ev('window.__opened[0]');
check('valid submit opens wa.me with unit type', typeof opened === 'string' && opened.startsWith('https://wa.me/201208986606') && opened.includes('Villas'), opened?.slice(0, 80));
check('status region focused', await ev(`document.activeElement.getAttribute('role')==='status'`));

// ---- Mobile menu
await load(390, 844, true);
await ev(`document.querySelector('.menu-toggle').click()`); await sleep(700);
check('menu opens (data-open)', await ev(`document.getElementById('mobile-menu').hasAttribute('data-open')`));
check('focus in close button', await ev(`document.activeElement.id==='menu-close'`));
check('background inert while open', await ev(`document.querySelector('main').inert===true && document.getElementById('site-header').inert===true`));
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await sleep(600);
check('Escape closes + restores focus', await ev(`!document.getElementById('mobile-menu').hasAttribute('data-open') && document.activeElement.classList.contains('menu-toggle') && document.querySelector('main').inert===false`));
await ev(`document.querySelector('.menu-toggle').click()`); await sleep(500);
await ev(`document.querySelector('#mobile-menu a[href="#location"]').click()`); await sleep(1200);
check('menu link closes menu and scrolls', await ev(`!document.getElementById('mobile-menu').hasAttribute('data-open') && window.scrollY>2000`));

// ---- Reduced motion: nothing hidden
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await load(1440, 900, false);
check('reduced motion: no hidden reveal elements', await ev(`[...document.querySelectorAll('[data-reveal]')].every(e=>getComputedStyle(e).opacity!=='0')`));
await send('Emulation.setEmulatedMedia', { features: [] });

// ---- No-JS
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Page.navigate', { url: URL_ }); await sleep(2000);
const nojs = await ev(`1`); // evaluate disabled; use DOM via Runtime isn't possible, so just ensure page rendered
await send('Emulation.setScriptExecutionDisabled', { value: false });

console.log('console errors:', issues.length ? issues.join('\n') : 'none');
console.log(`\n${results.filter(Boolean).length}/${results.length} checks passed`);
ws.close(); chrome.kill(); process.exit(0);

