import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { build } from "esbuild";
import { publicRoutes } from "./generate-sitemap.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist/public");
const source = path.join(root, "client/src/pages");
const app = readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
const routes = publicRoutes(app, name =>
  readFileSync(path.join(source, `${name}.tsx`), "utf8")
);
const baseHtml = readFileSync(path.join(output, "index.html"), "utf8");
const origin = "https://www.hlssecurity.co";
const rendererPath = path.join(root, "dist/.prerender.mjs");
await build({
  entryPoints: [path.join(root, "scripts/prerender.tsx")],
  outfile: rendererPath,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  tsconfig: path.join(root, "tsconfig.json"),
  logLevel: "silent",
});
const { renderRoute, landingMetadata, pageSchema, absoluteImage } =
  await import(pathToFileURL(rendererPath).href);
for (const route of Object.keys(landingMetadata))
  if (!routes.includes(route))
    throw new Error(`Landing page ${route} is missing its public route`);
const escapeHtml = value =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const componentForRoute = route => {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return app.match(
    new RegExp(
      `<Route\\s+path=\\{["']${escaped}["']\\}\\s+component=\\{\\(\\)\\s*=>\\s*<Layout><(\\w+)(?:\\s+[^>]*)?\\s*\\/>`
    )
  )?.[1];
};
const prop = (jsx, name) => jsx?.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
function metadataFor(route) {
  if (landingMetadata[route])
    return {
      ...landingMetadata[route],
      title: `${landingMetadata[route].title} | HLS Security`,
    };
  if (route === "/")
    return {
      path: route,
      title: baseHtml.match(/<title>([^<]+)<\/title>/)?.[1],
      description: baseHtml.match(
        /<meta name="description" content="([^"]+)"/
      )?.[1],
      keywords: baseHtml.match(/<meta name="keywords" content="([^"]+)"/)?.[1],
    };
  const component = componentForRoute(route);
  if (!component) throw new Error(`Missing page component for ${route}`);
  const page = readFileSync(path.join(source, `${component}.tsx`), "utf8");
  const seo = page.match(/<SEO\b[\s\S]*?\/>/)?.[0];
  return {
    path: route,
    title: `${prop(seo, "title")} | HLS Security`,
    description: prop(seo, "description"),
    keywords: prop(seo, "keywords"),
  };
}

function metaTag(html, attr, key, value) {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  const regex = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*\\/>`);
  return regex.test(html)
    ? html.replace(regex, tag)
    : html.replace("</head>", `  ${tag}\n</head>`);
}

export function renderPageHtml(html, meta, noindex = false) {
  if (!meta.title || !meta.description || !meta.keywords)
    throw new Error(`Incomplete metadata for ${meta.path}`);
  const url = `${origin}${meta.path}`;
  const image = absoluteImage(meta.image);
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );
  for (const [key, value] of Object.entries({
    description: meta.description,
    keywords: meta.keywords,
    robots: noindex ? "noindex, follow" : "index, follow",
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    "twitter:image": image,
  }))
    html = metaTag(html, "name", key, value);
  for (const [key, value] of Object.entries({
    "og:title": meta.title,
    "og:description": meta.description,
    "og:image": image,
  }))
    html = metaTag(html, "property", key, value);
  html = html.replace(
    /<script id="hls-schema" type="application\/ld\+json">[\s\S]*?<\/script>/g,
    ""
  );
  if (noindex) {
    html = html
      .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, "")
      .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, "");
  } else {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${url}" />`
    );
    html = metaTag(html, "property", "og:url", url);
    html = html.replace(
      "</head>",
      `  <script id="hls-schema" type="application/ld+json">${JSON.stringify(pageSchema(meta)).replaceAll("<", "\\u003c")}</script>\n</head>`
    );
  }
  let body = renderRoute(meta.path);
  // Resource hints belong in the head, not inside the root container.
  const hints = [...body.matchAll(/<link\b[^>]*rel="preload"[^>]*\/>/g)].map(
    match => match[0]
  );
  body = body.replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, "");
  if (hints.length)
    html = html.replace("</head>", `  ${hints.join("\n  ")}\n</head>`);
  return html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="true">${body}</div>`
  );
}

mkdirSync(path.join(output, "seo"), { recursive: true });
for (const route of routes) {
  const routeOutput =
    route === "/"
      ? path.join(output, "index.html")
      : path.join(output, "seo", `${route.slice(1)}.html`);
  mkdirSync(path.dirname(routeOutput), { recursive: true });
  const html = renderPageHtml(baseHtml, metadataFor(route));
  if ((html.match(/<h1\b/g) || []).length !== 1)
    throw new Error(`Exactly one H1 required for ${route}`);
  writeFileSync(routeOutput, html, "utf8");
}
writeFileSync(
  path.join(output, "404.html"),
  renderPageHtml(
    baseHtml,
    {
      path: "/404",
      title: "Page Not Found | HLS Security",
      description: "This HLS Security page could not be found.",
      keywords: "HLS Security",
    },
    true
  ),
  "utf8"
);
writeFileSync(
  path.join(output, "_redirects"),
  [
    "/api/inquiry /.netlify/functions/inquiry 200!",
    // Netlify normalizes trailing slashes before matching: slash-only 301s loop.
    // Both variants use these existing rewrites and the same canonical metadata.
    ...routes
      .filter(route => route !== "/")
      .map(route => `${route} /seo${route}.html 200`),
    "/seo/* /404.html 404!",
    "/* /404.html 404",
    "",
  ].join("\n"),
  "utf8"
);
unlinkSync(rendererPath);
console.log(
  `Prerendered ${routes.length} public page bodies with unique HTML heads, shared schema, and a real noindex 404`
);
