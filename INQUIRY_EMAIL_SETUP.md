# Inquiry Email Setup

The website posts all email-backed visitor forms to the same relative endpoint:

```text
POST /api/inquiry
```

The endpoint validates the payload, formats a professional HTML and plain-text email, sends it through Resend, and returns success only after Resend provides an accepted email ID. Product quotation forms remain on their existing product-specific WhatsApp workflow.

## Required environment variables

| Variable | Purpose | Example format |
|---|---|---|
| `RESEND_API_KEY` | Server-only API credential used to call Resend | `re_...` |
| `LEAD_NOTIFICATION_EMAIL` | Inbox that receives all website inquiries | `leads@your-domain.com` |
| `EMAIL_FROM` | Verified sender identity used by Resend | `HLS Website <website@your-domain.com>` |

Never add real values to frontend code, GitHub, or committed `.env` files.

## Resend setup

Add and verify the sending domain in Resend, then use an address on that domain in `EMAIL_FROM`. The implementation sets a valid visitor email as `reply_to`, allowing the HLS team to reply directly from the notification email.

## Manus production

The three variables are configured as server-side project secrets. The Express server handles `/api/inquiry` directly in development and Manus production.

## Netlify production

Add the same three variables under **Site configuration → Environment variables** for the production context. The repository includes `netlify/functions/inquiry.ts` and a `netlify.toml` redirect that maps `/api/inquiry` to the serverless function before the SPA fallback.

After adding or changing environment variables, trigger a new production deployment so Netlify builds the function with the current configuration.

## Verification commands

```bash
pnpm test
pnpm run check
pnpm run build
```

The server test suite authenticates the configured Resend key when it is available, while unit tests use mocked provider responses and do not expose credentials.
