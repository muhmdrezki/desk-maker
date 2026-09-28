"use client";

import { Scene } from "@/components/scene/Scene";
import { BillingToggle } from "@/components/ui/BillingToggle";
import { CategoryTabs, panelId, tabId } from "@/components/ui/CategoryTabs";
import { Toast } from "@/components/ui/Toast";
import { CATEGORY_ITEMS } from "@/lib/catalog";
import { fmt, perLabel } from "@/lib/pricing";
import { useConfigurator, useSetup, useTotals } from "@/store/configurator";
import { BundlePicker } from "./BundlePicker";
import { ProductCardMobile } from "./ProductCardMobile";
import { RentCta } from "./RentCta";
import { SetupChips } from "./SetupChips";

/** Mobile builder (<1024px): stacked scene, scrolling bundles + cards, sticky rent bar. */
export function BuilderMobile() {
  const setup = useSetup();
  const tab = useConfigurator((s) => s.tab);
  const billing = useConfigurator((s) => s.billing);
  const { count, total } = useTotals();

  return (
    <div className="lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col gap-3 px-3.5 pb-[170px] pt-3.5">
        <h1 className="text-[26px] font-extrabold tracking-[-.03em]">Build your workspace</h1>
        <div className="relative overflow-hidden rounded-[18px] border border-line">
          <Scene setup={setup} assemble />
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white/92 px-2.5 py-[5px] text-xs font-bold">{count} items</span>
          <Toast compact />
        </div>
        <SetupChips variant="mobile" />
        <BundlePicker variant="mobile" />
        <CategoryTabs variant="mobile" />
        <div
          role="tabpanel"
          id={panelId("mobile")}
          aria-labelledby={tabId("mobile", tab)}
          className="no-scrollbar -mx-3.5 flex gap-2.5 overflow-x-auto px-3.5 pb-1"
        >
          {CATEGORY_ITEMS[tab].map((id) => (
            <ProductCardMobile key={id} id={id} />
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-xl flex-col gap-3 px-4 pt-3.5">
          <div className="flex items-center justify-between gap-2">
            <BillingToggle size="sm" />
            <span className="rounded-full bg-save-bg px-2.5 py-[5px] text-xs font-extrabold text-save-text">Save ~30% monthly</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-subtle">{count} items</span>
              <span className="text-[26px] font-extrabold leading-none tracking-[-.03em]" aria-live="polite">
                {fmt(total)}
                <span className="text-[13px] text-subtle">{perLabel(billing)}</span>
              </span>
            </div>
            <RentCta className="h-[52px] flex-1 rounded-[14px] text-base">Rent Your Setup</RentCta>
          </div>
        </div>
      </div>
    </div>
  );
}
