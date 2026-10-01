import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSitemap, publicRoutes } from "./generate-sitemap.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const readPage = name => readFileSync(path.join(root, "client/src/pages", `${name}.tsx`), "utf8");

describe("public XML sitemap", () => {
  it("discovers every real, indexable public Wouter route from its page source", () => {
    expect(publicRoutes(app, readPage)).toEqual(["/", "/products", "/services", "/solutions", "/contact"]);
  });

  it("excludes noindex routes and rejects routes with missing SEO or duplicate paths", () => {
    const testApp = '<Route path={"/private"} component={() => <Layout><Private /></Layout>} />';
    expect(publicRoutes(testApp, () => '<SEO path="/private" robots="noindex, follow" />')).toEqual([]);
    expect(() => publicRoutes(testApp, () => '<SEO path="/wrong" />')).toThrow(/matching/);
    expect(() => publicRoutes(testApp + testApp, () => '<SEO path="/private" />')).toThrow(/Duplicate/);
  });

  it("emits only unique HTTPS www canonical production URLs using the XML protocol", () => {
    const xml = buildSitemap(publicRoutes(app, readPage));
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    expect(urls).toHaveLength(5);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every(url => url.startsWith("https://www.hlssecurity.co/"))).toBe(true);
    expect(urls.some(url => /localhost|\/404|\/api|\/test|\/admin|\?/.test(url))).toBe(false);
    expect(xml).not.toContain("<priority>");
    expect(xml).not.toContain("<lastmod>");
  });

  it("keeps the committed sitemap in sync with the source-of-truth routes", () => {
    const committed = readFileSync(path.join(root, "client/public/sitemap.xml"), "utf8");
    expect(committed).toBe(buildSitemap(publicRoutes(app, readPage)));
  });
});
