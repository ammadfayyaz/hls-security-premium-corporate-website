import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackContactFormSubmit,
  trackGAEvent,
  trackQuoteRequest,
  trackWhatsAppClick,
} from "@/lib/analytics";

describe("GA4 conversion events", () => {
  const gtag = vi.fn();

  afterEach(() => {
    vi.unstubAllGlobals();
    gtag.mockReset();
  });

  it("sends WhatsApp and quote events with source and product context", () => {
    vi.stubGlobal("window", { gtag });

    trackWhatsAppClick("product_card", "Motion Detector");
    trackQuoteRequest("product_card", "Motion Detector");

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "whatsapp_click", {
      send_to: "G-HV2YJJ3NZP",
      source: "product_card",
      product_name: "Motion Detector",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "quote_request", {
      send_to: "G-HV2YJJ3NZP",
      method: "whatsapp",
      source: "product_card",
      product_name: "Motion Detector",
    });
  });

  it("sends a contact form conversion event after a successful submission", () => {
    vi.stubGlobal("window", { gtag });

    trackContactFormSubmit("Contact — Send Us a Message");

    expect(gtag).toHaveBeenCalledWith("event", "contact_form_submit", {
      send_to: "G-HV2YJJ3NZP",
      form_name: "Contact — Send Us a Message",
    });
  });

  it("does not throw when the GA4 runtime is unavailable", () => {
    vi.stubGlobal("window", {});

    expect(() => trackGAEvent("test_event")).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
});
