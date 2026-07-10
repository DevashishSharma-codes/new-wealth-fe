import React from 'react';
import { Link } from 'react-router-dom';
import wealthWisdomLogo from '../assets/wealth-wisdom-logo.png';

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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold/30 selection:text-brand-blue">

      {/* 1. Top Promotional Banner */}
      <div className="bg-[#FFF3E6] border-b border-orange-100 py-3 px-4 text-center">
        <p className="text-xs sm:text-sm text-[#E56A1F] font-medium tracking-wide">
          Take charge of your future with a personalized retirement plan &rarr;{' '}
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
          <h2 className="hidden md:block font-heading text-[19px] font-medium text-slate-700">
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
                Plan today for the life you want tomorrow
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-[#555D6E] text-[15px] sm:text-[16px] leading-[1.6] font-normal">
                This retirement assessment helps you estimate future financial needs, evaluate your current preparedness, and discover the steps required to achieve long-term financial independence.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 overflow-hidden rounded-3xl shadow-sm border border-slate-100 group relative">
              <img src="/src/hero_left.png" alt="Advisor with couple" className="w-full h-full object-cover min-h-[300px] max-h-[460px] group-hover:scale-102 transition-transform duration-700 ease-out" />
            </div>
            <div className="md:col-span-5 overflow-hidden rounded-3xl shadow-sm border border-slate-100 group relative">
              <img src="/src/f0f7eaffd28bff647ab71073c5e804a9bb36aec8.jpg" alt="Couple with laptop" className="w-full h-full object-cover min-h-[300px] max-h-[460px] group-hover:scale-102 transition-transform duration-700 ease-out" />
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
        <section className="bg-white border-y border-slate-100 py-16 sm:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4 leading-tight">
              Build a Retirement Plan Designed Around Your Goals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Understand whether you're on track to achieve financial independence and the lifestyle you envision. Our assessment helps uncover retirement income needs, future expenses, investment requirements, and potential planning gaps, all in just a few minutes.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-gold text-white px-8 py-4 rounded-xl text-base font-bold hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0 transition-all shadow-md"
            >
              Start Assessment &rarr;
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <ReadinessIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Financial Health Check</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Get a comprehensive assessment of your financial health by analyzing your income, expenses, savings, investments, liabilities, and overall financial preparedness.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <RoadmapIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Goal-Based Financial Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Plan for your life goals such as buying a home, children's education, travel, retirement, and wealth creation with a personalized financial roadmap.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <InvestmentIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Investment & Portfolio Review</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Evaluate your existing investments and receive recommendations to build a well-diversified portfolio aligned with your financial goals and risk profile.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <ProtectionIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Insurance & Risk Management</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Identify protection gaps and ensure adequate coverage through Term Insurance, Health Insurance, Personal Accident Cover, and Emergency Planning.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <CorpusIcon />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E2B49]">Retirement Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Estimate the retirement corpus required, assess your retirement readiness, and create a strategy for a financially independent retirement.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/60 transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
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
              <img src="/src/8dba846db002417c3fb9cb45eb6d1f275241dce8.png" alt="Office meeting" className="w-full h-full object-cover object-center" />
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">Why we're the right choice</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Personalized to Your Life Goals</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Tailored around your family, lifestyle, retirement goals, and financial priorities.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Retirement Readiness</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Know the corpus, investments, and protection needed for a secure retirement.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white">Actionable Financial Roadmap</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">Get clear recommendations to achieve your future goals with confidence.</p>
                </div>
              </div>
              <div className="pt-2">
                <button onClick={() => alert("Book Consultation feature under development.")} className="inline-flex items-center gap-2 bg-white text-brand-dark px-5 py-3 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-all cursor-pointer">
                  Book my free consultation &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-brand-beige border-t border-slate-200/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your information is secure and private.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#careers" className="hover:text-brand-orange transition-colors">Careers</a>
            <a href="#legal" className="hover:text-brand-orange transition-colors">Legal</a>
            <a href="#contact" className="hover:text-brand-orange transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#blog" className="hover:text-brand-orange transition-colors">Blog</a>
            <a href="#faqs" className="hover:text-brand-orange transition-colors">FAQs</a>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 font-light tracking-wide">&copy; 2026 Wealth Wisdom. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}