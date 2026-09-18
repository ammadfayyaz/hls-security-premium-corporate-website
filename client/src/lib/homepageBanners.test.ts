import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(
  new URL("../pages/Home.tsx", import.meta.url),
  "utf8",
);

describe("homepage responsive banners", () => {
  it("uses dedicated desktop and mobile assets for the protection banner", () => {
    expect(homeSource).toContain(
      'src="/images/banners/hls-what-we-protect-banner.webp"',
    );
    expect(homeSource).toContain(
      'src="/images/banners/hls-what-we-protect-banner-mobile.webp"',
    );
    expect(homeSource).toContain(
      'className="hidden md:block w-full h-auto rounded-2xl border border-white/10 shadow-2xl"',
    );
    expect(homeSource).toContain(
      'className="block md:hidden w-full h-auto rounded-2xl border border-white/10 shadow-2xl"',
    );
  });

  it("places the protection banner after core services and before operational procedure", () => {
    const coreServicesIndex = homeSource.indexOf("Our Core Services");
    const protectionBannerIndex = homeSource.indexOf(
      "What We Protect Against Banner",
    );
    const operationalBannerIndex = homeSource.indexOf(
      "Operational Procedure Banner",
    );

    expect(coreServicesIndex).toBeGreaterThan(-1);
    expect(protectionBannerIndex).toBeGreaterThan(coreServicesIndex);
    expect(operationalBannerIndex).toBeGreaterThan(protectionBannerIndex);
  });
});
