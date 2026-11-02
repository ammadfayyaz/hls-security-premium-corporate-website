import { describe, expect, it } from "vitest";
import { resolveTrackingConfiguration } from "@shared/tracking";

const GA4_ID = "G-ABCDEFGHIJ";
const GTM_ID = "GTM-TEST1234";

describe("resolveTrackingConfiguration", () => {
  it("selects direct mode for a valid GA4 measurement ID", () => {
    expect(
      resolveTrackingConfiguration({ VITE_GA4_MEASUREMENT_ID: GA4_ID })
    ).toEqual({
      ga4MeasurementId: GA4_ID,
      gtmContainerId: "",
      mode: "direct",
      errors: [],
    });
  });

  it("gives a valid GTM container exclusive ownership over valid GA4", () => {
    expect(
      resolveTrackingConfiguration({
        VITE_GA4_MEASUREMENT_ID: GA4_ID,
        VITE_GTM_CONTAINER_ID: GTM_ID,
      })
    ).toEqual({
      ga4MeasurementId: GA4_ID,
      gtmContainerId: GTM_ID,
      mode: "gtm",
      errors: [],
    });
  });

  it("keeps GTM ownership when GA4 is malformed and reports the malformed value", () => {
    const config = resolveTrackingConfiguration({
      VITE_GA4_MEASUREMENT_ID: "not-a-ga4-id",
      VITE_GTM_CONTAINER_ID: GTM_ID,
    });

    expect(config.mode).toBe("gtm");
    expect(config.ga4MeasurementId).toBe("");
    expect(config.gtmContainerId).toBe(GTM_ID);
    expect(config.errors).toHaveLength(1);
    expect(config.errors[0]).toMatch(/VITE_GA4_MEASUREMENT_ID/);
    expect(config.errors[0]).not.toContain("not-a-ga4-id");
  });

  it("falls back to direct GA4 when GTM is malformed", () => {
    const config = resolveTrackingConfiguration({
      VITE_GA4_MEASUREMENT_ID: GA4_ID,
      VITE_GTM_CONTAINER_ID: "not-a-gtm-id",
    });

    expect(config).toEqual({
      ga4MeasurementId: GA4_ID,
      gtmContainerId: "",
      mode: "direct",
      errors: [expect.stringContaining("VITE_GTM_CONTAINER_ID")],
    });
    expect(config.errors[0]).not.toContain("not-a-gtm-id");
  });

  it("uses off mode without errors when both values are blank or absent", () => {
    expect(resolveTrackingConfiguration({})).toEqual({
      ga4MeasurementId: "",
      gtmContainerId: "",
      mode: "off",
      errors: [],
    });
    expect(
      resolveTrackingConfiguration({
        VITE_GA4_MEASUREMENT_ID: "  ",
        VITE_GTM_CONTAINER_ID: "\t",
      })
    ).toEqual({
      ga4MeasurementId: "",
      gtmContainerId: "",
      mode: "off",
      errors: [],
    });
  });

  it("rejects malformed IDs, including lowercase and wrong lengths, without echoing them", () => {
    const malformedValues = [
      ["VITE_GA4_MEASUREMENT_ID", "g-abcdefghij"],
      ["VITE_GTM_CONTAINER_ID", "gtm-test1234"],
      ["VITE_GA4_MEASUREMENT_ID", "G-ABCDEFGHI"],
      ["VITE_GTM_CONTAINER_ID", "GTM-ABC"],
    ] as const;

    for (const [key, value] of malformedValues) {
      const config = resolveTrackingConfiguration({ [key]: value });

      expect(config.mode).toBe("off");
      expect(config.errors).toHaveLength(1);
      expect(config.errors[0]).toContain(key);
      expect(config.errors[0]).not.toContain(value);
    }
  });
});
