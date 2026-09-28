"use client";

import { useRef, type KeyboardEvent } from "react";
import type { Category } from "@/lib/catalog";
import { useShallow } from "zustand/react/shallow";
import { useConfigurator } from "@/store/configurator";

const TABS: { id: Category; label: string; short: string }[] = [
  { id: "desk", label: "Desk", short: "Desk" },
  { id: "chair", label: "Chair", short: "Chair" },
  { id: "mon", label: "Monitors", short: "Monitors" },
  { id: "acc", label: "Accessories", short: "Extras" },
];

export const tabId = (prefix: string, c: Category) => `${prefix}-tab-${c}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

/** Underline tabs with per-category count pills. Arrow keys move between tabs. */
export function CategoryTabs({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const tab = useConfigurator((s) => s.tab);
  const setTab = useConfigurator((s) => s.setTab);
  const counts = useConfigurator(
    useShallow((s) => ({
      desk: s.desk ? 1 : 0,
      chair: s.chair ? 1 : 0,
      mon: s.monitors.length,
      acc: Object.keys(s.acc).length,
    })),
  );
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobile = variant === "mobile";

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const j = (next + TABS.length) % TABS.length;
    setTab(TABS[j].id);
    refs.current[j]?.focus();
  };

  return (
    <div role="tablist" aria-label="Product categories" className={`flex border-b border-line ${mobile ? "gap-1" : "gap-1.5"}`}>
      {TABS.map((t, i) => {
        const on = tab === t.id;
        const n = counts[t.id];
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(variant, t.id)}
            aria-selected={on}
            aria-controls={panelId(variant)}
            tabIndex={on ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`-mb-px flex items-center border-b-[2.5px] font-bold transition-colors ${
              on ? "border-ink text-ink" : "border-transparent text-subtle hover:text-ink"
            } ${mobile ? "flex-1 justify-center pb-2.5 pt-2 text-[13px]" : "gap-1.5 px-2.5 pb-3 pt-2.5 text-[15px]"}`}
          >
            {mobile ? t.short : t.label}
            {!mobile && (
              <span
                aria-label={`${n} selected`}
                className={`flex h-5 min-w-5 items-center justify-center rounded-[10px] px-1.5 text-[11px] ${
                  n ? "bg-brand-tint text-brand-hover" : "bg-fill text-subtle"
                }`}
              >
                {n}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
