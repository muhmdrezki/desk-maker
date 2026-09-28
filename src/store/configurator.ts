"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  DEFAULT_BUNDLE,
  DEFAULT_DESK,
  ITEMS,
  MAX_MONITORS,
  getBundle,
  type AccessoryId,
  type Billing,
  type BundleId,
  type Category,
  type DeskId,
  type ItemId,
  type MonitorId,
} from "@/lib/catalog";
import type { DeliveryDay, DeliverySlot } from "@/lib/delivery";
import { computeTotals, type Setup } from "@/lib/pricing";

export const TOAST_MS = 1700;

export interface ConfiguratorState extends Setup {
  /** Last loaded preset — drives the bundle discount check. */
  bundle: BundleId;
  billing: Billing;
  tab: Category;
  day: DeliveryDay;
  slot: DeliverySlot;
  booked: boolean;
  toast: string;
  /** Toast visibility is separate so the message stays put while it fades out. */
  toastOn: boolean;
  /** Bumped on every flash so repeated identical toasts re-announce. */
  toastId: number;
}

export interface ConfiguratorActions {
  loadBundle: (id: BundleId) => void;
  pickDesk: (id: DeskId) => void;
  toggleChair: () => void;
  addMonitor: (id: MonitorId) => void;
  removeMonitor: (id: MonitorId) => void;
  toggleAccessory: (id: AccessoryId) => void;
  /** Remove one line (setup chip "×" / checkout "Remove"). `index` targets a specific monitor. */
  removeItem: (id: ItemId, index?: number) => void;
  setBilling: (b: Billing) => void;
  setTab: (t: Category) => void;
  setDay: (d: DeliveryDay) => void;
  setSlot: (s: DeliverySlot) => void;
  rent: () => void;
  closeConfirmation: () => void;
  flash: (message: string) => void;
}

export type ConfiguratorStore = ConfiguratorState & ConfiguratorActions;

export function setupFromBundle(id: BundleId): Setup & { bundle: BundleId } {
  const b = getBundle(id);
  const s: Setup & { bundle: BundleId } = { desk: null, chair: false, monitors: [], acc: {}, bundle: b.id };
  for (const k of b.items) {
    const cat = ITEMS[k].cat;
    if (cat === "desk") s.desk = k as DeskId;
    else if (cat === "chair") s.chair = true;
    else if (cat === "mon") s.monitors.push(k as MonitorId);
    else s.acc[k as AccessoryId] = 1;
  }
  return s;
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const useConfigurator = create<ConfiguratorStore>()(
  persist(
    (set, get) => {
      const flash = (message: string) => {
        clearTimeout(toastTimer);
        set((s) => ({ toast: message, toastOn: true, toastId: s.toastId + 1 }));
        toastTimer = setTimeout(() => set({ toastOn: false }), TOAST_MS);
      };

      /** Monitors and accessories need somewhere to sit — auto-add the default desk. */
      const withDesk = (patch: Partial<ConfiguratorState>, added: string) => {
        if (!get().desk) {
          set({ ...patch, desk: DEFAULT_DESK });
          flash(`Added an ${ITEMS[DEFAULT_DESK].name} to put it on`);
        } else {
          set(patch);
          flash(`${added} added`);
        }
      };

      return {
        ...setupFromBundle(DEFAULT_BUNDLE),
        billing: "week",
        tab: "mon",
        day: "tomorrow",
        slot: "12–16",
        booked: false,
        toast: "",
        toastOn: false,
        toastId: 0,

        flash,

        loadBundle: (id) => {
          const b = getBundle(id);
          set(setupFromBundle(id));
          flash(b.items.length ? `${b.name} loaded. Make it yours.` : "Fresh start");
        },

        pickDesk: (id) => {
          if (get().desk === id) return;
          set({ desk: id });
          flash(`${ITEMS[id].name} in place`);
        },

        toggleChair: () => {
          if (get().chair) return set({ chair: false });
          set({ chair: true });
          flash(`${ITEMS.chair.name} added`);
        },

        addMonitor: (id) => {
          const { monitors } = get();
          if (monitors.length >= MAX_MONITORS) return flash("Two screens max per desk");
          withDesk({ monitors: [...monitors, id] }, ITEMS[id].name);
        },

        removeMonitor: (id) => {
          const monitors = [...get().monitors];
          const i = monitors.lastIndexOf(id);
          if (i < 0) return;
          monitors.splice(i, 1);
          set({ monitors });
        },

        toggleAccessory: (id) => {
          const acc = { ...get().acc };
          if (acc[id]) {
            delete acc[id];
            return set({ acc });
          }
          acc[id] = 1;
          withDesk({ acc }, ITEMS[id].name);
        },

        removeItem: (id, index = 0) => {
          const s = get();
          switch (ITEMS[id].cat) {
            case "desk":
              return set({ desk: null });
            case "chair":
              return set({ chair: false });
            case "mon": {
              const monitors = [...s.monitors];
              monitors.splice(index, 1);
              return set({ monitors });
            }
            case "acc": {
              const acc = { ...s.acc };
              delete acc[id as AccessoryId];
              return set({ acc });
            }
          }
        },

        setBilling: (billing) => set({ billing }),
        setTab: (tab) => set({ tab }),
        setDay: (day) => set({ day }),
        setSlot: (slot) => set({ slot }),
        rent: () => {
          const { desk, chair, monitors, acc } = get();
          if (desk || chair || monitors.length || Object.keys(acc).length) set({ booked: true });
        },
        closeConfirmation: () => set({ booked: false }),
      };
    },
    {
      name: "monis-workspace",
      storage: createJSONStorage(() => sessionStorage),
      // Rehydrated manually after mount (see <StoreHydrator/>) so SSR markup matches.
      skipHydration: true,
      partialize: ({ desk, chair, monitors, acc, bundle, billing, tab, day, slot }) => ({
        desk, chair, monitors, acc, bundle, billing, tab, day, slot,
      }),
    },
  ),
);

/** Derived: line items, counts, subtotal, bundle intact/missing, discount, total. */
export function useTotals() {
  const desk = useConfigurator((s) => s.desk);
  const chair = useConfigurator((s) => s.chair);
  const monitors = useConfigurator((s) => s.monitors);
  const acc = useConfigurator((s) => s.acc);
  const bundle = useConfigurator((s) => s.bundle);
  const billing = useConfigurator((s) => s.billing);
  return useMemo(
    () => computeTotals({ desk, chair, monitors, acc }, bundle, billing),
    [desk, chair, monitors, acc, bundle, billing],
  );
}

/** The four scene-relevant fields, for <Scene/>. */
export function useSetup(): Setup {
  const desk = useConfigurator((s) => s.desk);
  const chair = useConfigurator((s) => s.chair);
  const monitors = useConfigurator((s) => s.monitors);
  const acc = useConfigurator((s) => s.acc);
  return useMemo(() => ({ desk, chair, monitors, acc }), [desk, chair, monitors, acc]);
}
