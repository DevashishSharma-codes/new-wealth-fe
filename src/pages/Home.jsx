import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';
import dreamySkyBg from '../assets/dreamy_sky_background.png';
import planetaryHorizonBg from '../assets/planetary_horizon_background.png';
import client from '../config/api';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import HeroSection from '../components/HeroSection';
import InfrastructureSection from '../components/InfrastructureSection';
import FeaturedShowcaseSection from '../components/FeaturedShowcaseSection';
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

// Static Bento Column Span calculator for clean, non-animating Bento grid
const computeStaticBentoSpan = (idx, total) => {
  if (total <= 3) return "lg:col-span-4 md:col-span-6";
  const mod = idx % 6;
  if (mod === 0) return "lg:col-span-8 md:col-span-12";
  if (mod === 1) return "lg:col-span-4 md:col-span-6";
  if (mod === 2) return "lg:col-span-4 md:col-span-6";
  if (mod === 3) return "lg:col-span-4 md:col-span-6";
  if (mod === 4) return "lg:col-span-4 md:col-span-6";
  return "lg:col-span-12 md:col-span-12";
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
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFAFA] text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">

      {/* Top Hero Container with Dark Space Planetary Horizon Background */}
      <div className="relative w-full overflow-hidden bg-[#070D1B]">
        <div 
          className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url(${planetaryHorizonBg})`
          }}
        />

        {/* Responsive Glass Navbar */}
        <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

        {/* Hero Header Section with Real iPhone Mockup & Smooth Entrance */}
        <HeroSection showNavbar={false} hideBackground={true} />
      </div>

      {/* Main Content (Unified Dark Space Glassmorphism Theme) */}
      <main className="flex-1 relative z-10 bg-[#070C16] text-white">

        {/* ---------------- INFRASTRUCTURE NETWORK SECTION ---------------- */}
        <InfrastructureSection onOpenContact={() => setIsContactModalOpen(true)} />

        {/* ---------------- BENTO GRID SERVICES (DARK GLASSMORPHISM) ---------------- */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20">
          
          {/* Section Heading Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wider select-none backdrop-blur-md">
              <span>✦ Tailored Wealth Solutions</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Comprehensive Financial Services
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Explore our structured wealth management and financial planning disciplines.
            </p>
          </div>

          {/* Static Bento Grid in Hyper-Realistic Glassmorphism Frame (Exact Reference Image Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {services.map((srv, idx) => {
              const IconComp = DEFAULT_ICONS[idx % DEFAULT_ICONS.length];
              const spanClass = computeStaticBentoSpan(idx, services.length);

              return (
                <div
                  key={srv.id || idx}
                  onClick={() => setIsContactModalOpen(true)}
                  className={`${spanClass} relative overflow-hidden cursor-pointer transition-all duration-500 group rounded-[28px] p-7 flex flex-col justify-between gap-6 bg-gradient-to-b from-[#0F172A]/85 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 hover:border-sky-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_-16px_35px_rgba(56,189,248,0.35),inset_0_1px_2px_rgba(255,255,255,0.35)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.3),inset_0_-24px_45px_rgba(56,189,248,0.5),inset_0_1px_3px_rgba(255,255,255,0.4)] transform hover:-translate-y-1`}
                >
                  {/* LUMINOUS ELECTRIC CYAN/BLUE BOTTOM INNER EDGE GLOW (Exact Reference Image Reflection) */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-sky-400/40 via-sky-500/15 to-transparent pointer-events-none rounded-b-[28px] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle top rim light beam */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  {/* Card Main Body */}
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 text-sky-300 border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 shadow-md backdrop-blur-md">
                        <IconComp />
                      </div>

                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-200 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                        Advisory
                      </span>
                    </div>

                    <h3 className="font-sans font-normal text-xl text-white group-hover:text-sky-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light group-hover:text-white transition-colors">
                      {srv.description}
                    </p>
                  </div>

                  {/* Card Footer Action Bar */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                    <span className="text-xs font-medium text-slate-300 group-hover:text-sky-300 transition-colors">
                      Explore Service
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsContactModalOpen(true);
                      }}
                      className="w-8 h-8 rounded-full bg-white/15 border border-white/25 text-white group-hover:bg-white group-hover:text-slate-900 flex items-center justify-center font-bold text-xs shadow-md backdrop-blur-md transition-all duration-300 cursor-pointer"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- FEATURED SHOWCASE STACK (3 REFERENCE CARDS) ---------------- */}
        <FeaturedShowcaseSection onOpenContact={() => setIsContactModalOpen(true)} />

        {/* Goal Section Banner (Dark Glassmorphism) */}
        <section className="border-y border-white/10 py-16 sm:py-20 text-center bg-[#050912]">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md select-none">
              <span>Life Milestones</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-light text-white leading-tight">
              A Financial Plan Built Around Your Life Milestones
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Understand whether you're on track to achieve all of your life goals and the future you envision. Our assessment helps uncover your funding requirements, target timelines, investment needs, and potential planning gaps, all in just a few minutes.
            </p>
            <div className="pt-4 flex flex-col items-center gap-3">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-lg cursor-pointer"
              >
                Start DIY Assessment &rarr;
              </Link>
              <p className="text-xs font-light text-slate-400 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                100% Self-Guided DIY Financial Assessment • Instant Report
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- ABOUT US SECTION (DARK GLASSMORPHISM) ---------------- */}
        <section id="about" className="border-y border-white/10 py-16 sm:py-20 scroll-mt-20 bg-[#070C16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md select-none">
                  <span>About Wealth Wisdom</span>
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl font-light text-white leading-tight">
                  Your Trusted Partner in Independent Financial Freedom
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                  Wealth Wisdom was founded with a singular mission: to democratize institutional-grade financial planning for Indian families and working professionals. We blend advanced quantitative models with personalized advisory to deliver clarity, confidence, and real wealth creation.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-xl space-y-1">
                    <span className="font-sans text-2xl sm:text-3xl font-light text-white">₹500+ Cr</span>
                    <span className="block text-xs font-light text-slate-400">Assets Under Guidance</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-xl space-y-1">
                    <span className="font-sans text-2xl sm:text-3xl font-light text-sky-300">5,000+</span>
                    <span className="block text-xs font-light text-slate-400">Satisfied Clients</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                <img
                  src="/assets/8dba846db002417c3fb9cb45eb6d1f275241dce8.png"
                  alt="Wealth Wisdom Advisors in consultation"
                  className="w-full h-full object-cover min-h-[340px] hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- TESTIMONIALS (DARK GLASSMORPHISM CARDS) ---------------- */}
        <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-slate-200 text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md select-none">
              <span>Client Voices & Reviews</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Trusted by 5,000+ Families Across India
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
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
                className="bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-3xl p-7 flex flex-col justify-between text-white transition-all duration-300 shadow-2xl cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sky-400">
                      {Array.from({ length: t.rating || 5 }).map((_, starIdx) => (
                        <svg key={starIdx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-2xl font-serif text-white/30 group-hover:text-white transition-colors">“</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic font-light">
                    "{t.text || t.message || t.testimonial}"
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white font-semibold flex items-center justify-center text-xs shrink-0 shadow-xs overflow-hidden border border-white/20">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      (t.name || "C").charAt(0)
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-sans text-xs sm:text-sm font-medium text-white leading-snug break-words">
                      {t.name || "Satisfied Client"}
                    </h4>
                    {t.role && t.role !== "Verified Investor" && (
                      <span className="text-[11px] font-light text-slate-400 block leading-snug break-words">
                        {t.role}
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-sky-400 block mt-0.5">
                      ✓ Verified Client
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- DARK CONSULTATION BLOCK (GLASSMORPHISM) ---------------- */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 scroll-mt-20">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 flex flex-col gap-10 border border-white/15 text-white shadow-2xl">
            <div className="w-full overflow-hidden rounded-2xl max-h-[360px] border border-white/15">
              <img src="/assets/8dba846db002417c3fb9cb45eb6d1f275241dce8.png" alt="Office meeting" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/10 text-sky-300 text-[11px] font-medium px-3 py-1 rounded-full uppercase tracking-wider select-none border border-white/15">
                  <span>Advisory Excellence</span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl font-light text-white">
                  Why Wealth Wisdom is the Right Choice for You
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans text-base sm:text-lg font-medium text-white">Personalized to Your Life Goals</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">Tailored around your family, lifestyle, milestone goals, and financial priorities.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans text-base sm:text-lg font-medium text-white">Goal Readiness Audit</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">Know the exact funding requirements, target timelines, and investments needed to hit every target.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans text-base sm:text-lg font-medium text-white">Actionable Financial Roadmap</h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">Get clear recommendations to achieve your future goals with confidence.</p>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg cursor-pointer active:scale-95"
                >
                  Book my free consultation &rarr;
                </button>
                <Link
                  to="/assessment"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold border border-white/20 transition-all cursor-pointer"
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