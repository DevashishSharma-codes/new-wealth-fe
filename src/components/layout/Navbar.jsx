import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import wealthWisdomLogo from "../../assets/wealth-wisdom-logo.png";

export function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isManualClickRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const sections = ["services", "about", "testimonials", "contact"];
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // If user clicked a nav link, skip ScrollSpy detection during smooth scroll animation
      if (isManualClickRef.current) return;

      // ScrollSpy section detection for active nav highlight
      if (location.pathname === "/") {
        let current = "home";
        const scrollPosition = window.scrollY + 220;

        for (const sectionId of sections) {
          const elem = document.getElementById(sectionId);
          if (elem) {
            const top = elem.offsetTop;
            const height = elem.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              current = sectionId;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Services", href: "/#services", id: "services" },
    { name: "About Us", href: "/#about", id: "about" },
    { name: "Testimonials", href: "/#testimonials", id: "testimonials" },
    { name: "DIY Assessment", href: "/assessment" },
    { name: "Contact Support", href: "#contact", id: "contact", isAction: true },
  ];

  const handleNavClick = (href, isAction, id) => {
    setIsMobileMenuOpen(false);

    if (id) {
      isManualClickRef.current = true;
      setActiveSection(id);
      // Re-enable ScrollSpy after smooth scroll completes
      setTimeout(() => {
        isManualClickRef.current = false;
      }, 900);
    }

    if (isAction && onOpenContact) {
      onOpenContact();
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 select-none ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFE9DF] shadow-md py-3"
          : "bg-[#FAF7F2] border-b border-[#EFE9DF]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer group">
          <img
            src={wealthWisdomLogo}
            alt="Wealth Wisdom Logo"
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav Links with Direct Smooth Sliding Active Pill */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#FAF7F2] border border-[#EFE9DF] px-2.5 py-1.5 rounded-full shadow-[inset_2px_2px_4px_rgba(180,172,158,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] relative">
          {navLinks.map((link) => {
            const isActive =
              (link.id && activeSection === link.id && location.pathname === "/") ||
              (link.href === "/assessment" && location.pathname === "/assessment");

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.isAction || link.href.startsWith("/#")) {
                    e.preventDefault();
                    handleNavClick(link.href, link.isAction, link.id);
                  }
                }}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer select-none ${
                  isActive ? "text-white" : "text-[#2B2A28] hover:text-[#ED8B36]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35
                    }}
                    className="absolute inset-0 bg-[#ED8B36] rounded-full shadow-xs -z-0"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:inline-flex items-center gap-1.5 bg-[#FFF6ED] border border-[#F5D7C1] text-[#ED8B36] text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider select-none">
            <span className="w-2 h-2 rounded-full bg-[#ED8B36] animate-pulse" />
            <span>DIY Assessment</span>
          </div>
          <Link
            to="/assessment"
            className="bg-[#2B2A28] hover:bg-[#403E3A] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Start Assessment</span>
            <span className="text-[#ED8B36] text-base font-extrabold">&rarr;</span>
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/assessment"
            className="sm:hidden bg-[#ED8B36] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            Assessment &rarr;
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-[#2B2A28] hover:bg-[#EFE9DC] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EFE9DF] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const isActive =
              (link.id && activeSection === link.id && location.pathname === "/") ||
              (link.href === "/assessment" && location.pathname === "/assessment");

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.isAction || link.href.startsWith("/#")) {
                    e.preventDefault();
                    handleNavClick(link.href, link.isAction, link.id);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#ED8B36] text-white shadow-xs"
                    : "text-[#2B2A28] hover:bg-[#FFF6ED] hover:text-[#ED8B36]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#EFE9DF]">
            <Link
              to="/assessment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#ED8B36] hover:bg-[#E07A2E] text-white py-3 rounded-xl text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Start DIY Assessment Now</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
