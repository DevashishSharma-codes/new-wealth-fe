import React from "react";
import wealthWisdomLogo from "../../assets/wealth-wisdom-logo.png";

/**
 * Step progress indicator with dark space glassmorphic styling.
 * currentStep is 1-indexed. totalSteps defaults to 5.
 */
export function StepProgress({ currentStep = 1, totalSteps = 5, goToStep }) {
  return (
    <div className="w-full flex items-center justify-center px-4 mt-6">
      <div className="flex items-center w-full max-w-[620px]">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, idx) => {
          const isActive = step === currentStep;
          const isComplete = step < currentStep;
          const isLast = idx === totalSteps - 1;

          return (
            <React.Fragment key={step}>
              <button
                type="button"
                onClick={() => goToStep && goToStep(step)}
                className={`relative shrink-0 rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-12 h-12 sm:w-14 sm:h-14 text-base sm:text-lg bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.8)] border border-white/80 scale-110"
                    : isComplete
                    ? "w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white border border-white/40 shadow-sm backdrop-blur-md"
                    : "w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm bg-white/[0.05] text-white/50 border border-white/10 hover:border-white/25 hover:text-white/80 backdrop-blur-md"
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4 text-sky-300 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step
                )}
              </button>

              {!isLast && (
                <div
                  className={`flex-1 h-[3px] rounded-full mx-1 sm:mx-2 transition-all duration-500 ${
                    isComplete
                      ? "bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      : "bg-white/10"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function Header({ currentStep = 1, totalSteps = 5, goToStep, showReport = false }) {
  return (
    <header className="py-6 bg-transparent flex flex-col items-center">
      {/* Centered Brand Logo */}
      <a href="/" className="flex flex-col items-center text-center justify-center select-none cursor-pointer">
        <img
          src={wealthWisdomLogo}
          alt="Wealth Wisdom - Take Charge of Your Future"
          className="h-16 sm:h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        />
      </a>

      {/* Title */}
      <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight mt-4 text-center px-4 select-none leading-normal">
        Goal Analysis & Wealth Assessment
      </h2>

      {/* Step progress indicator */}
      {!showReport && (
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} goToStep={goToStep} />
      )}
    </header>
  );
}