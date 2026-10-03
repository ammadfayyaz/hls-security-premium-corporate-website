import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { publicRoutes } from "./generate-sitemap.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist/public");
const source = path.join(root, "client/src/pages");
const baseHtml = readFileSync(path.join(output, "index.html"), "utf8");
const app = readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const routes = publicRoutes(app, name => readFileSync(path.join(source, `${name}.tsx`), "utf8"));
const escapeHtml = s => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const componentForRoute = route => {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return app.match(new RegExp(`<Route\\s+path=\\{["']${escaped}["']\\}\\s+component=\\{\\(\\)\\s*=>\\s*<Layout><(\\w+)\\s*\\/>`))?.[1];
};
const prop = (jsx, name) => jsx.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const replaceTag = (html, regex, replacement, name) => {
  if (!regex.test(html)) throw new Error(`Missing ${name} in built index.html`);
  return html.replace(regex, replacement);
};
const metaTag = (attr, key, value) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
const origin = "https://www.hlssecurity.co";

function embedSchema(html, { title, description, url }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${origin}/#organization`, name: "HLS Security",
        url: origin, logo: `${origin}/images/logo/hls-logo.png`,
        telephone: "+92-42-111-457-911", email: "info@hls-corp.com",
        address: { "@type": "PostalAddress", streetAddress: "73 Munir Road, Lahore Cantt.", addressLocality: "Lahore", addressCountry: "PK" },
      },
      { "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: "HLS Security", publisher: { "@id": `${origin}/#organization` }, inLanguage: "en-PK" },
      {
        "@type": url.endsWith("/contact") ? "ContactPage" : "WebPage",
        "@id": `${url}#webpage`, url, name: title, description,
        isPartOf: { "@id": `${origin}/#website` }, inLanguage: "en-PK",
      },
    ],
  };
  const json = JSON.stringify(graph).replaceAll("<", "\\u003c");
  return replaceTag(html, /<\/head>/, `  <script id="hls-schema" type="application/ld+json">${json}</script>\n  </head>`, "head");
}

export function renderPageHtml(html, { title, description, keywords, url, noindex = false }) {
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`, "title");
  for (const [key, value] of Object.entries({ description, keywords, robots: noindex ? "noindex, follow" : "index, follow", "twitter:title": title, "twitter:description": description })) {
    html = replaceTag(html, new RegExp(`<meta name="${key}" content="[^"]*"\\s*\\/>`), metaTag("name", key, value), key);
  }
  for (const [key, value] of Object.entries({ "og:title": title, "og:description": description })) {
    html = replaceTag(html, new RegExp(`<meta property="${key}" content="[^"]*"\\s*\\/>`), metaTag("property", key, value), key);
  }
  if (noindex) {
    html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, "", "canonical");
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, "", "og:url");
  } else {
    html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`, "canonical");
    html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, metaTag("property", "og:url", url), "og:url");
    html = embedSchema(html, { title, description, url });
  }
  return html;
}

mkdirSync(path.join(output, "seo"), { recursive: true });
const homeTitle = baseHtml.match(/<title>([^<]+)<\/title>/)?.[1];
const homeDescription = baseHtml.match(/<meta name="description" content="([^"]+)"\s*\/>/)?.[1];
if (!homeTitle || !homeDescription) throw new Error("Homepage title and description are required for structured data");
writeFileSync(path.join(output, "index.html"), embedSchema(baseHtml, {
  title: homeTitle, description: homeDescription, url: `${origin}/`,
}), "utf8");
for (const route of routes.filter(route => route !== "/")) {
  const component = componentForRoute(route);
  if (!component) throw new Error(`Missing component for ${route}`);
  const page = readFileSync(path.join(source, `${component}.tsx`), "utf8");
  const seo = page.match(/<SEO\b[\s\S]*?\/>/)?.[0];
  if (!seo) throw new Error(`Missing SEO metadata for ${route}`);
  const title = prop(seo, "title");
  const description = prop(seo, "description");
  const keywords = prop(seo, "keywords");
  if (!title || !description || !keywords) throw new Error(`Incomplete SEO props for ${route}`);
  writeFileSync(path.join(output, "seo", `${route.slice(1)}.html`), renderPageHtml(baseHtml, {
    title: `${title} | HLS Security`, description, keywords,
    url: `https://www.hlssecurity.co${route}`,
  }), "utf8");
}
writeFileSync(path.join(output, "404.html"), renderPageHtml(baseHtml, {
  title: "Page Not Found | HLS Security",
  description: "This HLS Security page could not be found.", keywords: "HLS Security",
  noindex: true,
}), "utf8");
writeFileSync(path.join(output, "_redirects"), [
  "/api/inquiry /.netlify/functions/inquiry 200!",
  ...routes.filter(route => route !== "/").map(route => `${route} /seo${route}.html 200`),
  "",
].join("\n"), "utf8");
console.log(`Built ${routes.length - 1} route-specific HTML heads and a noindex 404 page`);
