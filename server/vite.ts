import type { Server } from "node:http";
import type { InlineConfig } from "vite";

export function createViteMiddlewareConfig(server: Server): InlineConfig {
  return {
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "spa",
  };
}
