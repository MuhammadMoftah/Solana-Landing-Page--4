// Usage: node shot.mjs <width> <height> <out-prefix> [url] [partHeight]
// Drives local Chrome headless over CDP; reveals all [data-reveal] and captures the full page in parts.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const [w = '1440', h = '900', prefix = 'shots/desk', url = 'http://localhost:4399/', part = '2400'] = process.argv.slice(2);
mkdirSync('shots', { recursive: true });
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', '--hide-scrollbars',
  `--user-data-dir=${process.env.TEMP}/cdp-${port}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {}
  await sleep(200);
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const logs = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? m.error); pending.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push(m.params.type + ': ' + m.params.args.map((a) => a.value ?? a.description).join(' '));
  if (m.method === 'Runtime.exceptionThrown') logs.push('exception: ' + m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception?.description ?? ''));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') logs.push('log: ' + m.params.entry.text + ' ' + (m.params.entry.url ?? ''));
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.value;

await send('Runtime.enable'); await send('Page.enable'); await send('Log.enable');
const mobile = Number(w) < 700;
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile });
await send('Page.navigate', { url });
await sleep(3500);
await ev(`document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-revealed'))`);
await ev(`document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')`); await sleep(1500);
const total = await ev('document.documentElement.scrollHeight');
for (let y = 0; y < total; y += 600) { await ev(`window.scrollTo(0,${y})`); await sleep(120); }
await ev('window.scrollTo(0,0)'); await sleep(1500);
const H = await ev('document.documentElement.scrollHeight');
const overflow = await ev('document.documentElement.scrollWidth - document.documentElement.clientWidth');
console.log(`height=${H} horizontalOverflow=${overflow}`);
const P = +part; let n = 0;
for (let y = 0; y < H; y += P) {
  const hh = Math.min(P, H - y);
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y, width: +w, height: hh, scale: 1 } });
  writeFileSync(`${prefix}-${String(n++).padStart(2, '0')}.jpg`, Buffer.from(r.data, 'base64'));
}
console.log('parts', n); console.log('console issues:', logs.length ? logs.join('\n') : 'none');
ws.close(); chrome.kill();
process.exit(0);

