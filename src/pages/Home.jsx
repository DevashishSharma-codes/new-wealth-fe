import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';
import client from '../config/api';
import { Footer } from '../components/layout/Footer';

// Custom SVG Icons for Features
const ReadinessIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RoadmapIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const CorpusIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InvestmentIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ProtectionIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const PlanningIcon = () => (
  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// Reusable bento card shadow classes — inset (inner) shadow for the "bubbly" pressed-in neumorphic look.
// Hover noticeably deepens the press-in (bigger inset spread + darker shadow), nudges the bg tone
// slightly darker/warmer, and scales down a touch — like the card is being physically pushed in.
const bentoCardShadow =
  "bg-[#F4F1EA] hover:bg-[#EFE9DC] scale-100 hover:scale-[0.98] " +
  "shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] " +
  "hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)]";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold/30 selection:text-brand-blue">

      {/* 1. Top Promotional Banner */}
      <div className="bg-[#FFF3E6] border-b border-orange-100 py-3 px-4 text-center">
        <p className="text-xs sm:text-sm text-[#E56A1F] font-medium tracking-wide">
          Take charge of your future with a personalized goal-based financial plan &rarr;{' '}
          <Link to="/assessment" className="underline hover:text-brand-orange font-bold transition-colors">
            Start your assessment today!
          </Link>
        </p>
      </div>

      {/* 2. Navigation Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center text-center justify-center select-none shrink-0">
            <img src={wealthWisdomLogo} alt="Wealth Wisdom - Take Charge of Your Future" className="h-16 w-auto object-contain" />
          </Link>

          {/* Title */}
          <h2 className="hidden sm:block font-heading text-xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight animate-fade-in-up animate-text-wave select-none leading-normal">
            Goal Analysis Assessment
          </h2>

          {/* Get Started Button */}
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 bg-[#1C1B1A] hover:bg-slate-800 text-white px-5 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-xs"
          >
            Get started &rarr;
          </Link>
        </div>
      </header>

      {/* main content */}
      <main className="flex-1">

        {/* Hero Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <h1 className="font-heading text-4xl sm:text-[46px] lg:text-[48px] font-extrabold text-[#1C1B1A] leading-[1.15] tracking-tight">
                Turn Your Dreams into Achievable Financial Goals
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-[#555D6E] text-[15px] sm:text-[16px] leading-[1.6] font-normal">
                Achieve your aspirations with a flexible framework built for multiple goals, different timelines, and smarter planning. Discover the steps required to turn your dreams into reality.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 overflow-hidden rounded-3xl shadow-sm border border-slate-100 group relative">
              <img src="/assets/hero_left.png" alt="Advisor with couple" className="w-full h-full object-cover min-h-[300px] max-h-[460px] group-hover:scale-102 transition-transform duration-700 ease-out" />
            </div>
            <div className="md:col-span-5 overflow-hidden rounded-3xl shadow-sm border border-slate-100 group relative">
              <img src="/assets/f0f7eaffd28bff647ab71073c5e804a9bb36aec8.jpg" alt="Couple with laptop" className="w-full h-full object-cover min-h-[300px] max-h-[460px] group-hover:scale-102 transition-transform duration-700 ease-out" />
            </div>
          </div>
        </section>

        {/* Trust Bar / Mini Testimonial Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#FAF6F0] rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-10 sm:py-7 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 border border-amber-50">

            {/* Avatars + Text (mini testimonial) */}
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
              <p className="font-heading font-semibold text-slate-800 text-sm sm:text-[15px] leading-snug">
                Know exactly where you stand today
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3 lg:border-l lg:border-slate-200/70 lg:pl-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5-7 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Personalized Report</span>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Section */}
        <section className="bg-[#F4F1EA] border-y border-slate-100 pt-16 pb-12 sm:pt-20 sm:pb-12 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4 leading-tight">
              A Financial Plan Built Around Your Life Milestones
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Understand whether you're on track to achieve all of your life goals and the future you envision. Our assessment helps uncover your funding requirements, target timelines, investment needs, and potential planning gaps, all in just a few minutes.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-gold text-white px-8 py-4 rounded-xl text-base font-bold hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0 transition-all shadow-md"
            >
              Start Assessment &rarr;
            </Link>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-10 sm:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

            {/* Card 1 — Large (spans 7 cols) */}
            <div className={`lg:col-span-7 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <ReadinessIcon />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1E2B49]">Financial Health Check</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Get a comprehensive assessment of your financial health by analyzing your income, expenses, savings, investments, liabilities, and overall financial preparedness.</p>
            </div>

            {/* Card 2 — Medium (spans 5 cols) */}
            <div className={`lg:col-span-5 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <RoadmapIcon />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#1E2B49]">Goal-Based Financial Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Plan for your life goals such as buying a home, children's education, travel, retirement, and wealth creation with a personalized financial roadmap.</p>
            </div>

            {/* Card 3 — Small (spans 4 cols) */}
            <div className={`lg:col-span-4 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <InvestmentIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Investment & Portfolio Review</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Evaluate your existing investments and receive recommendations to build a well-diversified portfolio aligned with your goals and risk profile.</p>
            </div>

            {/* Card 4 — Small (spans 4 cols) */}
            <div className={`lg:col-span-4 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <ProtectionIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Insurance & Risk Management</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Identify protection gaps and ensure adequate coverage through Term Insurance, Health Insurance, Personal Accident Cover, and Emergency Planning.</p>
            </div>

            {/* Card 5 — Medium (spans 4 cols) */}
            <div className={`lg:col-span-4 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <CorpusIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Retirement Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Estimate the retirement corpus required, assess your retirement readiness, and create a strategy for a financially independent retirement.</p>
            </div>

            {/* Card 6 — Featured Full Width */}
            <div className={`lg:col-span-12 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.25rem] p-7 sm:p-8 ${bentoCardShadow} transition-all duration-300 flex flex-col gap-4`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <PlanningIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Estate Planning (Will & Trust)</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Secure your family's future with proper estate planning, including Wills, Trusts, nominations, and seamless wealth transfer across generations.</p>
            </div>

          </div>
        </section>

        {/* Dark consultation block */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="bg-brand-dark rounded-3xl p-6 sm:p-10 flex flex-col gap-10 border border-slate-800">
            <div className="w-full overflow-hidden rounded-2xl max-h-[360px] border border-slate-800">
              <img src="/assets/8dba846db002417c3fb9cb45eb6d1f275241dce8.png" alt="Office meeting" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">Why we're the right choice</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Personalized to Your Life Goals</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Tailored around your family, lifestyle, milestone goals, and financial priorities.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Goal Readiness</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Know the funding requirements, target timelines, and investments needed to hit every target.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Actionable Financial Roadmap</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Get clear recommendations to achieve your future goals with confidence.</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={() => setIsContactModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-brand-dark px-5 py-3 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-all cursor-pointer">
                  Book my free consultation &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />

      {/* Get In Touch Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in select-none">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1C1B1A]/40 backdrop-blur-xs transition-opacity cursor-pointer" 
            onClick={() => setIsContactModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-[#F4F1EA] border border-[#EFE9DF] rounded-[2rem] shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 text-left">
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form */}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="text-[11px] font-bold text-[#F0883E] tracking-wider uppercase mb-1">
                GET EXPERT GUIDANCE FOR YOUR FINANCIAL FUTURE
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1C1B1A] leading-tight mb-2">
                Book Your Consultation
              </h3>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[#4A4740]">Your Name*</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`${contactName ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
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
                  className={`${contactEmail ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[#4A4740]">Mobile Number*</label>
                <div className="flex gap-2">
                  <div className="neu-prefix rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold select-none shrink-0 flex items-center justify-center font-sans">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className={`${contactMobile ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
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
                  className={`${contactMessage ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200 resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full neu-btn-raised py-3 font-bold text-xs sm:text-sm cursor-pointer mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Get My Complete Financial Roadmap ➔"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}