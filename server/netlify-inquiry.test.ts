import { afterEach, describe, expect, it, vi } from "vitest";
import { handler } from "../netlify/functions/inquiry";

const validBody = JSON.stringify({
  formName: "Contact — Send Us a Message",
  pageUrl: "https://hls-world.netlify.app/contact",
  fields: { Email: "visitor@example.com", Message: "Please contact me." },
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Netlify inquiry adapter", () => {
  it("rejects unsupported methods and invalid payloads", async () => {
    expect(await handler({ httpMethod: "GET", body: null })).toMatchObject({
      statusCode: 405,
    });
    expect(await handler({ httpMethod: "POST", body: "{" })).toMatchObject({
      statusCode: 400,
    });
  });

  it("returns success only after provider acceptance", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("LEAD_NOTIFICATION_EMAIL", "leads@example.com");
    vi.stubEnv("EMAIL_FROM", "HLS Website <website@example.com>");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: "netlify_email_123" }), { status: 200 }),
      ),
    );

    const response = await handler({ httpMethod: "POST", body: validBody });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ success: true });
  });

  it("returns an error when provider acceptance fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("LEAD_NOTIFICATION_EMAIL", "leads@example.com");
    vi.stubEnv("EMAIL_FROM", "HLS Website <website@example.com>");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("provider error", { status: 500 })),
    );

    const response = await handler({ httpMethod: "POST", body: validBody });
    expect(response.statusCode).toBe(502);
    expect(JSON.parse(response.body).success).toBe(false);
  });
});
