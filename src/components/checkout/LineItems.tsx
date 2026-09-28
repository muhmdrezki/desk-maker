"use client";

import Link from "next/link";
import { ItemThumb } from "@/components/art/ItemArt";
import { ITEMS, priceFor } from "@/lib/catalog";
import { fmt, perLabel } from "@/lib/pricing";
import { useConfigurator, useTotals } from "@/store/configurator";

const Empty = () => (
  <p className="py-6 text-center text-sm text-subtle">
    Your setup is empty.{" "}
    <Link href="/" className="font-bold text-brand hover:text-brand-hover">
      Pick a desk to start
    </Link>
  </p>
);

export function LineItems({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { lines } = useTotals();
  const billing = useConfigurator((s) => s.billing);
  const removeItem = useConfigurator((s) => s.removeItem);
  const mobile = variant === "mobile";

  return (
    <div className={`flex flex-col border border-line bg-white ${mobile ? "rounded-[18px] px-3.5 py-1" : "rounded-[20px] px-5 py-2"}`}>
      {lines.length === 0 && <Empty />}
      <ul aria-label="Items in your setup">
        {lines.map((l) => {
          const it = ITEMS[l.id];
          return (
            <li key={l.key} className={`flex items-center border-b border-line-row last:border-b-0 ${mobile ? "gap-3 py-2.5" : "gap-4 py-3"}`}>
              <div
                className={`flex flex-none items-center justify-center overflow-hidden bg-well ${mobile ? "size-12 rounded-[10px]" : "size-16 rounded-xl"}`}
              >
                <ItemThumb id={l.id} scale={mobile ? it.rowScale * 0.75 : it.rowScale} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className={`font-bold leading-[1.25] ${mobile ? "text-sm" : "text-[15px]"}`}>{it.name}</p>
                {!mobile && <p className="text-[13px] text-subtle">{it.spec}</p>}
              </div>
              {!mobile && (
                <button
                  type="button"
                  onClick={() => removeItem(l.id, l.index)}
                  aria-label={`Remove ${it.name}`}
                  className="text-[13px] font-semibold text-subtle transition-colors hover:text-ink"
                >
                  Remove
                </button>
              )}
              <p className={`text-right font-extrabold ${mobile ? "text-sm" : "w-20 text-[15px]"}`}>
                {fmt(priceFor(l.id, billing))}
                {!mobile && <span className="text-xs font-semibold text-subtle">{perLabel(billing)}</span>}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
