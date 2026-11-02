import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Camera,
  DoorOpen,
  Flame,
  Home as HomeIcon,
  Zap,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { imageDimensions } from "@/lib/imageDimensions";
import { responsiveImage } from "@/lib/responsiveImages";
import { productCategoryRoutes } from "@/lib/landingPages";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bell: Bell,
  camera: Camera,
  zap: Zap,
  flame: Flame,
  gate: DoorOpen,
  home: HomeIcon,
};

export default function Products() {
  return (
    <div className="bg-background">
      <SEO
        title="Security, Surveillance and Automation Products"
        description="Explore HLS Security's product portfolio across security alarm systems, CCTV, electric fencing, fire detection, gate automation, and smart home automation."
        keywords="security products Pakistan, security alarm systems, CCTV systems, electric fence, fire detection, gate automation, home automation"
        path="/products"
      />
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[120px]" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#CC0000]" />
            <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
              Products
            </span>
            <span className="h-px w-8 bg-[#CC0000]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Security, Surveillance and Automation Products
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Explore HLS products selected for practical security, surveillance,
            perimeter, access, fire, and automation requirements. Open a
            category to view its products and request a quote.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Product portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Find the right category for your project
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Compare products, typical applications, and selection guidance in
              each category, then share your requirements with our team for a
              tailored quotation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategoryRoutes.map((category, index) => {
              const Icon = iconMap[category.icon] || Bell;
              return (
                <motion.a
                  key={category.name}
                  href={`/products/${category.landing.slug}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="glass-strong rounded-2xl overflow-hidden group hover:border-[#CC0000]/30 transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={category.landing.image}
                      {...imageDimensions(category.landing.image)}
                      {...responsiveImage(category.landing.image, true)}
                      loading="lazy"
                      decoding="async"
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
                    <div className="absolute bottom-4 left-5 w-10 h-10 rounded-lg bg-[#CC0000]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#CC0000]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">
                      {category.landing.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-[#CC0000]">
                      Explore category{" "}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Need a complete solution?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Tell us what you need to protect
            </h2>
            <p className="text-gray-400 leading-relaxed">
              HLS can help you connect products with monitoring, response,
              maintenance, and site-specific security planning.
            </p>
          </div>
          <LeadForm
            title="Request a Product Quote"
            subtitle="Select your requirements and we'll prepare a custom response."
            ctaText="Request Quote"
            whatsappProductName="HLS security products"
          />
        </div>
      </section>
      <CTASection
        primaryHref="/contact#inquiry"
        headline="Need help choosing the right products?"
        buttonText="Contact HLS Security"
      />
    </div>
  );
}
