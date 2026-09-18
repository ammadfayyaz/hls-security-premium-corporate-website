import { createServer } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createViteMiddlewareConfig } from "./vite";

const servers: ReturnType<typeof createServer>[] = [];

afterEach(() => {
  for (const server of servers.splice(0)) {
    server.close();
  }
});

describe("Vite middleware configuration", () => {
  it("attaches HMR to the Express HTTP server", () => {
    const server = createServer();
    servers.push(server);

    const config = createViteMiddlewareConfig(server);

    expect(config.appType).toBe("spa");
    expect(config.server?.middlewareMode).toBe(true);
    expect(config.server?.hmr).toEqual({ server });
  });
});
