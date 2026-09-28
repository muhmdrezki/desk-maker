"use client";

import { useSyncExternalStore } from "react";
import { deliveryDates, type DeliveryDates } from "./delivery";

/** Neutral copy for the prerendered HTML; real dates fill in on the client. */
const SERVER: DeliveryDates = {
  tomorrowDate: "",
  tomorrowLong: "",
  laterLong: "In 2 days",
  laterWeekday: "soon",
};

let cache: { day: string; value: DeliveryDates } | null = null;

function getSnapshot(): DeliveryDates {
  const day = new Date().toDateString();
  if (cache?.day !== day) cache = { day, value: deliveryDates() };
  return cache.value;
}

const subscribe = () => () => {};

/**
 * Delivery dates relative to "now" in Bali. Pages are prerendered, so the
 * server snapshot is neutral and the client swaps in real dates on hydrate
 * (no hydration mismatch, never stale).
 */
export function useDeliveryDates(): DeliveryDates {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER);
}
