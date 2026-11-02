import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { imageDimensions } from "@/lib/imageDimensions";
import { responsiveImage } from "@/lib/responsiveImages";
import { serviceRoutes } from "@/lib/landingPages";

export default function Services() {
  return (
    <div className="bg-background">
      <SEO
        title="Professional Security Services"
        description="Explore HLS Security's professional monitoring, armed response, preventive maintenance, security audits, security guard, escort, and event security services."
        keywords="security services Pakistan, 24/7 monitoring, armed response, security guards, event security, security audits"
        path="/services"
      />
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[120px]" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#CC0000]" />
            <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
              Services
            </span>
            <span className="h-px w-8 bg-[#CC0000]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Professional Security Services
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            From professional monitoring and armed response to on-site personnel
            and event protection, HLS provides practical security service
            arrangements tailored to each client.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Service directory
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Choose the support your site needs
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Open a service page for its own description, benefits, process,
              FAQs, and contact pathway. Availability and arrangements are
              confirmed around the client’s requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceRoutes.map((service, index) => (
              <motion.a
                key={service.title}
                href={`/services/${service.landing.slug}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="glass-strong rounded-2xl overflow-hidden group hover:border-[#CC0000]/30 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.landing.image}
                    {...imageDimensions(service.landing.image)}
                    {...responsiveImage(service.landing.image, true)}
                    loading="lazy"
                    decoding="async"
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
                  <div className="absolute bottom-4 left-5 w-10 h-10 rounded-lg bg-[#CC0000]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#CC0000]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">
                    {service.landing.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[#CC0000]">
                    View service{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Get started
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Request a service consultation
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Tell us about your property, timing, and security priorities. Our
              existing inquiry form remains the fastest way to start a
              conversation.
            </p>
          </div>
          <LeadForm
            title="Request a Service"
            subtitle="Tell us what service you need and we'll get back to you."
            ctaText="Request Service"
            formName="Service Request"
          />
        </div>
      </section>
      <CTASection
        primaryHref="/contact#inquiry"
        headline="Ready to plan your security service?"
        buttonText="Contact HLS Security"
      />
    </div>
  );
}
