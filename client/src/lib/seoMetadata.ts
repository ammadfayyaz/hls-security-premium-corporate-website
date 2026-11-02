import { SITE_ORIGIN, canonicalUrl } from "./site";
import { productCategoryRoutes, serviceRoutes } from "./landingPages";

export type Breadcrumb = { name: string; path: string };
export type PageMetadata = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  image?: string;
};

export const DEFAULT_IMAGE = "/images/hero/hero-desktop.webp";
export const HOME_TITLE =
  "HLS Security — Professional Electronic Security, Monitoring & Armed Response";
export const HOME_DESCRIPTION =
  "HLS provides premium electronic security solutions including security alarm systems, 24/7 professional monitoring, and rapid armed response for residential, commercial, and enterprise clients.";
export const DEFAULT_KEYWORDS =
  "electronic security, security alarm systems, alarm monitoring, armed response, CCTV surveillance, electric fence, fire detection, gate automation, home automation, smart security";

export const landingMetadata: Record<string, PageMetadata> = Object.fromEntries(
  [
    ...productCategoryRoutes.map(({ landing }) => ({
      path: `/products/${landing.slug}`,
      title: landing.heading,
      description: landing.description,
      keywords: landing.keywords,
      image: landing.image,
    })),
    ...serviceRoutes.map(({ landing }) => ({
      path: `/services/${landing.slug}`,
      title: landing.heading,
      description: landing.description,
      keywords: landing.keywords,
      image: landing.image,
    })),
  ].map(meta => [meta.path, meta])
);

export function categoryLabel(name: string) {
  if (name === "Security Alarm System" || name === "CCTV Systems") return name;
  return `${name} Systems`;
}

export function breadcrumbsFor(path: string): Breadcrumb[] {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/") return [];
  const base = [{ name: "Home", path: "/" }];
  const category = productCategoryRoutes.find(
    item => `/products/${item.landing.slug}` === normalized
  );
  if (category)
    return [
      ...base,
      { name: "Products", path: "/products" },
      { name: categoryLabel(category.name), path: normalized },
    ];
  const service = serviceRoutes.find(
    item => `/services/${item.landing.slug}` === normalized
  );
  if (service)
    return [
      ...base,
      { name: "Services", path: "/services" },
      { name: service.title, path: normalized },
    ];
  const names: Record<string, string> = {
    "/products": "Products",
    "/services": "Services",
    "/solutions": "Solutions",
    "/contact": "Contact",
  };
  return [...base, { name: names[normalized] || "Page", path: normalized }];
}

export function absoluteImage(image = DEFAULT_IMAGE) {
  return image.startsWith("https://") ? image : `${SITE_ORIGIN}${image}`;
}

export function pageSchema(meta: PageMetadata) {
  const url = canonicalUrl(meta.path);
  const breadcrumbs = breadcrumbsFor(meta.path);
  const service = serviceRoutes.find(
    item => `/services/${item.landing.slug}` === meta.path
  );
  const graph: object[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "HLS Security",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/images/logo/hls-logo.png`,
      telephone: "+92-42-111-457-911",
      email: "info@hls-corp.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "73 Munir Road, Lahore Cantt.",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: "HLS Security",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: "en-PK",
    },
    {
      "@type": meta.path === "/contact" ? "ContactPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      inLanguage: "en-PK",
      ...(breadcrumbs.length
        ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
        : {}),
      ...(service ? { mainEntity: { "@id": `${url}#service` } } : {}),
    },
  ];
  if (breadcrumbs.length)
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: canonicalUrl(item.path),
      })),
    });
  if (service)
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.landing.description,
      url,
      provider: { "@id": `${SITE_ORIGIN}/#organization` },
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
