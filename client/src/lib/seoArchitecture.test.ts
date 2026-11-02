import { describe, expect, it } from "vitest";
import { renderRoute } from "../../../scripts/prerender";
import { productCategories, allServices } from "./data";
import { productCategoryRoutes, serviceRoutes } from "./landingPages";
import { landingSupport, serviceDeliveryNotes } from "./landingSupport";
import { breadcrumbsFor, landingMetadata, pageSchema } from "./seoMetadata";

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

describe("SEO landing architecture", () => {
  it("preserves all product data and the seven approved services", () => {
    expect(productCategoryRoutes.map(({ products }) => products)).toEqual(
      productCategories.map(({ products }) => products)
    );
    expect(serviceRoutes.map(({ title }) => title)).toEqual(
      allServices.map(({ title }) => title)
    );
    expect(Object.keys(landingMetadata)).toHaveLength(13);
  });

  it("assigns unique metadata and valid non-orphaned related links to all 13 landings", () => {
    const metadata = Object.values(landingMetadata);
    expect(new Set(metadata.map(meta => meta.title)).size).toBe(13);
    expect(new Set(metadata.map(meta => meta.description)).size).toBe(13);
    const products = new Set(
      productCategoryRoutes.map(item => item.landing.slug)
    );
    const services = new Set(serviceRoutes.map(item => item.landing.slug));
    for (const [slug, support] of Object.entries(landingSupport)) {
      expect(
        support.relatedProducts.every(
          target => products.has(target) && target !== slug
        )
      ).toBe(true);
      expect(
        support.relatedServices.every(
          target => services.has(target) && target !== slug
        )
      ).toBe(true);
    }
    expect(breadcrumbsFor("/services/24-7-monitoring").at(-1)?.name).toBe(
      "24/7 Monitoring"
    );
  });

  it.each(productCategoryRoutes)(
    "renders complete standalone product content for $name",
    category => {
      const path = `/products/${category.landing.slug}`;
      const html = renderRoute(path);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toContain(escape(category.landing.heading));
      expect(html).toContain('aria-label="Breadcrumb"');
      expect(landingSupport[category.landing.slug].faq.length).toBeGreaterThan(
        1
      );
      for (const product of category.products) {
        expect(html).toContain(escape(product.name));
        expect(html).toContain(escape(product.description));
        for (const [key, value] of Object.entries(product.specs)) {
          expect(html).toContain(escape(key));
          expect(html).toContain(escape(value));
        }
        expect(html).toContain(encodeURIComponent(product.name));
      }
    }
  );

  it.each(serviceRoutes)(
    "renders service content and qualified availability for $title",
    service => {
      const path = `/services/${service.landing.slug}`;
      const html = renderRoute(path);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      expect(html).toContain(escape(service.landing.heading));
      expect(html).toContain("/contact#inquiry");
      expect(html).toContain('name="serviceInterest"');
      expect(html).toContain('aria-label="Breadcrumb"');
      if (serviceDeliveryNotes[service.landing.slug])
        expect(html).toContain(
          escape(serviceDeliveryNotes[service.landing.slug].availability)
        );
      const schema = pageSchema(landingMetadata[path]);
      expect(
        schema["@graph"].some(
          node => (node as Record<string, unknown>)["@type"] === "Service"
        )
      ).toBe(true);
      expect(JSON.stringify(schema)).not.toMatch(
        /AggregateRating|Offer|priceCurrency|ratingValue|license/
      );
    }
  );
});
