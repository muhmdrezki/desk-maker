export type DeliveryDay = "today" | "tomorrow" | "later";
export type DeliverySlot = "8–12" | "12–16" | "16–20";

export const SLOTS: DeliverySlot[] = ["8–12", "12–16", "16–20"];

/** monis.rent operates in Bali (WITA, UTC+8). */
const TZ = "Asia/Makassar";

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(d);

const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

export interface DeliveryDates {
  /** "29 Sep" */
  tomorrowDate: string;
  /** "Tue 29 Sep" */
  tomorrowLong: string;
  /** "Wed 30 Sep" */
  laterLong: string;
  /** "Wednesday" */
  laterWeekday: string;
}

/** Delivery copy relative to today in Bali, so labels never go stale. */
export function deliveryDates(now: Date = new Date()): DeliveryDates {
  const t = addDays(now, 1);
  const l = addDays(now, 2);
  const long = (d: Date) =>
    `${fmt(d, { weekday: "short" })} ${fmt(d, { day: "numeric", month: "short" })}`;
  return {
    tomorrowDate: fmt(t, { day: "numeric", month: "short" }),
    tomorrowLong: long(t),
    laterLong: long(l),
    laterWeekday: fmt(l, { weekday: "long" }),
  };
}

export interface DayOption {
  id: DeliveryDay;
  label: string;
  sub: string;
}

export const dayOptions = (d: DeliveryDates): DayOption[] => [
  { id: "today", label: "Today", sub: "Same-day" },
  { id: "tomorrow", label: "Tomorrow", sub: d.tomorrowLong },
  { id: "later", label: d.laterLong, sub: "Or later" },
];

/** "tomorrow, Tue 29 Sep, 12–16" */
export function deliveryWhen(day: DeliveryDay, slot: DeliverySlot, d: DeliveryDates) {
  if (day === "today") return `today, ${slot}`;
  if (day === "tomorrow") return `tomorrow, ${d.tomorrowLong}, ${slot}`;
  return `${d.laterLong}, ${slot}`;
}

/** "Tomorrow, 12–16" for the mobile checkout summary. */
export function deliveryShort(day: DeliveryDay, slot: DeliverySlot, d: DeliveryDates) {
  const label = dayOptions(d).find((o) => o.id === day)!.label;
  return `${label}, ${slot}`;
}

export function seeYou(day: DeliveryDay, d: DeliveryDates) {
  if (day === "today") return "later today";
  if (day === "tomorrow") return "tomorrow";
  return d.laterWeekday;
}
