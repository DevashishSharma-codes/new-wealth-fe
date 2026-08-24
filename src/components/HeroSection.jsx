import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import LaptopMockup from './LaptopMockup';

export default function HeroSection({
  showNavbar = false,
  hideBackground = false,
  logoText = "Wealth Wisdom",
  badgeText = "Trusted By 5,000+ Smart Investors",
  headlineLine1 = "Build Better",
  headlineLine2 = "Financial Habits",
  subheading = "Track spending, create budgets, monitor savings, and achieve your financial goals with one powerful money management platform.",
  primaryCtaText = "Start Free DIY Plan",
  secondaryCtaText = "Explore Services",
  onPrimaryCta = () => {},
  onSecondaryCta = () => {},
  onSignIn = () => {},
  navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "DIY Assessment", href: "/assessment" },
  ]
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Driven 3D Laptop Lid Opening Animation
  const { scrollY } = useScroll();
  const laptopLidRotateX = useTransform(scrollY, [0, 350], [60, 0]);

  return (
    <div className="relative w-full text-white font-sans antialiased overflow-hidden select-none">
      
      {/* Optional Standalone Header Navigation */}
      {showNavbar && (
        <header className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-white text-xl tracking-tight cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold text-sm shadow-xs backdrop-blur-md">
              <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-xl sm:text-2xl text-white">{logoText}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href || '#'}
                className="hover:text-white transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="text-slate-200 font-medium text-sm px-4 py-2 hover:text-white transition-colors cursor-pointer"
            >
              Login
            </button>
            <Link
              to="/assessment"
              className="bg-white hover:bg-slate-100 text-slate-900 rounded-full px-5 py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Free
            </Link>
          </div>
        </header>
      )}

      {/* Hero Main Content Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 flex flex-col items-center text-center">
        
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-[64px] font-light text-white tracking-tight leading-[1.08] max-w-4xl font-sans drop-shadow-md"
        >
          {headlineLine1} <br className="hidden sm:inline" />
          {headlineLine2}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-sm sm:text-lg text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow-xs"
        >
          {subheading}
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 mb-4 sm:mb-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/assessment"
            onClick={onPrimaryCta}
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            {primaryCtaText} &rarr;
          </Link>
          <a
            href="#services"
            onClick={onSecondaryCta}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            {secondaryCtaText}
          </a>
        </motion.div>

        {/* Aceternity Macbook Scroll Container */}
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          <LaptopMockup />
        </div>
      </section>
    </div>
  );
}
