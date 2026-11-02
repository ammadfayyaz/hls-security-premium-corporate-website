import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { getServiceBySlug } from "@/lib/landingPages";
import {
  Breadcrumbs,
  RelatedLandingLinks,
} from "@/components/LandingNavigation";
import { serviceDeliveryNotes } from "@/lib/landingSupport";
import { imageDimensions } from "@/lib/imageDimensions";
import { responsiveImage } from "@/lib/responsiveImages";

type ServiceDetailProps = {
  service: NonNullable<ReturnType<typeof getServiceBySlug>>;
};

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const { landing } = service;
  const delivery = serviceDeliveryNotes[landing.slug];
  return (
    <div className="bg-background">
      <SEO
        title={landing.heading}
        description={landing.description}
        keywords={landing.keywords}
        path={`/services/${landing.slug}`}
        image={landing.image}
      />
      <Breadcrumbs path={`/services/${landing.slug}`} />
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[120px]" />
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-4">
              Services
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {landing.heading}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              {landing.intro}
            </p>
            <a
              href="/contact#inquiry"
              className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-heading font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Discuss Your Requirements{" "}
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative rounded-2xl overflow-hidden h-64 md:h-80"
          >
            <img
              src={landing.image}
              alt={`${service.title} with HLS Security`}
              {...imageDimensions(landing.image)}
              {...responsiveImage(landing.image)}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/20 to-transparent" />
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-5">
              Who can use this service?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {landing.suitableFor}
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock aria-hidden="true" className="w-5 h-5 text-[#CC0000]" />
              <h2 className="text-sm font-heading font-semibold text-[#CC0000] uppercase tracking-wider">
                Service availability
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {delivery?.availability || service.responseTime}
            </p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10">
            Benefits and service process
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-strong rounded-2xl p-7">
              <h3 className="font-display text-xl font-bold text-white mb-5">
                Key benefits
              </h3>
              <ul className="space-y-3">
                {(delivery?.benefits || service.benefits).map(benefit => (
                  <li key={benefit} className="text-gray-300 flex gap-3">
                    <span aria-hidden="true" className="text-[#CC0000]">
                      —
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-strong rounded-2xl p-7">
              <h3 className="font-display text-xl font-bold text-white mb-5">
                How it is arranged
              </h3>
              <ol className="space-y-4">
                {service.process.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="w-7 h-7 rounded-full bg-[#CC0000]/20 flex items-center justify-center text-xs font-bold text-[#CC0000] flex-shrink-0"
                    >
                      {index + 1}
                    </span>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Questions about {service.title}
          </h2>
          <div className="space-y-4">
            {landing.faq.map(([question, answer]) => (
              <div key={question} className="glass rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {question}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RelatedLandingLinks slug={landing.slug} />
      <section className="py-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Plan {service.title.toLowerCase()} around your requirements
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Share your site, timing, and priorities with HLS. We’ll discuss a
              suitable arrangement with our team. Operational services and
              availability are subject to confirmation.
            </p>
          </div>
          <LeadForm
            title={`Request ${service.title}`}
            subtitle="Tell us what you need and our team will get back to you."
            ctaText="Request Service"
            formName={`${service.title} Request`}
            defaultServiceInterest={landing.slug}
          />
        </div>
      </section>
      <CTASection
        headline={`Ready to discuss ${service.title}?`}
        buttonText="Contact HLS Security"
        primaryHref="/contact#inquiry"
      />
    </div>
  );
}
