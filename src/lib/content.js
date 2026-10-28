import content from '../content/solana-east.content.js';

export { content };

const sectionsById = new Map(content.sections.map((section) => [section.id, section]));
const sourcesById = new Map(content.sources.map((source) => [source.id, source]));

export function getSection(id) {
  const section = sectionsById.get(id);
  if (!section) throw new Error(`Unknown content section: ${id}`);
  return section;
}

export function getSource(id) {
  return sourcesById.get(id);
}

/** Short, human-readable source names for inline attribution. */
const SOURCE_LABELS = {
  'ora-brochure': 'ORA brochure',
  'solana-east-guide': 'Solana East Egypt guide',
  'property-finder': 'Property Finder',
  'ora-project-page': 'ORA website',
};

export function sourceLabel(id) {
  return SOURCE_LABELS[id] ?? getSource(id)?.name ?? id;
}

export function sourceList(ids = []) {
  return [...new Set(ids)].map(sourceLabel).join(' · ');
}

const numberFormat = new Intl.NumberFormat('en-US');

export function formatNumber(value) {
  return numberFormat.format(value);
}

/** EGP amounts as compact millions, e.g. 13900000 → "13.9M". */
export function formatEgpMillions(value) {
  const millions = value / 1_000_000;
  return `${Number.isInteger(millions) ? millions : millions.toFixed(millions < 20 ? 3 : 2).replace(/0+$/, '').replace(/\.$/, '')}M`;
}

/** Unit configurations store sizes as `sizeSqm`, `sizeRangeSqm` or `sourceReportedRangeSqm`. */
export function configSizeRange(config) {
  if (typeof config.sizeSqm === 'number') return [config.sizeSqm, config.sizeSqm];
  const range = config.sizeRangeSqm ?? config.sourceReportedRangeSqm;
  if (Array.isArray(range)) return range;
  const layouts = config.layouts ?? config.layoutTypes ?? [];
  const sizes = layouts.map((layout) => layout.sizeSqm);
  return sizes.length ? [Math.min(...sizes), Math.max(...sizes)] : null;
}

export function formatRange([min, max], unit = 'm²') {
  return min === max ? `${formatNumber(min)} ${unit}` : `${formatNumber(min)}–${formatNumber(max)} ${unit}`;
}

/** Layout lists are stored as `layouts` or `layoutTypes`. */
export function configLayouts(config) {
  return config.layouts ?? config.layoutTypes ?? [];
}

export function unitTypeSummary(unitType) {
  const ranges = unitType.configurations.map(configSizeRange).filter(Boolean);
  const bedrooms = unitType.configurations.map((config) => config.bedrooms);
  const prices = unitType.configurations
    .map((config) => config.sourceStartingPriceEgp)
    .filter((price) => typeof price === 'number');
  return {
    sizeRange: ranges.length
      ? [Math.min(...ranges.map((r) => r[0])), Math.max(...ranges.map((r) => r[1]))]
      : null,
    bedroomRange: [Math.min(...bedrooms), Math.max(...bedrooms)],
    startingPriceEgp: prices.length ? Math.min(...prices) : null,
    layoutCount: unitType.configurations.reduce((sum, config) => sum + configLayouts(config).length, 0),
  };
}

export function formatBedrooms([min, max]) {
  return min === max ? `${min} bedroom${min === 1 ? '' : 's'}` : `${min}–${max} bedrooms`;
}

const monthFormat = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatMonth(isoDate) {
  return monthFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

export function digitsOnly(phone) {
  return phone.replace(/[^\d]/g, '');
}

/** Two-digit index used for editorial numbering, e.g. 0 → "01". */
export function pad2(index) {
  return String(index + 1).padStart(2, '0');
}

/**
 * Splits a heading so its last `count` words can be set in the accent colour
 * ("A NEW PERSPECTIVE ON LIVING IN" + "EAST CAIRO"). Copy stays in the content file.
 */
export function splitTail(text, count = 2) {
  const words = text.trim().split(/\s+/);
  const keep = Math.max(1, words.length - count);
  return { lead: words.slice(0, keep).join(' '), tail: words.slice(keep).join(' ') };
}
