"use client";

import { ITEMS, bundleLabel } from "@/lib/catalog";
import { billingWord, fmt, perLabel } from "@/lib/pricing";
import { useConfigurator, useTotals } from "@/store/configurator";
import { RentCta } from "./RentCta";

/** Discount line or add-back warning, live total and the Rent CTA. */
export function SummaryBlock() {
  const billing = useConfigurator((s) => s.billing);
  const t = useTotals();

  return (
    <div className="flex flex-col gap-3 rounded-[18px] bg-page p-4">
      {t.intact && (
        <p className="flex justify-between text-sm font-bold text-brand-hover">
          <span>{bundleLabel(t.bundle)} bundle −20%</span>
          <span>−{fmt(t.discount)}</span>
        </p>
      )}
      {t.missing && (
        <p className="text-[13px] font-semibold text-save-text">
          Add back the {ITEMS[t.missing].short.toLowerCase()} to keep your bundle discount.
        </p>
      )}
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-semibold text-subtle">
            {t.count} items · {billingWord(billing)}
          </p>
          <p className="flex items-baseline gap-1" aria-live="polite" aria-atomic="true">
            <span className="text-[40px] font-extrabold leading-none tracking-[-.03em]">{fmt(t.total)}</span>
            <span className="text-base font-bold text-subtle">{perLabel(billing)}</span>
          </p>
        </div>
        <p className="text-right text-[13px] leading-[1.45] text-subtle">
          Delivery &amp; setup free
          <br />
          Cancel anytime
        </p>
      </div>
      <RentCta className="h-14 gap-2.5 rounded-[14px] text-[17px]">Rent Your Setup →</RentCta>
    </div>
  );
}
