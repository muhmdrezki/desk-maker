"use client";

import { ItemThumb } from "@/components/art/ItemArt";
import type { ItemId } from "@/lib/catalog";
import { useProductCard } from "./useProductCard";

/** Mobile product card (150px, horizontal scroller). Square button shows +, ✓ or ×N. */
export function ProductCardMobile({ id }: { id: ItemId }) {
  const c = useProductCard(id);
  const icon = c.on ? (c.isMonitor ? `×${c.qty}` : "✓") : "+";
  const label = c.isMonitor && c.on ? `Add another ${c.item.name} (${c.qty} added)` : c.ariaLabel;

  return (
    <div
      onClick={c.pick}
      className={`flex w-[150px] flex-none cursor-pointer flex-col gap-2 rounded-2xl border-2 px-1.5 pb-2.5 pt-1.5 transition-[border-color,background-color] duration-200 ${
        c.on ? "border-brand bg-brand-selected" : "border-line bg-white"
      }`}
    >
      <div className="flex h-24 items-center justify-center overflow-hidden rounded-[11px] bg-well">
        <ItemThumb id={id} scale={c.item.artScaleMobile} />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-2 h-8 text-[13px] font-bold leading-[1.25]">{c.item.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold">
            {c.price}
            <span className="text-[11px] text-subtle">{c.per}</span>
          </p>
          <button
            type="button"
            onClick={c.onPickClick}
            aria-pressed={c.pressed}
            aria-label={label}
            className={`flex size-7 items-center justify-center rounded-[9px] text-sm font-extrabold text-white ${c.on ? "bg-brand" : "bg-ink"}`}
          >
            {icon}
          </button>
        </div>
      </div>
    </div>
  );
}
