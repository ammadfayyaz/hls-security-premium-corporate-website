import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackGAEvent } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const [location] = useLocation();
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      trackGAEvent("page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location,
      });
    });
    return () => {
      active = false;
    };
  }, [location]);
  return null;
}
