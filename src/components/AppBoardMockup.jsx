import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

const STEPS = [
  { id: 0, label: '01 Goals' },
  { id: 1, label: '02 SIP Math' },
  { id: 2, label: '03 Growth Graph' },
  { id: 3, label: '04 Verified Plan' }
];

// Wealth Wisdom Compounding vs Traditional Savings Growth (in Lakhs)
const WEALTH_GROWTH_DATA = [
  { year: '2024', label: 'Age 34', wealthWisdom: 5, traditional: 5, principal: 5 },
  { year: '2026', label: 'Age 36', wealthWisdom: 24, traditional: 14, principal: 15 },
  { year: '2028', label: 'Age 38', wealthWisdom: 56, traditional: 28, principal: 25 },
  { year: '2030', label: 'Age 40', wealthWisdom: 104, traditional: 46, principal: 36 },
  { year: '2032', label: 'Age 42', wealthWisdom: 172, traditional: 66, principal: 46 },
  { year: '2034', label: 'Age 44', wealthWisdom: 268, traditional: 89, principal: 56 },
  { year: '2036', label: 'Age 46', wealthWisdom: 312, traditional: 102, principal: 66 },
  { year: '2038', label: 'Age 55', wealthWisdom: 323, traditional: 115, principal: 71 }
];

export default function AppBoardMockup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: '35%', y: '45%' });
  const [isClicking, setIsClicking] = useState(false);

  // Fast-paced Apple-style automated cursor demo loop
  useEffect(() => {
    let t1, t2, t3, t4;

    if (currentStep === 0) {
      // Step 0: Goal selection
      setCursorPos({ x: '24%', y: '48%' });
      t1 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 650);

      t2 = setTimeout(() => {
        setCursorPos({ x: '86%', y: '90%' });
      }, 1150);

      t3 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 1800);

      t4 = setTimeout(() => {
        setCurrentStep(1);
      }, 2200);
    } else if (currentStep === 1) {
      // Step 1: SIP math model
      setCursorPos({ x: '25%', y: '48%' });
      t1 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 600);

      t2 = setTimeout(() => {
        setCursorPos({ x: '86%', y: '90%' });
      }, 1100);

      t3 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 1800);

      t4 = setTimeout(() => {
        setCurrentStep(2);
      }, 2200);
    } else if (currentStep === 2) {
      // Step 2: Growth graph analysis
      setCursorPos({ x: '68%', y: '46%' });
      t1 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 700);

      t2 = setTimeout(() => {
        setCursorPos({ x: '86%', y: '90%' });
      }, 1400);

      t3 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 2000);

      t4 = setTimeout(() => {
        setCurrentStep(3);
      }, 2400);
    } else if (currentStep === 3) {
      // Step 3 (Absolute End Finale): Logo reveal and final CTA click
      setCursorPos({ x: '50%', y: '78%' });
      t1 = setTimeout(() => {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 220);
      }, 1000);

      t2 = setTimeout(() => {
        setCurrentStep(0);
      }, 2800);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [currentStep]);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto select-none font-sans overflow-visible"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Inter", sans-serif' }}
    >
      {/* Pure Frosted Glass Application Window */}
      <div className="relative rounded-t-[28px] sm:rounded-t-[36px] overflow-hidden bg-white/[0.08] backdrop-blur-3xl border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]">
        
        {/* Luminous Top Rim Reflection Edge */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30" />

        {/* macOS Top Chrome Menu Bar */}
        <div className="h-12 px-6 bg-white/[0.06] backdrop-blur-2xl border-b border-white/15 flex items-center justify-between z-20">
          
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow-xs" />
          </div>

          {/* Interactive Step Trackers */}
          <div className="flex items-center gap-1 sm:gap-2">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/25 text-white font-medium shadow-xs border border-white/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10 font-light'
                  }`}
                >
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Live Simulation Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-light text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Simulated User Flow</span>
          </div>
        </div>

        {/* Dynamic Animated Content Stage */}
        <div className="min-h-[480px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-white/[0.02]">
          
          {/* Animated macOS Pointer Cursor with Click Ripple */}
          <motion.div
            className="pointer-events-none absolute z-50 origin-top-left"
            animate={{ left: cursorPos.x, top: cursorPos.y }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ scale: isClicking ? 0.8 : 1 }}
              transition={{ duration: 0.12 }}
              className="relative"
            >
              {/* macOS Crisp Black Pointer with White Rim */}
              <svg
                className="w-5 h-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] -rotate-12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 3L11 21L14.2 13.8L21.5 11L4 3Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Click Ripple Wave */}
              {isClicking && (
                <motion.span
                  initial={{ scale: 0.3, opacity: 1 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute -top-1 -left-1 w-6 h-6 rounded-full border border-white bg-white/30"
                />
              )}
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            
            {/* ================= STEP 0: PROFILE & GOAL SELECTION ================= */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div>
                      <span className="text-xs text-white/90 font-medium tracking-wide uppercase">Step 01 • Life Milestone Targets</span>
                      <h3 className="text-xl sm:text-2xl font-normal text-white mt-0.5">Family Profile & Goals Initialization</h3>
                    </div>
                    <span className="text-xs text-white/80 font-light">Age: 34 • Target Horizon: 14–21 Yrs</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {/* Goal Card 1 */}
                    <div className="p-4 rounded-2xl bg-white/20 border border-white/40 shadow-sm space-y-2 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Early Retirement</span>
                        <span className="text-xs text-white font-medium">Age 55</span>
                      </div>
                      <div className="text-lg font-normal text-white">₹2.80 Crore</div>
                      <p className="text-xs text-white/80 font-light">14 Years Compounding Runway</p>
                      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mt-3">
                        <div className="w-3/4 h-full bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Goal Card 2 */}
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Child Higher Education</span>
                        <span className="text-xs text-white/80 font-light">Year 2034</span>
                      </div>
                      <div className="text-lg font-normal text-white">₹65.0 Lakhs</div>
                      <p className="text-xs text-white/80 font-light">US University Currency Hedged</p>
                      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mt-3">
                        <div className="w-4/5 h-full bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Goal Card 3 */}
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Dream Home Down Payment</span>
                        <span className="text-xs text-white/80 font-light">Year 2028</span>
                      </div>
                      <div className="text-lg font-normal text-white">₹45.0 Lakhs</div>
                      <p className="text-xs text-white/80 font-light">Capital Preservation Focus</p>
                      <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mt-3">
                        <div className="w-3/5 h-full bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar Ribbon */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/90 font-light">
                  <span>Profile parameters initialized • Inflation index set at 6.5% p.a.</span>
                  <div className="text-white font-medium flex items-center gap-1.5 bg-white/15 border border-white/25 px-3 py-1 rounded-xl">
                    <span>Run SIP Math Model</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 1: SIP MATH & ALLOCATION ENGINE ================= */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div>
                      <span className="text-xs text-white/90 font-medium tracking-wide uppercase">Step 02 • Math Model</span>
                      <h3 className="text-xl sm:text-2xl font-normal text-white mt-0.5">SIP & Multi-Asset Allocation Engine</h3>
                    </div>
                    <span className="text-xs text-white font-medium">Inflation Hedging: Active</span>
                  </div>

                  {/* High Contrast Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-5 rounded-2xl bg-white/20 border border-white/35 space-y-1 shadow-sm">
                      <span className="text-xs text-white/80 font-light uppercase tracking-wider">Required Monthly SIP</span>
                      <div className="text-2xl sm:text-3xl font-normal text-white">₹42,500</div>
                      <p className="text-xs text-white/90 font-normal">12.5% Projected Compound Return</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                      <span className="text-xs text-white/80 font-light uppercase tracking-wider">Target Net Corpus</span>
                      <div className="text-2xl sm:text-3xl font-normal text-white">₹2.80 Crore</div>
                      <p className="text-xs text-white/80 font-light">Inflation-Indexed at Age 55</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                      <span className="text-xs text-white/80 font-light uppercase tracking-wider">Tax Efficiency Rating</span>
                      <div className="text-2xl sm:text-3xl font-normal text-white">94.2%</div>
                      <p className="text-xs text-white/90 font-normal">Section 112A Exemption Optimized</p>
                    </div>
                  </div>

                  {/* Asset Allocation Breakdown */}
                  <div className="mt-5 p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-around flex-wrap gap-4 text-xs font-light text-white">
                    <div>Equity Index: <strong className="text-white font-medium">65% (₹27.6k/mo)</strong></div>
                    <div>High-Grade Corporate Debt: <strong className="text-white font-medium">25% (₹10.6k/mo)</strong></div>
                    <div>Sovereign Gold (SGB): <strong className="text-white font-medium">10% (₹4.3k/mo)</strong></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/90 font-light">
                  <span>Multi-goal portfolio rebalancing simulated across 14-year horizon</span>
                  <div className="text-white font-medium flex items-center gap-1.5 bg-white/15 border border-white/25 px-3 py-1 rounded-xl">
                    <span>View Compounding Graph</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: WEALTH WISDOM GROWTH GRAPH ================= */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div>
                      <span className="text-xs text-white/90 font-medium tracking-wide uppercase">Step 03 • Growth Trajectory</span>
                      <h3 className="text-lg sm:text-xl font-normal text-white mt-0.5">How Wealth Wisdom Multiplies Your Wealth</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-light text-white">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white shadow-xs" /> Wealth Wisdom Strategy: <strong className="font-semibold text-white">₹3.23 Cr</strong></span>
                      <span className="hidden sm:flex items-center gap-1.5 text-white/70"><span className="w-2 h-2 rounded-full bg-white/40" /> Traditional Savings: <strong>₹1.15 Cr</strong></span>
                    </div>
                  </div>

                  {/* Beautiful Animated Recharts Glassmorphic Area Graph */}
                  <div className="mt-3 p-3 rounded-2xl bg-white/[0.07] border border-white/20 backdrop-blur-2xl shadow-xs">
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={WEALTH_GROWTH_DATA} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorWealthWisdom" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.45} />
                              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>

                          <XAxis
                            dataKey="year"
                            stroke="rgba(255, 255, 255, 0.4)"
                            tick={{ fill: 'rgba(255, 255, 255, 0.85)', fontSize: 10 }}
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                          />
                          <YAxis
                            stroke="rgba(255, 255, 255, 0.4)"
                            tick={{ fill: 'rgba(255, 255, 255, 0.85)', fontSize: 10 }}
                            tickFormatter={(val) => `₹${val}L`}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-slate-900/90 backdrop-blur-xl border border-white/25 p-2.5 rounded-xl text-xs space-y-1 shadow-lg text-white">
                                    <div className="font-semibold text-white">{payload[0]?.payload.year} ({payload[0]?.payload.label})</div>
                                    <div className="text-white font-normal">Wealth Wisdom Strategy: <strong className="font-bold">₹{payload[0]?.payload.wealthWisdom} Lakhs</strong></div>
                                    <div className="text-white/80 font-light">Traditional Savings: ₹{payload[0]?.payload.traditional} Lakhs</div>
                                    <div className="text-amber-300 font-medium text-[11px] pt-0.5 border-t border-white/10">
                                      Extra Wealth Created: +₹{payload[0]?.payload.wealthWisdom - payload[0]?.payload.traditional} Lakhs
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />

                          <Area
                            type="monotone"
                            dataKey="wealthWisdom"
                            stroke="#FFFFFF"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#colorWealthWisdom)"
                            isAnimationActive={true}
                            animationDuration={1400}
                            animationEasing="ease-out"
                          />
                          <Area
                            type="monotone"
                            dataKey="traditional"
                            stroke="rgba(255, 255, 255, 0.45)"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            fillOpacity={1}
                            fill="url(#colorTraditional)"
                            isAnimationActive={true}
                            animationDuration={1400}
                            animationEasing="ease-out"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Compounding Advantage Summary Strip */}
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="p-2 rounded-xl bg-white/10 border border-white/20 text-center">
                      <span className="text-[10px] text-white/70 block uppercase font-light">Wealth Wisdom Corpus</span>
                      <span className="text-sm sm:text-base font-bold text-white">₹3.23 Crore</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/15 border border-white/30 text-center">
                      <span className="text-[10px] text-white/70 block uppercase font-light">Additional Alpha Generated</span>
                      <span className="text-sm sm:text-base font-bold text-white">+₹2.08 Crore</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 border border-white/20 text-center">
                      <span className="text-[10px] text-white/70 block uppercase font-light">Retirement Readiness</span>
                      <span className="text-sm sm:text-base font-bold text-white">100% Achieved</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/90 font-light">
                  <span>Calculated with 100% conflict-free financial advisory models</span>
                  <div className="text-white font-medium flex items-center gap-1.5 bg-white/15 border border-white/25 px-3 py-1 rounded-xl">
                    <span>Generate Final Roadmap</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: ABSOLUTE END FINALE - WEALTH WISDOM LOGO REVEAL & PLAN ================= */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 flex-1 flex flex-col items-center justify-center text-center py-4"
              >
                {/* Luminous Apple-Style Wealth Wisdom Logo Reveal */}
                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl pointer-events-none" />
                  <img
                    src={wealthWisdomLogo}
                    alt="Wealth Wisdom"
                    className="h-16 sm:h-20 w-auto object-contain brightness-0 invert drop-shadow-lg relative z-10 mx-auto"
                  />
                </motion.div>

                <div className="space-y-2 max-w-lg">
                  <span className="text-xs text-white/90 font-medium uppercase tracking-widest">Assessment Completed</span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                    Your Personalized Wealth Roadmap is Ready
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                    A comprehensive, line-by-line financial assessment tailored to your family's life milestones.
                  </p>
                </div>

                {/* Final Call to Action Button with Frosted Glassmorphism Styling */}
                <div className="pt-2">
                  <Link
                    to="/assessment"
                    className="relative group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.22] via-white/[0.12] to-white/[0.05] border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.22] hover:border-white/70 hover:shadow-[0_12px_35px_rgba(255,255,255,0.18),0_4px_15px_rgba(0,0,0,0.4)] active:scale-95 cursor-pointer text-white"
                  >
                    {/* Glossy top specular reflection glare */}
                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-full" />
                    
                    {/* Top crisp glare line */}
                    <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

                    {/* Button text & paper plane icon */}
                    <span className="relative z-20 font-medium text-white text-xs sm:text-sm tracking-tight drop-shadow-xs">
                      Start Free DIY Assessment
                    </span>
                    <svg
                      className="relative z-20 w-3.5 h-3.5 text-white fill-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 drop-shadow-xs"
                      viewBox="0 0 24 24"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </Link>
                </div>

                <div className="text-[11px] text-white/80 font-light">
                  100% Conflict-Free • Instant Comprehensive PDF Report
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
