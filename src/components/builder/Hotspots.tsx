"use client";

import { useConfigurator } from "@/store/configurator";

interface Hotspot {
  label: string;
  /** Position as % of the scene. */
  x: number;
  y: number;
  onClick: () => void;
}

/** Contextual "+" chips on the preview — only shown while their slot is empty. */
export function Hotspots() {
  const desk = useConfigurator((s) => s.desk);
  const chair = useConfigurator((s) => s.chair);
  const monitorCount = useConfigurator((s) => s.monitors.length);
  const hasLamp = useConfigurator((s) => !!s.acc.lamp);
  const { pickDesk, addMonitor, toggleChair, toggleAccessory } = useConfigurator.getState();

  const spots: Hotspot[] = [];
  if (!desk) spots.push({ label: "Pick a desk", x: 40, y: 62, onClick: () => pickDesk("desk_electric") });
  if (monitorCount === 0) spots.push({ label: "Add a monitor", x: 41, y: 26, onClick: () => addMonitor("mon27") });
  else if (monitorCount === 1) spots.push({ label: "Second screen", x: 62, y: 24, onClick: () => addMonitor("mon24") });
  if (!chair) spots.push({ label: "Add a chair", x: 43, y: 74, onClick: toggleChair });
  if (!hasLamp) spots.push({ label: "Desk lamp", x: 71, y: 42, onClick: () => toggleAccessory("lamp") });

  return spots.map((h) => (
    <button
      key={h.label}
      type="button"
      onClick={h.onClick}
      className="absolute flex items-center gap-[7px] whitespace-nowrap rounded-full bg-white py-[7px] pl-[7px] pr-3.5 text-[13px] font-bold shadow-chip transition-transform duration-200 ease-pop hover:scale-[1.06]"
      style={{ left: `${h.x}%`, top: `${h.y}%` }}
    >
      <span aria-hidden="true" className="flex size-[22px] items-center justify-center rounded-full bg-brand text-base leading-none text-white">
        +
      </span>
      {h.label}
    </button>
  ));
}
