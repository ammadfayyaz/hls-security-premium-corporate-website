/**
 * HLS Security — Product quotation WhatsApp links
 * Uses WhatsApp's digits-only international phone format and URL-encodes product-specific messages.
 */

const HLS_WHATSAPP_NUMBER = "923001457911";

export function getProductQuoteWhatsAppUrl(productName: string): string {
  const message = `Hello HLS, I am interested in getting a quotation for ${productName}. Please provide me with more information.`;

  return `https://wa.me/${HLS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
