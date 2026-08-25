import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MacbookScroll } from './ui/macbook-scroll';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

export default function LaptopMockup() {
  const [videoFrame, setVideoFrame] = useState(0);

  // Continuous interactive dashboard animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoFrame((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <MacbookScroll
        showGradient={false}
        screenContent={
          <div className="relative w-full h-full bg-[#FAFAFA] overflow-hidden flex flex-col justify-between text-slate-900 font-sans">
            
            {/* Glass Sheen Glare Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none z-30" />

            {/* Mac Top Menu Bar */}
            <div className="h-7 px-3 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-20 text-[11px] font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="w-[1px] h-3.5 bg-slate-300 mx-1" />
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <img src={wealthWisdomLogo} alt="Logo" className="h-4 w-auto object-contain" />
                  <span>Wealth Wisdom Pro</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-slate-500">
                <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full font-semibold">
                  LIVE DEMO • 60FPS
                </span>
                <span>Portfolio Sync: Active</span>
              </div>
            </div>

            {/* DASHBOARD CONTENT BODY */}
            <div className="flex-1 p-4 sm:p-5 bg-[#F8FAFC] relative z-10 flex flex-col justify-between overflow-hidden">
              
              {/* Animated Touch Cursor */}
              <motion.div
                animate={{
                  x: videoFrame === 0 ? [180, 180, 180] : videoFrame === 1 ? [260, 100, 100] : videoFrame === 2 ? [100, 300, 300] : videoFrame === 3 ? [300, 140, 140] : [140, 260, 260],
                  y: videoFrame === 0 ? [90, 90, 90] : videoFrame === 1 ? [130, 70, 70] : videoFrame === 2 ? [70, 30, 30] : videoFrame === 3 ? [30, 110, 110] : [110, 130, 130],
                  scale: videoFrame === 0 ? [1, 0.75, 1] : [1, 0.85, 1]
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute z-40 pointer-events-none"
              >
                <div className="relative">
                  <svg className="w-5 h-5 fill-[#0D2B26] stroke-white stroke-2 drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M3 3l7 18 3-7 7-3L3 3z" />
                  </svg>
                  <motion.span
                    animate={{ scale: [0.8, 1.8, 0.8], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-sky-400/40 pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Top Stat Summary Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-xs space-y-0.5">
                  <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Health Score</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-slate-900">840</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">EXCELLENT</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-xs space-y-0.5">
                  <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Goal Net Worth</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-slate-900">₹42.85L</span>
                    <span className="text-[9px] font-semibold text-sky-600">+18.4%</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 shadow-xs space-y-0.5">
                  <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Milestones</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-slate-900">92%</span>
                    <span className="text-[9px] font-semibold text-emerald-600">ON TRACK</span>
                  </div>
                </div>
              </div>

              {/* Middle Dashboard View: Active Allocations */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2 my-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Active SIP Allocator & Goal Portfolio</span>
                  <span className="text-[9px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">100% Conflict-Free</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-800">Child Education SIP</div>
                      <div className="text-[9px] text-slate-500">₹35,000 / month</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-800">Retirement Fund</div>
                      <div className="text-[9px] text-slate-500">₹1,20,000 / year</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                  </div>
                </div>
              </div>

              {/* Bottom Status Ribbon */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1 text-[11px] text-emerald-900 font-medium">
                <span>✓ Action Plan Initialized • Instant AI Diagnostic</span>
                <span className="font-bold text-emerald-700">100% Secure</span>
              </div>

            </div>

          </div>
        }
      />
    </div>
  );
}
