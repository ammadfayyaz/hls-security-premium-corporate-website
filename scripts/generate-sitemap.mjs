import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://www.hlssecurity.co";

/** Only explicit routes count; Wouter's catch-all and 404 are not indexable pages. */
export function publicRoutes(appSource, readPage) {
  const matches = [...appSource.matchAll(/<Route\s+path=\{["'](\/[a-z0-9/-]*)["']\}\s+component=\{\(\)\s*=>\s*<Layout><(\w+)\s*\/>/g)];
  if (!matches.length) throw new Error("No public routes found in App.tsx");
  const routes = matches.map(([, route, component]) => {
    const source = readPage(component);
    if (!source) throw new Error(`No page source found for public route ${route} (${component})`);
    const declaredPath = source.match(/<SEO\b[^>]*\bpath=["']([^"']+)["']/s)?.[1];
    if (declaredPath !== route) {
      throw new Error(`Route ${route} must declare matching <SEO path=\"${route}\"> in ${component}`);
    }
    if (/<SEO\b[^>]*\brobots=["'][^"']*\bnoindex\b/i.test(source)) return null;
    if (/\/(?:api|admin|login|auth|internal|test|404)(?:\/|$)/i.test(route)) return null;
    return route;
  }).filter(Boolean);
  if (new Set(routes).size !== routes.length) throw new Error("Duplicate public routes in App.tsx");
  return routes;
}

export function buildSitemap(routes) {
  const escapeXml = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(route => `  <url><loc>${escapeXml(origin + route)}</loc></url>`),
    '</urlset>',
    '',
  ].join("\n");
}

export function generateSitemap() {
  const appSource = readFileSync(path.join(projectRoot, "client/src/App.tsx"), "utf8");
  const routes = publicRoutes(appSource, component => readFileSync(path.join(projectRoot, "client/src/pages", `${component}.tsx`), "utf8"));
  const output = path.join(projectRoot, "client/public/sitemap.xml");
  const xml = buildSitemap(routes);
  writeFileSync(output, xml, "utf8");
  console.log(`Generated ${output} with ${routes.length} public URLs: ${routes.join(", ")}`);
  return routes;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
