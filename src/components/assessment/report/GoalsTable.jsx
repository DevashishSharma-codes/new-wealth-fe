import React from 'react';

export function GoalsTable({ calculationResult }) {
  if (!calculationResult) return null;

  const rawGoalItems = calculationResult.goals?.items || [];
  const clientRet = calculationResult.client;
  const spouseRet = calculationResult.spouse;

  const items = [];

  // 1. Add Client Retirement
  if (clientRet && (clientRet.monthly_sip?.raw > 0 || clientRet.corpus?.raw > 0)) {
    const currentYear = new Date().getFullYear();
    const targetYear = clientRet.years_to_retirement ? currentYear + clientRet.years_to_retirement : 'Retirement';
    items.push({
      goal: 'Retirement Planning (Client)',
      target_year: targetYear,
      current_cost: { inr: clientRet.expenses_today_pm?.inr ? `${clientRet.expenses_today_pm.inr} p.m.` : '₹0 p.m.' },
      future_cost: { inr: clientRet.corpus?.inr || '₹0' },
      monthly_sip: { inr: clientRet.monthly_sip?.inr || '₹0' },
    });
  }

  // 2. Add Spouse Retirement (if active)
  if (spouseRet && (spouseRet.monthly_sip?.raw > 0 || spouseRet.corpus?.raw > 0)) {
    const currentYear = new Date().getFullYear();
    const targetYear = spouseRet.years_to_retirement ? currentYear + spouseRet.years_to_retirement : 'Retirement';
    items.push({
      goal: 'Retirement Planning (Spouse)',
      target_year: targetYear,
      current_cost: { inr: spouseRet.expenses_today_pm?.inr ? `${spouseRet.expenses_today_pm.inr} p.m.` : '₹0 p.m.' },
      future_cost: { inr: spouseRet.corpus?.inr || '₹0' },
      monthly_sip: { inr: spouseRet.monthly_sip?.inr || '₹0' },
    });
  }

  // 3. Add all other goals (Education, Foreign Tour, etc.)
  rawGoalItems.forEach((g) => {
    items.push(g);
  });

  if (items.length === 0) return null;

  // Total monthly SIP display
  const clientSipRaw = clientRet?.monthly_sip?.raw || 0;
  const spouseSipRaw = spouseRet?.monthly_sip?.raw || 0;
  const goalsSipRaw = calculationResult.goals?.total_monthly_sip?.raw || 0;
  const combinedTotalSipRaw = Math.round(clientSipRaw + spouseSipRaw + goalsSipRaw);
  const totalSipDisplay = combinedTotalSipRaw > 0 ? `₹${combinedTotalSipRaw.toLocaleString('en-IN')}` : (calculationResult.goals?.total_monthly_sip?.inr || '₹0');

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
              const isForeignTour = (g.goal || '').toLowerCase().includes('foreign') || (g.goal || '').toLowerCase().includes('tour') || (g.goal || '').toLowerCase().includes('vacation') || (g.goal || '').toLowerCase().includes('trip');
              const costDisplay = g.current_cost?.inr || g.today_cost || '₹0';
              return (
                <tr key={idx} className="bg-white/60 hover:bg-white/90 transition-colors">
                  <td className="px-4 py-3 font-semibold">{g.goal}</td>
                  <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">{g.target_year}</td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                    {costDisplay}{isForeignTour && !costDisplay.includes('per person') ? ' (per person)' : ''}
                  </td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">{g.future_cost?.inr || '₹0'}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#ED8B36] whitespace-nowrap">{g.monthly_sip?.inr || '₹0'}</td>
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
