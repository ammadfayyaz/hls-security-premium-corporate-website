import { request } from "node:https";
import { describe, expect, it } from "vitest";

function getResendDomainsStatus(apiKey: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const req = request(
      "https://api.resend.com/domains",
      { method: "GET", headers: { Authorization: `Bearer ${apiKey}` } },
      response => {
        response.resume();
        resolve(response.statusCode ?? 0);
      },
    );
    req.setTimeout(10_000, () => req.destroy(new Error("Resend validation timed out")));
    req.on("error", reject);
    req.end();
  });
}

describe.runIf(Boolean(process.env.RESEND_API_KEY))(
  "Resend inquiry email configuration",
  () => {
    it("authenticates with Resend and has required server-side email settings", async () => {
      expect(process.env.LEAD_NOTIFICATION_EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(process.env.EMAIL_FROM).toBeTruthy();
      expect(await getResendDomainsStatus(process.env.RESEND_API_KEY!)).toBe(200);
    });
  },
);
