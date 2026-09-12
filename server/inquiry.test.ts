import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildInquiryEmail,
  inquiryInputSchema,
  sendInquiryEmail,
} from "./inquiry";

const sampleInquiry = {
  formName: "Site Survey",
  pageUrl: "https://hls.example/contact",
  fields: {
    "Customer Name": "Test Customer",
    Phone: "042-111-457-911",
    Email: "customer@example.com",
    "Property Type": "Commercial",
    "Service Interest": "Intruder Alarm Systems",
    Message: "Please survey our premises.",
    Empty: "",
  },
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("inquiry payload validation", () => {
  it("accepts flexible populated fields and rejects invalid sources", () => {
    expect(inquiryInputSchema.safeParse(sampleInquiry).success).toBe(true);
    expect(
      inquiryInputSchema.safeParse({ ...sampleInquiry, pageUrl: "not-a-url" }).success,
    ).toBe(false);
    expect(inquiryInputSchema.safeParse({ ...sampleInquiry, fields: {} }).success).toBe(false);
  });
});

describe("inquiry email formatting", () => {
  it("includes submitted fields and source metadata while omitting empty values", () => {
    const email = buildInquiryEmail(
      sampleInquiry,
      new Date("2026-09-12T08:30:00.000Z"),
    );

    expect(email.subject).toBe("NEW WEBSITE INQUIRY — Intruder Alarm Systems");
    expect(email.text).toContain("Customer Name:\nTest Customer");
    expect(email.text).toContain("Website Page:\nhttps://hls.example/contact");
    expect(email.text).toContain("Form:\nSite Survey");
    expect(email.text).toContain("Date & Time:\n2026-09-12T08:30:00.000Z");
    expect(email.text).not.toContain("Empty:");
    expect(email.replyTo).toBe("customer@example.com");
  });

  it("escapes visitor-controlled HTML", () => {
    const email = buildInquiryEmail({
      ...sampleInquiry,
      fields: { Message: "<script>alert('x')</script>" },
    });

    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});

describe("Resend delivery", () => {
  it("returns the provider id only after Resend accepts the email", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("LEAD_NOTIFICATION_EMAIL", "leads@example.com");
    vi.stubEnv("EMAIL_FROM", "HLS Website <website@example.com>");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_test_123" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(sendInquiryEmail(sampleInquiry)).resolves.toEqual({
      id: "email_test_123",
    });
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const payload = JSON.parse(String(init.body));
    expect(payload.to).toEqual(["leads@example.com"]);
    expect(payload.reply_to).toBe("customer@example.com");
  });

  it("rejects provider failures instead of reporting false success", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("LEAD_NOTIFICATION_EMAIL", "leads@example.com");
    vi.stubEnv("EMAIL_FROM", "HLS Website <website@example.com>");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "provider failure" }), { status: 500 }),
      ),
    );

    await expect(sendInquiryEmail(sampleInquiry)).rejects.toThrow(
      "Inquiry email delivery was not accepted",
    );
  });
});
