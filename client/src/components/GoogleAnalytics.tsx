import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = "G-HV2YJJ3NZP";

export default function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      send_to: MEASUREMENT_ID,
      page_title: document.title,
      page_location: window.location.href,
      page_path: location,
    });
  }, [location]);

  return null;
}
