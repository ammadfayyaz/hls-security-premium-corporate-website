import { useEffect } from "react";
import { canonicalUrl, SITE_ORIGIN } from "@/lib/site";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string;
  robots?: string;
  schema?: object;
}

/** Keep the metadata and structured data in sync with the page actually rendered. */
export default function SEO({
  title,
  description,
  path = "/",
  keywords,
  robots = "index, follow",
  schema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | HLS Security`
      : "HLS Security — Professional Electronic Security, Monitoring & Armed Response";
    const desc = description ||
      "HLS provides premium electronic security solutions including security alarm systems, 24/7 professional monitoring, and rapid armed response for residential, commercial, and enterprise clients.";
    const url = canonicalUrl(path);
    const indexable = !/\bnoindex\b/i.test(robots);

    document.title = fullTitle;

    const updateMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("description", desc);
    updateMeta("keywords", keywords || "electronic security, security alarm systems, alarm monitoring, armed response, CCTV surveillance, electric fence, fire detection, gate automation, home automation, smart security");
    updateMeta("robots", robots);
    updateMeta("author", "HLS Security");
    updateMeta("og:title", fullTitle, "property");
    updateMeta("og:description", desc, "property");
    updateMeta("og:type", "website", "property");
    updateMeta("og:site_name", "HLS Security", "property");
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (indexable) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
      updateMeta("og:url", url, "property");
    } else {
      canonical?.remove();
      document.querySelector('meta[property="og:url"]')?.remove();
    }

    const schemaId = "hls-schema";
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!indexable) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_ORIGIN}/#organization`,
          name: "HLS Security",
          url: SITE_ORIGIN,
          logo: `${SITE_ORIGIN}/images/logo/hls-logo.png`,
          telephone: "+92-42-111-457-911",
          email: "info@hls-security.com",
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
          "@type": path === "/contact" ? "ContactPage" : "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: fullTitle,
          description: desc,
          isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
          inLanguage: "en-PK",
        },
      ],
    };

    script.textContent = JSON.stringify(schema || defaultSchema);
  }, [title, description, path, keywords, robots, schema]);

  return null;
}
