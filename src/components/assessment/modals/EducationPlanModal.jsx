import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import client from '../../../config/api';
import { FloatingDropdownModal } from '../../ui/FloatingDropdownModal';

/* Pure Inline SVG Icons for new-wealth-fe */
const GraduationCapIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const BuildingIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

const BookOpenIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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

export function EducationPlanModal({ isOpen, onClose, onSave, child }) {
  const [modalPlanningType, setModalPlanningType] = useState('college');
  const [modalSelectedColleges, setModalSelectedColleges] = useState([]);
  const [modalIncludeForeign, setModalIncludeForeign] = useState(false);
  const [modalTargetYear, setModalTargetYear] = useState('');
  const [modalBudgetAmount, setModalBudgetAmount] = useState('');

  const userTypedBudget = useRef(false);
  const [addingId, setAddingId] = useState(null);

  const [courseCategories, setCourseCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);

  const [collegesList, setCollegesList] = useState([]);
  const [budgetOptions, setBudgetOptions] = useState([]);
  const [loadingBudgetOptions, setLoadingBudgetOptions] = useState(false);
  const [projectedCost, setProjectedCost] = useState(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (child && isOpen) {
      setModalTargetYear(child.targetYear || String(new Date().getFullYear() + 10));
      setModalSelectedColleges(child.selectedColleges || []);
      setModalPlanningType(child.planningType || 'college');
      setSelectedCountry(child.selectedCountry || '');
      setSelectedCourseCategory(child.selectedCategory || '');
      setModalIncludeForeign(child.includeForeign || false);
      userTypedBudget.current = false;
      setModalBudgetAmount(child.todaysCost ? String(child.todaysCost) : '');
      setSaveError('');
    }
  }, [child, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCats = async () => {
      try {
        const res = await client.get('/colleges/categories');
        const d = res.data?.data || res.data || [];
        setCourseCategories(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error('Failed to load college categories', err);
      }
    };
    const fetchCountries = async () => {
      try {
        const res = await client.get('/colleges/countries');
        const d = res.data?.data || res.data || [];
        setCountries(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error('Failed to load countries', err);
      }
    };
    fetchCats();
    fetchCountries();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchColleges = async () => {
      try {
        const params = {};
        if (selectedCourseCategory) params.category = selectedCourseCategory;
        if (selectedCountry) params.country = selectedCountry;
        const res = await client.get('/colleges', { params });
        const d = res.data?.data || res.data || [];
        setCollegesList(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error('Failed to load colleges', err);
      }
    };
    fetchColleges();
  }, [isOpen, selectedCourseCategory, selectedCountry]);

  useEffect(() => {
    if (modalPlanningType !== 'budget' || !modalBudgetAmount) {
      setBudgetOptions([]);
      return;
    }
    const b = Number(modalBudgetAmount);
    if (!b || b <= 0) return;

    const timer = setTimeout(async () => {
      setLoadingBudgetOptions(true);
      try {
        const params = { budget: b };
        if (selectedCourseCategory) params.category = selectedCourseCategory;
        if (selectedCountry) params.country = selectedCountry;
        if (modalIncludeForeign) params.includeForeign = 'true';
        const res = await client.get('/colleges/search/budget', { params });
        const d = res.data?.data || res.data || [];
        setBudgetOptions(Array.isArray(d) ? d.slice(0, 5) : []);
      } catch (err) {
        console.error('Budget search failed', err);
      } finally {
        setLoadingBudgetOptions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [modalBudgetAmount, modalPlanningType, selectedCourseCategory, selectedCountry, modalIncludeForeign]);

  useEffect(() => {
    let cost = null;
    if (userTypedBudget.current && Number.isFinite(Number(modalBudgetAmount)) && Number(modalBudgetAmount) > 0) {
      cost = Number(modalBudgetAmount);
    } else if (modalSelectedColleges.length > 0) {
      const total = modalSelectedColleges.reduce((t, c) => t + c.cost, 0);
      cost = Math.round(total / modalSelectedColleges.length);
    } else if (Number.isFinite(Number(modalBudgetAmount)) && Number(modalBudgetAmount) > 0) {
      cost = Number(modalBudgetAmount);
    }

    const yr = Number(modalTargetYear);
    const curr = new Date().getFullYear();
    if (!cost || !yr || yr <= curr) {
      setProjectedCost(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await client.get('/future-cost', {
          params: { todaysCost: cost, targetYear: yr, inflationRate: 10, expectedReturn: 12 },
        });
        setProjectedCost(res.data?.data || res.data || null);
      } catch (err) {
        const diff = yr - curr;
        const fv = Math.round(cost * Math.pow(1 + 0.10, diff));
        const i = 0.12 / 12;
        const n = diff * 12;
        const sip = Math.round((fv * i) / (Math.pow(1 + i, n) - 1));
        setProjectedCost({ futureValue: fv, monthlySIP: sip });
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [modalSelectedColleges, modalBudgetAmount, modalTargetYear]);

  const selectCollege = (college) => {
    setSaveError('');
    userTypedBudget.current = false;
    if (!modalSelectedColleges.some(c => c.id === college.id)) {
      const nextColleges = [college];
      setModalSelectedColleges(nextColleges);
      const total = nextColleges.reduce((t, c) => t + c.cost, 0);
      setModalBudgetAmount(String(Math.round(total / nextColleges.length)));
    }
  };

  const selectMatchingCollege = (college) => {
    setSaveError('');
    userTypedBudget.current = false;
    setAddingId(college.id);
    setTimeout(() => setAddingId(null), 700);
    setModalSelectedColleges([college]);
  };

  const removeCollege = (id) => {
    setModalSelectedColleges(prev => {
      const updated = prev.filter(c => c.id !== id);
      if (!userTypedBudget.current) {
        if (updated.length > 0) {
          const total = updated.reduce((t, c) => t + c.cost, 0);
          setModalBudgetAmount(String(Math.round(total / updated.length)));
        } else {
          setModalBudgetAmount('');
        }
      }
      return updated;
    });
  };

  const getProjectedValue = () => {
    if (!projectedCost) return null;
    const raw = projectedCost.future_cost?.raw ?? projectedCost.future_cost ?? projectedCost.projected_cost ?? projectedCost.futureValue;
    return Number.isFinite(Number(raw)) && Number(raw) > 0 ? Number(raw) : null;
  };

  const getSIPValue = () => {
    if (!projectedCost) return null;
    const raw = projectedCost.monthly_sip?.raw ?? projectedCost.monthly_sip ?? projectedCost.monthlySIP;
    return Number.isFinite(Number(raw)) && Number(raw) > 0 ? Number(raw) : null;
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const enteredBudget = Number(modalBudgetAmount);
    let calculatedCost = null;
    if (userTypedBudget.current && Number.isFinite(enteredBudget) && enteredBudget > 0) {
      calculatedCost = enteredBudget;
    } else if (Number.isFinite(enteredBudget) && enteredBudget > 0 && modalSelectedColleges.length === 0) {
      calculatedCost = enteredBudget;
    } else if (modalSelectedColleges.length > 0) {
      const allValid = modalSelectedColleges.every(c => Number.isFinite(c.cost));
      if (!allValid) { setSaveError('Could not retrieve budget for selected college.'); return; }
      const total = modalSelectedColleges.reduce((t, c) => t + c.cost, 0);
      calculatedCost = Math.round(total / modalSelectedColleges.length);
    } else {
      setSaveError('Select a college or enter a budget before saving.');
      return;
    }
    const combinedColleges = [...modalSelectedColleges];
    if (Array.isArray(budgetOptions)) {
      budgetOptions.forEach(bOpt => {
        const bName = bOpt.name || bOpt;
        if (!combinedColleges.some(c => (c.name || c).toLowerCase() === String(bName).toLowerCase())) {
          combinedColleges.push(bOpt);
        }
      });
    }

    onSave({
      goalType: 'Higher Education',
      targetYear: modalTargetYear || String(new Date().getFullYear() + 10),
      todaysCost: String(calculatedCost),
      selectedColleges: combinedColleges,
      suggested_colleges: combinedColleges,
      budgetOptions: budgetOptions,
      selectedCountry,
      selectedCategory: selectedCourseCategory,
    });
  };

  if (!isOpen) return null;

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
              <GraduationCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm sm:text-xl font-light text-white leading-tight">
                Child Education Planning
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 font-light mt-0.5 hidden sm:block">
                Plan higher education target budget & dream colleges
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

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
              {[
                { key: 'college', label: 'Dream College', sub: 'Select colleges for cost estimate', icon: BuildingIcon },
                { key: 'budget', label: 'Set a Budget', sub: 'Filter top matching programs', icon: DollarSignIcon },
              ].map(({ key, label, sub, icon: Icon }) => {
                const active = modalPlanningType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setModalPlanningType(key)}
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

            {/* 2-Column Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              {/* Left Column (7 cols): Filters & College / Budget Search */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 bg-white/[0.05] p-4 sm:p-7 rounded-3xl border border-white/15 backdrop-blur-xl">
                {/* Category & Country filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Course Category */}
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none flex items-center gap-1.5">
                      <BookOpenIcon className="w-4 h-4 text-sky-400" /> Course Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setCatDropdownOpen(true)}
                      className="neu-field w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-normal rounded-2xl outline-none flex justify-between items-center cursor-pointer hover:border-sky-400/50 transition-all text-white"
                    >
                      <span className={selectedCourseCategory ? 'text-white truncate' : 'text-slate-400 truncate'}>
                        {selectedCourseCategory || 'All Categories'}
                      </span>
                      <ChevronDown open={catDropdownOpen} />
                    </button>
                    <FloatingDropdownModal
                      isOpen={catDropdownOpen}
                      onClose={() => setCatDropdownOpen(false)}
                      isFullScreen={false}
                      title="Select Course Category"
                      subtitle="Filter programs by stream or degree"
                      placeholder="Search category..."
                      selectedValue={selectedCourseCategory}
                      onSelect={(opt) => setSelectedCourseCategory(opt.value)}
                      options={[
                        { label: 'All Categories', value: '', subtext: 'View all programs', icon: <BookOpenIcon className="w-4 h-4" /> },
                        ...courseCategories.map((c) => ({ label: c, value: c, subtext: `${c} degree programs`, icon: <GraduationCapIcon className="w-4 h-4" /> })),
                      ]}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none flex items-center gap-1.5">
                      <GlobeIcon className="w-4 h-4 text-sky-400" /> Country
                    </label>
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(true)}
                      className="neu-field w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-normal rounded-2xl outline-none flex justify-between items-center cursor-pointer hover:border-sky-400/50 transition-all text-white"
                    >
                      <span className={selectedCountry ? 'text-white truncate' : 'text-slate-400 truncate'}>
                        {selectedCountry || 'All Countries'}
                      </span>
                      <ChevronDown open={countryDropdownOpen} />
                    </button>
                    <FloatingDropdownModal
                      isOpen={countryDropdownOpen}
                      onClose={() => setCountryDropdownOpen(false)}
                      isFullScreen={false}
                      title="Select Country"
                      subtitle="Filter programs by study location"
                      placeholder="Search country..."
                      selectedValue={selectedCountry}
                      onSelect={(opt) => setSelectedCountry(opt.value)}
                      options={[
                        { label: 'All Countries', value: '', subtext: 'Global institutions', icon: <GlobeIcon className="w-4 h-4" /> },
                        ...(countries.some(c => c.toLowerCase() === 'india') ? [{ label: 'India', value: 'India', subtext: 'Institutions in India', icon: <BuildingIcon className="w-4 h-4" /> }] : []),
                        ...countries.filter(c => c.toLowerCase() !== 'india').map((c) => ({ label: c, value: c, subtext: `Institutions in ${c}`, icon: <BuildingIcon className="w-4 h-4" /> })),
                      ]}
                    />
                  </div>
                </div>

                {/* Mode-specific search inputs */}
                {modalPlanningType === 'college' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none flex items-center gap-2">
                        <BuildingIcon className="w-4 h-4 text-sky-400" /> Select Dream College
                      </label>
                      <button
                        type="button"
                        onClick={() => setCollegeDropdownOpen(true)}
                        className="neu-field w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-normal rounded-2xl outline-none flex justify-between items-center cursor-pointer hover:border-sky-400/50 transition-all text-white"
                      >
                        <span className="text-slate-400 truncate">Search colleges or universities...</span>
                        <ChevronDown open={collegeDropdownOpen} />
                      </button>
                      <FloatingDropdownModal
                        isOpen={collegeDropdownOpen}
                        onClose={() => setCollegeDropdownOpen(false)}
                        isFullScreen={true}
                        title="Select Dream College"
                        subtitle="Browse top institutions and estimated course budgets"
                        placeholder="Type college name, country or degree..."
                        emptyMessage="No colleges found."
                        onSelect={(opt) => selectCollege(opt.raw)}
                        options={collegesList.map((c) => ({
                          id: c.id,
                          label: c.name,
                          subtext: [c.level, c.country].filter(Boolean).join(' · '),
                          rightTag: Number.isFinite(c.cost) && c.cost > 0 ? formatINR(c.cost) : null,
                          disabled: modalSelectedColleges.some((s) => s.id === c.id),
                          raw: c,
                          icon: <BuildingIcon className="w-4 h-4 text-sky-400" />,
                        }))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-200 mb-1.5 select-none">
                        Education Budget (Approx. Today's Value)
                      </label>
                      <input
                        type="number"
                        value={modalBudgetAmount}
                        onChange={(e) => {
                          setSaveError('');
                          userTypedBudget.current = true;
                          setModalBudgetAmount(e.target.value);
                        }}
                        placeholder="e.g. 1500000"
                        onWheel={(e) => e.currentTarget.blur()}
                        className="neu-field w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                      />
                    </div>
                    
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className={`w-5 h-5 rounded-lg transition-all flex items-center justify-center ${
                        modalIncludeForeign ? 'bg-sky-500 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10 border-white/20'
                      }`}>
                        <input
                          type="checkbox"
                          checked={modalIncludeForeign}
                          onChange={(e) => setModalIncludeForeign(e.target.checked)}
                          className="sr-only"
                        />
                        <svg className={`w-3.5 h-3.5 text-white transition-opacity ${modalIncludeForeign ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-xs font-light text-slate-200">Include Foreign Colleges</span>
                    </label>

                    {modalBudgetAmount && (
                      <div className="space-y-3 pt-1">
                        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                          {loadingBudgetOptions ? 'Searching...' : 'Top 5 Matching Programs'}
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
                              const isSelected = modalSelectedColleges.some((c) => c.id === opt.id);
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => selectMatchingCollege(opt)}
                                  className={`w-full flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border text-left transition-all ${
                                    isSelected
                                      ? 'border-sky-400 bg-sky-500/20 text-sky-300'
                                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-sky-400/50 cursor-pointer text-white'
                                  }`}
                                >
                                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                                    isSelected ? 'bg-sky-500 text-white' : 'bg-white/10 text-slate-400'
                                  }`}>
                                    {isSelected ? <CheckIcon className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-white truncate">{opt.name}</div>
                                    <div className="text-[10px] text-slate-300">{[opt.level, opt.country].filter(Boolean).join(' · ')}</div>
                                  </div>
                                  {Number.isFinite(opt.cost) && opt.cost > 0 && (
                                    <div className="text-xs font-medium text-sky-400">{formatINR(opt.cost)}</div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 italic py-2">No programs matching budget.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column (5 cols): Summary & Projection Card */}
              <div className="lg:col-span-5 bg-white/[0.06] border border-white/15 rounded-3xl p-4 sm:p-7 space-y-5 flex flex-col justify-start backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="text-xs font-medium text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-sky-400" /> Education Plan Summary
                  </div>

                  {/* Selected Colleges Chips */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2 select-none">
                      Selected Institutions
                    </label>
                    {modalSelectedColleges.length === 0 ? (
                      <div className="p-4 sm:p-5 text-center text-xs text-slate-400 bg-white/[0.03] border border-white/10 rounded-2xl">
                        No colleges selected yet.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {modalSelectedColleges.map((col) => (
                          <div
                            key={col.id}
                            className="bg-sky-500/20 border border-sky-400/40 text-sky-300 rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium flex items-center gap-2 shadow-xs"
                          >
                            <BuildingIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate max-w-[160px] sm:max-w-none">{col.name}</span>
                            {Number.isFinite(col.cost) && col.cost > 0 && (
                              <span className="text-[10px] text-slate-300 font-normal">{formatINR(col.cost)}</span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeCollege(col.id)}
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
                      <CalendarIcon className="w-4 h-4 text-sky-400" /> Target Admission Year
                    </label>
                    <input
                      type="number"
                      value={modalTargetYear}
                      onChange={(e) => setModalTargetYear(e.target.value)}
                      placeholder="e.g. 2035"
                      onWheel={(e) => e.currentTarget.blur()}
                      className="neu-field w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Projected Cost Card */}
                {projVal ? (
                  <div className="p-4 sm:p-5 bg-sky-500/10 border border-sky-400/30 rounded-2xl text-center space-y-1 sm:space-y-1.5 mt-2">
                    <p className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">Projected Future Cost</p>
                    <p className="text-2xl sm:text-3xl font-light text-white">{formatINR(projVal)}</p>
                    {sipVal && (
                      <p className="text-xs font-light text-slate-300">
                        Required Monthly SIP: <span className="text-sky-300 font-medium">{formatINR(sipVal)}</span>
                      </p>
                    )}
                    <p className="text-xs font-light text-slate-300">For admission in {modalTargetYear}</p>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-2xl text-center text-xs text-slate-400 font-light mt-2">
                    Select a college or enter budget and target year to calculate future cost.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Footer */}
        <div className="shrink-0 py-3 sm:py-0 sm:h-20 px-4 sm:px-10 border-t border-white/10 bg-[#0B132B]/80 flex items-center justify-between gap-3 z-10">
          <div className="text-xs sm:text-sm font-light text-slate-300 truncate max-w-[140px] sm:max-w-none">
            {saveError && <span className="text-rose-400 font-medium truncate block">{saveError}</span>}
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
              <span>Save Education Goal</span>
              <ArrowRightIcon className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalJSX, document.body);
}
