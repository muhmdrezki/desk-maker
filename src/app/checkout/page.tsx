import type { Metadata } from "next";
import Link from "next/link";
import { Checkout } from "@/components/checkout/Checkout";
import { Logo } from "@/components/layout/Logo";
import { StoreHydrator } from "@/store/StoreHydrator";

export const metadata: Metadata = {
  title: "Your setup · monis.rent",
};

export default function CheckoutPage() {
  return (
    <>
      <StoreHydrator />
      <header className="border-b border-line bg-white">
        <div className="mx-auto hidden max-w-[1440px] items-center gap-5 px-10 py-4 lg:flex">
          <Logo />
          <div className="flex-1" />
          <Link href="/" className="text-[15px] font-bold text-brand hover:text-brand-hover">
            ← Back to builder
          </Link>
        </div>
        <div className="flex items-center gap-2.5 px-[18px] py-3 lg:hidden">
          <Link href="/" aria-label="Back to builder" className="text-lg font-bold">
            ←
          </Link>
          <p className="text-[17px] font-extrabold">Your setup</p>
        </div>
      </header>
      <main>
        <Checkout />
      </main>
    </>
  );
}
