import Link from "next/link";

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <Link href="/" aria-label="monis.rent home" className="font-extrabold tracking-[-.04em] text-ink" style={{ fontSize: size }}>
      monis<span className="text-brand">.rent</span>
    </Link>
  );
}
