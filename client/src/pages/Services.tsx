import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, Bell, Monitor, Camera, Zap, Flame, DoorOpen, Home as HomeIcon,
  Cpu, Wrench, Calendar, Check, ArrowRight, Clock, Phone,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import { allServices, primaryServices, secondaryServices } from "@/lib/data";
import SEO from "@/components/SEO";

/**
 * HLS Security — Services Page
 * Detailed service descriptions with process, benefits, and CTAs
 */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bell: Bell, monitor: Monitor, shield: Shield, camera: Camera, zap: Zap,
  flame: Flame, gate: DoorOpen, home: HomeIcon, cpu: Cpu, wrench: Wrench,
};

const serviceImages: Record<string, string> = {
  "Intruder Alarm Installation": "/images/services/alarm-system.jpg",
  "24/7 Monitoring": "/images/services/monitoring-center.jpg",
  "Armed Response": "/images/services/armed-response.jpg",
  "Preventive Maintenance": "/images/services/cctv-camera.jpg",
  "Annual Maintenance Contracts": "/images/services/alarm-system.jpg",
  "Remote Monitoring": "/images/services/monitoring-center.jpg",
  "Emergency Repairs": "/images/services/armed-response.jpg",
  "Security Audits": "/images/services/cctv-camera.jpg",
  "System Upgrades": "/images/products/home-automation.jpg",
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const service = allServices[activeService];

  return (
    <div className="bg-background">
    <SEO 
      title="Security Services — Installation, Monitoring, Armed Response & Maintenance"
      description="HLS Security offers professional security services including intruder alarm installation, 24/7 monitoring, armed response, preventive maintenance, security audits, and system upgrades."
      path="/services"
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
                Services
              </span>
              <span className="h-px w-8 bg-[#CC0000]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Professional Security Services
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              From installation to 24/7 monitoring to armed response — HLS delivers complete security service management backed by certified professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Primary Services Highlight */}
      <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Our Core Services"
            title="The Three Pillars of HLS Protection"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {primaryServices.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Shield;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="glass-strong rounded-2xl p-8 text-center hover:border-[#CC0000]/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#CC0000]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#CC0000]/20 transition-colors">
                    <Icon className="w-8 h-8 text-[#CC0000]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.description}</p>
                  <ul className="space-y-1.5 text-left">
                    {svc.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#CC0000] flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Services — Interactive List */}
      <section className="py-24">
        <div className="container">
          <SectionHeading
            eyebrow="All Services"
            title="Complete Security Service Portfolio"
            subtitle="Click any service to see detailed information including process, benefits, and response times."
            center
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Service List */}
            <div className="lg:col-span-1 space-y-2">
              {allServices.map((svc, i) => (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    activeService === i
                      ? "glass-strong border-[#CC0000]/30"
                      : "glass hover:border-[#CC0000]/20"
                  }`}
                >
                  <span className={`font-heading text-sm font-medium ${
                    activeService === i ? "text-[#CC0000]" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {svc.title}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-all ${
                    activeService === i ? "text-[#CC0000] translate-x-0" : "text-gray-600 group-hover:text-gray-400 -translate-x-1"
                  }`} />
                </button>
              ))}
            </div>

            {/* Service Detail */}
            <div className="lg:col-span-2">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={serviceImages[service.title] || "/images/backgrounds/hero-bg.jpg"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Overview */}
                  <p className="text-gray-300 leading-relaxed mb-6">{service.overview}</p>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="text-sm font-heading font-semibold text-[#CC0000] uppercase tracking-wider mb-3">
                      Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-[#CC0000] flex-shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="mb-6">
                    <h4 className="text-sm font-heading font-semibold text-[#CC0000] uppercase tracking-wider mb-3">
                      Process
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.process.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#CC0000]/20 flex items-center justify-center text-xs font-bold text-[#CC0000]">
                            {i + 1}
                          </span>
                          <span className="text-sm text-gray-300">{step}</span>
                          {i < service.process.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-gray-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="glass rounded-lg p-4 mb-6 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#CC0000]" />
                    <div>
                      <span className="text-xs font-heading font-semibold text-[#CC0000] uppercase tracking-wider">
                        Response Time
                      </span>
                      <p className="text-sm text-gray-300">{service.responseTime}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="/contact"
                    className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-heading font-semibold group"
                  >
                    <Calendar className="w-4 h-4" />
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Services */}
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Additional Services"
            title="Specialized Security Solutions"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {secondaryServices.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Shield;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass rounded-xl p-6 hover:border-[#CC0000]/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#CC0000]/10 flex items-center justify-center mb-4 group-hover:bg-[#CC0000]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#CC0000]" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">{svc.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.description}</p>
                  <a href="/contact" className="text-sm font-heading font-semibold text-[#CC0000] hover:text-[#E60000] transition-colors">
                    Learn More →
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Get Started"
                title="Request a Service"
                subtitle="Whether you need installation, monitoring, maintenance, or emergency repair — our team is ready to help."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5">
                  <Phone className="w-5 h-5 text-[#CC0000] mb-2" />
                  <div className="text-sm font-heading font-semibold text-white">24/7 Support</div>
                  <div className="text-xs text-gray-500">+1 (555) 100-2470</div>
                </div>
                <div className="glass rounded-xl p-5">
                  <Clock className="w-5 h-5 text-[#CC0000] mb-2" />
                  <div className="text-sm font-heading font-semibold text-white">Fast Response</div>
                  <div className="text-xs text-gray-500">Within 2 hours</div>
                </div>
              </div>
            </div>
            <LeadForm
              title="Request a Service"
              subtitle="Tell us what service you need and we'll get back to you within 24 hours."
              ctaText="Request Service"
            />
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Upgrade Your Security Service?"
        buttonText="Book Free Consultation"
      />
    </div>
  );
}
