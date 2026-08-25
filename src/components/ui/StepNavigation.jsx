import React from 'react';

export function StepNavigation({
  onBack,
  onNext,
  onSkip,
  nextLabel = "Continue →",
  isDisabled = false,
  isLoading = false
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 hover:border-white/40 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <span>&larr; Back</span>
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={isDisabled || isLoading}
        className="relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.25] via-white/[0.14] to-white/[0.06] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.25] hover:border-white/80 hover:shadow-[0_12px_35px_rgba(56,189,248,0.35),0_4px_15px_rgba(0,0,0,0.4)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-white font-medium text-xs sm:text-sm tracking-tight"
      >
        {/* Glossy top specular reflection glare */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-full" />
        
        {/* Top crisp glare line */}
        <div className="absolute top-0 inset-x-5 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

        {isLoading ? (
          <span className="relative z-20 flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Calculating...
          </span>
        ) : (
          <span className="relative z-20 flex items-center gap-2">
            {nextLabel}
          </span>
        )}
      </button>

      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          disabled={isLoading}
          className="relative group inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden backdrop-blur-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-white/30 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        >
          <span>Skip Step</span>
        </button>
      )}
    </div>
  );
}
