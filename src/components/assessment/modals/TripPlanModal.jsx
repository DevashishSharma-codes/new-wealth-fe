import React, { useState, useEffect } from 'react';
import client from '../../../config/api';
import { FloatingDropdownModal } from '../../ui/FloatingDropdownModal';

const formatINR = (value) => {
  if (!Number.isFinite(value) || value === 0) return null;
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
};

const ChevronDown = ({ open }) => (
  <svg className={`w-4 h-4 text-[#F0883E] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export function TripPlanModal({ isOpen, onClose, onSave, goal, childrenCount }) {
  const [tripPlanningType, setTripPlanningType] = useState('destinations');
  const [tripSelectedDestinations, setTripSelectedDestinations] = useState([]);
  const [tripTargetYear, setTripTargetYear] = useState('');
  const [tripBudgetPerPerson, setTripBudgetPerPerson] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [catOpen, setCatOpen] = useState(false);

  const [destinationsList, setDestinationsList] = useState([]);
  const [destOpen, setDestOpen] = useState(false);

  const [budgetOptions, setBudgetOptions] = useState([]);
  const [loadingBudgetOptions, setLoadingBudgetOptions] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [projectedCost, setProjectedCost] = useState(null);
  const [addingId, setAddingId] = useState(null);

  const familySize = 2 + (childrenCount || 0);


  const getTourOptions = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    return response?.data?.items || [];
  };

  const toDestination = (item, fallbackId) => {
    const value = item.budget_inr ?? item.cost ?? item.price;
    return {
      id: item.id || item.destination_id || item.uuid || item.slug || fallbackId,
      name: item.country || item.name || item.destination_name || item.title || '',
      cost: value == null || value === '' ? null : Number(value),
      famousFor: item.famous_for || item.country_famous_for || '',
      category: item.category || '',
      currency: item.local_currency || '',
      bestSeason: item.best_season || '',
    };
  };

  useEffect(() => {
    if (isOpen) {
      client.get('/tour/categories').then(res => {
        if (res.data?.categories) setCategories(res.data.categories);
        else if (res.data?.data?.categories) setCategories(res.data.data.categories);
        else if (Array.isArray(res.categories)) setCategories(res.categories);
      }).catch(console.error);
    }
  }, [isOpen]);

  useEffect(() => {
    if (goal) {
      setTripTargetYear(goal.targetYear || '');
      setTripSelectedDestinations([]);
      setTripPlanningType('destinations');
      const existingBudget = goal.todaysCost ? Math.round(parseFloat(goal.todaysCost) / familySize) : '';
      setTripBudgetPerPerson(existingBudget);
      setSaveError('');
      setSelectedCategory('');
      setDestOpen(false);
    }
  }, [goal, isOpen, familySize]);

  useEffect(() => {
    if (!isOpen) return;
    const url = `/tour/destinations?per_page=1000${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
    client.get(url)
      .then(res => {
        const list = getTourOptions(res);
        const destinations = list
          .map((item, i) => toDestination(item, `dest-${i}`))
          .filter((destination) => destination.name)
          .sort((a, b) => a.name.localeCompare(b.name));
        setDestinationsList(destinations);
      })
      .catch(err => console.error('Failed to load destinations:', err));
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    if (!isOpen || !tripBudgetPerPerson || tripPlanningType !== 'budget') {
      setBudgetOptions([]);
      return;
    }
    const t = setTimeout(() => {
      setLoadingBudgetOptions(true);
      const url = `/tour/destinations-for-budget?budget=${encodeURIComponent(tripBudgetPerPerson)}&per_page=5${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
      client.get(url)
        .then(res => {
          const list = getTourOptions(res);
          setBudgetOptions(list.slice(0, 5).map((item, i) => toDestination(item, `bdest-${i}`)));
        })
        .catch(err => console.error('Budget search failed:', err))
        .finally(() => setLoadingBudgetOptions(false));
    }, 350);
    return () => clearTimeout(t);
  }, [tripBudgetPerPerson, tripPlanningType, isOpen, selectedCategory]);

  useEffect(() => {
    if (tripSelectedDestinations.length > 0 && tripTargetYear && isOpen) {
      client.post('/tour/project-cost', {
        destination_id: tripSelectedDestinations[0].id,
        target_year: Number(tripTargetYear),
        travellers: familySize
      }).then(res => {
        const d = res.data?.data || res.data || res;
        setProjectedCost(d);
      }).catch(() => setProjectedCost(null));
    } else {
      setProjectedCost(null);
    }
  }, [tripSelectedDestinations, tripTargetYear, familySize, isOpen]);

  const selectDestination = (destination) => {
    if (tripSelectedDestinations.some(s => s.id === destination.id)) return;
    setSaveError('');
    setDestOpen(false);
    setAddingId(destination.id);
    setTimeout(() => setAddingId(null), 800);
    setTripSelectedDestinations(prev => [...prev, destination]);
    if (Number.isFinite(destination.cost)) setTripBudgetPerPerson(String(destination.cost));
  };

  const removeDestination = (id) => {
    setSaveError('');
    setTripSelectedDestinations(prev => prev.filter(d => d.id !== id));
  };

  const getProjectedValue = () => {
    if (!projectedCost) return null;
    const raw = projectedCost.future_cost?.raw ?? projectedCost.future_cost ?? projectedCost.projected_cost ?? projectedCost.total_cost;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const getSIPValue = () => {
    if (!projectedCost) return null;
    const raw = projectedCost.monthly_sip?.raw ?? projectedCost.monthly_sip ?? projectedCost.sip;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const getTodaysCost = () => {
    // A selected destination is the source of truth in destination mode. This
    // prevents a stale per-person budget (or the last selected destination)
    // from being saved as the goal's cost.
    if (tripPlanningType === 'destinations' && tripSelectedDestinations.length > 0) {
      const costs = tripSelectedDestinations
        .map((destination) => destination.cost)
        .filter((cost) => Number.isFinite(cost) && cost > 0);

      if (costs.length !== tripSelectedDestinations.length) return null;

      const averagePerPerson = costs.reduce((total, cost) => total + cost, 0) / costs.length;
      return Math.round(averagePerPerson * familySize);
    }

    const enteredBudget = Number(tripBudgetPerPerson);
    return Number.isFinite(enteredBudget) && enteredBudget > 0
      ? Math.round(enteredBudget * familySize)
      : null;
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const cost = getTodaysCost();
    if (cost === null) {
      setSaveError(
        tripSelectedDestinations.length
          ? 'We could not retrieve the selected destination budget. Please try again.'
          : 'Select a destination or enter a budget before saving.'
      );
      return;
    }
    onSave({ targetYear: tripTargetYear || String(new Date().getFullYear() + 5), todaysCost: String(cost) });
  };

  if (!isOpen) return null;

  const DestinationCard = ({ d, rank, onClick, selected, adding }) => (
    <button type="button" onClick={onClick} disabled={selected}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 ${
        adding ? 'scale-[1.015] shadow-lg border-[#F0883E] bg-gradient-to-br from-[#FFF6ED] to-[#FFF0E0]' :
        selected ? 'border-[#F0883E] bg-[#FFF6ED]/80 cursor-default shadow-inner' :
        'border-[#EFE9DF] bg-white/60 hover:border-[#F0883E]/60 hover:bg-[#FFF6ED]/50 hover:shadow-md cursor-pointer'
      }`}>
      <div className="flex items-start gap-3">
        {rank !== undefined && (
          <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-black transition-all"
            style={{ background: selected ? '#F0883E' : '#EFE9DF', color: selected ? '#fff' : '#8A8578' }}>
            {selected ? '✓' : rank}
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="font-bold text-[#2B2A28] text-base truncate">{d.name}</div>
            <div className="text-right shrink-0">
              {Number.isFinite(d.cost) && <div className="text-sm font-black text-[#F0883E]">{formatINR(d.cost)}</div>}
              <div className="text-[10px] text-[#8A8578] font-medium">per person</div>
            </div>
          </div>
          {d.famousFor && (
            <div className="flex items-center gap-1 text-xs text-[#8A8578]">
              <svg className="w-3 h-3 shrink-0 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              {d.famousFor}
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {d.category && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0883E]/10 text-[#F0883E]">{d.category}</span>}
            {d.bestSeason && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFE9DF] text-[#8A8578]">🗓 {d.bestSeason}</span>}
            {d.currency && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EFE9DF] text-[#8A8578]">{d.currency}</span>}
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-[#1C1B1A]/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EFE9DF] w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[32px] p-5 sm:p-7 relative shadow-2xl shadow-black/15 space-y-5 scrollbar-thin">

        <button type="button" onClick={onClose} className="absolute right-5 top-5 w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive transition-all cursor-pointer text-lg font-bold select-none outline-none hover:text-[#F0883E] z-10">&times;</button>

        {/* Header */}
        <div className="pt-1 text-center select-none">
          <h3 className="font-heading text-xl font-extrabold text-[#2B2A28] flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            Foreign Tour Planning
          </h3>
          <p className="text-[#8A8578] text-[11px] leading-relaxed mt-1 font-normal">Choose dream destinations or set a budget to discover your best matches.</p>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'destinations', label: 'Pick Destinations', sub: 'Browse and choose countries to visit.', icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></> },
            { key: 'budget', label: 'Set a Budget', sub: 'Enter budget, see top 5 matches.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /> },
          ].map(({ key, label, sub, icon }) => (
            <button key={key} type="button" onClick={() => setTripPlanningType(key)}
              className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${tripPlanningType === key ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'}`}>
              <div className={`w-8 h-8 flex items-center justify-center text-[#F0883E] ${tripPlanningType !== key && 'opacity-40'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{icon}</svg>
              </div>
              <span className={`text-[12px] font-bold mt-1.5 ${tripPlanningType === key ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>{label}</span>
              <span className="text-[10px] leading-tight font-normal text-[#8A8578] mt-0.5">{sub}</span>
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-[12px] font-bold text-[#8A8578] uppercase tracking-wider mb-1.5 select-none">Travel Category</label>
          <button type="button" onClick={() => setCatOpen(true)}
            className="neu-field w-full px-4 py-3 text-sm font-semibold rounded-2xl outline-none flex justify-between items-center cursor-pointer hover:border-[#F0883E]/50 transition-all">
            <span className={selectedCategory ? 'text-[#2B2A28]' : 'text-[#8A8578]'}>{selectedCategory || 'All Categories'}</span>
            <ChevronDown open={catOpen} />
          </button>
          <FloatingDropdownModal
            isOpen={catOpen}
            onClose={() => setCatOpen(false)}
            title="Select Travel Category"
            subtitle="Browse destinations by trip theme & travel type"
            placeholder="Search category..."
            selectedValue={selectedCategory}
            onSelect={(opt) => setSelectedCategory(opt.value)}
            options={[
              { label: 'All Categories', value: '', subtext: 'View all tour destinations', icon: '✈️' },
              ...categories.map((c) => ({
                label: c,
                value: c,
                subtext: `${c} travel packages`,
                icon: '🌴',
              })),
            ]}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {tripPlanningType === 'destinations' ? (
            <>
              {/* Full destination dropdown */}
              <div>
                <label className="block text-[12px] font-bold text-[#8A8578] uppercase tracking-wider mb-1.5 select-none">Search & Select Destinations</label>
                <button
                  type="button"
                  onClick={() => setDestOpen(true)}
                  className="neu-field w-full px-4 py-3 text-sm font-semibold rounded-2xl outline-none flex items-center justify-between gap-3 text-left cursor-pointer hover:border-[#F0883E]/50 transition-all"
                >
                  <span className="truncate text-[#8A8578]">Select a country or destination</span>
                  <ChevronDown open={destOpen} />
                </button>

                <FloatingDropdownModal
                  isOpen={destOpen}
                  onClose={() => setDestOpen(false)}
                  title="Select Tour Destinations"
                  subtitle="Search countries, famous landmarks, and estimated per-person costs"
                  placeholder="Type country name, landmark, or category..."
                  emptyMessage="No destinations found matching your search."
                  onSelect={(opt) => selectDestination(opt.raw)}
                  options={destinationsList.map((d) => ({
                    id: d.id,
                    label: d.name,
                    subtext: [d.famousFor, d.category, d.bestSeason ? `🗓 ${d.bestSeason}` : null].filter(Boolean).join(' · '),
                    rightTag: Number.isFinite(d.cost) ? `${formatINR(d.cost)} /pp` : null,
                    disabled: tripSelectedDestinations.some((item) => item.id === d.id),
                    raw: d,
                    icon: '🌍',
                  }))}
                />
              </div>

              {/* Selected chips */}
              {tripSelectedDestinations.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#8A8578] uppercase tracking-wider mb-2">Selected</div>
                  <div className="flex flex-wrap gap-2">
                    {tripSelectedDestinations.map(dest => (
                      <div key={dest.id} className="bg-[#FFF6ED] text-[#F0883E] border border-[#EFE9DF] rounded-full pl-3 pr-2 py-1.5 text-xs font-bold flex items-center gap-2 select-none">
                        <span>{dest.name}</span>
                        {Number.isFinite(dest.cost) && <span className="text-[10px] text-[#8A8578]">{formatINR(dest.cost)}/pp</span>}
                        <button type="button" onClick={() => removeDestination(dest.id)} className="hover:text-[#E56A1F] font-extrabold cursor-pointer leading-none">&times;</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="block text-[12px] font-bold text-[#8A8578] uppercase tracking-wider mb-1.5 select-none">Budget Per Person</label>
                <input type="number" value={tripBudgetPerPerson}
                  onChange={e => { setSaveError(''); setTripBudgetPerPerson(e.target.value); }}
                  placeholder="e.g. 380000" onWheel={e => e.currentTarget.blur()}
                  className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none" />
              </div>

              {tripBudgetPerPerson && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold text-[#8A8578] uppercase tracking-wider select-none">
                    {loadingBudgetOptions ? 'Finding best matches...' : 'Top 5 Matching Destinations'}
                  </div>
                  {loadingBudgetOptions ? (
                    <div className="space-y-2.5">
                      {[1,2,3].map(i => <div key={i} className="h-[88px] rounded-2xl bg-[#EFE9DF]/50 animate-pulse" />)}
                    </div>
                  ) : budgetOptions.length > 0 ? (
                    <div className="space-y-2.5">
                      {budgetOptions.map((opt, idx) => {
                        const selected = tripSelectedDestinations.some(s => s.id === opt.id);
                        return (
                          <DestinationCard key={opt.id} d={opt} rank={idx + 1}
                            onClick={() => { if (!selected) { setSaveError(''); setAddingId(opt.id); setTimeout(() => setAddingId(null), 800); setTripSelectedDestinations([opt]); }}}
                            selected={selected} adding={addingId === opt.id} />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-sm text-[#8A8578] italic">No destinations found for this budget.</div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Target Year */}
          <div>
            <label className="block text-[12px] font-bold text-[#8A8578] uppercase tracking-wider mb-1.5 select-none">Target Travel Year</label>
            <input type="number" value={tripTargetYear} onChange={e => setTripTargetYear(e.target.value)}
              placeholder="e.g. 2027" onWheel={e => e.currentTarget.blur()}
              className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none" />
          </div>

          {/* Projected Cost */}
          {projectedCost && getProjectedValue() && (
            <div className="p-5 bg-gradient-to-br from-[#FFF6ED] to-[#FFF0E0] border border-[#F0883E]/30 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-[#8A8578] uppercase tracking-widest mb-1">Projected Future Cost</p>
              <p className="text-3xl font-black text-[#2B2A28]">{formatINR(getProjectedValue())}</p>
              {getSIPValue() && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-white/70 rounded-full px-3 py-1">
                  <span className="text-xs text-[#8A8578] font-medium">Monthly SIP</span>
                  <span className="text-xs font-black text-[#F0883E]">{formatINR(getSIPValue())}</span>
                </div>
              )}
              <p className="text-xs text-[#F0883E] font-medium mt-2">For {familySize} traveller{familySize > 1 ? 's' : ''} · {tripTargetYear}</p>
            </div>
          )}
        </div>

        {/* Save */}
        <div className="pt-1">
          {getTodaysCost() && (
            <p className="mb-3 text-center text-xs font-semibold text-[#8A8578]">
              Today&apos;s cost to save: <span className="text-[#F0883E]">{formatINR(getTodaysCost())}</span>
            </p>
          )}
          {saveError && <p className="mb-3 text-xs font-semibold text-red-600 text-center">{saveError}</p>}
          <button type="button" onClick={handleSave}
            className="neu-btn-raised w-full flex items-center justify-center gap-2 text-sm font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98] cursor-pointer">
            Save &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
