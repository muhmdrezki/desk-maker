"use client";

import Link from "next/link";
import { useTotals } from "@/store/configurator";

/** "Rent Your Setup" → checkout. Rendered as a disabled button when the setup is empty. */
export function RentCta({ className, children }: { className: string; children: React.ReactNode }) {
  const { count } = useTotals();
  const base = `flex items-center justify-center font-extrabold text-white transition-[background-color,transform] duration-200 ${className}`;

  if (count === 0) {
    return (
      <button type="button" disabled className={`${base} cursor-not-allowed bg-brand/40`}>
        {children}
      </button>
    );
  }
  return (
    <Link href="/checkout" className={`${base} bg-brand hover:bg-brand-hover active:scale-[.98]`}>
      {children}
    </Link>
  );
}
