import { afterEach, describe, expect, it, vi } from "vitest";
import { submitInquiry } from "./inquiry";

const submission = {
  formName: "Newsletter Subscription",
  pageUrl: "https://hls.example/",
  fields: { Email: "visitor@example.com" },
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("submitInquiry", () => {
  it("posts to the central endpoint and resolves only on explicit success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitInquiry(submission)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/inquiry",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("rejects HTTP and false-success responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("error", { status: 502 })),
    );
    await expect(submitInquiry(submission)).rejects.toThrow("Inquiry submission failed");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false }), { status: 200 }),
      ),
    );
    await expect(submitInquiry(submission)).rejects.toThrow(
      "Inquiry submission was not accepted",
    );
  });
});
