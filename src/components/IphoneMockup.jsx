import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

export default function IphoneMockup() {
  const [videoFrame, setVideoFrame] = useState(0);

  // Smooth continuous video animation loop (5 scenes, 3.0s cycle per scene)
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoFrame((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-[250px] sm:w-[275px] md:w-[295px] aspect-[9/18] max-w-full font-sans select-none [perspective:1200px]">
      
      {/* Ambient Soft Glow Behind Device */}
      <div className="absolute inset-0 rounded-[48px] bg-sky-400/20 blur-3xl transform scale-95 pointer-events-none" />

      {/* 3D Realistic iPhone 16 Pro Device Chassis */}
      <div className="relative w-full h-full rounded-[48px] bg-gradient-to-tr from-[#1a1b1e] via-[#333539] to-[#121315] p-[2.5px] shadow-[0_28px_70px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.25)] flex flex-col justify-between overflow-hidden transition-transform duration-500">
        
        {/* Side Button Accents & Antenna Lines */}
        <div className="absolute -right-[4px] top-[160px] w-[4px] h-[65px] bg-gradient-to-b from-[#707277] via-[#2d2e31] to-[#55575b] rounded-r-md shadow-md z-30" />
        <div className="absolute -left-[4px] top-[100px] w-[4px] h-[26px] bg-gradient-to-b from-[#707277] via-[#2d2e31] to-[#55575b] rounded-l-md shadow-md z-30" />
        <div className="absolute -left-[4px] top-[145px] w-[4px] h-[48px] bg-gradient-to-b from-[#707277] via-[#2d2e31] to-[#55575b] rounded-l-md shadow-md z-30" />
        <div className="absolute -left-[4px] top-[205px] w-[4px] h-[48px] bg-gradient-to-b from-[#707277] via-[#2d2e31] to-[#55575b] rounded-l-md shadow-md z-30" />

        {/* Outer Dark Bezel Ring */}
        <div className="relative w-full h-full bg-[#08080a] rounded-[53.5px] p-[8px] sm:p-[10px] flex flex-col justify-between overflow-hidden ring-1 ring-black/80">
          
          {/* CLEAN WHITE SCREEN CANVAS */}
          <div className="relative w-full h-full bg-[#FAFAFA] rounded-[44px] overflow-hidden flex flex-col justify-between font-sans border border-slate-200/90 shadow-inner text-slate-900">
            
            {/* Dynamic Glass Glare Sheen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none z-30" />

            {/* Dynamic Island Cutout */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[92px] sm:w-[104px] h-[25px] sm:h-[27px] bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0c] ring-1 ring-zinc-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#121c38]" />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#081126] ring-1 ring-blue-950/60" />
            </div>

            {/* iOS Status Bar */}
            <div className="pt-3 px-6 pb-1 flex items-center justify-between text-[11px] font-medium text-slate-800 z-30 tracking-tight">
              <span className="font-semibold text-[11.5px]">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-800">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3v18M17 7v14M22 11v10M7 13v8M2 17v4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                </svg>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 18h.01M5 11c4.5-4 9.5-4 14 0M8.5 14.5c2.3-2 4.7-2 7 0M1.5 7.5c7-6 14-6 21 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
                <div className="w-5.5 h-2.5 rounded-[4px] border border-slate-800 p-[1px] flex items-center">
                  <div className="w-[85%] h-full bg-slate-800 rounded-[1.5px]" />
                </div>
              </div>
            </div>

            {/* Top Screen App Header Bar */}
            <div className="px-4 pt-2.5 pb-2 flex items-center justify-between border-b border-slate-100 z-20 bg-white/90 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <img src={wealthWisdomLogo} alt="Logo" className="h-5 w-auto object-contain" />
                <span className="text-xs font-semibold text-slate-900 tracking-tight">Wealth Wisdom</span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full text-[9px] font-medium text-sky-800">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                <span>60FPS DEMO</span>
              </div>
            </div>

            {/* ANIMATED SCREEN DISPLAY */}
            <div className="flex-1 px-3.5 py-3 overflow-hidden relative z-10 flex flex-col justify-between bg-[#F8FAFC]">
              
              {/* Animated Touch Cursor */}
              <motion.div
                animate={{
                  x: videoFrame === 0 ? [110, 110, 110] : videoFrame === 1 ? [140, 60, 60] : videoFrame === 2 ? [60, 180, 180] : videoFrame === 3 ? [180, 80, 80] : [80, 140, 140],
                  y: videoFrame === 0 ? [130, 130, 130] : videoFrame === 1 ? [170, 110, 110] : videoFrame === 2 ? [110, 50, 50] : videoFrame === 3 ? [50, 130, 130] : [130, 170, 170],
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

              <AnimatePresence mode="wait">
                
                {/* SCENE 0: WEALTH WISDOM LOGO SPLASH INTRO & TAP TO START */}
                {videoFrame === 0 && (
                  <motion.div
                    key="vf0_splash"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full flex flex-col items-center justify-center text-center px-2 space-y-3"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "backOut" }}
                      className="relative p-3 bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                    >
                      <img src={wealthWisdomLogo} alt="Wealth Wisdom Logo" className="h-12 w-auto object-contain mx-auto" />
                    </motion.div>

                    <div>
                      <div className="text-sm font-semibold text-slate-900 tracking-tight">Wealth Wisdom</div>
                      <div className="text-[9.5px] text-slate-400 font-normal mt-0.5">Personal Goal Wealth Platform</div>
                    </div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="bg-[#0D2B26] text-white px-4 py-2 rounded-full text-[10.5px] font-medium shadow-2xs flex items-center gap-1.5"
                    >
                      <span>Tap To Open Dashboard</span>
                      <span className="text-[#ED8B36] font-bold">&rarr;</span>
                    </motion.div>
                  </motion.div>
                )}

                {/* SCENE 1: Net Worth Card */}
                {videoFrame === 1 && (
                  <motion.div
                    key="vf1"
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between space-y-2"
                  >
                    <div className="bg-white rounded-2xl p-3.5 border border-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Total Net Worth</span>
                        <span className="bg-emerald-50 text-emerald-800 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-emerald-100">+14.8% YTD</span>
                      </div>

                      <div>
                        <div className="text-2xl font-bold text-slate-900 tracking-tight">₹24,85,000</div>
                        <div className="text-[9px] text-slate-400 mt-0.5 font-normal">Updated Live • Equities & EPF</div>
                      </div>

                      {/* Moving Line Chart */}
                      <div className="pt-1 h-14 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="cleanWaveGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                            d="M0 25 C 20 10, 40 28, 60 12 C 80 5, 90 15, 100 3 L 100 30 L 0 30 Z"
                            fill="url(#cleanWaveGrad)"
                          />
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                            d="M0 25 C 20 10, 40 28, 60 12 C 80 5, 90 15, 100 3"
                            fill="none"
                            stroke="#0284C7"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Lighter Notification Pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="bg-white rounded-xl border border-slate-200/80 text-slate-800 p-2.5 text-xs font-medium flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-slate-600 font-normal">Monthly SIP Allocated</span>
                      </div>
                      <span className="text-[10px] text-slate-900 font-semibold">₹35,000/mo</span>
                    </motion.div>
                  </motion.div>
                )}

                {/* SCENE 2: Milestone Progress Bars */}
                {videoFrame === 2 && (
                  <motion.div
                    key="vf2"
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between space-y-2"
                  >
                    <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-900">
                        <span>Milestone SIP Calculator</span>
                        <span className="text-[9px] text-slate-600 font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">Inflation Adjusted</span>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-medium text-slate-700">
                            <span>🏡 Dream Villa SIP</span>
                            <span className="text-slate-900 font-semibold">₹15L Target</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "68%" }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full bg-[#0D2B26] rounded-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-medium text-slate-700">
                            <span>🎓 Overseas Education</span>
                            <span className="text-slate-900 font-semibold">₹25L Target</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "52%" }}
                              transition={{ duration: 1.4, ease: "easeOut" }}
                              className="h-full bg-sky-500 rounded-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-medium text-slate-700">
                            <span>🏖️ Early Retirement</span>
                            <span className="text-slate-900 font-semibold">₹2.5Cr Target</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "84%" }}
                              transition={{ duration: 1.6, ease: "easeOut" }}
                              className="h-full bg-[#ED8B36] rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 text-slate-700 rounded-xl p-2.5 text-center text-[10px] font-medium shadow-2xs">
                      100% Conflict-Free Financial Framework
                    </div>
                  </motion.div>
                )}

                {/* SCENE 3: Score Gauge */}
                {videoFrame === 3 && (
                  <motion.div
                    key="vf3"
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between space-y-2 text-center"
                  >
                    <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2">
                      <div className="text-xs font-semibold text-slate-900">Financial Health Score</div>

                      {/* Clean Ring Gauge */}
                      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-100"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <motion.path
                            className="text-[#0D2B26]"
                            strokeWidth="3"
                            strokeDasharray="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 12 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-lg font-bold text-slate-900">840</span>
                          <span className="text-[8px] font-medium text-emerald-700">EXCELLENT</span>
                        </div>
                      </div>

                      <div className="text-[9.5px] text-slate-500 font-normal leading-tight">
                        Emergency Cover: 6 Months • EPF Active • Zero Debt
                      </div>
                    </div>

                    <div className="bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 rounded-xl p-2.5 text-xs font-semibold shadow-2xs">
                      Verified Smart Investor Rating
                    </div>
                  </motion.div>
                )}

                {/* SCENE 4: PDF Action Plan Download */}
                {videoFrame === 4 && (
                  <motion.div
                    key="vf4"
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col justify-between space-y-2 text-center"
                  >
                    <div className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 text-[#0D2B26] flex items-center justify-center shadow-2xs">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-900">Instant PDF Roadmap Report</div>
                        <div className="text-[9.5px] text-slate-400 mt-0.5 font-normal">Line-by-line calculations for your family plan.</div>
                      </div>

                      <div className="bg-emerald-50 text-emerald-800 rounded-xl p-1.5 text-[9.5px] font-medium border border-emerald-100">
                        ✓ Download Ready in 5 Mins
                      </div>
                    </div>

                    <div className="bg-[#0D2B26] hover:bg-[#153f38] text-white rounded-xl p-3 text-center cursor-pointer transition-colors shadow-2xs">
                      <div className="text-xs font-semibold flex items-center justify-center gap-1.5">
                        <svg className="w-4 h-4 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Free Action Plan</span>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* Timeline Control Footer */}
            <div className="pb-1.5 pt-1.5 bg-white border-t border-slate-100 flex items-center justify-between px-4 z-30 text-[9px] font-semibold text-slate-600">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0D2B26]" />
                <span className="font-medium">Scene {videoFrame + 1}/5</span>
              </div>

              {/* Speaker & Home Handle Bar */}
              <div className="w-20 h-1 bg-slate-800 rounded-full" />

              <span className="text-[#0D2B26] font-semibold">60 FPS</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
