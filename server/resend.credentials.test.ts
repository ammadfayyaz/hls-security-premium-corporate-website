import { describe, expect, it } from "vitest";

/** An intentionally empty request authenticates the send-only key but cannot send email. */
async function checkResendSendPermission(apiKey: string): Promise<{ status: number; name?: string }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: "{}",
    signal: AbortSignal.timeout(10_000),
  });
  const body = await response.json() as { name?: string };
  return { status: response.status, name: body.name };
}

describe.runIf(Boolean(process.env.RESEND_API_KEY))(
  "Resend inquiry email configuration",
  () => {
    it("accepts the send-only credential and has required server-side email settings without sending an email", async () => {
      expect(process.env.LEAD_NOTIFICATION_EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(process.env.EMAIL_FROM).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      const result = await checkResendSendPermission(process.env.RESEND_API_KEY!);
      expect(result).toEqual({ status: 422, name: "missing_required_field" });
    });
  },
);
