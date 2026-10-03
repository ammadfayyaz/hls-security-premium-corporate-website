export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

const MEASUREMENT_ID = "G-HV2YJJ3NZP";

export function trackGAEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", eventName, {
    send_to: MEASUREMENT_ID,
    ...params,
  });
}

export function trackWhatsAppClick(source: string, productName?: string) {
  trackGAEvent("whatsapp_click", {
    source,
    product_name: productName,
  });
}

export function trackQuoteRequest(source: string, productName?: string) {
  trackGAEvent("quote_request", {
    method: "whatsapp",
    source,
    product_name: productName,
  });
}

export function trackContactFormSubmit(formName: string) {
  trackGAEvent("contact_form_submit", {
    form_name: formName,
  });
}
