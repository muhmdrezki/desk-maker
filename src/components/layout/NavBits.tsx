"use client";

import Link from "next/link";
import { useDeliveryDates } from "@/lib/useDeliveryDates";
import { useTotals } from "@/store/configurator";

export function CartButton() {
  const { count } = useTotals();
  return (
    <Link
      href="/checkout"
      aria-label={`Cart, ${count} items`}
      className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black"
    >
      Cart
      <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-[11px] bg-brand px-1.5 text-xs">{count}</span>
    </Link>
  );
}

/** "Tomorrow, 29 Sep" — computed in Bali time on the client. */
export function DeliveryDateValue() {
  const { tomorrowDate } = useDeliveryDates();
  return <>Tomorrow{tomorrowDate && `, ${tomorrowDate}`}</>;
}
