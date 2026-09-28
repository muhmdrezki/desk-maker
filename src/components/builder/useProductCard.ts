"use client";

import type { MouseEvent } from "react";
import { ITEMS, priceFor, type AccessoryId, type DeskId, type ItemId, type MonitorId } from "@/lib/catalog";
import { fmt, perLabel } from "@/lib/pricing";
import { useConfigurator } from "@/store/configurator";

/** Per-card state + actions, mirroring the prototype's card() rules per category. */
export function useProductCard(id: ItemId) {
  const item = ITEMS[id];
  const billing = useConfigurator((s) => s.billing);
  const qty = useConfigurator((s) =>
    item.cat === "desk" ? (s.desk === id ? 1 : 0)
    : item.cat === "chair" ? (s.chair ? 1 : 0)
    : item.cat === "mon" ? s.monitors.filter((m) => m === id).length
    : s.acc[id as AccessoryId] ? 1 : 0,
  );
  const pickDesk = useConfigurator((s) => s.pickDesk);
  const toggleChair = useConfigurator((s) => s.toggleChair);
  const addMonitor = useConfigurator((s) => s.addMonitor);
  const removeMonitor = useConfigurator((s) => s.removeMonitor);
  const toggleAccessory = useConfigurator((s) => s.toggleAccessory);

  const on = qty > 0;
  const isMonitor = item.cat === "mon";

  /** Card click / main button: desk selects, chair + accessories toggle, monitors add. */
  const pick = () => {
    if (item.cat === "desk") pickDesk(id as DeskId);
    else if (item.cat === "chair") toggleChair();
    else if (isMonitor) addMonitor(id as MonitorId);
    else toggleAccessory(id as AccessoryId);
  };

  const stop = (fn: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  const btnLabel =
    item.cat === "desk" ? (on ? "✓ Selected" : "Select")
    : isMonitor ? "+ Add"
    : on ? "✓ Added" : "+ Add";

  const ariaLabel =
    item.cat === "desk" ? (on ? `${item.name} selected` : `Select ${item.name}`)
    : isMonitor ? `Add ${item.name}`
    : on ? `Remove ${item.name}` : `Add ${item.name}`;

  return {
    item,
    qty,
    on,
    isMonitor,
    /** Monitors show a −/+ stepper once added. */
    showStepper: isMonitor && on,
    price: fmt(priceFor(id, billing)),
    per: perLabel(billing),
    btnLabel,
    ariaLabel,
    /** Desks and toggles expose pressed state; monitor "Add" is a plain action. */
    pressed: isMonitor ? undefined : on,
    pick,
    onPickClick: stop(pick),
    onInc: stop(() => addMonitor(id as MonitorId)),
    onDec: stop(() => removeMonitor(id as MonitorId)),
  };
}
