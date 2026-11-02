import type { TrackingConfiguration } from "../shared/tracking";

/** Build-time rendering accepts only validated public identifiers, never the env store. */
export function renderTrackingMarkup(config: TrackingConfiguration) {
  if (config.errors.length) throw new Error(config.errors.join("\n"));
  const publicConfig = JSON.stringify({
    ga4MeasurementId: config.ga4MeasurementId,
    gtmContainerId: config.gtmContainerId,
    mode: config.mode,
  }).replace(/</g, "\\u003c");
  const json = `<script id="hls-tracking-config" type="application/json">${publicConfig}</script>`;
  const setup = `window.__HLS_TRACKING__=${publicConfig};window.dataLayer=window.dataLayer||[];`;
  if (config.mode === "off")
    return {
      head: `${json}<script id="hls-tracking-bootstrap">${setup}</script>`,
      body: "",
    };
  if (config.mode === "direct") {
    const id = config.ga4MeasurementId;
    return {
      head: `${json}<script id="hls-tracking-bootstrap">(function(w,d){if(w.__HLS_TRACKING_STARTED__)return;w.__HLS_TRACKING_STARTED__=true;${setup}w.gtag=w.gtag||function(){w.dataLayer.push(arguments)};w.gtag('js',new Date());w.gtag('config','${id}',{send_page_view:false});var s=d.createElement('script');s.async=true;s.id='hls-google-tag';s.src='https://www.googletagmanager.com/gtag/js?id=${id}';d.head.appendChild(s)})(window,document);</script>`,
      body: "",
    };
  }
  const id = config.gtmContainerId;
  return {
    head: `${json}<script id="hls-tracking-bootstrap">(function(w,d,s,l,i){if(w.__HLS_TRACKING_STARTED__)return;w.__HLS_TRACKING_STARTED__=true;${setup}w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.id='hls-gtm-tag';j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','${id}');</script>`,
    body: `<noscript id="hls-gtm-noscript"><iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`,
  };
}
