import { BundlePicker } from "./BundlePicker";
import { PreviewCard } from "./PreviewCard";
import { SelectionPanel } from "./SelectionPanel";

/** Desktop builder (≥1024px). Server component; interactive pieces are client islands. */
export function BuilderDesktop() {
  return (
    <div className="mx-auto hidden max-w-[1440px] flex-col gap-6 px-10 pb-10 pt-8 lg:flex">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <p className="flex items-center gap-2">
            <span className="rounded-full bg-ink px-2.5 py-[5px] text-xs font-bold text-white">New</span>
            <span className="text-sm font-semibold text-brand">Workspace Builder</span>
          </p>
          <h1 className="text-[52px] font-extrabold leading-none tracking-[-.04em]">Build your workspace</h1>
          <p className="text-[17px] text-muted">
            Start from a bundle, make it yours, and we&apos;ll set it all up at your place tomorrow.
          </p>
        </div>
        <div className="flex flex-none gap-2.5">
          <p className="flex items-center gap-2 rounded-xl bg-brand-tint px-3.5 py-2.5 text-sm font-bold text-brand-hover">
            <span aria-hidden="true" className="size-2 rounded-full bg-brand-dot" />
            Next-day delivery
          </p>
          <p className="flex items-center rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold">
            Setup &amp; pickup included
          </p>
        </div>
      </div>
      <div id="bundles" className="scroll-mt-6">
        <BundlePicker />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_480px] items-start gap-6">
        <PreviewCard />
        <SelectionPanel />
      </div>
    </div>
  );
}
