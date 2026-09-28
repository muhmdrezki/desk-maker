"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Scene } from "@/components/scene/Scene";
import { deliveryWhen, seeYou } from "@/lib/delivery";
import { useDeliveryDates } from "@/lib/useDeliveryDates";
import { useConfigurator, useSetup } from "@/store/configurator";

const CONFETTI_COLORS = ["#0E6B53", "#FF7A45", "#16A34A", "#F6C453", "#121417"];
const ORDER_ID = "MR-48213";

/** 44 pieces, deterministic spread + staggered 2–4s falls (same recipe as the prototype). */
function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 44 }, (_, i) => (
        <div
          key={i}
          className="absolute -top-5 w-[9px]"
          style={{
            left: `${(i * 37) % 100}%`,
            height: i % 3 ? 14 : 9,
            borderRadius: i % 3 ? 2 : "50%",
            background: CONFETTI_COLORS[i % 5],
            animation: `fall ${2 + (i % 7) * 0.3}s ${(i % 9) * 0.1}s cubic-bezier(.3,.6,.5,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}

/** Street line for the copy, e.g. "Villa Kayu 3" from "Villa Kayu 3, Jl. Pantai Berawa, Canggu". */
const place = (address: string) => address.split(",")[0].trim() || "your place";

export function Confirmation({ address }: { address: string }) {
  const booked = useConfigurator((s) => s.booked);
  const close = useConfigurator((s) => s.closeConfirmation);
  const day = useConfigurator((s) => s.day);
  const slot = useConfigurator((s) => s.slot);
  const setup = useSetup();
  const dates = useDeliveryDates();
  const router = useRouter();
  const primary = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!booked) return;
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [booked, close]);

  const backToBuilder = () => {
    close();
    router.push("/");
  };

  return (
    <AnimatePresence>
      {booked && (
        <motion.div
          key="overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-body"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(246,245,241,.9)] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <Confetti />
          <motion.div
            className="relative my-auto flex w-full max-w-[600px] flex-col items-center gap-[18px] rounded-4xl bg-white p-6 text-center shadow-modal sm:p-10"
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div aria-hidden="true" className="flex size-[68px] items-center justify-center rounded-full bg-brand">
              <div className="h-[15px] w-7 -translate-y-[3px] -rotate-45 border-b-[5px] border-l-[5px] border-white" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-bold uppercase tracking-[.06em] text-subtle">Order {ORDER_ID}</p>
              <h2 id="confirm-title" className="text-[30px] font-extrabold leading-[1.05] tracking-[-.03em] sm:text-[40px]">
                You&apos;re all set. See you {seeYou(day, dates)}.
              </h2>
            </div>
            <p id="confirm-body" className="max-w-[440px] text-base leading-normal text-muted">
              Our team arrives {deliveryWhen(day, slot, dates)} at {place(address)} and sets everything up. You just plug in your laptop.
            </p>
            <div className="w-full overflow-hidden rounded-[18px] border border-line">
              <Scene setup={setup} />
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              <a
                ref={primary}
                href="https://monis.rent"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[14px] bg-brand px-[22px] py-3.5 text-[15px] font-extrabold text-white transition-colors hover:bg-brand-hover"
              >
                Track delivery
              </a>
              <button
                type="button"
                onClick={backToBuilder}
                className="rounded-[14px] bg-fill px-[22px] py-3.5 text-[15px] font-extrabold transition-colors hover:bg-line"
              >
                Back to builder
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
