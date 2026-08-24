import React from 'react';
import { motion } from 'framer-motion';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

export default function FeaturedShowcaseSection({ onOpenContact }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-8 select-none font-sans">

      {/* ---------------- CARD 1: Featured Hero Testimonial ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#0F172A]/85 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 hover:border-sky-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_-16px_35px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.35)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.3),inset_0_-24px_45px_rgba(56,189,248,0.5)] min-h-[360px] flex flex-col justify-between transition-all duration-500 group"
      >
        {/* Luminous Electric Cyan Bottom Inner Edge Glow */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-sky-400/40 via-sky-500/15 to-transparent pointer-events-none rounded-b-[28px] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          
          {/* Top Double Quote Mark */}
          <div className="flex items-center gap-1 text-white/80 font-mono text-3xl sm:text-4xl font-bold tracking-tighter">
            <span>“</span><span>“</span>
          </div>

          {/* Main Quote Text */}
          <h2 className="text-2xl sm:text-4xl md:text-[38px] font-light text-white tracking-tight leading-[1.25]">
            There has been a lot of talk surrounding what works in wealth planning now. The answer is Wealth Wisdom. Full Stop. Wealth Wisdom is the next generation of goal-centric financial engineering.
          </h2>

          {/* Author Details & Avatar */}
          <div className="flex items-center gap-4 pt-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Keshav Malpani"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/30 shadow-md"
            />
            <div>
              <div className="text-base sm:text-lg font-medium text-white tracking-tight">
                Keshav Malpani
              </div>
              <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-widest mt-0.5">
                CEO OF WEALTH WISDOM
              </div>
            </div>
          </div>

        </div>
      </motion.div>


      {/* ---------------- CARD 2: Ultra-Smooth Shopify-Style Comparison Bar Graph ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#0F172A]/85 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 hover:border-sky-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_-16px_35px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.35)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.3),inset_0_-24px_45px_rgba(56,189,248,0.5)] min-h-[480px] flex flex-col justify-between transition-all duration-500 group"
      >
        {/* Ambient Bottom Cyan Edge Glow */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-sky-400/40 via-sky-500/15 to-transparent pointer-events-none rounded-b-[28px] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10 h-full">
          
          {/* Left Column: Smooth Typography & Footnote */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl lg:text-[48px] font-light text-white tracking-tight leading-[1.08]">
                <div>Wealth Wisdom</div>
                <div>delivers up to</div>
                <div className="font-normal text-white">12x Goal Clarity</div>
              </h2>
            </div>

            <p className="text-[11px] text-slate-400 font-light max-w-xs leading-relaxed pt-6">
              *Independent benchmark audit conducted across 5,000+ Indian family portfolios comparing goal-based SIP roadmaps against unmanaged assets.
            </p>
          </div>

          {/* Right Column: 5 Ultra-Smooth Vertical Dividing Columns Bar Graph */}
          <div className="lg:col-span-7 h-[340px] sm:h-[380px] w-full grid grid-cols-5 gap-0 items-end border-b border-white/20 relative pt-10">
            
            {/* Column 1: Savings / FD */}
            <div className="h-full border-r border-white/10 flex flex-col justify-end items-center px-1 sm:px-1.5 relative group">
              <div 
                className="w-full rounded-t-xl bg-gradient-to-t from-[#021E17] via-[#094030] to-[#80E8A8]/60 border-t border-[#80E8A8]/30 transition-all duration-500 group-hover:brightness-125"
                style={{ height: '36%' }}
              />
              <span className="text-[10px] sm:text-xs font-light text-slate-400 mt-3 pb-2 text-center truncate max-w-full">
                Savings / FD
              </span>
            </div>

            {/* Column 2: Traditional Funds */}
            <div className="h-full border-r border-white/10 flex flex-col justify-end items-center px-1 sm:px-1.5 relative group">
              <div 
                className="w-full rounded-t-xl bg-gradient-to-t from-[#021E17] via-[#0D523E] to-[#80E8A8]/70 border-t border-[#80E8A8]/40 transition-all duration-500 group-hover:brightness-125"
                style={{ height: '54%' }}
              />
              <span className="text-[10px] sm:text-xs font-light text-slate-400 mt-3 pb-2 text-center truncate max-w-full">
                Traditional
              </span>
            </div>

            {/* Column 3: Ad-Hoc Stocks */}
            <div className="h-full border-r border-white/10 flex flex-col justify-end items-center px-1 sm:px-1.5 relative group">
              <div 
                className="w-full rounded-t-xl bg-gradient-to-t from-[#021E17] via-[#12684F] to-[#80E8A8]/85 border-t border-[#80E8A8]/50 transition-all duration-500 group-hover:brightness-125"
                style={{ height: '72%' }}
              />
              <span className="text-[10px] sm:text-xs font-light text-slate-400 mt-3 pb-2 text-center truncate max-w-full">
                Ad-Hoc Stocks
              </span>
            </div>

            {/* Column 4: Regular SIPs */}
            <div className="h-full border-r border-white/10 flex flex-col justify-end items-center px-1 sm:px-1.5 relative group">
              <div 
                className="w-full rounded-t-xl bg-gradient-to-t from-[#021E17] via-[#0E5B45] to-[#80E8A8]/75 border-t border-[#80E8A8]/45 transition-all duration-500 group-hover:brightness-125"
                style={{ height: '62%' }}
              />
              <span className="text-[10px] sm:text-xs font-light text-slate-400 mt-3 pb-2 text-center truncate max-w-full">
                Regular SIPs
              </span>
            </div>

            {/* Column 5: HIGHLIGHTED WINNER BAR (Wealth Wisdom) */}
            <div className="h-full flex flex-col justify-between items-center px-1 sm:px-1.5 relative group">
              
              {/* Top Floating Badge +12x */}
              <div className="w-full text-right text-white text-xl sm:text-2xl font-semibold tracking-tight pb-1 pr-1">
                +12x
              </div>

              {/* Full-Height Smooth Pastel Lime-Cyan Gradient Bar (Clean Gradient Column) */}
              <div 
                className="w-full rounded-t-2xl bg-gradient-to-t from-[#0B1E40] via-[#38BDF8] via-60% to-[#B9F185] border-t border-white/80 shadow-[0_0_35px_rgba(185,241,133,0.45)] transition-all duration-500 group-hover:brightness-110"
                style={{ height: '94%' }}
              />

              {/* Bottom Label below column: Wealth Wisdom */}
              <span className="text-[10px] sm:text-xs font-semibold text-white mt-3 pb-2 text-center truncate max-w-full">
                Wealth Wisdom
              </span>
            </div>

          </div>

        </div>
      </motion.div>

    </section>
  );
}
