import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------
   Neumorphic tokens (matched from provided step-indicator SVG)
   Light source: top-left.
-------------------------------------------------------------------*/
const TRACK_COLOR = "#E3DED3";
const STEP_INACTIVE_BG = "#F5F3ED";
const STEP_INACTIVE_TEXT = "#7B7B7B";
const STEP_ACTIVE_BG = "#FDA55E";

/**
 * Step progress indicator.
 * currentStep is 1-indexed. totalSteps defaults to 5.
 */
export function StepProgress({ currentStep = 1, totalSteps = 5, goToStep }) {
  return (
    <div className="w-full flex items-center justify-center px-4 mt-8">
      <div className="flex items-center w-full max-w-[640px]">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, idx) => {
          const isActive = step === currentStep;
          const isComplete = step < currentStep;
          const isLast = idx === totalSteps - 1;

          return (
            <React.Fragment key={step}>
              <button
                type="button"
                onClick={() => goToStep && goToStep(step)}
                className={`relative shrink-0 rounded-full flex items-center justify-center font-bold transition-all duration-200 cursor-pointer ${isActive
                    ? "w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl"
                    : "w-11 h-11 sm:w-14 sm:h-14 text-sm sm:text-base"
                  }`}
                style={
                  isActive
                    ? {
                      // ACTIVE: Orange background, white text, glowing outer shadow
                      background: STEP_ACTIVE_BG,
                      color: "#FCFAF6",
                      boxShadow:
                        "8px 8px 10px rgba(184,177,164,0.35), -8px -8px 10px rgba(255,255,255,0.9), 0 8px 12px rgba(253,165,94,0.2), inset 2px 2px 3px rgba(212,196,176,0.8), inset -2px -2px 3px rgba(255,255,255,1)",
                    }
                    : isComplete
                      ? {
                        // COMPLETED (PAST): Default color, Outer (raised) shadow
                        background: STEP_INACTIVE_BG,
                        color: STEP_INACTIVE_TEXT,
                        boxShadow:
                          "4px 4px 8px rgba(212,196,176,0.8), -4px -4px 8px rgba(255,255,255,1)",
                      }
                      : {
                        // UNVISITED (FUTURE): Default color, Inner (inset) shadow
                        background: STEP_INACTIVE_BG,
                        color: STEP_INACTIVE_TEXT,
                        boxShadow:
                          "inset 4px 4px 6px rgba(212,196,176,0.8), inset -4px -4px 6px rgba(255,255,255,1)",
                      }
                }
              >
                {step}
              </button>

              {!isLast && (
                <div
                  className="flex-1 h-[6px] rounded-full mx-1 sm:mx-2"
                  style={{
                    // MATCHING FIGMA: Track lines always stay default color and inset
                    background: TRACK_COLOR,
                    boxShadow:
                      "inset 1px 1px 3px rgba(212,196,176,0.8), inset -1px -1px 3px rgba(255,255,255,1)",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function Header({ currentStep = 1, totalSteps = 5, goToStep }) {
  return (
    <header className="py-8 bg-transparent flex flex-col items-center">
      {/* Centered Logo */}
      <Link to="/" className="flex flex-col items-center text-center justify-center select-none">
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Laurel wreath left */}
          <path d="M22 42C17 38 15 32 15 26C15 20 18 15 22 12" stroke="#1E2B49" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 34C15 33 13 30 13 28C13 26 15 23 17 22" stroke="#1E2B49" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 26C17 25 15 22 15 20C15 18 17 15 19 14" stroke="#1E2B49" strokeWidth="1.5" strokeLinecap="round" />

          {/* Laurel wreath right */}
          <path d="M42 42C47 38 49 32 49 26C49 20 46 15 42 12" stroke="#1E2B49" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 34C49 33 51 30 51 28C51 26 49 23 47 22" stroke="#1E2B49" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M45 26C47 25 49 22 49 20C49 18 47 15 45 14" stroke="#1E2B49" strokeWidth="1.5" strokeLinecap="round" />

          {/* Outer Shield / Circle background */}
          <circle cx="32" cy="27" r="11" fill="#1E2B49" />

          {/* Inner Shield (Gold) */}
          <path d="M32 20L38 22V28C38 31.5 32 35 32 35C32 35 26 31.5 26 28V22L32 20Z" fill="#EAA850" />

          {/* Checkmark inside gold shield */}
          <path d="M29 27.5L31 29.5L35 24.5" stroke="#1E2B49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Tiny gold ribbon/accents below */}
          <path d="M24 45C32 48 32 48 40 45" stroke="#EAA850" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="font-heading font-black tracking-[0.12em] text-[13px] text-[#1E2B49] mt-2 leading-none uppercase">
          WEALTH WISDOM
        </span>
        <span className="text-[7px] text-[#ED8B36] font-extrabold tracking-[0.15em] uppercase mt-1 leading-none">
          THE CHOICE OF YOUR FUTURE
        </span>
      </Link>

      {/* Title */}
      <h2 className="font-heading text-lg sm:text-xl font-semibold text-slate-800 mt-6 tracking-wide text-center px-4">
        Retirement Planning Assessment
      </h2>

      {/* Step progress indicator (moved here from individual step pages) */}
      <StepProgress currentStep={currentStep} totalSteps={totalSteps} goToStep={goToStep} />
    </header>
  );
}