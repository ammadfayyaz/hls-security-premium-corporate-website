import { existsSync, readdirSync, readFileSync } from "node:fs";
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
const productImageMappings = [
  ["Security Alarm System", "Control Panels", "/images/products/product-control-panels-hls.webp"],
  ["Security Alarm System", "Motion Detectors", "/images/products/product-motion-detectors-hls.webp"],
  ["Security Alarm System", "Door Sensors", "/images/products/product-door-sensors-hls.webp"],
  ["Security Alarm System", "Glass Break Sensors", "/images/products/product-glass-break-sensors-hls.webp"],
  ["Security Alarm System", "Smoke Sensors", "/images/products/product-smoke-sensors-hls.webp"],
  ["Security Alarm System", "Heat Detector", "/images/products/product-heat-detector-hls.webp"],
  ["Security Alarm System", "Gas Leak Detector", "/images/products/product-gas-leak-detector-hls.webp"],
  ["Security Alarm System", "Water Leak Sensor", "/images/products/product-water-leak-sensor-hls.webp"],
  ["Security Alarm System", "Sirens", "/images/products/product-sirens-hls.webp"],
  ["Electric Fence", "Energizers", "/images/products/product-energizers-hls.webp"],
] as const;

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

  it.each(addedProductNames)(
    "provides complete professional card content for %s",
    (productName) => {
      const product = category?.products.find((item) => item.name === productName);

      expect(product).toBeDefined();
      expect(product?.description.trim().length).toBeGreaterThan(80);
      expect(product?.features).toHaveLength(4);
      expect(Object.entries(product?.specs ?? {})).toHaveLength(4);
      expect(product?.features.every((feature) => feature.trim().length > 0)).toBe(true);
      expect(
        Object.entries(product?.specs ?? {}).every(
          ([name, value]) => name.trim().length > 0 && value.trim().length > 0,
        ),
      ).toBe(true);
    },
  );

  it("uses the requested Heat Detector detection type", () => {
    const heatDetector = category?.products.find((item) => item.name === "Heat Detector");

    expect(heatDetector?.specs["Detection Type"]).toBe("Rate-of-rise");
  });

  it.each(productImageMappings)(
    "uses the supplied optimized image for %s / %s",
    (targetCategory, productName, imagePath) => {
      const product = productCategories
        .find((item) => item.name === targetCategory)
        ?.products.find((item) => item.name === productName);
      const publicDirectory = fileURLToPath(new URL("../../public", import.meta.url));

      expect(product?.image).toBe(imagePath);
      expect(existsSync(join(publicDirectory, imagePath.replace(/^\//, "")))).toBe(true);
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
