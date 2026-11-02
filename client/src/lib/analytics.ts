import type { TrackingConfiguration } from "@shared/tracking";
import { validGA4Id, validGTMId } from "@shared/tracking";

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;
type TrackingWindow = Window & {
  __HLS_TRACKING__?: Pick<
    TrackingConfiguration,
    "mode" | "ga4MeasurementId" | "gtmContainerId"
  >;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function trackGAEvent(
  eventName: string,
  params: AnalyticsEventParams = {}
) {
  if (typeof window === "undefined") return;
  const runtime = window as TrackingWindow;
  const config = runtime.__HLS_TRACKING__;
  if (!config) return;
  try {
    if (
      config.mode === "direct" &&
      validGA4Id(config.ga4MeasurementId) &&
      typeof runtime.gtag === "function"
    ) {
      const payload = { ...params, send_to: config.ga4MeasurementId };
      if ("event" in payload) payload.event = eventName;
      runtime.gtag("event", eventName, payload);
    } else if (
      config.mode === "gtm" &&
      validGTMId(config.gtmContainerId) &&
      Array.isArray(runtime.dataLayer)
    ) {
      // The published container's Enhanced Measurement owns initial/history page views.
      if (eventName === "page_view") return;
      // Clear previous event context so product/form data cannot leak into a later event.
      const payload = {
        source: undefined,
        product_name: undefined,
        method: undefined,
        form_name: undefined,
        page_title: undefined,
        page_location: undefined,
        page_path: undefined,
        ...params,
        event: eventName,
      };
      delete (payload as Record<string, unknown>).send_to;
      runtime.dataLayer.push(payload);
    }
  } catch {
    // Analytics is best-effort; it must never interrupt forms or outbound CTAs.
  }
}

export function trackWhatsAppClick(source: string, productName?: string) {
  trackGAEvent("whatsapp_click", { source, product_name: productName });
}
export function trackQuoteRequest(source: string, productName?: string) {
  trackGAEvent("quote_request", {
    method: "whatsapp",
    source,
    product_name: productName,
  });
}
export function trackContactFormSubmit(formName: string) {
  trackGAEvent("contact_form_submit", { form_name: formName });
}
