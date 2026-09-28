"use client";

import { ItemThumb } from "@/components/art/ItemArt";
import type { ItemId } from "@/lib/catalog";
import { useProductCard } from "./useProductCard";

/** Desktop product card (2-col grid in the selection panel). */
export function ProductCard({ id }: { id: ItemId }) {
  const c = useProductCard(id);

  return (
    // The whole card is a mouse shortcut for the main button, which carries keyboard + a11y.
    <div
      onClick={c.pick}
      className={`flex cursor-pointer flex-col gap-2.5 rounded-[18px] border-2 px-2 pb-3 pt-2 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 ${
        c.on ? "border-brand bg-brand-selected" : "border-line bg-white"
      }`}
    >
      <div className="relative flex h-[124px] items-center justify-center overflow-hidden rounded-xl bg-well">
        <ItemThumb id={id} scale={c.item.artScale} />
        {c.item.sameDay && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-brand-hover">Same-day</span>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <h3 className="text-sm font-bold leading-[1.25]">{c.item.name}</h3>
        <p className="text-xs text-subtle">{c.item.spec}</p>
      </div>
      <div className="flex items-center justify-between gap-2 px-1">
        <p className="text-[15px] font-extrabold">
          {c.price}
          <span className="text-xs font-semibold text-subtle">{c.per}</span>
        </p>
        {c.showStepper ? (
          <div
            role="group"
            aria-label={`${c.item.name} quantity`}
            className="flex h-8 items-center gap-0.5 rounded-[10px] bg-brand px-[3px] text-white"
          >
            <button
              type="button"
              onClick={c.onDec}
              aria-label={`Remove one ${c.item.name}`}
              className="flex size-[26px] items-center justify-center rounded-lg text-base font-bold hover:bg-white/15"
            >
              −
            </button>
            <span aria-live="polite" className="min-w-4 text-center text-[13px] font-extrabold">
              {c.qty}
            </span>
            <button
              type="button"
              onClick={c.onInc}
              aria-label={`Add another ${c.item.name}`}
              className="flex size-[26px] items-center justify-center rounded-lg text-base font-bold hover:bg-white/15"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={c.onPickClick}
            aria-pressed={c.pressed}
            aria-label={c.ariaLabel}
            className={`flex h-8 items-center whitespace-nowrap rounded-[10px] px-3 text-[13px] font-bold text-white transition-colors duration-200 ${
              c.on ? "bg-brand" : "bg-ink hover:bg-black"
            }`}
          >
            {c.btnLabel}
          </button>
        )}
      </div>
    </div>
  );
}
