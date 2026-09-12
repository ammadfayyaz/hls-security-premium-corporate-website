# Inquiry Email Verification

## Responsive visual checks

The homepage was checked at a 390 × 844 viewport. The existing mobile hero image, navigation, floating WhatsApp button, and call button remain correctly positioned and visually unchanged.

The Contact page was checked at a 390 × 844 viewport. Its existing mobile heading, contact information cards, spacing, and floating contact controls remain intact. The inquiry integration introduced no visible layout changes in the captured viewport.

## Functional checks

The shared endpoint accepted labeled test submissions for the homepage assessment, site survey, contact message, service request, risk assessment, and newsletter forms. Each response returned explicit success only after Resend acceptance. Invalid input returned HTTP 400.

Unit tests cover payload validation, HTML escaping, field and source formatting, Resend acceptance, Resend failure handling, client success/failure handling, Netlify adapter behavior, credential authentication, and all pre-existing product WhatsApp URL cases. The Netlify function also bundles successfully with esbuild.
