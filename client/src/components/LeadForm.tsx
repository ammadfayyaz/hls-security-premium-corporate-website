import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { getProductQuoteWhatsAppUrl } from "@/lib/whatsapp";
import { submitInquiry } from "@/lib/inquiry";

interface LeadFormProps {
  variant?: "card" | "inline";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  whatsappProductName?: string;
  formName?: string;
}

/**
 * HLS Security — Lead Generation Form
 * Used for quote requests, consultations, site surveys
 */
export default function LeadForm({
  variant = "card",
  title = "Request a Free Security Assessment",
  subtitle = "Fill out the form below and our security experts will contact you within 24 hours.",
  ctaText = "Request Assessment",
  whatsappProductName,
  formName = title,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submissionLock = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (whatsappProductName) {
      window.open(
        getProductQuoteWhatsAppUrl(whatsappProductName),
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (loading || submissionLock.current) return;
    submissionLock.current = true;
    setLoading(true);
    setSubmitError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const propertyType = form.elements.namedItem("propertyType") as HTMLSelectElement | null;
    const serviceInterest = form.elements.namedItem("serviceInterest") as HTMLSelectElement | null;
    const selectedText = (select: HTMLSelectElement | null) =>
      select?.value ? select.selectedOptions[0]?.text ?? select.value : "";

    try {
      await submitInquiry({
        formName,
        pageUrl: window.location.href,
        fields: {
          "Customer Name": String(formData.get("name") ?? ""),
          Phone: String(formData.get("phone") ?? ""),
          Email: String(formData.get("email") ?? ""),
          "Property Type": selectedText(propertyType),
          "Service Interest": selectedText(serviceInterest),
          Message: String(formData.get("message") ?? ""),
        },
      });
      setLoading(false);
      setSubmitted(true);
    } catch {
      submissionLock.current = false;
      setLoading(false);
      setSubmitError(
        "Unable to submit your request at this time. Please try again or contact us directly.",
      );
    }
  };

  const formContent = (
    <>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 rounded-full bg-[#CC0000]/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#CC0000]" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-gray-400">Your request has been received. One of our security experts will contact you within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
                Full Name *
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="John Smith"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
                Phone Number *
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
                Property Type
              </label>
              <select
                name="propertyType"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all"
              >
                <option value="" className="bg-[#161616]">Select type</option>
                <option value="residential" className="bg-[#161616]">Residential</option>
                <option value="commercial" className="bg-[#161616]">Commercial</option>
                <option value="industrial" className="bg-[#161616]">Industrial</option>
                <option value="enterprise" className="bg-[#161616]">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
                Service Interest
              </label>
              <select
                name="serviceInterest"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all"
              >
                <option value="" className="bg-[#161616]">Select service</option>
                <option value="intruder" className="bg-[#161616]">Intruder Alarm Systems</option>
                <option value="monitoring" className="bg-[#161616]">24/7 Monitoring</option>
                <option value="armed" className="bg-[#161616]">Armed Response</option>
                <option value="cctv" className="bg-[#161616]">CCTV Surveillance</option>
                <option value="fire" className="bg-[#161616]">Fire Detection</option>
                <option value="automation" className="bg-[#161616]">Home Automation</option>
                <option value="full" className="bg-[#161616]">Complete Security Solution</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-heading font-medium text-gray-300 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell us about your security needs..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CC0000]/50 focus:ring-1 focus:ring-[#CC0000]/30 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white text-base font-heading font-semibold disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {ctaText}
              </>
            )}
          </button>
          {submitError && (
            <p role="alert" className="text-sm text-red-400 text-center">
              {submitError}
            </p>
          )}
          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to be contacted by HLS Security. We respect your privacy.
          </p>
        </form>
      )}
    </>
  );

  if (variant === "inline") {
    return (
      <div>
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      {formContent}
    </div>
  );
}
