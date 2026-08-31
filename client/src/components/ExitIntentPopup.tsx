import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Download, ArrowRight } from "lucide-react";

/**
 * HLS Security — Exit Intent Popup
 * Lead generation popup triggered when user shows exit intent
 */
export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setShow(true);
        setShown(true);
      }
    };

    // Only show after 5 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shown]);

  const handleClose = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="glass-strong rounded-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#CC0000]/20 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-[#CC0000]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Wait — Before You Go
              </h3>
              <p className="text-gray-400 mb-6">
                Download our free company profile and discover how HLS can protect what matters most to you.
              </p>
              <div className="space-y-3">
                <a
                  href="/contact"
                  onClick={handleClose}
                  className="btn-gradient w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-heading font-semibold group"
                >
                  <Download className="w-4 h-4" />
                  Download Company Profile
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/contact"
                  onClick={handleClose}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl glass text-white text-sm font-heading font-semibold hover:border-[#CC0000]/30 transition-all"
                >
                  Book Free Security Assessment
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                No spam. No obligation. Just professional security advice.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
