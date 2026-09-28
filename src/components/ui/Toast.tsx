"use client";

import { useConfigurator } from "@/store/configurator";

/** Scene toast: fades/slides up, auto-hides after 1.7s (timer lives in the store). */
export function Toast({ compact = false }: { compact?: boolean }) {
  const toast = useConfigurator((s) => s.toast);
  const on = useConfigurator((s) => s.toastOn);
  const id = useConfigurator((s) => s.toastId);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none absolute left-1/2 max-w-[calc(100%-24px)] truncate rounded-full bg-ink font-semibold text-white transition-[opacity,transform] [transition-duration:250ms,400ms] [transition-timing-function:ease,cubic-bezier(.34,1.56,.64,1)] ${
        compact ? "bottom-3 px-3.5 py-2 text-xs" : "bottom-[18px] px-[18px] py-[11px] text-sm"
      }`}
      style={{ opacity: on ? 1 : 0, transform: `translateX(-50%) translateY(${on ? 0 : 16}px)` }}
    >
      <span key={id}>{toast}</span>
    </div>
  );
}
