import {
  ACCESSORIES,
  BUNDLE_DISCOUNT,
  ITEMS,
  getBundle,
  priceFor,
  type AccessoryId,
  type Billing,
  type Bundle,
  type BundleId,
  type DeskId,
  type ItemId,
  type MonitorId,
} from "./catalog";

export interface Setup {
  desk: DeskId | null;
  chair: boolean;
  monitors: MonitorId[];
  acc: Partial<Record<AccessoryId, 1>>;
}

export interface LineItem {
  /** Stable React key, e.g. "mon27#1" for a second 27" monitor. */
  key: string;
  id: ItemId;
  /** Index into `monitors` for monitor lines, else 0 — used to remove the right one. */
  index: number;
}

export interface Totals {
  lines: LineItem[];
  count: number;
  counts: Partial<Record<ItemId, number>>;
  subtotal: number;
  bundle: Bundle;
  /** Bundle preset has items and every one is still present (quantity-aware). */
  intact: boolean;
  /** First bundle item no longer in the setup, if the bundle is broken. */
  missing: ItemId | null;
  discount: number;
  total: number;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Items in display order: desk, chair, monitors, accessories. */
export function lineItems(s: Setup): LineItem[] {
  const out: LineItem[] = [];
  if (s.desk) out.push({ key: s.desk, id: s.desk, index: 0 });
  if (s.chair) out.push({ key: "chair", id: "chair", index: 0 });
  s.monitors.forEach((m, i) => out.push({ key: `${m}#${i}`, id: m, index: i }));
  ACCESSORIES.forEach((a) => {
    if (s.acc[a]) out.push({ key: a, id: a, index: 0 });
  });
  return out;
}

export function computeTotals(s: Setup, bundleId: BundleId, billing: Billing): Totals {
  const lines = lineItems(s);
  const counts: Partial<Record<ItemId, number>> = {};
  lines.forEach(({ id }) => (counts[id] = (counts[id] ?? 0) + 1));

  const subtotal = r2(lines.reduce((t, { id }) => t + priceFor(id, billing), 0));

  const bundle = getBundle(bundleId);
  const need: Partial<Record<ItemId, number>> = {};
  bundle.items.forEach((id) => (need[id] = (need[id] ?? 0) + 1));
  const missingIds = (Object.keys(need) as ItemId[]).filter(
    (id) => (counts[id] ?? 0) < (need[id] ?? 0),
  );
  const intact = bundle.items.length > 0 && missingIds.length === 0;
  const discount = intact ? r2(bundlePrice(bundle, billing) * BUNDLE_DISCOUNT) : 0;

  return {
    lines,
    count: lines.length,
    counts,
    subtotal,
    bundle,
    intact,
    missing: bundle.items.length > 0 && !intact ? missingIds[0] : null,
    discount,
    total: r2(subtotal - discount),
  };
}

/** Undiscounted price of a bundle's items. */
export const bundlePrice = (b: Bundle, billing: Billing) =>
  r2(b.items.reduce((t, id) => t + priceFor(id, billing), 0));

/** "From $X/wk" price on bundle cards (bundle total × 0.8). */
export const bundleFromPrice = (b: Bundle, billing: Billing) =>
  r2(bundlePrice(b, billing) * (1 - BUNDLE_DISCOUNT));

/** $9 / $2.50 — whole numbers without decimals, otherwise 2dp. */
export const fmt = (n: number) => "$" + (n % 1 ? n.toFixed(2) : String(n));

export const perLabel = (b: Billing) => (b === "week" ? "/wk" : "/mo");
export const billingWord = (b: Billing) => (b === "week" ? "per week" : "per month");

/** Short, human description of the setup for scene alt text. */
export function describeSetup(s: Setup): string {
  const names = lineItems(s).map(({ id }) => ITEMS[id].name);
  if (!names.length) return "An empty room with a window and a snake plant, ready for a desk.";
  return `Illustrated workspace with ${names.join(", ")}.`;
}
