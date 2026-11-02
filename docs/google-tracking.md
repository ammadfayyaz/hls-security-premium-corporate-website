# HLS Google tracking configuration

Google identifiers are managed through the existing Manus **Settings → Secrets** interface:

| Setting                   | Purpose                           | Format / source                                                                                      |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `VITE_GA4_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-` plus 10 uppercase letters/digits. Google Analytics → Admin → Data streams → Web stream.         |
| `VITE_GTM_CONTAINER_ID`   | Google Tag Manager Container ID   | `GTM-` plus uppercase letters/digits. GTM → container workspace header / Install Google Tag Manager. |

These are public identifiers, not API credentials. Only these two values and the resolved mode are embedded in HTML; no public Secrets-store endpoint is added. Existing admin permissions are unchanged.

## One Google tracking owner

1. A valid GTM ID selects **GTM mode**. The official head bootstrap and body noscript iframe are injected once globally. GA4 and its automatic initial/history page views are owned by the published container. The React page-view helper does **not** send extra page views in this mode. Existing application conversion events are pushed to `dataLayer` as native custom-event objects.
2. A valid GA4 ID with a blank GTM ID selects **direct GA4 mode**. The async official Google tag is loaded once using the configured ID. Automatic initial page-view sending is disabled, and the existing React tracker sends manual page views after route-specific titles have updated. **Before switching to this fallback, disable GA4 enhanced-measurement browser-history page views for that stream**; otherwise the property's automatic history measurement can duplicate the manual SPA page views. No GTM loader or iframe is included in direct mode.
3. Both blank selects **off mode**. No Google scripts are requested. Links, navigation, and form submission do not depend on analytics.

Malformed nonblank values produce explicit setting-name/format errors before a preview HTML/tracking build is accepted. Pure validation tests cover malformed, whitespace, partial, missing, and independently configured settings. **The Manus-hosted Secrets editor itself is not customized**: it may store arbitrary text, but the application refuses malformed tracking configuration rather than loading it. A format check or a script HTTP 200 is not proof of GA4 property delivery.

## Google Tag Manager maintenance

Changing `VITE_GA4_MEASUREMENT_ID` in Secrets does **not** change a published GTM destination. In GTM mode, update the existing Google Analytics/Google tag destination and the HLS GA4 event tag inside GTM, then Preview and publish that container. Keep the website setting aligned with the published destination for clarity.

The HLS GA4 conversion tag uses the native GA4 Event template and `{{Event}}`, with one custom-event regex trigger:

```text
^(whatsapp_click|quote_request|contact_form_submit)$
```

It maps these existing non-personal context fields through native Data Layer Variables: `source`, `product_name`, `method`, `form_name`. Product requests generate a WhatsApp click and a quote-request event intentionally; these are two distinct metrics, not duplicate copies of the same event. A `contact_form_submit` event occurs only after the email-backed API reports success, not on failed attempts. Name, email, telephone, message, and other visitor form contents are not added to these custom events.

The Google Analytics startup tag has only **Initialization - All Pages**, not both Initialization and All Pages. Preserve the existing container's automatic event detection, user-provided-data settings, and consent controls. No Google Ads destination was found in the audited website or container. This is not a claim of privacy-law compliance: consent requirements and the existing container's separately enabled automatic user-provided-data settings should be reviewed by the owner before deploying to a jurisdiction requiring consent.

`prepare-gtm-context.py` can create an additive context-mapping import from a real workspace export. Always back up the current container, use **Merge → overwrite conflicting names**, inspect the calculated preview for **zero deletions**, and never replace the entire container or unrelated tags/settings.

## Builds, previews, and Netlify

Vite injects the public configuration into the global HTML during development and builds. All 18 prerendered public routes inherit the same bootstrap. Source IDs are not hardcoded; approved generated build output necessarily contains public IDs.

A **new production build/deploy is required after changing these build-time settings**. Saving a Manus secret does not update a Netlify-built bundle. Configure the same two identifiers in the existing Netlify site's build/production environment, preserve all other environment variables, and trigger the normal production build only after the code and settings are synchronized. Do not push a build expecting these settings while Netlify lacks both values, because that would legitimately select off mode.

After deployment, verify root and direct nested-route HTML, the GTM head and body snippets, one container network load, the GA4 destination ID, exactly one initial/history page view per tested navigation, and the three application conversion events in network traffic and GA4 Realtime/DebugView. Keep lab/preview verification distinct from verification of the actual production domain. Mark key events in GA4 only if desired by the owner; this integration preserves the event names but does not silently change the property's key-event configuration.

## Verification commands

```sh
pnpm test
pnpm run check
pnpm run build
node scripts/verify-seo-build.mjs
```

Settings tests fetch only Google's public loader URL and do not submit events or access unrelated credentials. Runtime analytics errors are contained so links and forms can still operate.
