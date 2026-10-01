export const SITE_ORIGIN = "https://www.hlssecurity.co";

/** All marketing pages have one canonical spelling, independent of query strings. */
export function canonicalUrl(path: string): string {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_ORIGIN}${normalized}`;
}
