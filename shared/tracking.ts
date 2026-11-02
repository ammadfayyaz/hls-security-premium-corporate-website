export type TrackingMode = "direct" | "gtm" | "off";
export type TrackingConfiguration = {
  ga4MeasurementId: string;
  gtmContainerId: string;
  mode: TrackingMode;
  errors: string[];
};

export const trackingSettingDefinitions = [
  {
    key: "VITE_GA4_MEASUREMENT_ID",
    label: "Google Analytics 4 Measurement ID",
    description:
      "Find this in Google Analytics → Admin → Data streams → your Web stream → Measurement ID. Format: G- followed by 10 uppercase letters/digits. Blank disables direct GA4.",
  },
  {
    key: "VITE_GTM_CONTAINER_ID",
    label: "Google Tag Manager Container ID",
    description:
      "Find this in Google Tag Manager → your Web container → Workspace header / Install Google Tag Manager. Format: GTM- followed by uppercase letters/digits. Leave blank until your container is ready; a configured container exclusively owns Google tracking.",
  },
] as const;

export function validGA4Id(value: string) {
  return /^G-[A-Z0-9]{10}$/.test(value);
}
export function validGTMId(value: string) {
  return /^GTM-[A-Z0-9]{4,20}$/.test(value);
}

/** Only these two public IDs are accepted; no other environment values are exposed. */
export function resolveTrackingConfiguration(input: {
  VITE_GA4_MEASUREMENT_ID?: string;
  VITE_GTM_CONTAINER_ID?: string;
}): TrackingConfiguration {
  const ga4 = input.VITE_GA4_MEASUREMENT_ID?.trim() || "";
  const gtm = input.VITE_GTM_CONTAINER_ID?.trim() || "";
  const errors: string[] = [];
  if (ga4 && !validGA4Id(ga4))
    errors.push(
      "Google Analytics 4 Measurement ID must be G- followed by 10 uppercase letters/digits. Correct VITE_GA4_MEASUREMENT_ID in Settings → Secrets."
    );
  if (gtm && !validGTMId(gtm))
    errors.push(
      "Google Tag Manager Container ID must be GTM- followed by uppercase letters/digits (at least 4). Correct VITE_GTM_CONTAINER_ID in Settings → Secrets."
    );
  const ga4MeasurementId = validGA4Id(ga4) ? ga4 : "";
  const gtmContainerId = validGTMId(gtm) ? gtm : "";
  // GTM takes exclusive ownership when configured. No direct GA4/gtm dual-load mode.
  const mode = gtmContainerId ? "gtm" : ga4MeasurementId ? "direct" : "off";
  return { ga4MeasurementId, gtmContainerId, mode, errors };
}
