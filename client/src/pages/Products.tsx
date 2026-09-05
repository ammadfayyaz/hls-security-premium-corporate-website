import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, Camera, Zap, Flame, DoorOpen, Home as HomeIcon, Cpu,
  Check, ArrowRight, ChevronRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import { productCategories } from "@/lib/data";
import { getProductQuoteWhatsAppUrl } from "@/lib/whatsapp";
import SEO from "@/components/SEO";

/**
 * HLS Security — Products Page
 * Organized by category with detailed product information
 */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bell: Bell, camera: Camera, zap: Zap, flame: Flame,
  gate: DoorOpen, home: HomeIcon, cpu: Cpu,
};

const categoryImages: Record<string, string> = {
  "Intruder Alarm Systems": "/images/products/product-control-panel_0dae52ff.jpg",
  "CCTV Systems": "/images/products/product-ptz-camera_3d15e3b3.jpg",
  "Electric Fence": "/images/products/product-energizer_8348abe5.jpg",
  "Fire Detection": "/images/products/product-smoke-detector_1fb36b49.jpg",
  "Gate Automation": "/images/products/gate-automation.jpg",
  "Home Automation": "/images/products/home-automation.jpg",
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const category = productCategories[activeCategory];

  return (
    <div className="bg-background">
    <SEO 
      title="Security Products — Alarm Systems, CCTV, Fire Detection & More"
      description="Explore HLS Security's range of enterprise-grade security products including intruder alarms, CCTV cameras, electric fences, fire detection, gate automation, and smart home systems."
      path="/products"
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
                Products
              </span>
              <span className="h-px w-8 bg-[#CC0000]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Enterprise-Grade Security Equipment
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Professional security products from leading global manufacturers. Every component is selected, installed, and maintained by our certified engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 z-30 bg-[#0B0B0B]/90 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="container">
          {/* Desktop: Grid layout with proper spacing */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-3">
            {productCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Bell;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveCategory(i); setSelectedProduct(null); }}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-xs lg:text-sm font-heading font-medium transition-all duration-200 ${
                    activeCategory === i
                      ? "btn-gradient text-white shadow-lg shadow-[#CC0000]/20"
                      : "glass text-gray-400 hover:text-white hover:border-[#CC0000]/30"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="leading-tight">{cat.name}</span>
                </button>
              );
            })}
          </div>
          {/* Mobile: Horizontal scroll with proper spacing */}
          <div className="flex md:hidden items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {productCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Bell;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveCategory(i); setSelectedProduct(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-heading font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                    activeCategory === i
                      ? "btn-gradient text-white"
                      : "glass text-gray-400 hover:text-white hover:border-[#CC0000]/20"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          {/* Category Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <SectionHeading
                eyebrow={`Category ${activeCategory + 1} of ${productCategories.length}`}
                title={category.name}
                subtitle={`${category.products.length} professional products designed for reliable, long-term security deployment.`}
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {category.products.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedProduct(selectedProduct === i ? null : i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                      selectedProduct === i
                        ? "bg-[#CC0000]/20 text-[#CC0000] border border-[#CC0000]/30"
                        : "glass text-gray-400 hover:text-white"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div
              key={`img-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-2xl overflow-hidden h-64 lg:h-80"
            >
              <img
                src={categoryImages[category.name] || "/images/backgrounds/hero-bg.jpg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className={`glass-strong rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedProduct === i ? "border-[#CC0000]/30 glow-red-sm" : "hover:border-[#CC0000]/20"
                }`}
              >
                {product.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="font-display text-lg font-bold text-white mb-2">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {product.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#CC0000] flex-shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>
                  {/* Specs */}
                  <div className="glass rounded-lg p-4 mb-4">
                    <h5 className="text-xs font-heading font-semibold text-[#CC0000] uppercase tracking-wider mb-2">
                      Specifications
                    </h5>
                    <dl className="space-y-1">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <dt className="text-gray-500">{key}</dt>
                          <dd className="text-gray-300 font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <a
                    href={getProductQuoteWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Request a WhatsApp quote for ${product.name}`}
                    className="inline-flex items-center gap-1 text-sm font-heading font-semibold text-[#CC0000] hover:text-[#E60000] transition-colors group"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Applications"
            title="Where Our Products Are Deployed"
            center
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {[
              "Residential Homes", "Corporate Offices", "Retail Stores", "Warehouses",
              "Factories", "Banks", "Schools", "Hospitals",
              "Construction Sites", "Telecom Sites", "Luxury Estates", "Government Buildings",
            ].map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass rounded-lg p-4 text-center"
              >
                <span className="text-sm text-gray-300 font-heading">{app}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Request a Quote"
                title="Get Pricing for Your Security Project"
                subtitle="Tell us what products you need and we'll provide a detailed quote within 24 hours. No obligation."
              />
              <div className="mt-8 space-y-3">
                {[
                  "Custom quotes for any project size",
                  "Volume discounts for multi-site deployments",
                  "Installation and maintenance packages available",
                  "Expert consultation included",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ChevronRight className="w-5 h-5 text-[#CC0000]" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <LeadForm
              title="Request a Product Quote"
              subtitle="Select your products and we'll prepare a custom quote for you."
              ctaText="Request Quote"
              whatsappProductName={selectedProduct !== null ? category.products[selectedProduct].name : category.name}
            />
          </div>
        </div>
      </section>

      <CTASection
        headline="Need Help Choosing the Right Products?"
        buttonText="Schedule a Consultation"
        primaryHref={getProductQuoteWhatsAppUrl(selectedProduct !== null ? category.products[selectedProduct].name : category.name)}
        primaryExternal
      />
    </div>
  );
}
