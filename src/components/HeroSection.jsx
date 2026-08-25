import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AppBoardMockup from './AppBoardMockup';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

export default function HeroSection({
  showNavbar = false,
  logoText = "Wealth Wisdom",
  badgeText = "Trusted By 5,000+ Smart Investors",
  headlineLine1 = "Turn Your Dreams Into",
  headlineLine2 = "Achievable Goals",
  subheading = "Track spending, create budgets, monitor savings, and achieve your financial goals with one powerful money management platform.",
  primaryCtaText = "Start Free DIY Plan",
  secondaryCtaText = "Explore Services",
  onPrimaryCta = () => {},
  onSecondaryCta = () => {},
  onSignIn = () => {},
  navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "DIY Assessment", href: "/assessment" },
  ]
}) {
  return (
    <div
      className="relative w-full text-white antialiased overflow-hidden select-none pt-2 sm:pt-4"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Inter", sans-serif' }}
    >
      
      {/* Optional Standalone Header Navigation matching Apple Glassmorphic Style */}
      {showNavbar && (
        <header className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 font-normal text-white text-lg sm:text-xl tracking-tight cursor-pointer">
              <img
                src={wealthWisdomLogo}
                alt="Wealth Wisdom Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="font-light tracking-tight text-white">{logoText}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-light text-slate-200">
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
          </div>

          <div className="flex items-center gap-4 font-light">
            <button
              type="button"
              onClick={onSignIn}
              className="text-slate-200 font-light text-sm hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </header>
      )}

      {/* Hero Main Content Section (2-Column Hero Header with Lower-Weight Apple Typography) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-0">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-8 sm:mb-12">
          
          {/* Left Column: Pill Badge + Main Headline */}
          <div className="lg:col-span-7 text-left space-y-3.5">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-slate-200 text-xs font-light px-4 py-1.5 rounded-full shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>{badgeText}</span>
            </motion.div>

            {/* Main Headline (Lower-Weight Apple Typography) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-light text-white tracking-tight leading-[1.08] drop-shadow-md"
            >
              {headlineLine1} <br />
              <span className="font-normal text-white">{headlineLine2}</span>
            </motion.h1>
          </div>

          {/* Right Column: Paragraph + CTA Buttons */}
          <div className="lg:col-span-5 text-left lg:text-left space-y-5 lg:pb-2 font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base text-slate-300 font-extralight leading-relaxed max-w-lg drop-shadow-xs"
            >
              {subheading}
            </motion.p>

            {/* Hero Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/assessment"
                onClick={onPrimaryCta}
                className="relative group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.22] via-white/[0.12] to-white/[0.05] border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.22] hover:border-white/70 hover:shadow-[0_12px_35px_rgba(255,255,255,0.18),0_4px_15px_rgba(0,0,0,0.4)] active:scale-95 cursor-pointer text-white"
              >
                {/* Glossy top specular reflection glare */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-full" />
                
                {/* Top crisp glare line */}
                <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

                {/* Button text & paper plane icon */}
                <span className="relative z-20 font-medium text-white text-xs sm:text-sm tracking-tight drop-shadow-xs">
                  {primaryCtaText}
                </span>
                <svg
                  className="relative z-20 w-3.5 h-3.5 text-white fill-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 drop-shadow-xs"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </Link>
              
              <a
                href="#services"
                onClick={onSecondaryCta}
                className="relative group inline-flex items-center gap-2 px-8 py-3.5 rounded-full overflow-hidden backdrop-blur-3xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/25 hover:border-white/40 text-white font-light text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
              >
                <span>{secondaryCtaText}</span>
                <span className="text-white/70 transition-transform duration-300 group-hover:translate-x-0.5">&gt;</span>
              </a>
            </motion.div>
          </div>

        </div>

        {/* Board Coming from the Bottom with Mac Transparent Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center pt-2"
        >
          <AppBoardMockup />
        </motion.div>

      </section>
    </div>
  );
}
