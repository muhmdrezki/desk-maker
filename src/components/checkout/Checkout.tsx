"use client";

import { useState } from "react";
import { Scene } from "@/components/scene/Scene";
import { BillingToggle } from "@/components/ui/BillingToggle";
import { bundleLabel } from "@/lib/catalog";
import { deliveryShort, deliveryWhen } from "@/lib/delivery";
import { billingWord, fmt, perLabel } from "@/lib/pricing";
import { useDeliveryDates } from "@/lib/useDeliveryDates";
import { useConfigurator, useSetup, useTotals } from "@/store/configurator";
import { Confirmation } from "./Confirmation";
import { DeliveryPicker } from "./DeliveryPicker";
import { LineItems } from "./LineItems";

const DEFAULT_ADDRESS = "Villa Kayu 3, Jl. Pantai Berawa, Canggu";

function RentButton({ className }: { className: string }) {
  const rent = useConfigurator((s) => s.rent);
  const { count } = useTotals();
  return (
    <button
      type="button"
      onClick={rent}
      disabled={count === 0}
      className={`flex items-center justify-center font-extrabold text-white transition-[background-color,transform] duration-200 enabled:bg-brand enabled:hover:bg-brand-hover enabled:active:scale-[.98] disabled:cursor-not-allowed disabled:bg-brand/40 ${className}`}
    >
      Rent this setup
    </button>
  );
}

function useWhen() {
  const dates = useDeliveryDates();
  const day = useConfigurator((s) => s.day);
  const slot = useConfigurator((s) => s.slot);
  return { when: deliveryWhen(day, slot, dates), short: deliveryShort(day, slot, dates) };
}

const STEPS = (when: string) => [
  `We deliver ${when} and set everything up.`,
  "Swap or add gear anytime from your account.",
  "Leaving Bali? We pick it all up, no fee.",
];

function CheckoutDesktop({ address, setAddress }: { address: string; setAddress: (v: string) => void }) {
  const setup = useSetup();
  const billing = useConfigurator((s) => s.billing);
  const t = useTotals();
  const { when } = useWhen();
  const per = perLabel(billing);

  return (
    <div className="mx-auto hidden max-w-[1440px] grid-cols-[minmax(0,1fr)_500px] items-start gap-6 px-10 pb-12 pt-8 lg:grid">
      <div className="flex flex-col gap-5">
        <h1 className="text-[44px] font-extrabold leading-none tracking-[-.04em]">Your setup</h1>
        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start gap-5">
          <div className="overflow-hidden rounded-[20px] border border-line">
            <Scene setup={setup} />
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] border border-line bg-white p-5">
            <h2 className="text-[15px] font-extrabold">What happens next</h2>
            <ol className="flex flex-col gap-3">
              {STEPS(when).map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex size-[26px] flex-none items-center justify-center rounded-full bg-brand-tint text-[13px] font-extrabold text-brand-hover">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-[1.45] text-body">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <LineItems />
      </div>

      <section aria-label="Order summary" className="flex flex-col gap-[18px] rounded-3xl border border-line bg-white p-6">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-sm font-extrabold">Billing</h2>
          <BillingToggle size="md" showNote />
        </div>
        <DeliveryPicker address={address} onAddressChange={setAddress} />
        <dl className="flex flex-col gap-[9px] pt-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal · {t.count} items</dt>
            <dd className="font-bold">{fmt(t.subtotal)}</dd>
          </div>
          {t.intact && (
            <div className="flex justify-between font-bold text-brand-hover">
              <dt>{bundleLabel(t.bundle)} bundle −20%</dt>
              <dd>−{fmt(t.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted">Delivery, setup &amp; pickup</dt>
            <dd className="font-bold text-brand-hover">Free</dd>
          </div>
          <div aria-hidden="true" className="my-1 h-px bg-line" />
          <div className="flex items-baseline justify-between">
            <dt className="text-base font-extrabold">Total {billingWord(billing)}</dt>
            <dd className="text-[34px] font-extrabold tracking-[-.03em]" aria-live="polite">
              {fmt(t.total)}
              <span className="text-[15px] text-subtle">{per}</span>
            </dd>
          </div>
        </dl>
        <RentButton className="h-[58px] rounded-[14px] text-[17px]" />
        <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-brand-hover">
          <span aria-hidden="true" className="size-2 rounded-full bg-brand-dot" />
          Arrives {when}
        </p>
      </section>
    </div>
  );
}

function CheckoutMobile() {
  const billing = useConfigurator((s) => s.billing);
  const t = useTotals();
  const { short } = useWhen();

  return (
    <div className="lg:hidden">
      <div className="mx-auto flex max-w-xl flex-col gap-3 px-3.5 pb-[150px] pt-3.5">
        <h1 className="sr-only">Your setup</h1>
        <LineItems variant="mobile" />
        <dl className="flex flex-col gap-2 rounded-[18px] border border-line bg-white p-3.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="font-bold">{short}</dd>
          </div>
          {t.intact && (
            <div className="flex justify-between font-bold text-brand-hover">
              <dt>Bundle −20%</dt>
              <dd>−{fmt(t.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted">Setup &amp; pickup</dt>
            <dd className="font-bold text-brand-hover">Free</dd>
          </div>
        </dl>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white pb-[max(20px,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-xl flex-col gap-3 px-4 pt-3.5">
          <p className="flex items-baseline justify-between">
            <span className="text-[15px] font-extrabold">Total {billingWord(billing)}</span>
            <span className="text-[26px] font-extrabold tracking-[-.03em]" aria-live="polite">
              {fmt(t.total)}
              <span className="text-[13px] text-subtle">{perLabel(billing)}</span>
            </span>
          </p>
          <RentButton className="h-[52px] rounded-[14px] text-base" />
        </div>
      </div>
    </div>
  );
}

export function Checkout() {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  return (
    <>
      <CheckoutDesktop address={address} setAddress={setAddress} />
      <CheckoutMobile />
      <Confirmation address={address} />
    </>
  );
}
