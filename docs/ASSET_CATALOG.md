# Solana East — Asset Catalog

> Catalogued **2026-10-14** (every image opened and inspected; format, dimensions and colors measured with `sharp`, read-only). Usage updated **2026-10-28** for the "ink & ember" redesign. Image files and the media registry were **not modified, renamed or moved** in the redesign.
>
> Labels: **[Confirmed]** verified · **[Inferred]** reasoned from the image/name · **[Open]** needs owner input.

---

## 1. Inventory Overview

| Group | Folder | Count | Used on the page? |
|---|---|---|---|
| Brand logo | `src/assets/` | 1 | Yes — Developer section (recolored with a CSS filter) |
| Aerial masterplan render | `src/assets/imgs/` | 1 | Yes — Masterplan card 03 (provenance **[Open]**) |
| Apartment renders ("Building A" set) | `src/assets/imgs/` | 7 | 7 of 7 |
| Villa/townhouse exterior + interior renders | `src/assets/imgs/views/` | 14 | 14 of 14 |
| Favicon | `public/favicon.svg` | 1 | Yes — ink square, ember square accent, white rule |

**[Confirmed]** The visual direction comes from two reference screenshots supplied by the owner (dark charcoal + safety orange: portfolio and luxury automotive showroom). They are **not stored in the repository**; only the design language was adapted (palette, condensed headline type, orange corner frames, ghost watermark, hairline structure, hazard-stripe accents). No reference imagery or content was copied.

**[Confirmed]** No image has a recorded source URL or license. The media registry exports `rightsStatus: 'verify-before-use'`.

---

## 2. How Images Are Wired

All project images are registered once in **`src/content/solana-east.media.js`**:

```js
villaPool4: { src: villaPool4 /* ES import */, alt: '…', caption: '…', category: 'exteriors' },
buildingA6: { src: buildingA6, alt: '…', caption: '…', category: 'exteriors', position: '100% 50%' },
```

- `alt` describes the scene; `caption` is the gallery label; `position` sets `object-position` to crop baked-in labels.
- `galleryOrder` lists the 12 gallery images in display order.
- Components import the registry, never image files directly.
- Decorative uses (masterplan cards) pass `alt=""`; the card title carries the meaning.

---

## 3. Catalog & Usage

### 3.1 Brand

| Path | Key | Format / size | Notes | Used in |
|---|---|---|---|---|
| `src/assets/grey-logo.png` | `oraLogo` | PNG, transparent, 1000×555 | Grey "ORA" mark with a dark, semi-transparent "Reimagining Time" tagline | `Developer.astro` inside a square frame; `filter: brightness(0) invert(0.92)` renders mark and tagline light. Not a Solana East logo. |

### 3.2 Aerial

| Path | Key | Size | Description | Used in |
|---|---|---|---|---|
| `imgs/solana-by-ora-web-2.jpg` | `aerialMasterplan` | 2300×1069 | Golden-hour aerial with amphitheatre, villas, palms, paths | `Masterplan.astro` card 03 ("Spaces That Connect"). **[Open]** filename references the New Zayed project |

### 3.3 "Building A" set — WebP files with a `.jpg` extension

| File | Key | Baked-in text | Used in |
|---|---|---|---|
| `Building A.jpg` | `buildingA` | "Building A" top-left | Gallery (cropped `100% 50%`) |
| `Building A 2.jpg` | `buildingA2` | — | `Overview.astro` main framed image |
| `Building A 3.jpg` | `buildingA3` | — | `Residences.astro` — Apartments |
| `Building A 4.jpg` | `buildingA4` | — | `Residences.astro` — Duplexes |
| `Building A 5.jpg` | `buildingA5` | — | `Masterplan.astro` card 02; Gallery |
| `Building A 6.jpg` | `buildingA6` | "Building A" top-left | `Masterplan.astro` card 04 (cropped); Gallery (cropped) |
| `Building A 7.jpg` | `buildingA7` | Appears to read "Building L & M" | Gallery (cropped) |

### 3.4 `views/` — villa/townhouse renders (JPEG, 4000–5000 px wide)

| File | Key | Used in |
|---|---|---|
| `villa_pool_4.jpg` | `villaPool4` | `Hero.astro` (LCP) in the corner-framed rectangular hero, `object-position: 42% 58%` |
| `HOUSE_LIVING-ROOM.jpg` | `livingRoom` | `Overview.astro` overlapping inset |
| `GARDEN_VIEW_1.jpg` | `gardenView1` | `Masterplan.astro` card 01; Gallery |
| `STREET_VIEW.jpg` | `streetView` | `Residences.astro` — Townhouses |
| `villa_pool_1.jpg` | `villaPool1` | `Residences.astro` — Villas |
| `villa_pool_2.jpg` | `villaPool2` | `Amenities.astro` main framed image |
| `GARDEN_VIEW_2.jpg` | `gardenView2` | `Amenities.astro` orange-bordered inset |
| `CLOSE-VIEW.jpg` | `closeView` | Gallery (first / featured) |
| `LIVING-KITCHEN.jpg` | `livingKitchen` | Gallery |
| `GARDEN-VIEW.jpg` | `gardenView` | Gallery |
| `bedroom 1.jpg` | `bedroom` | Gallery |
| `villa_pool_3.jpg` | `villaPool3` | Gallery |
| `DINNING-ROOM.jpg` | `diningRoom` | Gallery |
| `BATHROOM.jpg` | `bathroom` | Gallery |

**[Inferred]** `views/` depicts single-family product and interiors; "Building A" depicts multi-family blocks. Residences cards carry an **"Illustrative render"** badge; masterplan cards are noted as illustrative.

---

## 4. Provenance & Usage Risks

| Risk | Affected files | Status / mitigation |
|---|---|---|
| Possibly a different project (Solana New Zayed) | `solana-by-ora-web-2.jpg` | Used in one card only; **[Open]** confirm |
| Baked-in labels | `Building A.jpg`, `Building A 6.jpg`, `Building A 7.jpg` | Cropped via `position`; kept out of large feature slots |
| No license / source URL | All 22 + logo | **[Open]** |
| WebP named `.jpg` | 7 "Building A" files | Works with `astro:assets`; **[Open]** rename approval |

---

## 5. Delivery & Performance

| Usage | API | Output |
|---|---|---|
| Hero (LCP) | `<Picture>` `priority`, AVIF + WebP, widths 480–1600, `sizes="(min-width: 64rem) 42rem, 92vw"`, q58 | AVIF/WebP; JPEG fallback for legacy browsers |
| Overview / Amenities frames | `<Image>` with explicit `widths` + `sizes`, q62, lazy | WebP |
| Masterplan / Residences cards | `<Image>` widths 360/540/720, q60–62, lazy | WebP |
| Gallery | `getImage()` in `Gallery.astro`: featured 640/960/1280/1600 q60, thumbnails 240/360/480 q58, no-JS link target 1920 q66 | Strings passed to `GalleryShowcase.vue` |
| Logo | `<Image>` widths 240/360/480 q80 | WebP |

- Never read `media.x.src.width/height/src` in components.
- Never move images to `public/` (no optimization).
- Framing uses `.corner-frame` (CSS pseudo L-corners); images use `object-fit: cover` and are never distorted.

---

## 6. Visual Identity

### 6.1 Measured reference colors (2026-10-28)

Sampled from the two reference screenshots: page field ≈ `#0D0D0D` / `#0E1012`, accent ≈ `#FF4D00` / `#FF4F00`, surfaces `#121214`–`#1A1A1D`, body grey ≈ `#A9ABA5`.

### 6.2 Implemented tokens

See `PROJECT_MAP.md` §6.1 (`ink-*`, `ember-*`, `bone-*`, `ash-*`). Orange is used for display accents, small labels, numerals, corner frames, and primary buttons.

**Image treatment:** section imagery (`.tone`) is lightly desaturated at rest and returns to full colour on hover/focus. Hero and gallery featured image stay in colour.

**Typography:** Anton (condensed uppercase display) + Inter (body/UI), self-hosted through the Astro Fonts API. Allura/script accents were removed for this redesign.

**Layout language:** full-bleed near-black page, hairline rules between sections, two-tone (white + orange) headlines, small orange `.eyebrow` labels, sharp rectangular frames with orange corner accents, numbered lists/stats in orange Anton, outlined/solid rectangular buttons (≈4px radius), hazard-stripe accents on retail/developer/mobile menu, boxed dark form fields.
