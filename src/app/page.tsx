import { BuilderDesktop } from "@/components/builder/BuilderDesktop";
import { BuilderMobile } from "@/components/builder/BuilderMobile";
import { SiteNav } from "@/components/layout/SiteNav";
import { StoreHydrator } from "@/store/StoreHydrator";

export default function BuilderPage() {
  return (
    <>
      <StoreHydrator />
      <SiteNav />
      <main>
        <BuilderDesktop />
        <BuilderMobile />
      </main>
    </>
  );
}
