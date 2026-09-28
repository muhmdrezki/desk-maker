import { Logo } from "./Logo";
import { CartButton, DeliveryDateValue } from "./NavBits";

const NAV = [
  { label: "All products", href: "https://monis.rent" },
  { label: "Bundles", href: "#bundles" },
  { label: "How it works", href: "https://monis.rent" },
];

const Pill = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <p className="flex items-center gap-2 rounded-xl bg-fill px-3.5 py-[9px] text-sm">
    <span className="text-subtle">{label}</span>
    <span className="font-bold">{children}</span>
  </p>
);

/** Builder top nav (desktop) and compact header (mobile). */
export function SiteNav() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto hidden max-w-[1440px] items-center gap-5 px-10 py-4 lg:flex">
        <Logo />
        <Pill label="Deliver to">Canggu, Bali</Pill>
        <Pill label="Delivery">
          <DeliveryDateValue />
        </Pill>
        <div className="flex-1" />
        <nav aria-label="Main" className="flex gap-7 text-[15px] font-semibold text-body">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="transition-colors hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>
        <CartButton />
      </div>
      <div className="flex items-center justify-between px-[18px] py-3 lg:hidden">
        <Logo size={20} />
        <span className="rounded-full bg-brand-tint px-2.5 py-1.5 text-xs font-bold text-brand-hover">Next-day delivery</span>
      </div>
    </header>
  );
}
