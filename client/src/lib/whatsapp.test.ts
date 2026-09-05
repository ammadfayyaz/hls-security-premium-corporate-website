import { describe, expect, it } from "vitest";
import { productCategories } from "@/lib/data";
import { getProductQuoteWhatsAppUrl } from "@/lib/whatsapp";

describe("product quotation WhatsApp links", () => {
  const products = productCategories.flatMap((category) => category.products);

  it.each(products)("builds the correct quotation message for $name", (product) => {
    const url = new URL(getProductQuoteWhatsAppUrl(product.name));

    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/923001457911");
    expect(url.searchParams.get("text")).toBe(
      `Hello HLS, I am interested in getting a quotation for ${product.name}. Please provide me with more information.`,
    );
  });

  it.each(productCategories)("builds a category fallback message for $name", (category) => {
    const url = new URL(getProductQuoteWhatsAppUrl(category.name));

    expect(url.searchParams.get("text")).toContain(`quotation for ${category.name}.`);
  });
});
