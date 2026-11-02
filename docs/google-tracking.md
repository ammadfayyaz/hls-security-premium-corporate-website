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

## Verified implementation snapshot — 2 November 2026

The current settings supplied through Secrets are `G-0NH2L4FQ5V` and `GTM-K5W62GN4`. The previous source used `G-HV2YJJ3NZP`; the newly supplied stream was intentionally selected during the settings update. The two properties' historical data is not merged by an ID change.

GTM **version 3** was published on 2 November 2026 with one existing GA4 startup tag, one native GA4 conversion event tag, one exact-event trigger, and four context variables. Existing automatic-event/user-provided-data settings were retained; there were no container-item deletions.

All **133 unit/integration tests**, TypeScript, the production build, and the 18-page static SEO validator passed. Isolated stock Chromium testing against the actual production build and published container confirmed:

- One GTM loader and body noscript fallback; no direct GA4 loader.
- Correct GA4 destination `G-0NH2L4FQ5V` in Google collection requests.
- Exactly one initial `page_view` and one additional `page_view` after SPA navigation to Contact, with the correct updated title.
- One `whatsapp_click` and one `quote_request` from a real product-card interaction, retaining `Control Panels`, source, and WhatsApp method.
- Zero `contact_form_submit` events for a mocked API failure, and exactly one for the mocked success, retaining `Site Survey` as the form name and clearing prior product context.
- Google collection responses **HTTP 204** and no page JavaScript errors. No form email was sent during this QA.

This proves that requests were accepted by Google's collection endpoint, not by itself that reports have processed them. GA4 Realtime/DebugView and the final live Netlify deployment remain separate checks. The managed preview browser failed to fetch Google's external script and Tag Assistant did not connect there; the independent Chromium check establishes that the production-build integration itself loads and sends the expected events. Do not mark Tag Assistant's managed-preview connection as passed.

Independent browser checks also passed with both IDs blank, direct GA4 only, and GTM only. Each case retained Contact navigation, all three Contact forms, and WhatsApp links without JavaScript errors or an extra Google loader.

## Production build configuration

On 2 November 2026, the same two public identifiers were added to the existing Netlify project **hls-world**, whose dashboard currently links to `https://hlssecurity.pk`. Both values are configured for **Production only**. Other deploy-context values remain empty. The existing plan permits All scopes, which includes Builds; no plan upgrade or permission change was made. Existing email variables, Resend credentials, site domains, canonical configuration, and build settings were not modified.

The earlier Netlify bundle had selected off mode because these build variables were absent. Rebuild the connected production branch after saving the values; the existing bundle cannot update itself. Keep future changes aligned between Manus Secrets and Netlify production variables. In GTM mode, changing the GA4 destination also requires updating and publishing the GTM tags. The actual deployed configuration can be checked in the public `hls-tracking-config` JSON element, which contains only these public IDs and the resolved mode.

## Netlify route compatibility correction

Live tracking QA identified an existing generated redirect defect: `/contact/ /contact 301!` and equivalent rules matched both paths after Netlify's normalization, causing every non-root direct page visit to loop. Netlify explicitly documents this limitation in its [redirect options](https://docs.netlify.com/manage/routing/redirects/redirect-options/#trailing-slash). Removed only those unsupported slash-only rules. The existing page-to-prerender rewrites and inquiry API route remain unchanged; URLs, canonicals, metadata, sitemap, noindex handling, domain configuration, and page content remain unchanged. Slash variants resolve to the same canonical page on Netlify. Express retains its independent raw-path slash redirect behavior.

The build validator now rejects normalized self-redirects and checks that slash aliases resolve safely with the correct page title and canonical metadata. This correction is necessary for direct visits and live tracking verification; no new redirect service, edge function, dependency, or hosting configuration was added.
