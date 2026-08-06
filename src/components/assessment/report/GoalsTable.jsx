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

export function GoalsTable({ calculationResult }) {
  if (!calculationResult) return null;

  const rawGoalItems = calculationResult.goals?.items || calculationResult.data?.goals?.items || [];
  const clientRet = calculationResult.client || calculationResult.data?.client;
  const spouseRet = calculationResult.spouse || calculationResult.data?.spouse;

  const items = [];

  // 1. Add Client Retirement
  if (clientRet && (clientRet.monthly_sip?.raw > 0 || clientRet.corpus?.raw > 0)) {
    const currentYear = new Date().getFullYear();
    const targetYear = clientRet.years_to_retirement ? currentYear + clientRet.years_to_retirement : 'Retirement';
    items.push({
      goal: 'Retirement Planning (Client)',
      target_year: targetYear,
      current_cost: formatInrFullString(clientRet.expenses_today_pm) + ' p.m.',
      future_cost: formatInrFullString(clientRet.corpus),
      monthly_sip: formatInrFullString(clientRet.monthly_sip),
    });
  }

  // 2. Add Spouse Retirement (if active)
  if (spouseRet && (spouseRet.monthly_sip?.raw > 0 || spouseRet.corpus?.raw > 0)) {
    const currentYear = new Date().getFullYear();
    const targetYear = spouseRet.years_to_retirement ? currentYear + spouseRet.years_to_retirement : 'Retirement';
    items.push({
      goal: 'Retirement Planning (Spouse)',
      target_year: targetYear,
      current_cost: formatInrFullString(spouseRet.expenses_today_pm) + ' p.m.',
      future_cost: formatInrFullString(spouseRet.corpus),
      monthly_sip: formatInrFullString(spouseRet.monthly_sip),
    });
  }

  // 3. Add all other goals (Education, Foreign Tour, etc.)
  rawGoalItems.forEach((g) => {
    items.push({
      ...g,
      current_cost_display: formatInrFullString(g.current_cost || g.today_cost),
      future_cost_display: formatInrFullString(g.future_cost),
      monthly_sip_display: formatInrFullString(g.monthly_sip),
    });
  });

  if (items.length === 0) return null;

  // Total monthly SIP display
  const invSummary = calculationResult?.investment_summary || 
                     calculationResult?.data?.investment_summary;
  const totalSipDisplay = formatInrFullString(
    invSummary?.total_monthly_investment ||
    calculationResult.summary?.monthly_investment_required ||
    calculationResult.goals?.total_monthly_sip
  );

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-[#E56A1F] uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-4 bg-[#ED8B36] rounded-full inline-block"></span>
        Goal Achievement SIP Plan (Including Retirement)
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
            {items.map((g, idx) => {
              const costDisplay = g.current_cost_display || g.current_cost || '₹0';
              const futureDisplay = g.future_cost_display || g.future_cost || '₹0';
              const sipDisplay = g.monthly_sip_display || g.monthly_sip || '₹0';
              return (
                <tr key={idx} className="bg-white/60 hover:bg-white/90 transition-colors">
                  <td className="px-4 py-3 font-semibold">{g.goal}</td>
                  <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{g.target_year}</td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                    {costDisplay}
                  </td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">{futureDisplay}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#ED8B36] whitespace-nowrap">{sipDisplay}</td>
                </tr>
              );
            })}
            <tr className="bg-[#FAF7F2]/60 font-bold border-t border-[#EFE9DF]">
              <td colSpan="4" className="px-4 py-3.5 text-right text-[#1E2B49]">Total Monthly SIP Required (All Goals)</td>
              <td className="px-4 py-3.5 text-right text-[#ED8B36] text-sm">{totalSipDisplay}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
