import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { productCategories } from "@/lib/data";
import { getProductQuoteWhatsAppUrl } from "@/lib/whatsapp";

const categoryName = "Security Alarm System";
const addedProductNames = [
  "Smoke Sensors",
  "Heat Detector",
  "Gas Leak Detector",
  "Water Leak Sensor",
];
const removedProductNames = ["Outdoor Sensors", "Keypads"];

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    if (![".ts", ".tsx", ".html"].includes(extname(entry.name))) return [];
    if (entry.name.endsWith(".test.ts") || entry.name.endsWith(".test.tsx")) return [];
    return [fullPath];
  });
}

describe("Security Alarm System product catalog", () => {
  const category = productCategories.find((item) => item.name === categoryName);

  it("uses the new primary category name and the requested product set", () => {
    expect(category).toBeDefined();

    const productNames = category?.products.map((product) => product.name) ?? [];
    expect(productNames).toEqual(expect.arrayContaining(addedProductNames));
    expect(productNames).not.toEqual(expect.arrayContaining(removedProductNames));
  });

  it.each(addedProductNames)(
    "keeps product-specific WhatsApp quotation behavior for %s",
    (productName) => {
      const url = new URL(getProductQuoteWhatsAppUrl(productName));
      expect(url.pathname).toBe("/923001457911");
      expect(url.searchParams.get("text")).toBe(
        `Hello HLS, I am interested in getting a quotation for ${productName}. Please provide me with more information.`,
      );
    },
  );

  it("removes the retired category wording from customer-facing source files", () => {
    const clientDirectory = fileURLToPath(new URL("../..", import.meta.url));
    const oldCategoryPattern = new RegExp(
      `\\b${["Intruder", "Alarm"].join(" ")} Systems?\\b`,
      "i",
    );

    const staleFiles = sourceFiles(clientDirectory).filter((filePath) =>
      oldCategoryPattern.test(readFileSync(filePath, "utf8")),
    );

    expect(staleFiles).toEqual([]);
  });
});
