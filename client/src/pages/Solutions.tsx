import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home as HomeIcon, Building2, Factory, ShoppingBag, Warehouse,
  Banknote, GraduationCap, HeartPulse, Radio, Crown,
  Check, ArrowRight, AlertTriangle, Lightbulb, TrendingUp,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import { solutions } from "@/lib/data";
import SEO from "@/components/SEO";

/**
 * HLS Security — Solutions Page
 * Industry-specific security solutions with case-study layout
 */

const solutionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Residential Security": HomeIcon,
  "Commercial Security": Building2,
  "Industrial Security": Factory,
  "Retail Security": ShoppingBag,
  "Warehouse Protection": Warehouse,
  "Corporate Offices": Building2,
  "Banks": Banknote,
  "Educational Institutions": GraduationCap,
  "Healthcare": HeartPulse,
  "Telecommunication Infrastructure": Radio,
  "Luxury Homes": Crown,
};

export default function Solutions() {
  const [activeSolution, setActiveSolution] = useState(0);
  const solution = solutions[activeSolution];

  return (
    <div className="bg-background">
    <SEO 
      title="Industry Security Solutions — Residential, Commercial, Industrial & Enterprise"
      description="HLS Security provides tailored security solutions for residential, commercial, industrial, retail, banking, healthcare, education, telecom, and luxury home sectors."
      path="/solutions"
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
                Solutions
              </span>
              <span className="h-px w-8 bg-[#CC0000]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Industry-Specific Security Solutions
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Every industry faces unique security challenges. HLS designs tailored solutions that address the specific threats and requirements of your sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid — Quick Navigation */}
      <section className="py-16 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {solutions.map((sol, i) => {
              const Icon = solutionIcons[sol.name] || Building2;
              return (
                <button
                  key={i}
                  onClick={() => setActiveSolution(i)}
                  className={`glass rounded-xl p-5 text-left transition-all duration-300 group ${
                    activeSolution === i
                      ? "border-[#CC0000]/30 glow-red-sm"
                      : "hover:border-[#CC0000]/20"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-3 transition-colors ${
                    activeSolution === i ? "text-[#CC0000]" : "text-gray-400 group-hover:text-[#CC0000]"
                  }`} />
                  <h4 className={`font-heading text-sm font-semibold transition-colors ${
                    activeSolution === i ? "text-[#CC0000]" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {sol.name}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Solution Detail */}
      <section className="py-24">
        <div className="container">
          <motion.div
            key={activeSolution}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Solution Header */}
            <div className="flex items-center gap-4 mb-8">
              {(() => {
                const Icon = solutionIcons[solution.name] || Building2;
                return (
                  <div className="w-16 h-16 rounded-2xl bg-[#CC0000]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#CC0000]" />
                  </div>
                );
              })()}
              <div>
                <div className="text-sm text-[#CC0000] font-heading font-semibold uppercase tracking-wider mb-1">
                  Solution {activeSolution + 1} of {solutions.length}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  {solution.name}
                </h2>
              </div>
            </div>

            {/* Case Study Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Challenges */}
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#CC0000]" />
                  <h3 className="font-display text-lg font-bold text-white">Challenges</h3>
                </div>
                <ul className="space-y-3">
                  {solution.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] mt-1.5 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Technologies */}
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#CC0000]" />
                  <h3 className="font-display text-lg font-bold text-white">Recommended Technologies</h3>
                </div>
                <ul className="space-y-3">
                  {solution.technologies.map((tech, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#CC0000] mt-0.5 flex-shrink-0" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#CC0000]" />
                  <h3 className="font-display text-lg font-bold text-white">Benefits</h3>
                </div>
                <ul className="space-y-3">
                  {solution.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#CC0000] mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Case Study CTA */}
            <div className="mt-8 glass-strong rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  See How We've Secured {solution.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Request a case study and detailed solution proposal for your specific requirements.
                </p>
              </div>
              <a
                href="/contact"
                className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-heading font-semibold whitespace-nowrap group"
              >
                Request Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Risk Assessment CTA */}
      <section className="py-20 bg-[#0B0B0B] border-y border-white/5">
        <div className="container">
          <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CC0000]/10 rounded-full blur-[80px]" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-[#CC0000]" />
                  <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
                    Free Risk Assessment
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-4">
                  Discover Your Security Vulnerabilities
                </h3>
                <p className="text-gray-400 mb-6">
                  Our security experts will conduct a comprehensive risk assessment of your property — identifying threats, vulnerabilities, and recommending the optimal solution. Completely free, no obligation.
                </p>
                <ul className="space-y-2">
                  {[
                    "Comprehensive property walkthrough",
                    "Threat and vulnerability analysis",
                    "Customized security recommendations",
                    "Detailed proposal with pricing",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#CC0000]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <LeadForm
                title="Book Your Free Risk Assessment"
                subtitle="Schedule your assessment today."
                ctaText="Book Free Assessment"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Need a Custom Security Solution?"
        buttonText="Schedule a Site Survey"
      />
    </div>
  );
}
