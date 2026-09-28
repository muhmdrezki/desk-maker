"use client";

import { SLOTS, dayOptions } from "@/lib/delivery";
import { useDeliveryDates } from "@/lib/useDeliveryDates";
import { useConfigurator } from "@/store/configurator";

export function DeliveryPicker({ address, onAddressChange }: { address: string; onAddressChange: (v: string) => void }) {
  const dates = useDeliveryDates();
  const day = useConfigurator((s) => s.day);
  const slot = useConfigurator((s) => s.slot);
  const setDay = useConfigurator((s) => s.setDay);
  const setSlot = useConfigurator((s) => s.setSlot);

  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-sm font-extrabold">Delivery</legend>
      <div role="radiogroup" aria-label="Delivery day" className="grid grid-cols-3 gap-2">
        {dayOptions(dates).map((d) => {
          const on = day === d.id;
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setDay(d.id)}
              className={`flex flex-col gap-0.5 rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                on ? "border-brand bg-brand-selected" : "border-line bg-white hover:border-line-strong"
              }`}
            >
              <span className="text-sm font-bold">{d.label}</span>
              <span className="min-h-[18px] text-xs text-subtle">{d.sub}</span>
            </button>
          );
        })}
      </div>
      <div role="radiogroup" aria-label="Delivery time slot" className="flex gap-2">
        {SLOTS.map((s) => {
          const on = slot === s;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSlot(s)}
              className={`flex h-9 flex-1 items-center justify-center rounded-[10px] border-[1.5px] text-[13px] font-bold transition-colors ${
                on ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      <label className="flex flex-col gap-0.5 rounded-xl border-[1.5px] border-line-strong px-3.5 py-3 focus-within:border-brand">
        <span className="text-xs text-subtle">Address</span>
        <input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          autoComplete="street-address"
          className="bg-transparent text-sm font-semibold outline-none"
        />
      </label>
    </fieldset>
  );
}
