import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import client from '../../../config/api';
import { FloatingDropdownModal } from '../../ui/FloatingDropdownModal';

/* Pure Inline SVG Icons for new-wealth-fe */
const CompassIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DollarSignIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22m5-18H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const SlidersHorizontalIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg className={`w-4 h-4 text-sky-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const formatINR = (value) => {
  if (!Number.isFinite(value) || value === 0) return null;
  return `₹${value.toLocaleString('en-IN')}`;
};

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

  const defaultTravellers = String(2 + (childrenCount || 0));
  const [tripTravellers, setTripTravellers] = useState(defaultTravellers);

  useEffect(() => {
    if (goal && isOpen) {
      setTripTargetYear(goal.targetYear || String(new Date().getFullYear() + 5));
      setTripTravellers(goal.travellers ? String(goal.travellers) : defaultTravellers);
      setTripPlanningType(goal.planningType || 'destinations');
      setTripSelectedDestinations(goal.selectedDestinations || []);
      setSelectedCategory(goal.selectedCategory || '');
      setTripBudgetPerPerson(goal.costPerPerson ? String(goal.costPerPerson) : '');
      setSaveError('');
    }
  }, [goal, isOpen, defaultTravellers]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCats = async () => {
      try {
        const res = await client.get('/categories');
        const d = res.data?.data || res.data || [];
        setCategories(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCats();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchDest = async () => {
      try {
        const params = selectedCategory ? { category: selectedCategory } : {};
        const res = await client.get('/destinations', { params });
        const d = res.data?.data || res.data || [];
        setDestinationsList(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error('Failed to load destinations', err);
      }
    };
    fetchDest();
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    if (tripPlanningType !== 'budget' || !tripBudgetPerPerson) {
      setBudgetOptions([]);
      return;
    }
    const b = Number(tripBudgetPerPerson);
    if (!b || b <= 0) return;

    const timer = setTimeout(async () => {
      setLoadingBudgetOptions(true);
      try {
        const res = await client.get('/destinations/search/budget', { params: { budget: b } });
        const d = res.data?.data || res.data || [];
        setBudgetOptions(Array.isArray(d) ? d.slice(0, 5) : []);
      } catch (err) {
        console.error('Budget search failed', err);
      } finally {
        setLoadingBudgetOptions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [tripBudgetPerPerson, tripPlanningType]);

  useEffect(() => {
    const cost = getTodaysCost();
    const yr = Number(tripTargetYear);
    const curr = new Date().getFullYear();
    if (!cost || !yr || yr <= curr) {
      setProjectedCost(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await client.get('/future-cost', {
          params: { todaysCost: cost, targetYear: yr, inflationRate: 6, expectedReturn: 12 },
        });
        setProjectedCost(res.data?.data || res.data || null);
      } catch (err) {
        const diff = yr - curr;
        const fv = Math.round(cost * Math.pow(1 + 0.06, diff));
        const i = 0.12 / 12;
        const n = diff * 12;
        const sip = Math.round((fv * i) / (Math.pow(1 + i, n) - 1));
        setProjectedCost({ futureValue: fv, monthlySIP: sip });
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [tripSelectedDestinations, tripBudgetPerPerson, tripPlanningType, tripTargetYear, tripTravellers]);

  const addDestination = (dest) => {
    setSaveError('');
    if (!tripSelectedDestinations.some((d) => d.id === dest.id)) {
      setTripSelectedDestinations((prev) => [...prev, dest]);
    }
  };

  const removeDestination = (id) => {
    setTripSelectedDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const getPerPersonCost = () => {
    if (tripPlanningType === 'destinations') {
      if (tripSelectedDestinations.length === 0) return 0;
      return Math.round(
        tripSelectedDestinations.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0) /
          tripSelectedDestinations.length
      );
    } else {
      return Number(tripBudgetPerPerson) || 0;
    }
  };

  const getTodaysCost = () => {
    const pp = getPerPersonCost();
    const count = Number(tripTravellers) || 1;
    return pp * count;
  };

  const getProjectedValue = () => projectedCost?.futureValue || null;
  const getSIPValue = () => projectedCost?.monthlySIP || null;

  const handleSave = () => {
    const cost = getTodaysCost();
    if (!cost || cost <= 0) {
      setSaveError('Please select destination(s) or enter a budget to estimate cost.');
      return;
    }
    const combinedDestinations = [...tripSelectedDestinations];
    if (budgetOptions.length > 0) {
      budgetOptions.forEach((bOpt) => {
        if (!combinedDestinations.some((x) => x.id === bOpt.id)) {
          combinedDestinations.push(bOpt);
        }
      });
    }

    onSave({
      targetYear: tripTargetYear || String(new Date().getFullYear() + 5),
      todaysCost: String(cost),
      selectedDestinations: combinedDestinations,
      suggested_tours: combinedDestinations,
      budgetOptions: budgetOptions,
      selectedCategory,
      travellers: tripTravellers,
    });
  };

  if (!isOpen) return null;

  const todaysCost = getTodaysCost();
  const projVal = getProjectedValue();
  const sipVal = getSIPValue();

  const modalJSX = (
    <div
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-hidden select-none animate-fade-in text-white"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="w-full max-w-7xl h-[95dvh] sm:h-auto sm:max-h-[92vh] bg-[#0F172A]/95 border border-sky-400/40 rounded-3xl flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] backdrop-blur-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 min-h-[56px] sm:h-20 px-4 sm:px-10 border-b border-white/10 bg-[#0B132B]/80 flex items-center justify-between gap-3 z-10 py-2 sm:py-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
              <CompassIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm sm:text-xl font-light text-white leading-tight">
                Foreign Tour Planning
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 font-light mt-0.5 hidden sm:block">
                Calculate estimated trip cost for {tripTravellers || 1} travellers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer text-slate-400 hover:text-white outline-none shrink-0"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 no-scrollbar scrollbar-none">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

            {/* Mode Switcher & Category Filter */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
              {/* Mode Switcher */}
              <div className="md:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  { key: 'destinations', label: 'Pick Destinations', sub: 'Browse & pick countries', icon: GlobeIcon },
                  { key: 'budget', label: 'Set a Budget', sub: 'Filter top matches by budget', icon: DollarSignIcon },
                ].map(({ key, label, sub, icon: Icon }) => {
                  const active = tripPlanningType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTripPlanningType(key)}
                      className={`p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl transition-all cursor-pointer flex items-center gap-2 sm:gap-3.5 text-left overflow-hidden min-w-0 border ${
                        active
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.12] text-white'
                      }`}
                    >
                      <div className={`p-1.5 sm:p-2.5 rounded-xl border shrink-0 ${active ? 'bg-sky-500/30 border-sky-400 text-sky-200' : 'bg-white/10 border-white/15 text-slate-400'}`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className={`text-xs sm:text-sm font-medium truncate ${active ? 'text-sky-300' : 'text-white'}`}>{label}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-300 font-light mt-0.5 truncate">{sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Category Filter */}
              <div className="md:col-span-5">
                <button
                  type="button"
                  onClick={() => setCatOpen(true)}
                  className="w-full px-4 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer text-white"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <SlidersHorizontalIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="truncate">{selectedCategory || 'All Categories (Holiday, Adventure...)'}</span>
                  </div>
                  <ChevronDown open={catOpen} />
                </button>
                <FloatingDropdownModal
                  isOpen={catOpen}
                  onClose={() => setCatOpen(false)}
                  title="Select Travel Category"
                  subtitle="Filter countries by vacation interest"
                  placeholder="Search categories..."
                  selectedValue={selectedCategory}
                  onSelect={(opt) => setSelectedCategory(opt.value)}
                  options={[
                    { label: 'All Categories', value: '' },
                    ...categories.map((c) => ({ label: c.name || c, value: c.name || c })),
                  ]}
                />
              </div>
            </div>

            {/* Main Area: Left Form vs Right Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {tripPlanningType === 'destinations' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-medium text-slate-200 select-none">
                        Browse & Choose Country
                      </label>
                      <span className="text-[11px] text-slate-400 font-light">
                        {destinationsList.length} destinations available
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDestOpen(true)}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl sm:rounded-3xl border border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/20 flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer text-white shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GlobeIcon className="w-5 h-5 text-sky-400 shrink-0" />
                        <span className="truncate">Click to Open Full Destinations Catalog ({destinationsList.length})</span>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    </button>

                    <FloatingDropdownModal
                      isOpen={destOpen}
                      onClose={() => setDestOpen(false)}
                      isFullScreen={true}
                      title="Worldwide Travel Destinations Catalog"
                      subtitle="Browse estimated trip cost per person across top vacation spots"
                      placeholder="Search destination, city, country, or vibe..."
                      selectedValue={tripSelectedDestinations[0]?.id}
                      onSelect={(opt) => addDestination(opt)}
                      options={destinationsList.map((d) => ({
                        ...d,
                        label: d.name,
                        value: d.id,
                        subtext: `${d.famousFor || d.category || 'Tour'} • ${d.days ? d.days + ' Days' : ''}`,
                        rightTag: Number.isFinite(d.cost) ? formatINR(d.cost) : null,
                      }))}
                    />

                    {/* Quick Popular Picks Strip */}
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                        Quick Popular Picks
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {destinationsList.slice(0, 6).map((dest) => {
                          const selected = tripSelectedDestinations.some((s) => s.id === dest.id);
                          return (
                            <button
                              key={dest.id}
                              type="button"
                              onClick={() => (selected ? removeDestination(dest.id) : addDestination(dest))}
                              className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                                selected
                                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-medium'
                                  : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-sky-400/50 text-white'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="text-xs font-medium truncate text-white">{dest.name}</div>
                                <div className="text-[10px] text-slate-300 truncate">{dest.famousFor || dest.category}</div>
                              </div>
                              <div className="text-right shrink-0">
                                {Number.isFinite(dest.cost) && (
                                  <div className="text-xs font-medium text-sky-400">{formatINR(dest.cost)}</div>
                                )}
                                <div className="text-[10px] font-light text-slate-400">per person</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block text-xs sm:text-sm font-medium text-slate-200 select-none">
                      Budget Per Person (₹)
                    </label>
                    <input
                      type="number"
                      value={tripBudgetPerPerson}
                      onChange={(e) => {
                        setSaveError('');
                        setTripBudgetPerPerson(e.target.value);
                      }}
                      placeholder="e.g. 380000"
                      onWheel={(e) => e.currentTarget.blur()}
                      className="neu-field w-full px-4 py-3 sm:py-3.5 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                    />

                    {tripBudgetPerPerson && (
                      <div className="space-y-3 pt-2">
                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                          {loadingBudgetOptions ? 'Searching...' : 'Top 5 Matching Destinations'}
                        </div>
                        {loadingBudgetOptions ? (
                          <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-14 rounded-2xl bg-white/[0.05] animate-pulse" />
                            ))}
                          </div>
                        ) : budgetOptions.length > 0 ? (
                          <div className="space-y-2.5">
                            {budgetOptions.map((opt, idx) => {
                              const selected = tripSelectedDestinations.some((s) => s.id === opt.id);
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => {
                                    if (!selected) {
                                      setSaveError('');
                                      setAddingId(opt.id);
                                      setTimeout(() => setAddingId(null), 700);
                                      setTripSelectedDestinations([opt]);
                                    }
                                  }}
                                  disabled={selected}
                                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                    selected
                                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                                      : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.12] hover:border-sky-400/50 cursor-pointer text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold ${selected ? 'bg-sky-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                                      {selected ? <CheckIcon className="w-4 h-4 stroke-[3]" /> : idx + 1}
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium text-white">{opt.name}</div>
                                      <div className="text-[11px] text-slate-300">{opt.famousFor || opt.category}</div>
                                    </div>
                                  </div>
                                  {Number.isFinite(opt.cost) && (
                                    <div className="text-xs font-medium text-sky-400">{formatINR(opt.cost)}</div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 italic py-2">No destinations matching budget.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column (5 cols): Summary Card & Future Projection */}
              <div className="lg:col-span-5 bg-white/[0.06] border border-white/15 rounded-3xl p-4 sm:p-7 space-y-5 flex flex-col justify-start backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="text-xs font-medium text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-sky-400" /> Trip Planning Summary
                  </div>

                  {/* Selected Chips */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2 select-none">
                      Selected Destinations
                    </label>
                    {tripSelectedDestinations.length === 0 ? (
                      <div className="p-4 sm:p-5 text-center text-xs text-slate-400 bg-white/[0.03] border border-white/10 rounded-2xl">
                        No destinations selected yet.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {tripSelectedDestinations.map((dest) => (
                          <div
                            key={dest.id}
                            className="bg-sky-500/20 border border-sky-400/40 text-sky-300 rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium flex items-center gap-2 shadow-xs"
                          >
                            <MapPinIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate max-w-[160px] sm:max-w-none">{dest.name}</span>
                            {Number.isFinite(dest.cost) && (
                              <span className="text-[10px] text-slate-300">{formatINR(dest.cost)}/pp</span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeDestination(dest.id)}
                              className="hover:text-white font-bold cursor-pointer ml-1"
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Target Year */}
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-sky-400" /> Target Travel Year
                    </label>
                    <input
                      type="number"
                      value={tripTargetYear}
                      onChange={(e) => setTripTargetYear(e.target.value)}
                      placeholder="e.g. 2027"
                      onWheel={(e) => e.currentTarget.blur()}
                      className="neu-field w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Total Travellers count */}
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none flex items-center gap-1.5">
                      <UserIcon className="w-4 h-4 text-sky-400" /> Total Travellers
                    </label>
                    <input
                      type="number"
                      value={tripTravellers}
                      onChange={(e) => setTripTravellers(e.target.value)}
                      placeholder="e.g. 2"
                      min="1"
                      onWheel={(e) => e.currentTarget.blur()}
                      className="neu-field w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                    />
                  </div>

                  {/* Calculation Breakdown Box */}
                  {todaysCost ? (
                    <div className="p-3.5 bg-white/[0.04] border border-white/15 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Total Today's Cost Calculation</p>
                      <p className="text-xs font-light text-slate-200">
                        ₹{Number(tripBudgetPerPerson || (tripSelectedDestinations[0]?.cost) || 0).toLocaleString('en-IN')} × {tripTravellers || 1} people
                      </p>
                      <p className="text-base font-medium text-sky-400">
                        = ₹{Number(todaysCost).toLocaleString('en-IN')} Total
                      </p>
                    </div>
                  ) : null}

                </div>

                {/* Projected Future Cost */}
                {projVal ? (
                  <div className="p-4 sm:p-5 bg-sky-500/10 border border-sky-400/30 rounded-2xl text-center space-y-1 sm:space-y-1.5 mt-2">
                    <p className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">Projected Future Cost</p>
                    <p className="text-2xl sm:text-3xl font-light text-white">{formatINR(projVal)}</p>
                    {sipVal && (
                      <p className="text-xs font-light text-slate-300">
                        Monthly SIP Needed: <span className="text-sky-300 font-medium">{formatINR(sipVal)}</span>
                      </p>
                    )}
                    <p className="text-xs font-light text-slate-300">For {tripTravellers || 1} travellers in {tripTargetYear}</p>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-2xl text-center text-xs text-slate-400 font-light mt-2">
                    Select a destination and enter target year to view cost estimation.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Footer */}
        <div className="shrink-0 py-3 sm:py-0 sm:h-20 px-4 sm:px-10 border-t border-white/10 bg-[#0B132B]/80 flex items-center justify-between gap-3 z-10">
          <div className="text-xs sm:text-sm font-light text-slate-300 truncate max-w-[130px] sm:max-w-none">
            {todaysCost ? (
              <span className="truncate block">Cost: <span className="text-sky-400 font-medium text-sm sm:text-base ml-0.5">{formatINR(todaysCost)}</span></span>
            ) : saveError ? (
              <span className="text-rose-400 font-medium truncate block">{saveError}</span>
            ) : (
              <span className="text-slate-400 hidden sm:block">Fill in travel details to calculate.</span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer text-white rounded-full shrink-0"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="relative group inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium px-5 sm:px-8 py-2.5 sm:py-3 rounded-full overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.25] via-white/[0.14] to-white/[0.06] border border-white/60 text-white shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Save Tour Goal</span>
              <ArrowRightIcon className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
}
