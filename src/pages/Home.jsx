import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';
import client from '../config/api';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getDynamicServices, getDynamicTestimonials } from '../api/publicService';

// Custom SVG Icons for Bento Feature Cards
const ReadinessIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RoadmapIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const CorpusIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InvestmentIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ProtectionIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const PlanningIcon = () => (
  <svg className="w-6 h-6 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 022 2h2a2 2 0 022-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const DEFAULT_ICONS = [ReadinessIcon, RoadmapIcon, InvestmentIcon, ProtectionIcon, CorpusIcon, PlanningIcon];

// Dynamic Morphing Dreams & Goals for Title Animation (No Emojis)
const DREAMS_LIST = [
  {
    text: "Early Retirement",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ED8B36] shrink-0 ml-2 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        {/* Sun & Beach Umbrella / Palm Icon for Retirement */}
        <circle cx="12" cy="7" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v11m-7 0h14M4 17c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0" />
      </svg>
    )
  },
  {
    text: "Child's Higher Education",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ED8B36] shrink-0 ml-2 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        {/* Mortarboard Graduation Cap Icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8l10 5 10-5-10-5zm0 9.5l-6-3V15c0 1.657 2.686 3 6 3s6-1.343 6-3v-5.5l-6 3zM22 10v6" />
      </svg>
    )
  },
  {
    text: "Buying a Dream Home",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ED8B36] shrink-0 ml-2 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        {/* House / Home Icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
      </svg>
    )
  },
  {
    text: "World Travel & Vacation",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ED8B36] shrink-0 ml-2 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        {/* Airplane Travel Icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.424M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    )
  },
  {
    text: "Wealth & Legacy Creation",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ED8B36] shrink-0 ml-2 drop-shadow-xs" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        {/* Trending Growth Chart Icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
];

const ASSESSMENT_FLOW_STEPS = [
  { step: 1, title: "Family & Profile", desc: "Age, Income & EPF/NPS" },
  { step: 2, title: "Target Milestones", desc: "Set Goals & Timelines" },
  { step: 3, title: "SIP Math Model", desc: "Corpus & Inflation Math" },
  { step: 4, title: "Instant PDF Report", desc: "Line-by-line Action Plan" }
];

// Reusable bento card shadow classes — inset (inner) shadow for the "bubbly" pressed-in neumorphic look.
const bentoCardShadow =
  "bg-[#F4F1EA] hover:bg-[#EFE9DC] scale-100 hover:scale-[0.985] " +
  "shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]";

// Dynamic Morphing Bento Column Span calculator driven by active Spotlight index
const computeDynamicBentoSpan = (idx, activeIdx, total) => {
  if (total <= 3) return "lg:col-span-4";

  if (activeIdx === 0) {
    if (idx === 0) return "lg:col-span-8";
    if (idx === 1) return "lg:col-span-4";
    if (idx === 2 || idx === 3 || idx === 4) return "lg:col-span-4";
    if (idx === 5) return "lg:col-span-12";
  }
  if (activeIdx === 1) {
    if (idx === 0) return "lg:col-span-4";
    if (idx === 1) return "lg:col-span-8";
    if (idx === 2 || idx === 3 || idx === 4) return "lg:col-span-4";
    if (idx === 5) return "lg:col-span-12";
  }
  if (activeIdx === 2) {
    if (idx === 0) return "lg:col-span-7";
    if (idx === 1) return "lg:col-span-5";
    if (idx === 2) return "lg:col-span-6";
    if (idx === 3) return "lg:col-span-3";
    if (idx === 4) return "lg:col-span-3";
    if (idx === 5) return "lg:col-span-12";
  }
  if (activeIdx === 3) {
    if (idx === 0) return "lg:col-span-7";
    if (idx === 1) return "lg:col-span-5";
    if (idx === 2) return "lg:col-span-3";
    if (idx === 3) return "lg:col-span-6";
    if (idx === 4) return "lg:col-span-3";
    if (idx === 5) return "lg:col-span-12";
  }
  if (activeIdx === 4) {
    if (idx === 0) return "lg:col-span-7";
    if (idx === 1) return "lg:col-span-5";
    if (idx === 2) return "lg:col-span-3";
    if (idx === 3) return "lg:col-span-3";
    if (idx === 4) return "lg:col-span-6";
    if (idx === 5) return "lg:col-span-12";
  }
  if (activeIdx === 5) {
    if (idx === 0) return "lg:col-span-6";
    if (idx === 1) return "lg:col-span-6";
    if (idx === 2 || idx === 3 || idx === 4) return "lg:col-span-4";
    if (idx === 5) return "lg:col-span-12";
  }

  const defaultSpans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"];
  return defaultSpans[idx % defaultSpans.length];
};

const DEFAULT_SERVICES = [
  {
    id: "srv-1",
    title: "Financial Health Check",
    description: "Get a comprehensive assessment of your financial health by analyzing your income, expenses, savings, investments, liabilities, and overall financial preparedness."
  },
  {
    id: "srv-2",
    title: "Goal-Based Financial Planning",
    description: "Plan for your life goals such as buying a home, children's education, travel, retirement, and wealth creation with a personalized financial roadmap."
  },
  {
    id: "srv-3",
    title: "Investment & Portfolio Review",
    description: "Evaluate your existing investments and receive recommendations to build a well-diversified portfolio aligned with your goals and risk profile."
  },
  {
    id: "srv-4",
    title: "Insurance & Risk Management",
    description: "Identify protection gaps and ensure adequate coverage through Term Insurance, Health Insurance, Personal Accident Cover, and Emergency Planning."
  },
  {
    id: "srv-5",
    title: "Retirement Planning",
    description: "Estimate the retirement corpus required, assess your retirement readiness, and create a strategy for a financially independent retirement."
  },
  {
    id: "srv-6",
    title: "Estate Planning (Will & Trust)",
    description: "Secure your family's future with proper estate planning, including Wills, Trusts, nominations, and seamless wealth transfer across generations."
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Vikram & Sunita Sharma",
    role: "Senior Enterprise Architect, Bengaluru",
    text: "The DIY assessment opened our eyes! Within 10 minutes we had exact SIP requirements for our daughter's overseas education and our early retirement targets.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Rajesh K. Mehta",
    role: "VP of Product Engineering, Mumbai",
    text: "Clear, transparent, and completely conflict-free advice. The structured roadmap helped me streamline my scattered mutual funds and insurance policies effortlessly.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Ananya Roy & Family",
    role: "Medical Practitioner & Clinical Lead, Delhi",
    text: "Outstanding financial clarity. The PDF report provided line-by-line calculations that gave my spouse and me total confidence in our 15-year financial plan.",
    rating: 5
  }
];

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic state for Services & Testimonials (fetched from admin APIs)
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  // Bento Spotlight & Shape-Morphing State
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Animated Cursor Dreams & DIY Assessment Flow State
  const [currentDreamIdx, setCurrentDreamIdx] = useState(0);

  // Cycle morphing title goals
  useEffect(() => {
    const dreamTimer = setInterval(() => {
      setCurrentDreamIdx((prev) => (prev + 1) % DREAMS_LIST.length);
    }, 2800);
    return () => clearInterval(dreamTimer);
  }, []);

  // Automated spotlight cycle every 3.5 seconds
  useEffect(() => {
    if (isPaused || services.length === 0) return;
    const timer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % services.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, services.length]);

  useEffect(() => {
    let isMounted = true;
    const loadAdminDynamicContent = async () => {
      try {
        const [dynServices, dynTestimonials] = await Promise.all([
          getDynamicServices(),
          getDynamicTestimonials()
        ]);

        if (isMounted) {
          if (Array.isArray(dynServices) && dynServices.length > 0) {
            setServices(dynServices);
          }
          if (Array.isArray(dynTestimonials) && dynTestimonials.length > 0) {
            setTestimonials(dynTestimonials);
          }
        }
      } catch (err) {
        console.warn("[Home] Error loading dynamic content from admin API:", err);
      }
    };

    loadAdminDynamicContent();
    return () => { isMounted = false; };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await client.post('/contact/get-in-touch', {
        name: contactName,
        mobile: contactMobile,
        email: contactEmail,
        message: contactMessage
      });
      alert("Thank you! Our expert financial advisor will get in touch with you shortly.");
      setContactName('');
      setContactMobile('');
      setContactEmail('');
      setContactMessage('');
      setIsContactModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit request: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-[#1C1B1A] selection:bg-brand-gold/30 selection:text-brand-blue">

      {/* 1. Top Promotional Banner */}
      <div className="bg-[#FFF3E6] border-b border-orange-100 py-1.5 px-4 text-center">
        <p className="text-xs sm:text-sm text-[#E56A1F] font-medium tracking-wide">
          Take charge of your future with a personalized goal-based financial plan &rarr;{' '}
          <Link to="/assessment" className="underline hover:text-[#ED8B36] font-bold transition-colors">
            Start your assessment today!
          </Link>
        </p>
      </div>

      {/* 2. Beautiful Responsive Navbar */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">

        {/* Hero Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4 sm:pb-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-12 space-y-3">
              <h1 className="font-heading text-3xl sm:text-[42px] lg:text-[46px] font-extrabold text-[#1C1B1A] leading-[1.16] tracking-tight">
                Turn Your{" "}
                <span className="relative inline-flex items-center px-3.5 py-1 my-0.5 rounded-2xl bg-[#FFF6ED] border-2 border-[#ED8B36] text-[#ED8B36] shadow-2xs select-none">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentDreamIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="inline-flex items-center gap-1.5 font-extrabold"
                    >
                      <span>{DREAMS_LIST[currentDreamIdx].text}</span>
                      {DREAMS_LIST[currentDreamIdx].icon}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                into Achievable Financial Goals
              </h1>

              <p className="text-[#555D6E] text-sm sm:text-[15px] leading-[1.55] font-normal max-w-3xl">
                Achieve your aspirations with a flexible framework built for multiple goals, different timelines, and smarter planning. Discover the steps required to turn your dreams into reality.
              </p>

              {/* Hero CTA Button Container with Gliding Mouse Cursor */}
              <div className="pt-1.5 flex flex-wrap items-center gap-4 relative inline-block">
                <Link
                  to="/assessment"
                  className="relative group bg-[#ED8B36] hover:bg-[#E07A2E] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 z-10"
                >
                  <span>Get Started</span>
                  <span className="text-lg font-extrabold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>

                {/* Gliding Mouse Cursor Pointer Arrow hovering & clicking around Start DIY Assessment button */}
                <motion.div
                  animate={{
                    x: [35, -15, 10, -5, 35],
                    y: [25, 5, -10, 0, 25],
                    scale: [1, 0.9, 1.1, 1]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-4 right-2 z-30 pointer-events-none text-[#ED8B36]"
                >
                  <svg className="w-7 h-7 drop-shadow-md fill-[#ED8B36] stroke-white stroke-2" viewBox="0 0 24 24">
                    <path d="M3 3l7 18 3-7 7-3L3 3z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ED8B36] animate-ping opacity-75" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7 overflow-hidden rounded-3xl shadow-sm border border-slate-200/60 group relative">
              <img src="/assets/hero_left.png" alt="Advisor with couple" className="w-full h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[370px] object-cover group-hover:scale-102 transition-transform duration-700 ease-out" />
            </div>
            <div className="md:col-span-5 overflow-hidden rounded-3xl shadow-sm border border-slate-200/60 group relative">
              <img src="/assets/f0f7eaffd28bff647ab71073c5e804a9bb36aec8.jpg" alt="Couple with laptop" className="w-full h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[370px] object-cover group-hover:scale-102 transition-transform duration-700 ease-out" />
            </div>
          </div>
        </section>

        {/* Trust Bar / Mini Testimonial Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#FAF6F0] rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-10 sm:py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 border border-amber-100/60 shadow-2xs">
            <div className="flex items-center gap-4 justify-center lg:justify-start text-center lg:text-left">
              <div className="flex -space-x-3 items-center shrink-0">
                <img
                  className="inline-block w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-[#FAF6F0] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client Avatar 1"
                />
                <img
                  className="inline-block w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-[#FAF6F0] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client Avatar 2"
                />
                <img
                  className="inline-block w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-[#FAF6F0] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Client Avatar 3"
                />
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#ED8B36] ring-2 ring-[#FAF6F0] text-[11px] sm:text-xs font-bold text-white">
                  +5k
                </span>
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#ED8B36] uppercase tracking-wider block">PROVEN TRACK RECORD</span>
                <p className="font-heading font-bold text-slate-800 text-sm sm:text-[15px] leading-snug">
                  Know exactly where you stand today with 5,000+ satisfied families
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3 lg:border-l lg:border-slate-200/70 lg:pl-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ED8B36] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5-7 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ED8B36] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ED8B36] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Personalized Report</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- DYNAMIC FRAMER MOTION SPOTLIGHT BENTO GRID SERVICES ---------------- */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-20">
          
          {/* Section Heading Banner */}
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#FFF6ED] border border-[#F5D7C1] text-[#ED8B36] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs select-none">
              <span>✦ Tailored Wealth Solutions</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1E2B49] tracking-tight leading-tight">
              Our Comprehensive Financial Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Explore our live dynamic wealth management services. Watch how our bento framework spotlights each financial discipline automatically.
            </p>
          </div>

          {/* Framer Motion Auto-Morphing Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {services.map((srv, idx) => {
              const IconComp = DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
              const spanClass = computeDynamicBentoSpan(idx, spotlightIndex, services.length);
              const isSpotlight = idx === spotlightIndex;

              return (
                <motion.div
                  key={srv.id || idx}
                  layout
                  transition={{
                    layout: { type: "spring", stiffness: 140, damping: 20, mass: 0.8 }
                  }}
                  onMouseEnter={() => {
                    setSpotlightIndex(idx);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setSpotlightIndex(idx)}
                  className={`${spanClass} bg-[#F4F1EA] rounded-[1.25rem] p-4 sm:p-5 flex flex-col justify-between gap-3 group relative overflow-hidden cursor-pointer ${
                    isSpotlight
                      ? "border-2 border-[#ED8B36] z-20"
                      : "border border-[#E8E2D8] hover:border-[#ED8B36]/40"
                  }`}
                  style={{
                    boxShadow: isSpotlight
                      ? "2px 2px 8px rgba(237,139,54,0.35), inset 6px 6px 14px rgba(180,165,145,0.55), inset -6px -6px 14px rgba(255,255,255,1)"
                      : "2px 2px 6px rgba(180,172,158,0.3), inset 4px 4px 10px rgba(180,172,158,0.45), inset -4px -4px 10px rgba(255,255,255,0.9)",
                  }}
                >
                  {/* Glossy Beam Shimmer on Card Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isSpotlight
                          ? "bg-[#ED8B36] text-white shadow-md"
                          : "bg-gradient-to-br from-amber-100 to-orange-50 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8)]"
                      }`}>
                        <div className={isSpotlight ? "[&_svg]:text-white" : ""}>
                          <IconComp />
                        </div>
                      </div>

                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#ED8B36] bg-[#FFF6ED] border border-[#F5D7C1] px-2.5 py-0.5 rounded-full shadow-2xs">
                        Advisory
                      </span>
                    </div>

                    <h3 className={`font-heading font-bold transition-colors ${
                      isSpotlight ? "text-lg text-[#1C1B1A]" : "text-base text-[#1E2B49]"
                    }`}>
                      {srv.title}
                    </h3>
                    <p className={`text-xs leading-relaxed transition-all ${
                      isSpotlight ? "text-slate-700 font-medium line-clamp-3" : "text-slate-500 line-clamp-2"
                    }`}>
                      {srv.description}
                    </p>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-2 border-t border-[#E5DFD3]/80 flex items-center justify-between relative z-10">
                    <span className={`text-[10px] font-extrabold transition-colors ${
                      isSpotlight ? "text-[#ED8B36]" : "text-[#8E8A80]"
                    }`}>
                      Explore Service
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsContactModalOpen(true);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-2xs transition-all duration-300 cursor-pointer ${
                        isSpotlight
                          ? "bg-[#ED8B36] text-white shadow-md"
                          : "bg-white border border-[#E5DFD3] text-[#ED8B36] group-hover:bg-[#ED8B36] group-hover:text-white"
                      }`}
                    >
                      &rarr;
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Spotlight Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 select-none">
            {services.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setSpotlightIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  spotlightIndex === dotIdx
                    ? "w-8 bg-[#ED8B36] shadow-xs"
                    : "w-2 bg-[#E5DFD3] hover:bg-[#ED8B36]/50"
                }`}
                aria-label={`Jump to service ${dotIdx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Goal Section Banner (Positioned after Services) */}
        <section className="bg-[#F4F1EA] border-y border-[#E8E2D8] pt-16 pb-14 sm:pt-20 sm:pb-16 text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FFF6ED] border border-[#F5D7C1] text-[#ED8B36] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-2xs select-none">
              <span>Life Milestones</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E2B49] leading-tight">
              A Financial Plan Built Around Your Life Milestones
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Understand whether you're on track to achieve all of your life goals and the future you envision. Our assessment helps uncover your funding requirements, target timelines, investment needs, and potential planning gaps, all in just a few minutes.
            </p>
            <div className="pt-2 flex flex-col items-center gap-3">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-[#ED8B36] hover:bg-[#E07A2E] text-white px-8 py-4 rounded-xl text-base font-bold hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0 transition-all shadow-md cursor-pointer"
              >
                Start DIY Assessment &rarr;
              </Link>
              <p className="text-xs font-semibold text-[#8E8A80] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ED8B36]" />
                100% Self-Guided DIY Financial Assessment • Instant Report
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- ABOUT US SECTION ---------------- */}
        <section id="about" className="bg-[#FAF6F0] border-y border-[#EFE9DF] py-16 sm:py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 bg-[#FFF6ED] border border-[#F5D7C1] text-[#ED8B36] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-2xs select-none">
                  <span>About Wealth Wisdom</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1C1B1A] leading-tight">
                  Your Trusted Partner in Independent Financial Freedom
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Wealth Wisdom was founded with a singular mission: to democratize institutional-grade financial planning for Indian families and working professionals. We blend advanced quantitative models with personalized advisory to deliver clarity, confidence, and real wealth creation.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#EFE9DF] shadow-2xs space-y-1">
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#ED8B36]">₹500+ Cr</span>
                    <span className="block text-xs font-semibold text-slate-500">Assets Under Guidance</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#EFE9DF] shadow-2xs space-y-1">
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#ED8B36]">5,000+</span>
                    <span className="block text-xs font-semibold text-slate-500">Satisfied Clients</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-[#EFE9DF] shadow-md">
                <img
                  src="/assets/8dba846db002417c3fb9cb45eb6d1f275241dce8.png"
                  alt="Wealth Wisdom Advisors in consultation"
                  className="w-full h-full object-cover min-h-[320px] hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- DYNAMIC ADMIN TESTIMONIALS (NEUMORPHIC INNER SHADOWS) ---------------- */}
        <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#FFF6ED] border border-[#F5D7C1] text-[#ED8B36] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-2xs select-none">
              <span>Client Voices & Reviews</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1C1B1A] tracking-tight leading-tight">
              Trusted by 5,000+ Families Across India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Read how Wealth Wisdom helped professionals and families transform financial ambiguity into structured, achievable life goals.
            </p>
          </div>

          <div className={`grid gap-6 ${
            testimonials.length === 1
              ? "grid-cols-1 max-w-xl mx-auto"
              : testimonials.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}>
            {testimonials.map((t, idx) => (
              <div
                key={t.id || idx}
                className="bg-[#F4F1EA] hover:bg-[#EFE9DC] scale-100 hover:scale-[0.98] transition-all duration-300 rounded-[1.5rem] p-7 flex flex-col justify-between border border-[#E8E2D8] cursor-pointer group"
                style={{
                  boxShadow:
                    "2px 2px 6px rgba(180,172,158,0.3), inset 4px 4px 10px rgba(180,172,158,0.45), inset -4px -4px 10px rgba(255,255,255,0.9)",
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ED8B36]">
                      {Array.from({ length: t.rating || 5 }).map((_, starIdx) => (
                        <svg key={starIdx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-2xl font-serif text-[#ED8B36]/40 group-hover:text-[#ED8B36] transition-colors">“</span>
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic font-normal">
                    "{t.text || t.message || t.testimonial}"
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#E5DFD3] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ED8B36] to-amber-500 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs overflow-hidden">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      (t.name || "C").charAt(0)
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading text-xs sm:text-sm font-extrabold text-[#1C1B1A] leading-snug break-words">
                      {t.name || "Satisfied Client"}
                    </h4>
                    {t.role && t.role !== "Verified Investor" && (
                      <span className="text-[11px] font-medium text-slate-500 block leading-snug break-words">
                        {t.role}
                      </span>
                    )}
                    <span className="text-[10px] font-extrabold text-[#ED8B36] block mt-0.5">
                      ✓ Verified Client
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- DARK CONSULTATION BLOCK ---------------- */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 scroll-mt-20">
          <div className="bg-[#1C1B1A] rounded-3xl p-6 sm:p-10 flex flex-col gap-10 border border-slate-800 text-white shadow-2xl">
            <div className="w-full overflow-hidden rounded-2xl max-h-[360px] border border-slate-800">
              <img src="/assets/8dba846db002417c3fb9cb45eb6d1f275241dce8.png" alt="Office meeting" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/10 text-[#ED8B36] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider select-none border border-white/10">
                  <span>Advisory Excellence</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Why Wealth Wisdom is the Right Choice for You
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Personalized to Your Life Goals</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Tailored around your family, lifestyle, milestone goals, and financial priorities.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Goal Readiness Audit</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Know the exact funding requirements, target timelines, and investments needed to hit every target.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Actionable Financial Roadmap</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Get clear recommendations to achieve your future goals with confidence.</p>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#ED8B36] hover:bg-[#E07A2E] text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  Book my free consultation &rarr;
                </button>
                <Link
                  to="/assessment"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl text-sm font-bold border border-white/20 transition-all cursor-pointer"
                >
                  Start DIY Assessment
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />

      {/* Get In Touch Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in select-none">
          <div 
            className="absolute inset-0 bg-[#1C1B1A]/50 backdrop-blur-xs transition-opacity cursor-pointer" 
            onClick={() => setIsContactModalOpen(false)}
          />
          
          <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#EFE9DF] rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden z-10 text-left max-h-[85vh] sm:max-h-[90vh] flex flex-col">
            <button 
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-600 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#EFE9DF] cursor-pointer z-20 shadow-2xs"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar rounded-2xl sm:rounded-[2rem]">
              <div className="p-6 sm:p-8 space-y-4">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="text-[11px] font-bold text-[#F0883E] tracking-wider uppercase mb-1">
                    GET EXPERT GUIDANCE FOR YOUR FINANCIAL FUTURE
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1C1B1A] leading-tight mb-2">
                    Book Your Free Consultation
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#4A4740]">Your Name*</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none border border-[#EFE9DF] bg-white focus:border-[#F0883E] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#4A4740]">Email address*</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none border border-[#EFE9DF] bg-white focus:border-[#F0883E] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#4A4740]">Mobile Number*</label>
                    <div className="flex gap-2">
                      <div className="border border-[#EFE9DF] bg-white rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold select-none shrink-0 flex items-center justify-center font-sans text-slate-600">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        value={contactMobile}
                        onChange={(e) => setContactMobile(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none border border-[#EFE9DF] bg-white focus:border-[#F0883E] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#4A4740]">Message</label>
                    <textarea
                      rows="3"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Enter your message (optional)"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none border border-[#EFE9DF] bg-white focus:border-[#F0883E] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F0883E] hover:bg-[#E07A2E] text-white py-3.5 font-bold text-xs sm:text-sm cursor-pointer mt-2 rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Get My Complete Financial Roadmap ➔"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}