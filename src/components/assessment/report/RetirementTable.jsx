import React from 'react';

export function RetirementTable({ formData, calculationResult }) {
  if (!calculationResult) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-[#E56A1F] uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-4 bg-[#ED8B36] rounded-full inline-block"></span>
        Retirement Income & Corpus Planning
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Client card */}
        <div className="neu-card-raised rounded-2xl p-5 space-y-4">
          <div className="font-heading text-base font-bold text-[#1E2B49] border-b border-[#FAF7F2] pb-2">
            Client ({formData.name || 'Primary Client'})
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#A69E90] block">Target Retirement Age</span>
              <span className="font-bold text-[#1C1B1A]">{calculationResult.client.years_to_retirement + calculationResult.client.retirement_period - 20} Years</span>
            </div>
            <div>
              <span className="text-[#A69E90] block">Years to Retirement</span>
              <span className="font-bold text-[#1C1B1A]">{calculationResult.client.years_to_retirement} Years</span>
            </div>
            <div>
              <span className="text-[#A69E90] block">Monthly Expense (Today)</span>
              <span className="font-bold text-[#1C1B1A]">{calculationResult.client.expenses_today_pm.inr}</span>
            </div>
            <div>
              <span className="text-[#A69E90] block">Inflation-Adjusted Expense</span>
              <span className="font-bold text-[#1C1B1A]">{calculationResult.client.expenses_at_retirement_pm.inr}</span>
            </div>
            <div className="col-span-2 border-t border-[#E5E2DA] pt-3">
              <span className="text-[#A69E90] block">Total Required Corpus</span>
              <span className="font-extrabold text-base text-[#1E2B49]">{calculationResult.client.corpus.inr}</span>
            </div>
            <div>
              <span className="text-[#A69E90] block">Projected PF Corpus</span>
              <span className="font-bold text-slate-700">{calculationResult.client.pf_corpus.inr}</span>
            </div>
            <div>
              <span className="text-[#A69E90] block">Corpus Deficit Gap</span>
              <span className="font-bold text-[#E56A1F]">{calculationResult.client.net_corpus.inr}</span>
            </div>
            <div className="col-span-2 border-t border-[#E5E2DA] pt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#A69E90] block">Monthly SIP Required</span>
                <span className="font-bold text-[#ED8B36]">{calculationResult.client.monthly_sip.inr} / mo</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Lump Sum Alternative</span>
                <span className="font-bold text-slate-800">{calculationResult.client.lump_sum.inr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spouse card */}
        {calculationResult.spouse && calculationResult.spouse.corpus.raw > 0 ? (
          <div className="neu-card-raised rounded-2xl p-5 space-y-4">
            <div className="font-heading text-base font-bold text-[#1E2B49] border-b border-[#FAF7F2] pb-2">
              Spouse ({formData.spouseName || 'Spouse'})
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#A69E90] block">Target Retirement Age</span>
                <span className="font-bold text-[#1C1B1A]">{calculationResult.spouse.years_to_retirement + calculationResult.spouse.retirement_period - 25} Years</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Years to Retirement</span>
                <span className="font-bold text-[#1C1B1A]">{calculationResult.spouse.years_to_retirement} Years</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Monthly Expense (Today)</span>
                <span className="font-bold text-[#1C1B1A]">{calculationResult.spouse.expenses_today_pm.inr}</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Inflation-Adjusted Expense</span>
                <span className="font-bold text-[#1C1B1A]">{calculationResult.spouse.expenses_at_retirement_pm.inr}</span>
              </div>
              <div className="col-span-2 border-t border-[#E5E2DA] pt-3">
                <span className="text-[#A69E90] block">Total Required Corpus</span>
                <span className="font-extrabold text-base text-[#1E2B49]">{calculationResult.spouse.corpus.inr}</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Projected PF Corpus</span>
                <span className="font-bold text-slate-700">{calculationResult.spouse.pf_corpus.inr}</span>
              </div>
              <div>
                <span className="text-[#A69E90] block">Corpus Deficit Gap</span>
                <span className="font-bold text-[#E56A1F]">{calculationResult.spouse.net_corpus.inr}</span>
              </div>
              <div className="col-span-2 border-t border-[#E5E2DA] pt-3 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#A69E90] block">Monthly SIP Required</span>
                  <span className="font-bold text-[#ED8B36]">{calculationResult.spouse.monthly_sip.inr} / mo</span>
                </div>
                <div>
                  <span className="text-[#A69E90] block">Lump Sum Alternative</span>
                  <span className="font-bold text-slate-800">{calculationResult.spouse.lump_sum.inr}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="neu-card-inset rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
            <svg className="w-8 h-8 text-[#A69E90]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="text-xs font-bold text-slate-600 block">No Spouse Retirement Plan Included</span>
            <p className="text-[10px] text-[#A69E90] leading-relaxed max-w-[200px]">
              Assessment runs calculations on client profile only.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
