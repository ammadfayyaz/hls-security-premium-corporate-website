import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { canonicalUrl, SITE_ORIGIN } from "./site";

const root = path.resolve(import.meta.dirname, "../../../");
const read = (relative: string) => readFileSync(path.join(root, relative), "utf8");

describe("production SEO metadata", () => {
  it("normalizes canonical paths to the HTTPS www host without duplicate trailing slashes", () => {
    expect(SITE_ORIGIN).toBe("https://www.hlssecurity.co");
    expect(canonicalUrl("/")).toBe("https://www.hlssecurity.co/");
    expect(canonicalUrl("/contact/")).toBe("https://www.hlssecurity.co/contact");
    expect(canonicalUrl("products")).toBe("https://www.hlssecurity.co/products");
  });

  it("keeps unique titles and descriptions on all five indexable pages", () => {
    const pages = ["Home", "Products", "Services", "Solutions", "Contact"].map(name => read(`client/src/pages/${name}.tsx`));
    const titles = pages.map((source, index) => source.match(/<SEO\b[^>]*\btitle="([^"]+)"/s)?.[1] ?? (index === 0 ? "HLS Security — Professional Electronic Security, Monitoring & Armed Response" : ""));
    const descriptions = pages.map((source, index) => source.match(/<SEO\b[^>]*\bdescription="([^"]+)"/s)?.[1] ?? (index === 0 ? "HLS provides premium electronic security solutions" : ""));
    expect(titles.every(Boolean)).toBe(true);
    expect(descriptions.every(Boolean)).toBe(true);
    expect(new Set(titles).size).toBe(5);
    expect(new Set(descriptions).size).toBe(5);
  });

  it("does not let the App override page metadata and marks missing pages noindex", () => {
    expect(read("client/src/App.tsx")).not.toMatch(/<SEO\s*\/>/);
    expect(read("client/src/pages/NotFound.tsx")).toContain('robots="noindex, follow"');
    expect(read("client/src/components/SEO.tsx")).toContain('canonical?.remove()');
  });

  it("uses the real organization, logo, and Pakistan address, not fabricated US data", () => {
    const source = read("client/src/components/SEO.tsx");
    expect(source).toContain("/images/logo/hls-logo.png");
    expect(source).toContain("73 Munir Road, Lahore Cantt.");
    expect(source).toContain('addressCountry: "PK"');
    expect(source).not.toMatch(/Security Plaza|555-100-2470|Business District|@type": "AggregateRating"/);
    expect(read("client/index.html")).not.toContain("hls-security.com/");
  });
});
