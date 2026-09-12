import { inquiryInputSchema, sendInquiryEmail } from "../../server/inquiry";

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

interface NetlifyResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const jsonHeaders = { "Content-Type": "application/json; charset=utf-8" };

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...jsonHeaders, Allow: "POST" },
      body: JSON.stringify({ success: false, message: "Method not allowed." }),
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(event.body ?? "");
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        message: "Please check your information and try again.",
      }),
    };
  }

  const parsed = inquiryInputSchema.safeParse(body);
  if (!parsed.success) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        message: "Please check your information and try again.",
      }),
    };
  }

  try {
    await sendInquiryEmail(parsed.data);
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("[Inquiry Function] Submission failed", error);
    return {
      statusCode: 502,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        message: "Unable to submit your request at this time.",
      }),
    };
  }
}
