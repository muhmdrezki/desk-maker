"use client";

import { BUNDLES } from "@/lib/catalog";
import { bundleFromPrice, fmt, perLabel } from "@/lib/pricing";
import { useConfigurator } from "@/store/configurator";

const Tag = () => (
  <span className="rounded-full bg-save-bg px-2 py-[3px] text-xs font-extrabold text-save-text">−20%</span>
);

/** Bundle presets: 4-col cards on desktop, scrolling pills on mobile. Selecting one replaces the setup. */
export function BundlePicker({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const current = useConfigurator((s) => s.bundle);
  const billing = useConfigurator((s) => s.billing);
  const loadBundle = useConfigurator((s) => s.loadBundle);

  if (variant === "mobile") {
    return (
      <div role="radiogroup" aria-label="Start from a bundle" className="no-scrollbar -mx-3.5 flex gap-2 overflow-x-auto px-3.5">
        {BUNDLES.map((b) => {
          const on = current === b.id;
          return (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => loadBundle(b.id)}
              className={`flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border-2 bg-white px-3 py-2 text-[13px] font-bold ${
                on ? "border-brand" : "border-line"
              }`}
            >
              {b.short}
              {b.items.length > 0 && <span className="text-[11px] font-extrabold text-save-text">−20%</span>}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label="Start from a bundle" className="grid grid-cols-4 gap-3">
      {BUNDLES.map((b) => {
        const on = current === b.id;
        return (
          <button
            key={b.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => loadBundle(b.id)}
            className={`flex flex-col gap-1.5 rounded-[18px] border-2 bg-white px-[18px] py-4 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 ${
              on ? "border-brand" : "border-line"
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-base font-extrabold tracking-[-.01em]">{b.name}</span>
              {b.items.length > 0 && <Tag />}
            </span>
            <span className="text-[13px] leading-[1.4] text-muted">{b.desc}</span>
            <span className="mt-0.5 text-sm font-bold">
              {b.items.length ? `From ${fmt(bundleFromPrice(b, billing))}${perLabel(billing)}` : "Pay per item"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
