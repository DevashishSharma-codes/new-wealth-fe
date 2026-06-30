import React from 'react';

export function InsuranceTable({ calculationResult }) {
  if (!calculationResult || !calculationResult.insurance || calculationResult.insurance.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[#E56A1F] uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-4 bg-[#ED8B36] rounded-full inline-block"></span>
        Risk Protection & Insurance Needs
      </h3>
      <div className="overflow-x-auto border border-[#EFE9DF] rounded-2xl neu-card-inset p-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#EFE9DF] text-[#1E2B49] font-bold">
              <th className="px-4 py-3.5">Insurance Need Type</th>
              <th className="px-4 py-3.5 text-center">Duration</th>
              <th className="px-4 py-3.5 text-right">Required Cover</th>
              <th className="px-4 py-3.5 text-center">Protection Type</th>
              <th className="px-4 py-3.5 text-right">Present Value (PV)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]/30 text-[#1C1B1A]">
            {calculationResult.insurance.items.map((ins, idx) => (
              <tr key={idx} className="bg-white/60 hover:bg-white/90 transition-colors">
                <td className="px-4 py-3 font-semibold">{ins.need}</td>
                <td className="px-4 py-3 text-center text-slate-600">{ins.years} Years</td>
                <td className="px-4 py-3 text-right font-medium">{ins.amount.inr}</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-[#ED8B36] border border-orange-100 font-sans">
                    {ins.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-bold">{ins.pv.inr}</td>
              </tr>
            ))}
            <tr className="bg-[#FAF7F2]/60 font-bold border-t border-[#EFE9DF]">
              <td colSpan="4" className="px-4 py-3.5 text-right text-[#1E2B49]">Total Life Coverage Recommended</td>
              <td className="px-4 py-3.5 text-right text-sm text-[#1E2B49]">{calculationResult.insurance.total_required.inr}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
