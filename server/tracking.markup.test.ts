import { describe, expect, it } from "vitest";
import vm from "node:vm";
import { resolveTrackingConfiguration } from "../shared/tracking";
import { renderTrackingMarkup } from "../scripts/tracking-markup";
const ga = "G-ABCDEFGHIJ";
const gtm = "GTM-TEST1234";
function runBootstrap(head: string) {
  const code = head.match(
    /<script id="hls-tracking-bootstrap">([\s\S]*?)<\/script>/
  )?.[1]!;
  const inserted: unknown[] = [];
  const document = {
    createElement: () => ({}),
    head: { appendChild: (node: unknown) => inserted.push(node) },
    getElementsByTagName: () => [
      { parentNode: { insertBefore: (node: unknown) => inserted.push(node) } },
    ],
  };
  const window: Record<string, any> = {};
  const context = vm.createContext({ window, document, Date });
  vm.runInContext(code, context);
  vm.runInContext(code, context);
  return { inserted, window };
}
describe("Google tracking markup", () => {
  it("installs GTM exclusively with the official head and noscript snippets", () => {
    const markup = renderTrackingMarkup(
      resolveTrackingConfiguration({
        VITE_GA4_MEASUREMENT_ID: ga,
        VITE_GTM_CONTAINER_ID: gtm,
      })
    );
    expect(markup.head).toContain("googletagmanager.com/gtm.js?id=");
    expect(markup.head).not.toContain("gtag/js?id=");
    expect(markup.body).toContain(`ns.html?id=${gtm}`);
    expect(markup.body).toContain('height="0" width="0"');
    const { inserted, window } = runBootstrap(markup.head);
    expect(inserted).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(1);
    expect(window.__HLS_TRACKING__.mode).toBe("gtm");
    expect(window.gtag).toBeUndefined();
  });
  it("supports direct GA4 without a GTM container or duplicate bootstrap", () => {
    const markup = renderTrackingMarkup(
      resolveTrackingConfiguration({ VITE_GA4_MEASUREMENT_ID: ga })
    );
    expect(markup.head).toContain(`gtag/js?id=${ga}`);
    expect(markup.head).toContain("send_page_view:false");
    expect(markup.head).not.toContain("gtm.js?id=");
    expect(markup.body).toBe("");
    const { inserted, window } = runBootstrap(markup.head);
    expect(inserted).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(2);
    expect(window.__HLS_TRACKING__.mode).toBe("direct");
  });
  it("does not request Google resources when both settings are blank", () => {
    const markup = renderTrackingMarkup(resolveTrackingConfiguration({}));
    expect(markup.head + markup.body).not.toContain("googletagmanager.com");
    const { inserted, window } = runBootstrap(markup.head);
    expect(inserted).toHaveLength(0);
    expect(window.__HLS_TRACKING__.mode).toBe("off");
  });
  it("serializes only two public identifiers and the resolved mode", () => {
    const config = resolveTrackingConfiguration({
      VITE_GA4_MEASUREMENT_ID: ga,
      VITE_GTM_CONTAINER_ID: gtm,
    });
    const json = renderTrackingMarkup(config).head.match(
      /type="application\/json">([^<]+)<\/script>/
    )![1];
    expect(Object.keys(JSON.parse(json))).toEqual([
      "ga4MeasurementId",
      "gtmContainerId",
      "mode",
    ]);
    expect(json).not.toContain("errors");
  });
  it("rejects malformed/injection values before a tracking build is accepted", () => {
    const config = resolveTrackingConfiguration({
      VITE_GA4_MEASUREMENT_ID: "</script><script>alert(1)</script>",
    });
    expect(() => renderTrackingMarkup(config)).toThrow("Measurement ID");
    expect(config.errors.join(" ")).not.toContain("alert(1)");
  });
});
