import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

interface CTASectionProps {
  headline?: string;
  buttonText?: string;
  secondaryButtonText?: string;
}

/**
 * HLS Security — Final CTA Section
 * Large lead-generation section with gradient background
 */
export default function CTASection({
  headline = "Ready to Secure What Matters Most?",
  buttonText = "Book Your Free Consultation",
  secondaryButtonText = "Speak to a Security Expert",
}: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CC0000]/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CC0000]/10 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-8 bg-[#CC0000]" />
            <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
              Get Started Today
            </span>
            <span className="h-px w-8 bg-[#CC0000]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {headline}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Schedule your free security assessment with one of our experts. No obligation, no pressure — just professional advice tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="btn-gradient inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-base font-heading font-semibold group"
            >
              <Calendar className="w-5 h-5" />
              {buttonText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+15551002470"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white text-base font-heading font-semibold hover:border-[#CC0000]/30 transition-all duration-200"
            >
              {secondaryButtonText}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
