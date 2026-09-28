"use client";

import { ITEMS } from "@/lib/catalog";
import { useConfigurator, useTotals } from "@/store/configurator";

/** "In your setup" chips, each removable. Wraps on desktop, scrolls on mobile. */
export function SetupChips({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { lines } = useTotals();
  const removeItem = useConfigurator((s) => s.removeItem);
  const mobile = variant === "mobile";

  return (
    <div
      className={
        mobile
          ? "no-scrollbar -mx-3.5 flex items-center gap-2 overflow-x-auto px-3.5"
          : "flex flex-wrap items-center gap-2 px-1.5 pb-1.5 pt-0.5"
      }
    >
      <h2 className="mr-1 flex-none text-[13px] font-bold text-subtle">In your setup</h2>
      {lines.length === 0 && <p className="flex-none text-[13px] text-subtle">Nothing yet. Pick a desk to start.</p>}
      {/* role="list": Safari drops list semantics on display:contents */}
      <ul role="list" className="contents">
        {lines.map((l) => (
          <li
            key={l.key}
            className="flex flex-none items-center gap-2 rounded-full bg-fill py-1.5 pl-3 pr-1.5 text-[13px] font-semibold"
          >
            {ITEMS[l.id].short}
            <button
              type="button"
              onClick={() => removeItem(l.id, l.index)}
              aria-label={`Remove ${ITEMS[l.id].name}`}
              className="flex size-5 items-center justify-center rounded-full bg-white text-[13px] text-subtle transition-colors hover:bg-ink hover:text-white"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
