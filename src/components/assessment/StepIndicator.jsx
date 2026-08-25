import React from 'react';

export function StepIndicator({ step, goToStep }) {
  return (
    <div className="relative flex items-center justify-center mt-6 w-full max-w-[280px] sm:max-w-[340px]">
      <div className="absolute left-0 right-0 h-[2px] bg-[#E5E2DA] -z-10" />

      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex-1 flex items-center justify-center relative">
          <button 
            type="button"
            onClick={() => goToStep(s)}
            className={`w-9 h-9 rounded-full font-heading text-xs font-bold flex items-center justify-center transition-all duration-300 cursor-pointer ${
              s === step 
                ? 'bg-[#ED8B36] text-white shadow-[0_4px_12px_rgba(237,139,54,0.35)] scale-110' 
                : 'bg-[#F2EFE9] text-[#8E8A80] hover:bg-[#EAE6DD] hover:text-[#55524B]'
            }`}
          >
            {s}
          </button>
        </div>
      ))}
    </div>
  );
}
