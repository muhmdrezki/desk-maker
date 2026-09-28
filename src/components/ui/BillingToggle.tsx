"use client";

import type { Billing } from "@/lib/catalog";
import { useConfigurator } from "@/store/configurator";

const OPTIONS: { id: Billing; label: string; note?: string }[] = [
  { id: "week", label: "Weekly" },
  { id: "month", label: "Monthly", note: "Save ~30%" },
];

const SIZES = {
  /** Builder panel: 250px, 38px segments. */
  lg: { track: "w-[250px] gap-1 p-1 rounded-[14px]", seg: "h-[38px] rounded-[10px] text-sm" },
  /** Checkout: full width, 40px segments with the savings note. */
  md: { track: "w-full gap-1 p-1 rounded-[14px]", seg: "h-10 rounded-[10px] text-sm gap-2" },
  /** Mobile sticky bar: 176px, 30px segments. */
  sm: { track: "w-[176px] gap-[3px] p-[3px] rounded-[11px]", seg: "h-[30px] rounded-lg text-xs" },
};

export function BillingToggle({ size = "lg", showNote = false }: { size?: keyof typeof SIZES; showNote?: boolean }) {
  const billing = useConfigurator((s) => s.billing);
  const setBilling = useConfigurator((s) => s.setBilling);
  const sz = SIZES[size];

  return (
    <div role="radiogroup" aria-label="Billing period" className={`grid flex-none grid-cols-2 bg-fill ${sz.track}`}>
      {OPTIONS.map((o) => {
        const on = billing === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setBilling(o.id)}
            className={`flex items-center justify-center font-bold transition-[background-color,box-shadow] duration-200 ${sz.seg} ${
              on ? "bg-white shadow-segment" : "bg-transparent hover:bg-white/50"
            }`}
          >
            {o.label}
            {showNote && o.note && <span className="text-[11px] font-extrabold text-save-text">{o.note}</span>}
          </button>
        );
      })}
    </div>
  );
}
