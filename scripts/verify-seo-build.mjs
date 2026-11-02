import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist/public");
const origin = "https://www.hlssecurity.co";
const xml = readFileSync(path.join(output, "sitemap.xml"), "utf8");
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
const host = process.argv[2];
const results = [];
const titles = new Set();
const descriptions = new Set();
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const redirects = readFileSync(path.join(output, '_redirects'), 'utf8');
for (const line of redirects.split('\n')) {
  const [from, to, status] = line.trim().split(/\s+/);
  if (/^30[12]/.test(status || '')) {
    const normalize = value => value.replace(/\/+$/, '') || '/';
    assert(normalize(from) !== normalize(to), `Netlify normalized self-redirect: ${line}`);
  }
}

for (const route of routes) {
  const filename = path.join(output, route === "/" ? "index.html" : `seo${route}.html`);
  const html = readFileSync(filename, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && description, `Missing metadata: ${route}`);
  assert(!titles.has(title) && !descriptions.has(description), `Duplicate metadata: ${route}`);
  titles.add(title); descriptions.add(description);
  assert((html.match(/<h1\b/g) || []).length === 1, `H1 count: ${route}`);
  assert(html.includes(`rel="canonical" href="${origin}${route}"`), `Canonical mismatch: ${route}`);
  assert(html.includes('name="robots" content="index, follow"'), `Indexability: ${route}`);
  assert(html.includes('data-prerendered="true"') && /<h2\b/.test(html), `Missing static body: ${route}`);
  const trackingJSON = html.match(/<script id="hls-tracking-config" type="application\/json">([^<]+)<\/script>/)?.[1];
  assert(trackingJSON, `Missing tracking settings: ${route}`);
  const tracking = JSON.parse(trackingJSON);
  assert((html.match(/id="hls-tracking-bootstrap"/g) || []).length === 1, `Duplicate tracking bootstrap: ${route}`);
  if (tracking.mode === 'gtm') {
    assert(/^GTM-[A-Z0-9]{4,20}$/.test(tracking.gtmContainerId), `Invalid GTM ID: ${route}`);
    assert(html.includes('googletagmanager.com/gtm.js?id=') && html.includes(`ns.html?id=${tracking.gtmContainerId}`), `Missing GTM installation: ${route}`);
    assert(!html.includes('googletagmanager.com/gtag/js?id='), `Duplicate direct GA4 in GTM mode: ${route}`);
  } else if (tracking.mode === 'direct') {
    assert(/^G-[A-Z0-9]{10}$/.test(tracking.ga4MeasurementId), `Invalid GA4 ID: ${route}`);
    assert(html.includes(`gtag/js?id=${tracking.ga4MeasurementId}`) && html.includes('send_page_view:false'), `Missing direct GA4 installation: ${route}`);
    assert(!html.includes('googletagmanager.com/gtm.js?id='), `Duplicate GTM in direct mode: ${route}`);
  } else assert(tracking.mode === 'off' && !html.includes('googletagmanager.com/'), `Invalid disabled tracking: ${route}`);
  const schemaText = html.match(/<script id="hls-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert(schemaText, `Missing schema: ${route}`);
  const schema = JSON.parse(schemaText);
  const types = schema['@graph'].map(item => item['@type']);
  assert(types.includes('Organization') && types.includes('WebSite') && types.includes(route === '/contact' ? 'ContactPage' : 'WebPage'), `Schema types: ${route}`);
  if (route.startsWith('/products/') || route.startsWith('/services/')) {
    assert(types.includes('BreadcrumbList') && html.includes('aria-label="Breadcrumb"'), `Missing breadcrumbs: ${route}`);
    if (route.startsWith('/services/')) assert(types.includes('Service'), `Missing service schema: ${route}`);
  }
  for (const [, src] of html.matchAll(/<(?:img|source)\b[^>]*\bsrc="(\/[^"?#]+)"/g)) assert(existsSync(path.join(output, src.slice(1))), `Missing asset ${src} in ${route}`);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="(\/[^"?#]*)[^"]*"/g)) assert(routes.includes(href), `Broken internal destination ${href} in ${route}`);
  let status = null;
  if (host) {
    const response = await fetch(host + route);
    status = response.status;
    assert(status === 200, `HTTP ${status}: ${route}`);
    assert((await response.text()).includes(title), `Wrong HTTP page: ${route}`);
    if (route !== '/') {
      const slash = await fetch(host + route + '/');
      const slashHtml = await slash.text();
      assert(slash.status === 200 && slashHtml.includes(title) && slashHtml.includes(`rel="canonical" href="${origin}${route}"`), `Unsafe slash alias: ${route}`);
    }
  }
  results.push({ route, status, h1: 1, canonical: origin + route, schemaTypes: types });
}
const robots = readFileSync(path.join(output, 'robots.txt'), 'utf8');
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`) && robots.includes('Allow: /'), 'robots.txt mismatch');
assert(existsSync(path.join(output, 'favicon.png')), 'Missing favicon');
if (host) {
  for (const route of ['/not-a-real-hls-page', '/services/emergency-repairs', '/seo/services.html']) {
    const response = await fetch(host + route);
    assert(response.status === 404, `Expected real 404: ${route}`);
    assert((await response.text()).includes('content="noindex, follow"'), `Expected noindex 404: ${route}`);
  }
}
writeFileSync(path.join(root, 'dist/seo-validation.json'), JSON.stringify({ routes: results, total: results.length, httpChecked: Boolean(host), uniqueTitles: titles.size, uniqueDescriptions: descriptions.size }, null, 2));
console.log(`Validated ${results.length} static pages, unique metadata, H1s, JSON-LD, breadcrumbs, assets, Google tracking, and robots${host ? '; all direct URLs 200, slash aliases resolve safely, unknown/retired aliases 404' : ''}.`);
