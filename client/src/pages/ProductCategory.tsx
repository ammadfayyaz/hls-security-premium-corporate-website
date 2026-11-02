import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import SEO from "@/components/SEO";
import { getProductQuoteWhatsAppUrl } from "@/lib/whatsapp";
import { trackQuoteRequest, trackWhatsAppClick } from "@/lib/analytics";
import { getProductCategoryBySlug } from "@/lib/landingPages";
import {
  Breadcrumbs,
  RelatedLandingLinks,
} from "@/components/LandingNavigation";
import { landingSupport } from "@/lib/landingSupport";
import { imageDimensions } from "@/lib/imageDimensions";
import { responsiveImage } from "@/lib/responsiveImages";

type ProductCategoryPageProps = {
  category: NonNullable<ReturnType<typeof getProductCategoryBySlug>>;
};

export default function ProductCategoryPage({
  category,
}: ProductCategoryPageProps) {
  const { landing } = category;
  const quoteName = category.name;

  return (
    <div className="bg-background">
      <SEO
        title={landing.heading}
        description={landing.description}
        keywords={landing.keywords}
        path={`/products/${landing.slug}`}
      />
      <Breadcrumbs path={`/products/${landing.slug}`} />

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[120px]" />
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#CC0000]" />
              <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
                Products
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {landing.heading}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              {landing.intro}
            </p>
            <a
              href={getProductQuoteWhatsAppUrl(quoteName)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick("product_category_hero", quoteName);
                trackQuoteRequest("product_category_hero", quoteName);
              }}
              className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-heading font-semibold"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden h-64 md:h-80"
          >
            <img
              src={landing.image}
              alt={`${category.name} products from HLS Security`}
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

      <section className="py-16 md:py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Category Overview
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Designed around real site requirements
            </h2>
            <p className="text-gray-400 leading-relaxed">{landing.selection}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {landing.applications.map(application => (
              <div
                key={application}
                className="glass rounded-xl p-5 flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-[#CC0000] flex-shrink-0" />
                <span className="text-sm text-gray-300">{application}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-10">
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Available Products
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {category.products.length} products in this category
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="glass-strong rounded-2xl overflow-hidden"
              >
                {product.image && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      {...imageDimensions(product.image)}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-1.5 mb-5">
                    {product.features.map(feature => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs text-gray-300"
                      >
                        <Check className="w-3.5 h-3.5 text-[#CC0000]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {Object.keys(product.specs).length > 0 && (
                    <div className="glass rounded-lg p-4 mb-4">
                      <h4 className="text-xs font-heading font-semibold text-[#CC0000] uppercase tracking-wider mb-2">
                        Specifications
                      </h4>
                      <dl className="space-y-2">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div
                            key={key}
                            className="grid grid-cols-2 gap-3 text-xs"
                          >
                            <dt className="text-gray-500 break-words">{key}</dt>
                            <dd className="text-gray-300 font-medium text-right break-words">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  <a
                    href={getProductQuoteWhatsAppUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackWhatsAppClick("product_category_card", product.name);
                      trackQuoteRequest("product_category_card", product.name);
                    }}
                    className="inline-flex items-center gap-1 text-sm font-heading font-semibold text-[#CC0000] hover:text-[#E60000]"
                  >
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider mb-3">
              Need help choosing?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
              Build the right {category.name.toLowerCase()} solution
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Tell us about your property, priorities, and existing setup. Our
              team can help you compare suitable products and define the next
              steps for your security project.
            </p>
            <div className="space-y-3">
              {[
                "Product-specific guidance",
                "Solutions planned around your site",
                "Clear next steps for inquiry and installation",
              ].map(item => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <ChevronRight className="w-5 h-5 text-[#CC0000]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            title={`Request a ${category.name} Quote`}
            subtitle="Share your requirements and we’ll help you plan the right solution."
            ctaText="Request Quote"
            whatsappProductName={quoteName}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Questions about {category.name}
          </h2>
          <div className="space-y-4">
            {landingSupport[landing.slug].faq.map(([question, answer]) => (
              <div key={question} className="glass rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-white mb-3">
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
      <CTASection
        headline={`Need help with ${category.name}?`}
        buttonText="Speak to a Security Expert"
        primaryHref={getProductQuoteWhatsAppUrl(quoteName)}
        whatsappProductName={quoteName}
        primaryExternal
      />
    </div>
  );
}
