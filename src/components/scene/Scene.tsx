"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ItemArt } from "@/components/art/ItemArt";
import type { ArtId, MonitorId } from "@/lib/catalog";
import { describeSetup, type Setup } from "@/lib/pricing";
import { Room } from "./Room";

/** Logical canvas; the scene scales to its container width. */
const W = 800;
const H = 520;
/** Desk top surface — monitors sit on it. */
const SURFACE = 270;
const MON_GAP = 14;
const MON_SIZE: Record<MonitorId, [w: number, h: number]> = {
  mon24: [150, 118],
  mon27: [176, 132],
  mon34: [230, 130],
};

const POP: Transition["ease"] = [0.34, 1.56, 0.64, 1];
const ITEM_TRANSITION: Transition = {
  opacity: { duration: 0.35, ease: "easeInOut" },
  y: { duration: 0.5, ease: POP },
  scale: { duration: 0.5, ease: POP },
  left: { duration: 0.45, ease: "easeInOut" },
  top: { duration: 0.3, ease: "easeInOut" },
};
const HIDDEN = { opacity: 0, y: -26, scale: 0.85 };
const SHOWN = { opacity: 1, y: 0, scale: 1 };

/** A scene layer that fades + drops in when it mounts and reverses when it leaves. */
function Layer({ x, y, children, origin = "50% 100%" }: { x: number; y: number; children: ReactNode; origin?: string }) {
  return (
    <motion.div
      className="absolute"
      style={{ transformOrigin: origin }}
      initial={{ ...HIDDEN, left: x, top: y }}
      animate={{ ...SHOWN, left: x, top: y }}
      exit={HIDDEN}
      transition={ITEM_TRANSITION}
    >
      {children}
    </motion.div>
  );
}

function Shadow({ style }: { style: CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-[50%]"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    />
  );
}

/** Monitors: 1 centred on x=400; 2 side by side with a 14px gap, group centred; bottoms on the desk. */
function monitorSlots(monitors: MonitorId[]) {
  const total = monitors.reduce((s, m) => s + MON_SIZE[m][0], 0) + (monitors.length > 1 ? MON_GAP : 0);
  let x = W / 2 - total / 2;
  return monitors.map((id) => {
    const [w, h] = MON_SIZE[id];
    const slot = { id, left: x, top: SURFACE - h, w, h };
    x += w + MON_GAP;
    return slot;
  });
}

function useScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      if (w) setScale(w / W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, scale] as const;
}

interface SceneProps {
  setup: Setup;
  /** Animate the items in on first mount (main preview). Thumbnails render settled. */
  assemble?: boolean;
  className?: string;
}

/**
 * Live preview scene, ported from design-reference/"Tech Scene.dc.html".
 * Layer order (back → front): room, floor shadow, plant, power strip, desk,
 * monitor slots, light bar, laptop stand, lamp, keyboard, mouse, chair shadow, chair.
 */
export function Scene({ setup, assemble = false, className = "" }: SceneProps) {
  const [ref, scale] = useScale();
  const { desk, chair, monitors, acc } = setup;
  const slots = monitorSlots(monitors);
  const first = slots[0];
  const at = (id: ArtId, x: number, y: number, show: boolean) =>
    show && (
      <Layer key={id} x={x} y={y}>
        <ItemArt id={id} />
      </Layer>
    );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={describeSetup(setup)}
      className={`relative w-full overflow-hidden bg-[#F3EEE7] ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale ?? 1})`, visibility: scale ? "visible" : "hidden" }}
      >
        <Room />
        <AnimatePresence initial={assemble}>
          {desk && <Shadow key="desk-shadow" style={{ left: 150, top: 432, width: 500, height: 22, background: "rgba(80,55,30,.12)" }} />}
        </AnimatePresence>

        <div className="absolute" style={{ left: 668, top: 250 }}>
          <ItemArt id="plant" />
        </div>

        <AnimatePresence initial={assemble}>
          {at("power", 470, 418, !!acc.power)}
          {at(desk ?? "desk_electric", 160, 270, !!desk)}
          {slots.map((s, i) => (
            <Layer key={`mon-slot-${i}`} x={s.left} y={s.top}>
              <ItemArt id={s.id} />
            </Layer>
          ))}
          {first && acc.lightbar && (
            <Layer key="lightbar" x={first.left + first.w / 2 - 60} y={SURFACE - first.h - 6} origin="50% 50%">
              <ItemArt id="lightbar" />
            </Layer>
          )}
          {at("laptopstand", 170, 184, !!acc.laptopstand)}
          {at("lamp", 548, 130, !!acc.lamp)}
          {at("keyboard", 330, 258, !!acc.keyboard)}
          {at("mouse", 468, 257, !!acc.mouse)}
          {chair && <Shadow key="chair-shadow" style={{ left: 300, top: 500, width: 200, height: 18, background: "rgba(80,55,30,.14)" }} />}
          {at("chair", 315, 280, chair)}
        </AnimatePresence>
      </div>
    </div>
  );
}
