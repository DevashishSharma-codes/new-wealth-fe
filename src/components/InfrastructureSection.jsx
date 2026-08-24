import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InfrastructureSection({ onOpenContact }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Thank you! Request received for ${email}. Our advisor will contact you shortly.`);
      setEmail('');
      setIsSubmitting(false);
      if (onOpenContact) onOpenContact();
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#040812] text-white py-24 lg:py-32 select-none font-sans border-y border-white/10">
      
      {/* BACKGROUND VERTICAL AMBIENT GLASS LIGHT BARS (Exact Reference Image 100%) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-between px-4 sm:px-12 opacity-80">
        
        {/* Array of Vertical Glass Light Bars / Glowing Pillars */}
        <div className="w-16 sm:w-24 h-full bg-gradient-to-b from-cyan-400/25 via-sky-500/10 to-transparent rounded-full blur-xl transform -translate-y-10" />
        <div className="w-16 sm:w-28 h-full bg-gradient-to-b from-sky-400/30 via-indigo-600/15 to-transparent rounded-full blur-2xl transform translate-y-6" />
        <div className="w-14 sm:w-20 h-full bg-gradient-to-b from-teal-400/20 via-cyan-500/10 to-transparent rounded-full blur-xl transform -translate-y-4" />
        <div className="w-20 sm:w-32 h-full bg-gradient-to-b from-cyan-500/35 via-sky-600/15 to-transparent rounded-full blur-2xl transform translate-y-12" />
        <div className="w-16 sm:w-24 h-full bg-gradient-to-b from-indigo-500/25 via-sky-500/10 to-transparent rounded-full blur-xl transform -translate-y-8" />
        <div className="w-20 sm:w-28 h-full bg-gradient-to-b from-teal-300/30 via-cyan-500/15 to-transparent rounded-full blur-2xl transform translate-y-4" />
        <div className="w-16 sm:w-24 h-full bg-gradient-to-b from-sky-400/25 via-indigo-600/10 to-transparent rounded-full blur-xl transform -translate-y-12" />
        
        {/* Vertical Grid Lines Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 600" fill="none">
          <line x1="100" y1="0" x2="100" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="500" y1="0" x2="500" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="900" y1="0" x2="900" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
          <line x1="1100" y1="0" x2="1100" y2="600" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* SECTION CONTENT OVERLAY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Pill Tag + Main 2-Column Section */}
        <div className="space-y-6">
          
          {/* Top Pill Tag in Translucent Glass */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full p-1 pr-4 text-xs text-slate-200 backdrop-blur-md shadow-lg"
          >
            <span className="bg-white/20 border border-white/30 text-white font-semibold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
            <span className="font-normal text-slate-200">100% Conflict-Free Wealth Infrastructure &rarr;</span>
          </motion.div>

          {/* MAIN 2-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-4">
            
            {/* LEFT COLUMN: Clean Lighter Headline */}
            <div className="lg:col-span-7 space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-5xl sm:text-6xl lg:text-[72px] font-light text-white tracking-tight leading-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-normal">Wealth</span>
                  
                  {/* Glowing Translucent Glass Arrow Icon Box */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center border border-white/30 shadow-[0_0_25px_rgba(56,189,248,0.5)] backdrop-blur-md">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5V15" />
                    </svg>
                  </div>
                </div>
                <div className="font-light">Made Easy.</div>
              </motion.h2>

              <div className="flex items-center gap-3 text-slate-300 font-light text-sm sm:text-base pt-1">
                <div className="w-8 h-[1.5px] bg-sky-400" />
                <span>Designed for Your Life Milestones.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Paragraph Description + 2 Big Metrics */}
            <div className="lg:col-span-5 space-y-8 lg:pl-6">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-200 font-light text-sm sm:text-base leading-relaxed drop-shadow-xs"
              >
                We believe managing your family's finances shouldn't be a chore. Wealth Wisdom is engineered around your life goals, making SIPs, retirement, and wealth creation simple, conflict-free, and intuitive for everyone.
              </motion.p>

              {/* Stat Metrics Side-by-Side */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-10 pt-4 border-t border-white/20"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-normal text-white tracking-tight">4.9+</div>
                  <div className="text-xs text-slate-300 font-light mt-1">Starts Rating</div>
                </div>

                <div className="w-[1px] h-10 bg-white/20" />

                <div>
                  <div className="text-3xl sm:text-4xl font-normal text-sky-300 tracking-tight">5,000+</div>
                  <div className="text-xs text-slate-300 font-light mt-1">Satisfied Customers</div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

        {/* BOTTOM HORIZON GLASS RIBBON TICKERS */}
        <div className="mt-20 pt-8 relative">
          
          {/* Top Glass Ribbon Bar */}
          <div className="border-t border-b border-white/15 bg-white/10 backdrop-blur-md py-3.5 px-6 flex items-center justify-between text-[11px] font-normal text-slate-200 uppercase tracking-widest">
            <span>Goal-Based SIPs</span>
            <span className="hidden sm:inline text-white font-medium">Financial Wellness</span>
            <span>Retirement Roadmap</span>
          </div>

          {/* Bottom Glass Ribbon Bar with Clean Pure White Action Button */}
          <div className="border-b border-white/15 bg-white/10 backdrop-blur-md py-3.5 px-6 flex items-center justify-between text-[11px] font-normal text-slate-300 uppercase tracking-widest">
            <div className="flex items-center gap-2 text-slate-200">
              <span>Scroll Down</span>
              <span className="text-sky-300">&darr;</span>
            </div>
            <span className="hidden sm:inline text-slate-200 font-medium">100% Conflict-Free</span>
            
            {/* CLEAN PURE WHITE ACTION BUTTON */}
            <button
              onClick={onOpenContact}
              className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-2 rounded-full text-[10.5px] font-bold transition-all shadow-lg cursor-pointer uppercase tracking-wider"
            >
              Get Free Action Plan &rarr;
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
