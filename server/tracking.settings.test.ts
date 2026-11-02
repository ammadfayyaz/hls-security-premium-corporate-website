import { describe, expect, it } from "vitest";
import { get } from "node:https";
import { resolveTrackingConfiguration } from "../shared/tracking";

const publicScriptAvailable = (url: string) =>
  new Promise<boolean>((resolve, reject) => {
    const request = get(url, { family: 4 }, response => {
      response.resume();
      resolve(response.statusCode === 200);
    });
    request.on("error", reject);
    request.setTimeout(15_000, () =>
      request.destroy(new Error("Public Google script check timed out"))
    );
  });

/** Public identifiers, not credentials. Never read or log unrelated secrets. */
describe("project Google tracking settings", () => {
  it("accepts only well-formed configured IDs and reports malformed values", async () => {
    const config = resolveTrackingConfiguration({
      VITE_GA4_MEASUREMENT_ID: process.env.VITE_GA4_MEASUREMENT_ID,
      VITE_GTM_CONTAINER_ID: process.env.VITE_GTM_CONTAINER_ID,
    });
    expect(config.errors).toEqual([]);
    if (config.mode === "gtm") {
      const available = await publicScriptAvailable(
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmContainerId)}`
      );
      expect(
        available,
        "Configured GTM container is not publicly published/accessible; verify its ID and publish status."
      ).toBe(true);
    } else if (config.mode === "direct") {
      const available = await publicScriptAvailable(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4MeasurementId)}`
      );
      expect(available, "Google tag loader is not accessible.").toBe(true);
    }
    // Successful script delivery does not prove events arrive in a GA4 property.
  }, 20_000);
});
