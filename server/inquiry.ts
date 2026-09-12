import { z } from "zod";

const FIELD_NAME_MAX = 80;
const FIELD_VALUE_MAX = 5_000;

export const inquiryInputSchema = z.object({
  formName: z.string().trim().min(1).max(120),
  pageUrl: z.string().trim().url().max(2_048),
  fields: z
    .record(
      z.string().trim().min(1).max(FIELD_NAME_MAX),
      z.string().trim().max(FIELD_VALUE_MAX),
    )
    .refine(fields => Object.keys(fields).length > 0, "At least one field is required")
    .refine(fields => Object.keys(fields).length <= 20, "Too many fields"),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;

export class InquiryDeliveryError extends Error {
  constructor(message = "Inquiry email delivery was not accepted") {
    super(message);
    this.name = "InquiryDeliveryError";
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanSubjectPart(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

function populatedFields(fields: InquiryInput["fields"]): Array<[string, string]> {
  return Object.entries(fields).filter(([, value]) => value.trim().length > 0);
}

export function buildInquiryEmail(input: InquiryInput, submittedAt = new Date()) {
  const entries = populatedFields(input.fields);
  const topic =
    input.fields["Service Interest"] ||
    input.fields.Product ||
    input.fields["Property Type"] ||
    input.formName;
  const subject = `NEW WEBSITE INQUIRY — ${cleanSubjectPart(topic)}`;
  const submittedAtIso = submittedAt.toISOString();

  const fieldText = entries
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");
  const text = [
    "NEW WEBSITE INQUIRY",
    "",
    fieldText,
    "",
    "SOURCE INFORMATION",
    `Website Page:\n${input.pageUrl}`,
    `Form:\n${input.formName}`,
    `Date & Time:\n${submittedAtIso}`,
  ]
    .filter(Boolean)
    .join("\n");

  const fieldRows = entries
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:8px 12px;text-align:left;vertical-align:top;color:#555;border-bottom:1px solid #eee;">${escapeHtml(label)}</th>
          <td style="padding:8px 12px;white-space:pre-wrap;border-bottom:1px solid #eee;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#1a1a1a;">
      <h1 style="font-size:22px;margin-bottom:20px;color:#b40000;">NEW WEBSITE INQUIRY</h1>
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">${fieldRows}</table>
      <h2 style="font-size:16px;margin-bottom:10px;">SOURCE INFORMATION</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><th style="padding:8px 12px;text-align:left;color:#555;">Website Page</th><td style="padding:8px 12px;">${escapeHtml(input.pageUrl)}</td></tr>
        <tr><th style="padding:8px 12px;text-align:left;color:#555;">Form</th><td style="padding:8px 12px;">${escapeHtml(input.formName)}</td></tr>
        <tr><th style="padding:8px 12px;text-align:left;color:#555;">Date &amp; Time</th><td style="padding:8px 12px;">${escapeHtml(submittedAtIso)}</td></tr>
      </table>
    </div>`;

  const replyTo = input.fields.Email?.trim();
  return {
    subject,
    text,
    html,
    replyTo: replyTo && z.string().email().safeParse(replyTo).success ? replyTo : undefined,
  };
}

export async function sendInquiryEmail(input: InquiryInput): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error("[Inquiry Email] Missing required server-side email configuration");
    throw new InquiryDeliveryError("Email service is not configured");
  }

  const email = buildInquiryEmail(input);
  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: email.subject,
        html: email.html,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    console.error("[Inquiry Email] Resend request failed", error);
    throw new InquiryDeliveryError();
  }

  const rawBody = await response.text();
  if (!response.ok) {
    console.error("[Inquiry Email] Resend rejected request", {
      status: response.status,
      response: rawBody.slice(0, 1_000),
    });
    throw new InquiryDeliveryError();
  }

  let id = "";
  try {
    id = (JSON.parse(rawBody) as { id?: string }).id ?? "";
  } catch {
    // Resend must return an accepted email identifier.
  }

  if (!id) {
    console.error("[Inquiry Email] Resend accepted request without an email id");
    throw new InquiryDeliveryError();
  }

  return { id };
}
