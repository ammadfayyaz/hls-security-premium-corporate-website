import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  schema?: object;
}

/**
 * HLS Security — SEO Component
 * Dynamically updates meta tags, Open Graph, Twitter Cards,
 * and injects Schema.org structured data per page
 */
export default function SEO({
  title,
  description,
  path = "/",
  schema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | HLS Security`
      : "HLS Security — Professional Electronic Security, Monitoring & Armed Response";
    const desc = description ||
      "HLS provides premium electronic security solutions including intruder alarm systems, 24/7 professional monitoring, and rapid armed response for residential, commercial, and enterprise clients.";
    const url = `https://hls-security.com${path}`;

    // Update title
    document.title = fullTitle;

    // Update or create meta tags
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
    updateMeta("keywords", "electronic security, intruder alarms, alarm monitoring, armed response, CCTV surveillance, electric fence, fire detection, gate automation, home automation, smart security");
    updateMeta("robots", "index, follow");
    updateMeta("author", "HLS Security");

    // Open Graph
    updateMeta("og:title", fullTitle, "property");
    updateMeta("og:description", desc, "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:type", "website", "property");
    updateMeta("og:site_name", "HLS Security", "property");

    // Twitter Cards
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", desc);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Schema.org structured data
    const schemaId = "hls-schema";
    let script = document.getElementById(schemaId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "HLS Security",
      description: "Premium electronic security solutions including intruder alarm systems, 24/7 monitoring, and armed response.",
      url: "https://hls-security.com",
      logo: "https://hls-security.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-100-2470",
        contactType: "customer service",
        available: "24/7",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "24 Security Plaza, Suite 100",
        addressLocality: "Business District",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.facebook.com/hlssecurity",
        "https://www.twitter.com/hlssecurity",
        "https://www.linkedin.com/company/hlssecurity",
      ],
    };

    script.textContent = JSON.stringify(schema || defaultSchema);
  }, [title, description, path, schema]);

  return null;
}
