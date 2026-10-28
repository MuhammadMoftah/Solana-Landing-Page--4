# Solana East — Project Map

> Updated **2026-10-28** after the "ink & ember" redesign (near-black + safety orange, adapted from two owner-supplied references: a dark portfolio site and a luxury automotive showroom). The earlier "ink & crimson" (2026-10-26), "night & champagne" (2026-10-22), and "sand & bronze" (2026-10-14) builds are superseded; content rules were carried over unchanged.
> Labels: **[Confirmed]** = verified from files/commands, **[Inferred]** = reasoned from evidence, **[Open]** = unresolved question for the project owner.

---

## 1. Summary

**[Confirmed]** A single-page, statically generated marketing site for **SOLANA East by ORA** (New Cairo). Astro components, two Vue islands, Tailwind CSS v4. Facts come from `src/content/solana-east.content.js`; images from the registry in `src/content/solana-east.media.js`.

| Area | State |
|---|---|
| Pages | 1 (`src/pages/index.astro`, route `/`) |
| Layout | `src/layouts/Layout.astro` — imports `global.css`, 2 self-hosted fonts (Anton + Inter), SEO/OG meta, JSON-LD, skip link, reveal script. No wrapper shell: header, `<main>`, footer are direct children of `<body>` |
| Section components | 11 in `src/components/sections/` |
| Shared components | `SiteHeader.astro`, `SiteFooter.astro`, `ui/Icon.astro`, `ui/Wordmark.astro` |
| Vue islands | 2: `gallery/GalleryShowcase.vue`, `contact/InquiryForm.vue` (both `client:visible`) |
| Vanilla scripts | `src/scripts/reveal.ts` (scroll reveal); inline script in `SiteHeader.astro` (scrolled header, scroll spy, mobile menu) |
| Tooling | `tools/` — `run.mjs`, `shot.mjs`, `test.mjs` (see §8 and the **`#` path problem** in §7) |

**Redesign note [Confirmed]:** the supplied reference images were dark charcoal + safety-orange layouts (bold condensed uppercase headlines, orange CTAs, sharp corners, ghost watermark typography, thin borders, orange corner accents, hazard-stripe accents). The brief's text described a teal/gold spa reference; the **images were treated as the authority** (brief: "the attached screenshot defines the visual identity"). Tokens are centralised in `@theme`, so a palette change is a one-file edit.

---

## 2. Framework & Tooling Versions

**[Confirmed]** Dependencies were **not** changed (`package.json` untouched). Fonts: Allura removed; Anton + Inter retained.

| Package | Declared | Installed |
|---|---|---|
| `astro` | `^7.3.8` | 7.3.8 |
| `vue` | `^3.5.44` | 3.5.44 |
| `@astrojs/vue` | `^7.0.3` | 7.0.3 |
| `tailwindcss` / `@tailwindcss/vite` | `^4.3.3` | 4.3.3 |
| `sharp` (transitive) | — | used by `astro:assets` |

- Node `>=22.12.0`. No devDependencies, linter or test runner; `@astrojs/check` is not installed.
- Package name is still `squalid-series`. **[Open]**

---

## 3. Project Tree (excluding `node_modules/`, `dist/`, `.astro/`)

```text
├── public/favicon.svg               # Ink square, ember square accent, white rule
├── tools/                           # run.mjs, shot.mjs, test.mjs
├── src/
│   ├── assets/                      # grey-logo.png + 22 project renders (see ASSET_CATALOG.md)
│   ├── components/
│   │   ├── SiteHeader.astro         # Fixed header, mobile menu dialog, scroll spy
│   │   ├── SiteFooter.astro         # Wordmark, explore nav, contact list, sources, disclaimer
│   │   ├── contact/InquiryForm.vue  # Vue island: validated form → WhatsApp hand-off
│   │   ├── gallery/GalleryShowcase.vue # Vue island: featured image + thumbnails + arrows + counter
│   │   ├── sections/                # One component per page section (see §4)
│   │   └── ui/
│   │       ├── Icon.astro
│   │       └── Wordmark.astro       # Typographic "SOLANA EAST. / by ORA" (orange period)
│   ├── content/
│   │   ├── solana-east.content.js   # Facts & copy (not modified)
│   │   ├── solana-east.media.js     # Image registry (not modified in this redesign)
│   │   └── sources.md
│   ├── layouts/Layout.astro
│   ├── lib/content.js
│   ├── pages/index.astro
│   ├── scripts/reveal.ts
│   └── styles/global.css            # Tailwind entry, tokens, components, reveal system
└── docs/
```

Removed in this redesign: Allura / script accent font; crimson palette; circular red decorative blobs behind imagery; organic arch as the primary hero mask.

---

## 4. Page Composition

`src/pages/index.astro` renders `SiteHeader`, then `<main id="main">` with the sections below, then `SiteFooter`. Section order and ids are unchanged.

| # | Component | Anchor `id` | Content source | Images (media keys) | Reference pattern adapted |
|---|---|---|---|---|---|
| — | `SiteHeader.astro` | `site-header`, `mobile-menu` | `navItems` | — | Slim top bar; outlined orange "Let's Talk" CTA; hazard-stripe mobile menu accent |
| 1 | `Hero.astro` | `top` | `hero` | `villaPool4` (LCP, `priority`) | Velaro-style: left copy + dual CTAs; right rectangular image with orange corner frame; giant grey ghost word "SOLANA"; numbered highlight strip |
| 2 | `Overview.astro` | `project-overview` | `project-overview` | `buildingA2`, `livingRoom` | Two-column editorial; corner-framed main image + overlapping rectangular inset; orange rule stats |
| 3 | `Masterplan.astro` | `masterplan` | `masterplan` | `gardenView1`, `buildingA5`, `aerialMasterplan`, `buildingA6` | Four corner-framed cards with numerals and orange arrows |
| 4 | `Residences.astro` | `residential-units` | `residential-units` | `buildingA3`, `buildingA4`, `streetView`, `villaPool1` | Inventory-style cards with specs; layouts in `<details>` |
| 5 | `Amenities.astro` | `amenities`, `retail-entertainment` | `amenities`, `retail-entertainment` | `villaPool2`, `gardenView2` | Centered two-tone heading; corner-framed imagery; numbered list; hazard-stripe retail panel |
| 6 | `Gallery.astro` | `gallery` | `gallery` (title) | 12 from `galleryOrder` | Featured + thumbs; orange corner accent; ember counter/arrows |
| 7 | `Location.astro` | `location` | `location`, `project.location` | — | Large orange travel-time numerals |
| 8 | `Pricing.astro` | `prices` | `prices`, `payment-plans`, `timeline` | — | Orange stat row; 2-step timeline |
| 9 | `Developer.astro` | `developer` | `developer` | `oraLogo` | Dark band with hazard-stripe edge; square logo frame |
| 10 | `Faq.astro` | `faq` | `faq` | — | Exclusive `<details name="faq">`, orange numerals |
| 11 | `Contact.astro` | `contact` | `contact`, `residential-units` | — | Two-column lead gen: copy + boxed form with solid orange submit |
| — | `SiteFooter.astro` | — | `project`, `sources`, `contact` | — | Wordmark, contact rows, sources |

**Content rules applied [Confirmed]** (unchanged):
- Facts, numbers, prices, dates, FAQ, form fields and the phone number come from the content file. Editorial UI copy lives in components. Section headings from the content file are split into a white + orange part with `splitTail()` + `.t-accent`.
- Third-party data carries a visible source (`sourceList()`); prices are "listed"/"indicative" with the content file's disclaimers.
- Location: "Ring Road / CFC" excluded; AUC shows "≈10–15 min".
- Amenities: `brochure-listed` vs `third-party-source-only` separation preserved.
- Product-mix percentages footnoted; phone labelled as published by the independent guide.
- Renders labelled "Illustrative render" / architectural visualizations.
- No legal links (privacy/terms) — none exist in content. **[Open]**

---

## 5. Content Sources

- Components read content only through `src/lib/content.js` (`getSection(id)` throws on unknown id).
- `splitTail(text, n)` returns `{ lead, tail }` — the last `n` words are rendered in orange (`.t-accent`).
- **[Open]** Content file `assets` / `assetManifest` still empty / `not-downloaded`; media registry is the image source of truth.

---

## 6. Architecture

```text
astro.config.mjs
 ├─ integrations: @astrojs/vue
 ├─ fonts: Anton 400 → --font-anton; Inter 400–600 → --font-inter
 ├─ build.inlineStylesheets: 'always'
 └─ vite.plugins: @tailwindcss/vite

src/pages/index.astro ── layouts/Layout.astro ── styles/global.css, <Font>×2, JSON-LD, scripts/reveal.ts
 ├─ SiteHeader.astro
 ├─ main > sections/*.astro ─ lib/content.js ─ content/solana-east.content.js
 │                         └─ content/solana-east.media.js ─ assets/**
 │   ├─ Gallery.astro ─ getImage() ─▶ gallery/GalleryShowcase.vue (client:visible)
 │   └─ Contact.astro ─▶ contact/InquiryForm.vue (client:visible)
 └─ SiteFooter.astro
```

### 6.1 Design system (`src/styles/global.css`)

- **Palette (`@theme`)** — sampled from the references: field `#0D0D0D`, surfaces `#121214`/`#1A1A1D`, accent `#FF4D00`:
  `ink-950 #08080a`, `ink-900 #0d0d0d` (page), `ink-850 #121214`, `ink-800 #1a1a1d`, `ink-700 #26262a`;
  `ember-300 #ff8a4a`, `-400 #ff6a1a` (small accent text), `-500 #ff4d00` (display accent), `-600 #e64500` (fills; white text ≈ on orange), `-700`/`-800`/`-900`;
  `bone-50 #f5f5f4`, `-100`, `-200`; `ash-300 #a9aba5` (body), `-400`, `-500` (decorative); `error #ff8f86`.
- **Type** — `--font-display` Anton (uppercase condensed); `--font-sans` Inter. Fluid `--text-display`, `--text-h2`, `--text-h3`.
- **Component classes** — `.container-x`, `.section`, `.rule-top`, `.eyebrow`, `.display-1`, `.heading-2/3`, `.t-accent`, `.lead`, `.meta`, `.label`, `.hairline`, `.source-note`, `.numeral`, `.btn` / `.btn-ember` / `.btn-solid`, `.btn-sq` / `.btn-sq-ember`, `.link-underline`, `.text-link`, `.tag`, `.ghost-word` (grey watermark fade), `.corner-frame` (orange L-corners), `.media-fill`, `.tone`, `.zoom`.
- **Motion** — same reveal system and hero entrance animations as before; `prefers-reduced-motion` respected.

### 6.2 Interactivity

Unchanged behaviourally from the previous build (header scroll state, scroll spy, mobile menu a11y, gallery, form → WhatsApp, native `<details>`). Visual chrome only was restyled to ember/orange.

---

## 7. Known Issues & Open Items

1. **[Confirmed] The `#` in the folder name breaks the build.** Use `npm run dev|build|preview` → `tools/run.mjs` mirrors to `E:\Work\Web\www\solana-east-build`. **Rename the project folder to run Astro in place.**
2. **[Open]** Image provenance/rights (`rightsStatus: 'verify-before-use'`), especially `solana-by-ora-web-2.jpg`.
3. **[Open]** Contact channel is the independent guide's phone; form hands off to WhatsApp on that number.
4. **[Open]** No `site` in `astro.config.mjs` → canonical / `og:url` / `og:image` omitted.
5. **[Confirmed]** Don't read `media.x.src.width/height/src` in components.
6. **[Confirmed]** Fonts fetched from Google at build time.
7. README is still the starter; package name `squalid-series`.

---

## 8. Checks Performed (2026-10-28, mirror folder, `astro preview` on a production build)

| Check | Result |
|---|---|
| `npm run build` | Passes, 1 page. Fonts: 2 WOFF2 (Anton + Inter). Dist copied back to the project. |
| `tools/test.mjs` (headless Chrome over CDP) | **32/32 pass**: no horizontal overflow at 320/375/768/1024/1280/1920; one `h1`; no heading skips; every `img` has `alt`; JSON-LD; nav targets; fonts; header scrolled + scroll spy; gallery (hydrate, next, thumb, ArrowLeft, wrap); form validation + WhatsApp hand-off; mobile menu focus/inert/Escape; reduced motion. 0 console errors |
| Visual review | Full-page captures at 1440 and 390 reviewed against the orange/dark references |
| Lighthouse 13.x (lab, single run each, `astro preview`) | Mobile: Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100** (FCP 1.0 s, LCP 2.0 s, TBT 10 ms, CLS 0). Desktop: **100/100/100/100** (FCP 0.2 s, LCP 0.4 s, TBT 0 ms, CLS 0). Lab data only |
| `astro check` | Not run (`@astrojs/check` not installed) |

---

## 9. Open Questions for the Project Owner

1. Image rights/provenance; official Solana East logo.
2. Official sales channel / form endpoint.
3. Production `site` URL and OG image.
4. Confirm dark + safety-orange direction for this real-estate brand (brief text said gold/spa; images were followed).
5. Rename the folder to drop `#`.
6. Privacy/terms pages.
7. Arabic / RTL version? (Anton and Inter have no Arabic glyphs.)
