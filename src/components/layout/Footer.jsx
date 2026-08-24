import React, { useState, useEffect } from "react";

const WEALTH_GOALS = [
  {
    name: "Child Education",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    name: "Retirement",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Foreign Tour",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.5A2.5 2.5 0 0016.5 5h-.293a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 0012.379 2H12a10 10 0 00-8.945 1.935z" />
      </svg>
    ),
  },
  {
    name: "Dream Home",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 011-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Child Marriage",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: "Wealth Creation",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  }
];

export function Footer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % WEALTH_GOALS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentGoal = WEALTH_GOALS[index];

  return (
    <footer className="w-full pt-10 sm:pt-14 pb-6 select-none bg-[#050811] text-white flex flex-col items-center border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 w-full text-center flex flex-col items-center gap-6">
        
        {/* Dynamic Goal Sentence Heading */}
        <h2 className="font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-2">
          <span>Plan your</span>
          
          {/* Goal Pill Container in Periwinkle Glass */}
          <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all duration-500 shrink-0 h-10 sm:h-14 min-w-[160px] sm:min-w-[220px] justify-center align-middle relative overflow-hidden">
            <span 
              key={currentGoal.name} 
              className="inline-flex items-center gap-2 sm:gap-2.5 animate-fade-in-up transition-all duration-300"
            >
              {currentGoal.icon}
              <span className="text-sm sm:text-xl font-medium text-white font-sans whitespace-nowrap">
                {currentGoal.name}
              </span>
            </span>
          </span>

          <span>with total confidence.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-light text-slate-400 max-w-lg mx-auto leading-relaxed -mt-2">
          Customized milestone assessment, inflation-adjusted projections, and expert guidance tailored to your life.
        </p>

        {/* GIANT STATEMENT BRANDING WITH FLOATING AVATARS & VERTICAL FADE */}
        <div className="w-full relative my-2 py-4 sm:py-8 flex items-center justify-center overflow-visible">
          
          {/* Avatar Badge 1 - Top Left */}
          <div className="absolute top-0 left-[2%] sm:left-[8%] z-20 hidden sm:flex items-center gap-2.5 bg-white/10 border border-white/20 px-3.5 py-2 rounded-2xl backdrop-blur-xl shadow-lg">
            <div className="relative">
              <svg className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 p-1" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="transparent" />
                <circle cx="18" cy="13" r="5.5" fill="#38BDF8" />
                <path d="M9 28C9 23.58 13.03 20 18 20C22.97 20 27 23.58 27 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-sm" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-medium text-white block leading-tight">Certified Advisor</span>
              <span className="text-[9px] font-light text-slate-400 block">Online Guidance</span>
            </div>
          </div>

          {/* Avatar Badge 2 - Center Top Rating Stack */}
          <div className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-xl shadow-lg">
            <span className="text-xs font-semibold text-sky-300 font-sans flex items-center gap-1">
              <span>★ 5.0</span>
              <span className="text-slate-400 font-light text-[10px]">(10k+ Families)</span>
            </span>
          </div>

          {/* Avatar Badge 3 - Top Right */}
          <div className="absolute top-2 right-[2%] sm:right-[8%] z-20 hidden sm:flex items-center gap-2.5 bg-white/10 border border-white/20 px-3.5 py-2 rounded-2xl backdrop-blur-xl shadow-lg">
            <svg className="w-8 h-8 rounded-xl bg-white/15 border border-white/20 p-1" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="transparent" />
              <circle cx="18" cy="13" r="5" fill="#38BDF8" />
              <path d="M8 29C8 23.5 12.5 20 18 20C23.5 20 28 23.5 28 29" fill="#38BDF8" />
            </svg>
            <div className="text-left">
              <span className="text-[10px] font-medium text-white block leading-tight">Certified MFD</span>
              <span className="text-[9px] font-light text-sky-400 block">✓ Verified Partner</span>
            </div>
          </div>

          {/* MASSIVE STATEMENT TYPOGRAPHY */}
          <div className="w-full text-center pointer-events-none select-none overflow-hidden leading-none px-2">
            <h1 className="font-sans text-[12.5vw] sm:text-[13.5vw] font-light tracking-tighter uppercase leading-none bg-gradient-to-b from-white/30 via-white/10 to-transparent text-transparent bg-clip-text inline-block transform translate-y-3 sm:translate-y-6 max-w-full">
              wealth wisdom
            </h1>
          </div>

        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-sm font-light text-slate-300 pt-1">
          <a href="/" className="hover:text-sky-300 transition-colors">Home</a>
          <a href="/#about" className="hover:text-sky-300 transition-colors">About Us</a>
          <a href="/#services" className="hover:text-sky-300 transition-colors">Services</a>
          <a href="#privacy" className="hover:text-sky-300 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-sky-300 transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-sky-300 transition-colors">Contact Support</a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] sm:text-xs text-slate-400 font-light pb-4">
          © 2026 Wealth Wisdom Financial Services. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
