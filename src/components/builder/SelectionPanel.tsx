"use client";

import { BillingToggle } from "@/components/ui/BillingToggle";
import { CategoryTabs, panelId, tabId } from "@/components/ui/CategoryTabs";
import { CATEGORY_ITEMS } from "@/lib/catalog";
import { useConfigurator } from "@/store/configurator";
import { ProductCard } from "./ProductCard";
import { SummaryBlock } from "./SummaryBlock";

export function SelectionPanel() {
  const tab = useConfigurator((s) => s.tab);

  return (
    <section aria-label="Customise your setup" className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <BillingToggle />
        <span className="rounded-full bg-save-bg px-3 py-[7px] text-[13px] font-extrabold text-save-text">Monthly saves ~30%</span>
      </div>
      <CategoryTabs />
      <div role="tabpanel" id={panelId("desktop")} aria-labelledby={tabId("desktop", tab)} className="grid grid-cols-2 gap-3">
        {CATEGORY_ITEMS[tab].map((id) => (
          <ProductCard key={id} id={id} />
        ))}
      </div>
      <SummaryBlock />
    </section>
  );
}
