import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MessageCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * HLS Security — Sentinel Noir Design System
 * Layout: Sticky transparent navigation with scroll-shrink behavior
 * Dark theme with bold red accent (#CC0000)
 */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0B0B]/90 backdrop-blur-xl py-3 shadow-lg shadow-black/50"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/images/logo/hls-logo.png"
              alt="HLS Security"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-heading font-medium transition-colors duration-200 relative group ${
                  location === link.href
                    ? "text-[#CC0000]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#CC0000] transition-all duration-300 ${
                    location === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/contact"
              className="btn-gradient inline-flex items-center px-5 py-2.5 rounded-lg text-white text-sm font-heading font-semibold"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-xl border-t border-white/10">
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-heading font-medium transition-colors ${
                    location === link.href
                      ? "text-[#CC0000]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/contact"
                className="btn-gradient inline-flex items-center justify-center px-5 py-3 rounded-lg text-white text-sm font-heading font-semibold mt-2"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0B0B0B] border-t border-white/5 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <img
                  src="/images/logo/hls-logo.png"
                  alt="HLS Security"
                  className="h-14 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                Complete electronic security solutions backed by professional 24/7 monitoring and rapid armed response. Protecting what matters most — for homes, businesses, and enterprises.
              </p>
              <div className="flex gap-3">
                {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-[#CC0000] hover:border-[#CC0000]/30 transition-all duration-200 text-xs font-medium"
                    aria-label={social}
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-[#CC0000] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-3">
                {["Intruder Alarms", "24/7 Monitoring", "Armed Response", "CCTV Surveillance", "Fire Detection", "Gate Automation"].map((service) => (
                  <li key={service}>
                    <Link href="/services" className="text-sm text-gray-400 hover:text-[#CC0000] transition-colors">
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>+1 (555) 100-2470</li>
                <li>info@hls-security.com</li>
                <li>24 Security Plaza, Suite 100</li>
                <li>Business Hours: 24/7</li>
                <li className="pt-2">
                  <a href="/contact" className="text-[#CC0000] hover:text-[#E60000] font-medium">
                    Emergency Contact →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="glass rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-1">Stay Security-Informed</h4>
              <p className="text-sm text-gray-400">Get security tips, threat alerts, and HLS updates.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#CC0000]/50"
              />
              <button className="btn-gradient px-5 py-2.5 rounded-lg text-white text-sm font-heading font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2026 HLS Security. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-[#CC0000] transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#CC0000] transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-[#CC0000] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:text-[#CC0000] hover:border-[#CC0000]/30 transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
        <a
          href="https://wa.me/15551002470"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-200"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href="tel:+15551002470"
          className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center text-white shadow-lg shadow-[#CC0000]/30 hover:scale-110 transition-transform duration-200"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
