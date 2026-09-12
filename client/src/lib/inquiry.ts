export interface InquirySubmission {
  formName: string;
  pageUrl: string;
  fields: Record<string, string>;
}

export async function submitInquiry(submission: InquirySubmission): Promise<void> {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error("Inquiry submission failed");
  }

  const result = (await response.json()) as { success?: boolean };
  if (result.success !== true) {
    throw new Error("Inquiry submission was not accepted");
  }
}
