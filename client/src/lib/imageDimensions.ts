// Intrinsic sizes of approved existing assets; no image files are changed.
const dimensions: Record<string, { width: number; height: number }> = {
  "/images/backgrounds/hero-bg.jpg": {
    width: 1600,
    height: 686,
  },
  "/images/banners/hls-operational-procedure-banner-mobile.webp": {
    width: 864,
    height: 1821,
  },
  "/images/banners/hls-operational-procedure-banner.webp": {
    width: 1536,
    height: 1024,
  },
  "/images/banners/hls-what-we-protect-banner-mobile.webp": {
    width: 926,
    height: 1698,
  },
  "/images/banners/hls-what-we-protect-banner.webp": {
    width: 1225,
    height: 1284,
  },
  "/images/hero/hero-desktop.jpg": {
    width: 1717,
    height: 916,
  },
  "/images/hero/hero-mobile.jpg": {
    width: 864,
    height: 1712,
  },
  "/images/hero/hls-hero-banner.webp": {
    width: 1678,
    height: 937,
  },
  "/images/hero/hls-mobile-hero-banner.webp": {
    width: 1024,
    height: 1536,
  },
  "/images/logo/hls-logo.png": {
    width: 512,
    height: 287,
  },
  "/images/products/gate-automation.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/home-automation.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-ai-camera_9546acdf.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-control-panel_0dae52ff.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-control-panels-hls.webp": {
    width: 1691,
    height: 930,
  },
  "/images/products/product-door-sensor_4f1e4276.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-door-sensors-hls.webp": {
    width: 1617,
    height: 973,
  },
  "/images/products/product-energizer_8348abe5.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-energizers-hls.webp": {
    width: 1448,
    height: 1086,
  },
  "/images/products/product-fence-accessories_a7a5b2c0.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-fence-monitor_e30aa0a1.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-gas-leak-detector-hls.webp": {
    width: 1672,
    height: 941,
  },
  "/images/products/product-glass-break-sensor_a327eaac.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-glass-break-sensors-hls.webp": {
    width: 1616,
    height: 973,
  },
  "/images/products/product-heat-detector-hls.webp": {
    width: 1616,
    height: 973,
  },
  "/images/products/product-ip-camera_a9ff88c6.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-keypad_29fa51ad.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-motion-detector_fe0fcfcb.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-motion-detectors-hls.webp": {
    width: 1808,
    height: 870,
  },
  "/images/products/product-nvr_bc9902c1.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-outdoor-sensor_0fd13f57.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-panic-button_a371132c.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-ptz-camera_3d15e3b3.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-siren_2a1ad663.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-sirens-hls.webp": {
    width: 1552,
    height: 1013,
  },
  "/images/products/product-smoke-detector_1fb36b49.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-smoke-sensors-hls.webp": {
    width: 1672,
    height: 941,
  },
  "/images/products/product-thermal-camera_1677d4af.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-video-analytics_5581bbdb.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-warning-system_52e4c14b.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/products/product-water-leak-sensor-hls.webp": {
    width: 1630,
    height: 965,
  },
  "/images/products/product-wireless-device_1fcd3988.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/services/alarm-system.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/services/armed-response.jpg": {
    width: 1600,
    height: 900,
  },
  "/images/services/cctv-camera.jpg": {
    width: 1600,
    height: 1200,
  },
  "/images/services/monitoring-center.jpg": {
    width: 1600,
    height: 900,
  },
};

export function imageDimensions(src: string) {
  return dimensions[src] || { width: 1600, height: 900 };
}
