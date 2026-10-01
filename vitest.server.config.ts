import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "netlify/functions/**/*.test.ts", "scripts/**/*.test.mjs"],
    testTimeout: 20_000,
  },
});
