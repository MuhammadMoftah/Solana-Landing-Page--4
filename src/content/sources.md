# Solana East — Sources & Research Notes

**Purpose:** Source register for `solana-east.content.js`. This file records where the project information came from, what each source can and cannot substantiate, and which claims need confirmation before a rebuilt website goes live.

**Research snapshot date:** 13 October 2026  
**Project in scope:** Solana East, New Cairo / East Cairo, Egypt  
**Developer:** ORA Developers

---

## 1. Sources

### S1 — Solana East Egypt project information guide

- **URL:** https://solanaeastegypt.com/
- **Type:** Independent project-information guide; not the official developer website.
- **Useful for:**
  - Project overview and New Cairo location.
  - Its description of the masterplan concept: central lake, homes facing the water, green walking/cycling paths, and amenities around the edges.
  - Guide-specific FAQ and approximate travel-time claims.
  - Contact form and the sales phone number displayed by that guide.
- **Important limitations:**
  - The guide explicitly describes itself as an information guide, not a unit seller or booking service.
  - Its sales contact details are not independently confirmed here as an official ORA sales channel.
  - Prices, payment plans, availability, and travel times should be treated as claims from the guide and reconfirmed.
- **Use in the JS file:** `sources[id="solana-east-guide"]`.

### S2 — Property Finder: Solana East by ORA Developers

- **URL:** https://www.propertyfinder.eg/en/new-projects/ora-developers/solana-east
- **Type:** Third-party real-estate listing.
- **Useful for:**
  - Listed property types: apartments, duplexes, townhouses, and villas.
  - Unit layout labels, bedroom counts, sample areas, and floor-plan entries.
  - Published starting-price examples.
  - Payment-plan claims.
  - Listing timeline and delivery date.
  - Nearby-place claims and listed amenities.
- **Captured source claims (not guarantees):**
  - The project page shows a launch price of **EGP 14 million** in one captured version.
  - Other Property Finder listing views show **EGP 13.9 million** or **EGP 13.955 million** as starting/launch prices.
  - It lists delivery as **Q2 2030 / April 2030** and construction start as **2 June 2025**.
  - One project-page snapshot describes two payment plans, while developer directory views have shown three.
  - Payment-plan text includes 5% down payment with durations reported as 6 or 9 years in different page content; these are not confirmed current official offers.
  - Unit categories include apartments, duplexes, townhouses, and villas. Some page copy also mentions penthouses, while the structured unit tables may not expose them as a separate type.
- **Important limitations:**
  - Different page components may be updated at different times.
  - Prices and availability can change frequently.
  - Narrative copy and structured tables do not always agree on size ranges or unit categories.
  - A third-party amenity list is not automatically proof of a contractual developer commitment.
- **Use in the JS file:** `sources[id="property-finder"]`.

### S3 — ORA Developers: Solana by ORA project page

- **URL:** https://www.oradevelopers.com/properties/solana-by-ora
- **Type:** Official developer website.
- **Project identity:** This page describes **Solana in New Zayed**, i.e. the western project. It is **not** the Solana East project page.
- **Useful for:**
  - General developer branding and corporate context only, where relevant.
  - It must not be used as the source for Solana East's location, land area, unit count, unit mix, or project amenities unless a fact is independently confirmed as applicable to East.
- **Facts on that page that must NOT be attributed to Solana East:**
  - 316 feddan / 1,327,981 sqm.
  - 870 villas/townhouses and 1,300 apartments.
  - New Zayed location claims.
- **Use in the JS file:** `sources[id="ora-project-page"]`.

### S4 — ORA Egypt corporate brochure, Solana East section

- **URL:** https://ebrochures.ora-egypt.com/assets/documents/Ora_Egypt/Ora_Egypt_Brochure_Digital_version_32_comp_final.pdf
- **Type:** Official ORA corporate brochure PDF containing multiple projects.
- **Use only the Solana East pages/section.** Do not copy the separate Solana / New Zayed project statistics into Solana East content.
- **Captured Solana East brochure content:**
  - Project location label: **Egypt, East Cairo**.
  - Project land area: **167.67 feddan (704,070 sqm)**.
  - Number of units: **1,063**.
  - Product-mix graphic: **70% single-family**, **30% multiple-family**.
  - Single-family BUA shown as **75,537 sqm**.
  - Amenities/features named in the brochure:
    - Day care
    - Pharmacy
    - Park and water features
    - Clubhouse
    - Convenience stores
    - Fitness center
    - Football academy
    - Bike and running lanes
    - Electric charging stations
  - Narrative describes a lake-centered view, homes around lakes, an entertainment hub, a mall experience, and dining options.
  - Masterplan narrative emphasizes landscape, connections, neighborhood relationships, and outdoor spaces.
- **Use in the JS file:** `sources[id="ora-brochure"]`.
- **Caution:** Some product-mix figures sit in a visual graphic. Verify their association against the PDF page image before turning them into prominent numeric marketing claims.

---

## 2. Key project facts in the current data file

| Fact | Current captured value | Source | Status |
|---|---|---|---|
| Project name | Solana East | S1, S2, S4 | Consistent |
| Developer | ORA Developers | S1, S2, S4 | Consistent |
| Location | New Cairo / East Cairo | S1, S2, S4 | Consistent at district/city level |
| Land area | 167.67 feddan / 704,070 sqm | S4 | Official brochure |
| Number of units | 1,063 | S4 | Official brochure |
| Single-family / multiple-family mix | 70% / 30% | S4 | Verify visual association in PDF |
| Single-family BUA | 75,537 sqm | S4 | Verify layout/context in PDF |
| Property types in listing tables | Apartments, duplexes, townhouses, villas | S2 | Third-party listing |
| Expected delivery | April 2030 / Q2 2030 | S2 | Third-party listing; confirm contractually |
| Starting price | EGP 13.9M–14M in different snapshots | S2 | Conflicting, volatile |
| Payment plans | 5% down; durations vary across source snapshots | S2, S1 guide claims | Conflicting, must reconfirm |

---

## 3. Source conflicts and publication rules

### 3.1 Solana East vs Solana (New Zayed)

The supplied official ORA URL is for `solana-by-ora` and describes Solana in New Zayed. Solana East is a different project in New Cairo / East Cairo. Never merge their statistics, locations, project mix, or imagery.

### 3.2 Starting prices

Captured Property Finder views show different figures (EGP 13.9M, EGP 13.955M, and EGP 14M). The project guide also provides unit-level price examples. These can reflect different capture times, units, or listing updates. Do not present one as the definitive current starting price without a dated written offer.

### 3.3 Payment plans

The number of plans and reported durations vary between Property Finder page views and project-guide content. Preserve source attribution in the data. Do not calculate installments or imply a fixed, interest-free schedule unless the developer's current written offer confirms it.

### 3.4 Unit types and sizes

Property Finder's listing tables include multiple layout sizes and bedroom counts. Some prose gives a broader size range and mentions penthouses, while the structured tables use other ranges. Use the table data as a reference for organizing floor-plan cards, but verify each floor plan and unit size before publishing. The JS file intentionally keeps source notes rather than pretending all values are perfectly reconciled.

### 3.5 Delivery date

Property Finder reports April 2030 / Q2 2030 in its headline and timeline, but some FAQ copy may phrase the date differently. Display it as a third-party-listed expected date and ask the developer for the current contractual handover date.

### 3.6 Travel times

Approximate journey times differ across source text and depend on the route, starting point, and traffic. Do not state exact minutes as guaranteed travel times. If needed, verify distances and routes using a map service.

### 3.7 Amenities

Separate:
- **Brochure-listed:** day care, pharmacy, park/water features, clubhouse, convenience stores, fitness center, football academy, bike/running lanes, electric charging stations.
- **Third-party listing only:** additional features such as CCTV, garage, swimming pools, cafés/restaurants, laundry/dry-cleaning, and on-site maintenance.

The second group should not be represented as official developer commitments without confirmation.

### 3.8 Images and asset files

Images are intentionally not embedded or downloaded by this content package. The project owner will collect the images separately. For every saved image, record:
- Original URL and source ID.
- Local file path.
- Section/gallery category.
- Descriptive alt text.
- Whether it is an architectural visualization, floor plan, map, logo, or brochure page.
- Reuse permission/licensing status.

---

## 4. Recommended local asset organization

```text
public/
  assets/
    solana-east/
      hero/
      architecture/
      landscape/
      masterplan/
      floor-plans/
      amenities/
      logos/
      brochures/
      maps/
```

Use stable, descriptive filenames, e.g.:
- `solana-east-hero-render.webp`
- `solana-east-masterplan.webp`
- `solana-east-apartment-2br-type-a.webp`
- `solana-east-clubhouse-render.webp`

When you manually collect an image, add its path to the matching section's `assets` array in `solana-east.content.js`.

---

## 5. Implementation notes

- `solana-east.content.js` is the importable JavaScript ES module and is the structured source of truth for the new site.
- The `sections` array provides ordered content sections. `id` should remain stable even if the visual design changes.
- `type` is a rendering hint, not a design lock-in.
- `sources` and `researchNotes` are intended to preserve provenance and uncertainty.
- Keep prices and payment plans in data, not hard-coded in UI components.
- Consider hiding or labeling any record whose status is `needs-verification`, `volatile-third-party-data`, or `third-party-source-only` until confirmed.
- The content package does not include a verified live inventory, booking API, or developer-issued current price list.

---

## 6. Pre-launch verification checklist

- [ ] Confirm all project facts belong to Solana East, not Solana New Zayed.
- [ ] Re-check land area, unit count, and product mix against the official brochure visuals.
- [ ] Confirm current unit types and floor-plan sizes.
- [ ] Replace all starting prices with a dated, authorized price list or label them as indicative.
- [ ] Confirm down payment, installment duration, installment schedule, maintenance, and reservation fees.
- [ ] Confirm contractual delivery date.
- [ ] Confirm every amenity that will be advertised.
- [ ] Confirm exact location pin and map link.
- [ ] Verify sales phone number and inquiry recipient.
- [ ] Add original image URLs, local paths, alt text, and usage rights for every asset.
