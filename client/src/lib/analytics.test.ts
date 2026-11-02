import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackContactFormSubmit,
  trackGAEvent,
  trackQuoteRequest,
  trackWhatsAppClick,
} from "@/lib/analytics";

const GA4_ID = "G-ABCDEFGHIJ";
const GTM_ID = "GTM-TEST1234";

type TrackingRuntime = {
  __HLS_TRACKING__?: {
    ga4MeasurementId: string;
    gtmContainerId: string;
    mode: "direct" | "gtm" | "off";
  };
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

function directRuntime(
  gtag: (...args: unknown[]) => void = vi.fn()
): TrackingRuntime {
  return {
    __HLS_TRACKING__: {
      ga4MeasurementId: GA4_ID,
      gtmContainerId: "",
      mode: "direct",
    },
    gtag,
  };
}

function gtmRuntime(
  push: (...args: unknown[]) => unknown = vi.fn()
): TrackingRuntime {
  const dataLayer = [] as unknown[];
  Object.defineProperty(dataLayer, "push", { value: push, writable: true });
  return {
    __HLS_TRACKING__: {
      ga4MeasurementId: "",
      gtmContainerId: GTM_ID,
      mode: "gtm",
    },
    dataLayer,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("tracking analytics runtime", () => {
  it("sends WhatsApp, quote, and form context through the configured direct GA4 ID", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", directRuntime(gtag));

    trackWhatsAppClick("product_card", "Motion Detector");
    trackQuoteRequest("product_card", "Motion Detector");
    trackContactFormSubmit("Contact — Send Us a Message");

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "whatsapp_click", {
      source: "product_card",
      product_name: "Motion Detector",
      send_to: GA4_ID,
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "quote_request", {
      method: "whatsapp",
      source: "product_card",
      product_name: "Motion Detector",
      send_to: GA4_ID,
    });
    expect(gtag).toHaveBeenNthCalledWith(3, "event", "contact_form_submit", {
      form_name: "Contact — Send Us a Message",
      send_to: GA4_ID,
    });
  });

  it("reads the public configuration on every call rather than hardcoding an ID", () => {
    const gtag = vi.fn();
    const runtime = directRuntime(gtag);
    vi.stubGlobal("window", runtime);

    trackGAEvent("first_event");
    runtime.__HLS_TRACKING__!.ga4MeasurementId = GA4_ID;
    trackGAEvent("second_event");

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "first_event", {
      send_to: GA4_ID,
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "second_event", {
      send_to: GA4_ID,
    });
  });

  it("keeps manual page_view dispatch available in direct mode", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", directRuntime(gtag));

    trackGAEvent("page_view", { page_title: "Products" });

    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_title: "Products",
      send_to: GA4_ID,
    });
  });

  it("pushes a plain event object to dataLayer in GTM mode without calling gtag", () => {
    const push = vi.fn();
    const gtag = vi.fn();
    vi.stubGlobal("window", { ...gtmRuntime(push), gtag });

    trackWhatsAppClick("product_card", "Motion Detector");
    trackQuoteRequest("product_card", "Motion Detector");

    expect(push).toHaveBeenNthCalledWith(1, {
      method: undefined,
      form_name: undefined,
      page_title: undefined,
      page_location: undefined,
      page_path: undefined,
      source: "product_card",
      product_name: "Motion Detector",
      event: "whatsapp_click",
    });
    expect(push).toHaveBeenNthCalledWith(2, {
      method: "whatsapp",
      form_name: undefined,
      page_title: undefined,
      page_location: undefined,
      page_path: undefined,
      source: "product_card",
      product_name: "Motion Detector",
      event: "quote_request",
    });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("clears undefined context fields in GTM event payloads", () => {
    const push = vi.fn();
    vi.stubGlobal("window", gtmRuntime(push));

    trackWhatsAppClick("header");

    expect(push).toHaveBeenCalledWith({
      method: undefined,
      form_name: undefined,
      page_title: undefined,
      page_location: undefined,
      page_path: undefined,
      source: "header",
      product_name: undefined,
      event: "whatsapp_click",
    });
  });

  it("does not push manual page_view events in GTM mode", () => {
    const push = vi.fn();
    vi.stubGlobal("window", gtmRuntime(push));

    trackGAEvent("page_view", {
      page_title: "Products",
      page_location: "https://hls.example/products",
      page_path: "/products",
    });

    expect(push).not.toHaveBeenCalled();
  });

  it("protects reserved send_to and event fields from parameter overrides", () => {
    const directGtag = vi.fn();
    vi.stubGlobal("window", directRuntime(directGtag));

    trackGAEvent("reserved_direct", {
      send_to: GTM_ID,
      event: "attacker_event",
      source: "test",
    });

    expect(directGtag).toHaveBeenCalledWith("event", "reserved_direct", {
      send_to: GA4_ID,
      event: "reserved_direct",
      source: "test",
    });

    const push = vi.fn();
    vi.stubGlobal("window", gtmRuntime(push));
    trackGAEvent("reserved_gtm", {
      send_to: GA4_ID,
      event: "attacker_event",
      source: "test",
    });

    expect(push).toHaveBeenCalledWith({
      source: "test",
      event: "reserved_gtm",
    });
  });

  it("does nothing in off mode and when the runtime is missing", () => {
    const gtag = vi.fn();
    const push = vi.fn();
    vi.stubGlobal("window", {
      __HLS_TRACKING__: {
        ga4MeasurementId: "",
        gtmContainerId: "",
        mode: "off",
      },
      gtag,
      dataLayer: { push },
    });

    trackGAEvent("off_event");
    expect(gtag).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();

    vi.stubGlobal("window", {});
    expect(() => trackGAEvent("missing_config_event")).not.toThrow();
    expect(() => trackWhatsAppClick("header", "Motion Detector")).not.toThrow();
  });

  it("does nothing during SSR when window is absent", () => {
    vi.stubGlobal("window", undefined);

    expect(() => trackGAEvent("ssr_event")).not.toThrow();
    expect(() =>
      trackQuoteRequest("product_card", "Motion Detector")
    ).not.toThrow();
  });

  it("does not let a throwing direct runtime affect the UI", () => {
    const gtag = vi.fn(() => {
      throw new Error("runtime failure");
    });
    vi.stubGlobal("window", directRuntime(gtag));

    expect(() =>
      trackContactFormSubmit("Contact — Send Us a Message")
    ).not.toThrow();
  });

  it("does not let a throwing GTM runtime affect the UI", () => {
    const push = vi.fn(() => {
      throw new Error("runtime failure");
    });
    vi.stubGlobal("window", gtmRuntime(push));

    expect(() =>
      trackGAEvent("gtm_failure_event", { source: "header" })
    ).not.toThrow();
  });
});
