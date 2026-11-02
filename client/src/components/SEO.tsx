import { useEffect } from "react";
import { canonicalUrl } from "@/lib/site";
import {
  absoluteImage,
  DEFAULT_KEYWORDS,
  HOME_DESCRIPTION,
  HOME_TITLE,
  landingMetadata,
  pageSchema,
} from "@/lib/seoMetadata";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string;
  robots?: string;
  image?: string;
  schema?: object;
}

/** Runtime metadata and the production prerender use the same canonical/schema model. */
export default function SEO({
  title,
  description,
  path = "/",
  keywords,
  robots = "index, follow",
  image,
  schema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | HLS Security` : HOME_TITLE;
    const desc = description || HOME_DESCRIPTION;
    const url = canonicalUrl(path);
    const indexable = !/\bnoindex\b/i.test(robots);
    const socialImage = absoluteImage(image || landingMetadata[path]?.image);
    document.title = fullTitle;
    const updateMeta = (
      name: string,
      content: string,
      attr: "name" | "property" = "name"
    ) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    for (const [key, value] of Object.entries({
      description: desc,
      keywords: keywords || DEFAULT_KEYWORDS,
      robots,
      author: "HLS Security",
      "twitter:card": "summary_large_image",
      "twitter:title": fullTitle,
      "twitter:description": desc,
      "twitter:image": socialImage,
    }))
      updateMeta(key, value);
    for (const [key, value] of Object.entries({
      "og:title": fullTitle,
      "og:description": desc,
      "og:type": "website",
      "og:site_name": "HLS Security",
      "og:image": socialImage,
    }))
      updateMeta(key, value, "property");
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
    let script = document.getElementById(
      "hls-schema"
    ) as HTMLScriptElement | null;
    if (!indexable) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.id = "hls-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(
      schema ||
        pageSchema({
          title: fullTitle,
          description: desc,
          keywords: keywords || DEFAULT_KEYWORDS,
          path,
          image: socialImage,
        })
    );
  }, [title, description, path, keywords, robots, image, schema]);
  return null;
}
