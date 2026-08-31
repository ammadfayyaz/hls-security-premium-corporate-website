import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

/**
 * HLS Security — Reusable Section Heading
 * Dark theme with bold red accent (#CC0000)
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${center ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-[#CC0000]" />
          <span className="text-[#CC0000] text-sm font-heading font-semibold uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
