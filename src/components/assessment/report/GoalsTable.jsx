import React from 'react';

export function GoalsTable({ calculationResult }) {
  if (!calculationResult || !calculationResult.goals || calculationResult.goals.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[#E56A1F] uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-4 bg-[#ED8B36] rounded-full inline-block"></span>
        Goal Achievement SIP Plan
      </h3>
      <div className="overflow-x-auto border border-[#EFE9DF] rounded-2xl neu-card-inset p-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#EFE9DF] text-[#1E2B49] font-bold">
              <th className="px-4 py-3.5">Goal Description</th>
              <th className="px-4 py-3.5 text-center">Target Year</th>
              <th className="px-4 py-3.5 text-right">Cost (Today)</th>
              <th className="px-4 py-3.5 text-right">Future Cost (Inflated)</th>
              <th className="px-4 py-3.5 text-right text-[#ED8B36]">Monthly SIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]/30 text-[#1C1B1A]">
            {calculationResult.goals.items.map((g, idx) => (
              <tr key={idx} className="bg-white/60 hover:bg-white/90 transition-colors">
                <td className="px-4 py-3 font-semibold">{g.goal}</td>
                <td className="px-4 py-3 text-center text-slate-600">{g.target_year}</td>
                <td className="px-4 py-3 text-right font-medium">{g.current_cost.inr}</td>
                <td className="px-4 py-3 text-right font-medium">{g.future_cost.inr}</td>
                <td className="px-4 py-3 text-right font-bold text-[#ED8B36]">{g.monthly_sip.inr}</td>
              </tr>
            ))}
            <tr className="bg-[#FAF7F2]/60 font-bold border-t border-[#EFE9DF]">
              <td colSpan="4" className="px-4 py-3.5 text-right text-[#1E2B49]">Total Goals Monthly SIP</td>
              <td className="px-4 py-3.5 text-right text-[#ED8B36] text-sm">{calculationResult.goals.total_monthly_sip.inr}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
