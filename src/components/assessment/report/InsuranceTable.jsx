import React from 'react';

const formatInrFullString = (val, defaultVal = '₹0') => {
  if (val === null || val === undefined) return defaultVal;
  if (typeof val === 'number') return `₹${Math.round(val).toLocaleString('en-IN')}`;
  if (typeof val === 'object') {
    if (val.raw !== undefined && typeof val.raw === 'number') {
      return `₹${Math.round(val.raw).toLocaleString('en-IN')}`;
    }
    if (val.inr && typeof val.inr === 'string') return formatInrFullString(val.inr, defaultVal);
    if (val.formatted && typeof val.formatted === 'string') return formatInrFullString(val.formatted, defaultVal);
    if (val.display && typeof val.display === 'string') return formatInrFullString(val.display, defaultVal);
    return defaultVal;
  }
  let str = String(val).trim();
  str = str.replace(/^₹\s+/, '₹');
  if (str.includes('Cr')) {
    const numStr = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(numStr);
    if (!isNaN(num)) return `₹${Math.round(num * 10000000).toLocaleString('en-IN')}`;
  }
  if (str.includes('Lakh') || str.match(/\bL\b/i)) {
    const numStr = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(numStr);
    if (!isNaN(num)) return `₹${Math.round(num * 100000).toLocaleString('en-IN')}`;
  }
  return str;
};

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
              <th className="px-4 py-3.5 text-center min-w-[130px]" style={{ minWidth: '130px' }}>Protection Type</th>
              <th className="px-4 py-3.5 text-right">Present Value (PV)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]/30 text-[#1C1B1A]">
            {calculationResult.insurance.items.map((ins, idx) => (
              <tr key={idx} className="bg-white/60 hover:bg-white/90 transition-colors">
                <td className="px-4 py-3 font-semibold">{ins.need}</td>
                <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{ins.years} Years</td>
                <td className="px-4 py-3 text-right font-medium whitespace-nowrap">{formatInrFullString(ins.amount)}</td>
                <td className="px-4 py-3 text-center whitespace-nowrap min-w-[130px]" style={{ minWidth: '130px' }}>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#ED8B36] border border-orange-100 font-sans inline-flex items-center justify-center"
                    style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}
                  >
                    {ins.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-bold whitespace-nowrap">{formatInrFullString(ins.pv)}</td>
              </tr>
            ))}
            <tr className="bg-[#FAF7F2]/60 font-bold border-t border-[#EFE9DF]">
              <td colSpan="4" className="px-4 py-3.5 text-right text-[#1E2B49]">Total Life Coverage Recommended</td>
              <td className="px-4 py-3.5 text-right text-sm text-[#1E2B49]">{formatInrFullString(calculationResult.insurance.total_required)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
