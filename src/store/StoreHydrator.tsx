"use client";

import { useEffect } from "react";
import { useConfigurator } from "./configurator";

/** Restores the saved setup from sessionStorage after hydration (keeps SSR markup deterministic). */
export function StoreHydrator() {
  useEffect(() => {
    void useConfigurator.persist.rehydrate();
  }, []);
  return null;
}
