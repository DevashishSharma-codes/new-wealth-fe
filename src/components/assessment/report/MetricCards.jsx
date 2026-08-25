import React from 'react';

export function MetricCards({ displayInsurance, displayCorpus, displayMonthly }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Insurance Card */}
      <div className="relative overflow-hidden rounded-[24px] p-6 bg-gradient-to-b from-[#0F172A]/90 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/15 via-transparent to-transparent pointer-events-none rounded-[24px]" />
        
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 text-sky-300 border border-white/20 shadow-md backdrop-blur-md relative z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-medium text-slate-300 tracking-wider uppercase block">Recommended Life Cover</span>
          <span className="text-2xl sm:text-3xl font-light text-white block">{displayInsurance}</span>
          <span className="text-xs text-slate-300 leading-relaxed block pt-1 font-light">Comprehensive family protection shield.</span>
        </div>
      </div>

      {/* Corpus Card */}
      <div className="relative overflow-hidden rounded-[24px] p-6 bg-gradient-to-b from-[#0F172A]/90 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/15 via-transparent to-transparent pointer-events-none rounded-[24px]" />
        
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 text-sky-300 border border-white/20 shadow-md backdrop-blur-md relative z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-medium text-slate-300 tracking-wider uppercase block">Total Net Retirement Corpus</span>
          <span className="text-2xl sm:text-3xl font-light text-white block">{displayCorpus}</span>
          <span className="text-xs text-slate-300 leading-relaxed block pt-1 font-light">Target inflation-indexed corpus at retirement.</span>
        </div>
      </div>

      {/* Monthly Investment Card */}
      <div className="relative overflow-hidden rounded-[24px] p-6 bg-gradient-to-b from-[#0F172A]/90 via-[#0B132B]/90 to-[#070C1B]/95 backdrop-blur-2xl border border-sky-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-start gap-4 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/15 via-transparent to-transparent pointer-events-none rounded-[24px]" />
        
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 text-sky-300 border border-white/20 shadow-md backdrop-blur-md relative z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-medium text-slate-300 tracking-wider uppercase block">Required Monthly Investment</span>
          <span className="text-2xl sm:text-3xl font-light text-white block">{displayMonthly}</span>
          <span className="text-xs text-slate-300 leading-relaxed block pt-1 font-light">Monthly SIP required to achieve all family goals.</span>
        </div>
      </div>

    </div>
  );
}
