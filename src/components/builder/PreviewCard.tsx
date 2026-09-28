"use client";

import { Scene } from "@/components/scene/Scene";
import { Toast } from "@/components/ui/Toast";
import { useSetup, useTotals } from "@/store/configurator";
import { Hotspots } from "./Hotspots";
import { SetupChips } from "./SetupChips";

const overlayPill = "absolute top-4 flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[13px] font-bold";

export function PreviewCard({ showHotspots = true }: { showHotspots?: boolean }) {
  const setup = useSetup();
  const { count } = useTotals();

  return (
    <section aria-label="Live preview" className="flex flex-col gap-3.5 rounded-3xl border border-line bg-white p-3">
      <div className="relative overflow-hidden rounded-2xl">
        <Scene setup={setup} assemble />
        <div className={`${overlayPill} left-4`}>
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-dot" />
          Live preview
        </div>
        <div className={`${overlayPill} right-4`}>{count} items</div>
        {showHotspots && <Hotspots />}
        <Toast />
      </div>
      <SetupChips />
    </section>
  );
}
