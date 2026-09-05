import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, AlertCircle,
  Calendar, FileText, ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";

/**
 * HLS Security — Contact Page
 * Modern contact page with form, map, and multiple contact methods
 */

export default function Contact() {
  return (
    <div className="bg-background">
    <SEO 
      title="Contact HLS Security — Free Security Assessment & Quotes"
      description="Contact HLS Security for a free security assessment, product quotes, or 24/7 emergency support. Call 042-111-457-911 or message us today."
      path="/contact"
    />
      {/* Page Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[120px]" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#CC0000]" />
              <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
                Contact Us
              </span>
              <span className="h-px w-8 bg-[#CC0000]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Let's Secure What Matters Most
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Reach out to our security experts. Whether you need a free assessment, a quote, or emergency assistance — we're here 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="glass-strong rounded-2xl p-6 hover:border-[#CC0000]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center mb-4 group-hover:bg-[#CC0000]/20 transition-colors">
                <Phone className="w-6 h-6 text-[#CC0000]" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-2">Phone</h3>
              <a href="tel:042111457911" className="text-lg text-gray-300 hover:text-[#CC0000] transition-colors">
                042-111-457-911
              </a>
              <p className="text-xs text-gray-500 mt-1">24/7 Support Line</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="glass-strong rounded-2xl p-6 hover:border-[#CC0000]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center mb-4 group-hover:bg-[#CC0000]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#CC0000]" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-2">Email</h3>
              <a href="mailto:info@hls-security.com" className="text-lg text-gray-300 hover:text-[#CC0000] transition-colors break-all">
                info@hls-security.com
              </a>
              <p className="text-xs text-gray-500 mt-1">Response within 24h</p>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="glass-strong rounded-2xl p-6 hover:border-[#25D366]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-2">WhatsApp</h3>
              <a href="https://wa.me/923001457911" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-300 hover:text-[#25D366] transition-colors">
                Chat with us
              </a>
              <p className="text-xs text-gray-500 mt-1">Quick messaging</p>
            </motion.div>

            {/* Emergency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="glass-strong rounded-2xl p-6 border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-2">Emergency</h3>
              <a href="tel:+9242111457911" className="text-lg text-gray-300 hover:text-red-400 transition-colors">
                042-111-457-911
              </a>
              <p className="text-xs text-gray-500 mt-1">Immediate response</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Site Survey Request */}
      <section className="py-24 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Site Survey"
                title="Request a Site Survey"
                subtitle="Our security experts will visit your property, assess your needs, and design a custom security solution — completely free."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5">
                  <Calendar className="w-5 h-5 text-[#CC0000] mb-2" />
                  <div className="text-sm font-heading font-semibold text-white">Flexible Scheduling</div>
                  <div className="text-xs text-gray-500">We work around your hours</div>
                </div>
                <div className="glass rounded-xl p-5">
                  <FileText className="w-5 h-5 text-[#CC0000] mb-2" />
                  <div className="text-sm font-heading font-semibold text-white">Detailed Report</div>
                  <div className="text-xs text-gray-500">Full assessment included</div>
                </div>
              </div>
            </div>
            <LeadForm
              title="Book Your Site Survey"
              subtitle="Schedule a free on-site security assessment."
              ctaText="Book Site Survey"
            />
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div>
              <SectionHeading
                eyebrow="Get in Touch"
                title="We're Here to Help"
                subtitle="Reach out through any of these channels. Our team is available 24/7 for all your security needs."
              />

              {/* Office Info */}
              <div className="mt-8 space-y-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#CC0000]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white mb-1">Office Address</h4>
                      <p className="text-sm text-gray-400">
                        73 Munir Road<br />
                        Lahore Cantt.<br />
                        Pakistan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#CC0000]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white mb-1">Business Hours</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Office Hours</span>
                          <span style={{marginLeft: '20px'}}>9:00 AM – 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monitoring Center</span>
                          <span className="text-[#CC0000]">24/7/365</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Armed Response</span>
                          <span className="text-[#CC0000]">24/7/365</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emergency Repairs</span>
                          <span className="text-[#CC0000]">24/7/365</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#CC0000]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white mb-1">Why Contact HLS?</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Free, no-obligation security assessment</li>
                        <li>• Response within 24 hours guaranteed</li>
                        <li>• Certified security experts</li>
                        <li>• Custom solutions for every budget</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <LeadForm
              title="Send Us a Message"
              subtitle="Fill out the form and our team will get back to you within 24 hours."
              ctaText="Send Message"
            />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-24">
        <div className="container">
          <SectionHeading
            eyebrow="Visit Us"
            title="Our Location"
            center
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 glass-strong rounded-2xl overflow-hidden h-96 relative"
          >
            {/* Map placeholder with gradient and grid pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#161616] to-[#0B0B0B]" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 157, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 157, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Center pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="relative">
                <MapPin className="w-12 h-12 text-[#CC0000] mx-auto" fill="#CC0000" fillOpacity={0.2} />
                <div className="absolute inset-0 bg-[#CC0000]/20 blur-xl rounded-full animate-pulse-glow" />
              </div>
              <p className="mt-4 font-heading text-sm font-semibold text-white">HLS Security Headquarters</p>
              <p className="text-xs text-gray-500">73 Munir Road Lahore Cantt. Pakistan</p>
            </div>
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#CC0000]/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#CC0000]/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#CC0000]/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#CC0000]/30 rounded-br-lg" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
