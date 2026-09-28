/**
 * Catalog + bundles for the Workspace Builder.
 *
 * NOTE: hardcoded from the design handoff with placeholder weekly prices
 * (only the 24" monitor's $6/wk is real). In production these sync to the
 * live monis.rent catalog API — names, specs, weekly/monthly SKU prices,
 * same-day eligibility and stock — and bundles come from the same source.
 */

export type DeskId = "desk_electric" | "desk_dual" | "desk_mech";
export type MonitorId = "mon24" | "mon27" | "mon34";
export type AccessoryId =
  | "keyboard"
  | "mouse"
  | "laptopstand"
  | "lamp"
  | "lightbar"
  | "power";
export type ItemId = DeskId | "chair" | MonitorId | AccessoryId;
export type ArtId = ItemId | "plant";

export type Category = "desk" | "chair" | "mon" | "acc";
export type BundleId = "scratch" | "essentials" | "founders" | "trading";
export type Billing = "week" | "month";

export interface CatalogItem {
  id: ItemId;
  name: string;
  /** Short label for setup chips and warnings. */
  short: string;
  spec: string;
  /** Weekly price in USD. */
  weekly: number;
  cat: Category;
  /** Eligible for same-day delivery. */
  sameDay?: boolean;
  /** Illustration scale inside the product card image well (desktop / mobile). */
  artScale: number;
  artScaleMobile: number;
  /** Illustration scale inside a checkout line-item thumbnail. */
  rowScale: number;
}

export const ITEMS: Record<ItemId, CatalogItem> = {
  desk_electric: { id: "desk_electric", name: "Electrical Adjustable Desk", short: "Electric desk", spec: "Sit-stand, 70–118 cm", weekly: 9, cat: "desk", artScale: 0.38, artScaleMobile: 0.28, rowScale: 0.12 },
  desk_dual: { id: "desk_dual", name: "Dual-Motor Standing Desk", short: "Dual-motor desk", spec: "3-stage lift, 120 kg load", weekly: 12, cat: "desk", artScale: 0.38, artScaleMobile: 0.28, rowScale: 0.12 },
  desk_mech: { id: "desk_mech", name: "Mechanical Adjustable Desk", short: "Crank desk", spec: "Crank lift, no power needed", weekly: 6, cat: "desk", artScale: 0.38, artScaleMobile: 0.28, rowScale: 0.12 },
  chair: { id: "chair", name: "Ergonomic Office Chair", short: "Chair", spec: "4D arms, lumbar, headrest", weekly: 8, cat: "chair", artScale: 0.48, artScaleMobile: 0.38, rowScale: 0.25 },
  mon24: { id: "mon24", name: '24" Full HD Monitor', short: '24" monitor', spec: "144 Hz IPS", weekly: 6, cat: "mon", sameDay: true, artScale: 0.8, artScaleMobile: 0.6, rowScale: 0.38 },
  mon27: { id: "mon27", name: '27" 4K Monitor', short: '27" 4K', spec: "USB-C, 100% sRGB", weekly: 9, cat: "mon", sameDay: true, artScale: 0.74, artScaleMobile: 0.52, rowScale: 0.34 },
  mon34: { id: "mon34", name: '34" Curved Monitor', short: '34" curved', spec: "WQHD, 180 Hz", weekly: 14, cat: "mon", sameDay: true, artScale: 0.6, artScaleMobile: 0.44, rowScale: 0.26 },
  keyboard: { id: "keyboard", name: "Logitech MX Keyboard", short: "MX Keyboard", spec: "Switch across 3 devices", weekly: 3, cat: "acc", sameDay: true, artScale: 1.3, artScaleMobile: 1, rowScale: 0.46 },
  mouse: { id: "mouse", name: "Logitech MX Master S3", short: "MX Master", spec: "8K DPI, 70-day battery", weekly: 2.5, cat: "acc", sameDay: true, artScale: 2.8, artScaleMobile: 2.2, rowScale: 1.7 },
  laptopstand: { id: "laptopstand", name: "Ergonomic Laptop Stand", short: "Laptop stand", spec: "Fits 10–17\" laptops", weekly: 1.5, cat: "acc", sameDay: true, artScale: 1.1, artScaleMobile: 0.85, rowScale: 0.6 },
  lamp: { id: "lamp", name: "Smart LED Desk Lamp", short: "Desk lamp", spec: "2600–5000 K, voice control", weekly: 2, cat: "acc", sameDay: true, artScale: 0.8, artScaleMobile: 0.62, rowScale: 0.42 },
  lightbar: { id: "lightbar", name: "Monitor Light Bar", short: "Light bar", spec: "No glare, frees desk space", weekly: 2, cat: "acc", artScale: 1.3, artScaleMobile: 1, rowScale: 0.5 },
  power: { id: "power", name: "Smart Power Strip", short: "Power strip", spec: "EU / US / AU + 3 USB", weekly: 1, cat: "acc", sameDay: true, artScale: 1.3, artScaleMobile: 1, rowScale: 0.52 },
};

/** Accessory display/line order. */
export const ACCESSORIES: AccessoryId[] = ["keyboard", "mouse", "laptopstand", "lamp", "lightbar", "power"];

export const CATEGORY_ITEMS: Record<Category, ItemId[]> = {
  desk: ["desk_electric", "desk_dual", "desk_mech"],
  chair: ["chair"],
  mon: ["mon24", "mon27", "mon34"],
  acc: ACCESSORIES,
};

export const MAX_MONITORS = 2;
export const BUNDLE_DISCOUNT = 0.2;
export const DEFAULT_DESK: DeskId = "desk_electric";
export const DEFAULT_BUNDLE: BundleId = "founders";

export interface Bundle {
  id: BundleId;
  name: string;
  short: string;
  desc: string;
  items: ItemId[];
}

export const BUNDLES: Bundle[] = [
  { id: "scratch", name: "Start fresh", short: "Start fresh", desc: "An empty room. Build it piece by piece.", items: [] },
  { id: "essentials", name: "The Essentials", short: "Essentials", desc: "Standing desk and ergonomic chair.", items: ["desk_electric", "chair"] },
  { id: "founders", name: "The Founders Setup", short: "Founders", desc: "4K USB-C screen, laptop stand, peripherals, power.", items: ["desk_electric", "chair", "mon27", "laptopstand", "keyboard", "mouse", "power"] },
  { id: "trading", name: "The Trading Setup", short: "Trading", desc: "Ultrawide curved screen, dual-motor desk, light bar.", items: ["desk_dual", "chair", "mon34", "keyboard", "mouse", "lightbar", "power"] },
];

export const getBundle = (id: BundleId): Bundle =>
  BUNDLES.find((b) => b.id === id) ?? BUNDLES[2];

/** "The Founders Setup" → "Founders" for the discount line. */
export const bundleLabel = (b: Bundle) => b.name.replace(/^The /, "").replace(/ Setup$/, "");

/**
 * Placeholder monthly pricing from the handoff: ≈ 4.33 weeks × 0.7.
 * Replace with real monthly SKU prices from the catalog API.
 */
export const monthly = (weekly: number) => Math.round(weekly * 3.03);

export const priceFor = (id: ItemId, billing: Billing) =>
  billing === "week" ? ITEMS[id].weekly : monthly(ITEMS[id].weekly);
