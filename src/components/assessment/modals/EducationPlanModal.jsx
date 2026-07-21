import React, { useState, useEffect, useRef } from 'react';
import client from '../../../config/api';
import { FloatingDropdownModal } from '../../ui/FloatingDropdownModal';

const formatINR = (value) => {
  if (!Number.isFinite(value) || value === 0) return null;
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
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
    if (isOpen) {
      client.get('/education/categories')
        .then(res => {
          const data = res.data || res;
          const catData = data.data || data;
          if (catData) {
            setCourseCategories(catData.course_categories || []);
            setCountries(catData.countries || []);
          }
        })
        .catch(err => console.error('Failed to load education categories:', err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (child) {
      setModalTargetYear(child.targetYear || '');
      setModalSelectedColleges([]);
      setModalIncludeForeign(false);
      setModalPlanningType('college');
      setModalBudgetAmount(child.todaysCost || '');
      setSaveError('');
      setSelectedCourseCategory('');
      setSelectedCountry('');
      userTypedBudget.current = false;
    }
  }, [child, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let url = '/education/programs?per_page=200';
    if (selectedCourseCategory) url += `&course_category=${encodeURIComponent(selectedCourseCategory)}`;
    if (selectedCountry) url += `&country=${encodeURIComponent(selectedCountry)}`;
    client.get(url)
      .then(res => {
        const payload = res?.data ?? res;
        const rawList =
          Array.isArray(payload) ? payload :
          Array.isArray(payload?.items) ? payload.items :
          Array.isArray(payload?.programs) ? payload.programs :
          Array.isArray(payload?.results) ? payload.results :
          [];

        const mapped = rawList.map((item, i) => ({
          id: item.id || `prog-${i}`,
          name: item.display_name || item.institution_name || item.name || '',
          cost: item.approx_cost_inr ?? item.cost ?? item.budget_inr ?? 0,
          country: (item.country || '').trim(),
          level: item.level || '',
          category: (item.course_category || item.category || '').trim(),
          duration: item.duration || '',
        }));

        // Client-side filter — handles API ignoring query params
        const filtered = mapped.filter(item => {
          const catMatch = !selectedCourseCategory ||
            item.category.toLowerCase() === selectedCourseCategory.toLowerCase() ||
            item.category.toLowerCase().includes(selectedCourseCategory.toLowerCase());

          const countryMatch = !selectedCountry ||
            item.country.toLowerCase() === selectedCountry.toLowerCase() ||
            item.country.toLowerCase().includes(selectedCountry.toLowerCase());

          // "Include Foreign Colleges" toggle:
          // unchecked → only show India colleges
          // checked   → show all countries
          const foreignMatch = modalIncludeForeign ||
            item.country.toLowerCase() === 'india' ||
            item.country === '';

          return catMatch && countryMatch && foreignMatch;
        });

        setCollegesList(filtered);
      })
      .catch(err => console.error('Failed to load programs:', err));
  }, [isOpen, selectedCourseCategory, selectedCountry, modalIncludeForeign]);


  useEffect(() => {
    console.log('[Budget Effect] triggered', { isOpen, modalBudgetAmount, modalPlanningType, selectedCourseCategory, selectedCountry });
    if (!isOpen || !modalBudgetAmount || modalPlanningType !== 'budget') {
      setBudgetOptions([]);
      return;
    }
    const budget = Number(modalBudgetAmount);
    if (!Number.isFinite(budget) || budget <= 0) { setBudgetOptions([]); return; }

    setBudgetOptions([]);
    setLoadingBudgetOptions(true);

    const t = setTimeout(() => {
      // Use programs endpoint with a large pool — we sort client-side by closest match
      let url = `/education/programs?per_page=200`;
      if (selectedCourseCategory) url += `&course_category=${encodeURIComponent(selectedCourseCategory)}`;
      if (selectedCountry) url += `&country=${encodeURIComponent(selectedCountry)}`;
      console.log('[Budget Effect] fetching:', url);

      client.get(url)
        .then(res => {
          const payload = res?.data ?? res;
          const rawList =
            Array.isArray(payload) ? payload :
            Array.isArray(payload?.items) ? payload.items :
            Array.isArray(payload?.programs) ? payload.programs :
            Array.isArray(payload?.results) ? payload.results :
            [];
          console.log('[Budget API] raw count:', rawList.length);

          const mapped = rawList.map((item, i) => ({
            id: item.id || `bprog-${i}`,
            name: item.display_name || item.institution_name || item.name || '',
            cost: item.approx_cost_inr ?? item.cost ?? item.budget_inr ?? 0,
            country: (item.country || '').trim(),
            level: item.level || '',
            category: (item.course_category || item.category || '').trim(),
            duration: item.duration || '',
          }));

          // Client-side filter by category/country (in case API ignores those params)
          const filtered = mapped.filter(item => {
            const catMatch = !selectedCourseCategory ||
              item.category.toLowerCase() === selectedCourseCategory.toLowerCase() ||
              item.category.toLowerCase().includes(selectedCourseCategory.toLowerCase());
            const countryMatch = !selectedCountry ||
              item.country.toLowerCase() === selectedCountry.toLowerCase() ||
              item.country.toLowerCase().includes(selectedCountry.toLowerCase());
            return catMatch && countryMatch;
          });

          // Sort by closest cost to the entered budget → always get 5 results
          const sorted = filtered
            .filter(item => Number.isFinite(item.cost) && item.cost > 0)
            .sort((a, b) => Math.abs(a.cost - budget) - Math.abs(b.cost - budget));

          console.log('[Budget API] after filter+sort:', sorted.length, 'top5:', sorted.slice(0, 5).map(i => `${i.name} ₹${i.cost}`));
          setBudgetOptions(sorted.slice(0, 5));
        })
        .catch(err => console.error('Budget search failed:', err))
        .finally(() => setLoadingBudgetOptions(false));
    }, 400);
    return () => clearTimeout(t);
  }, [modalBudgetAmount, modalPlanningType, isOpen, selectedCourseCategory, selectedCountry]);


  useEffect(() => {
    if (modalSelectedColleges.length > 0 && modalTargetYear && isOpen) {
      client.post('/education/project-cost', {
        program_id: modalSelectedColleges[0].id,
        target_year: Number(modalTargetYear)
      }).then(res => {
        const d = res.data?.data || res.data || res;
        if (d) setProjectedCost(d);
      }).catch(err => {
        console.error('Failed to project cost:', err);
        setProjectedCost(null);
      });
    } else {
      setProjectedCost(null);
    }
  }, [modalSelectedColleges, modalTargetYear, isOpen]);

  // College tab — selects college and updates budget (bidirectional)
  const selectCollege = (college) => {
    if (modalSelectedColleges.some(s => s.id === college.id)) return;
    setSaveError('');
    setAddingId(college.id);
    setTimeout(() => setAddingId(null), 700);
    setModalSelectedColleges(prev => [...prev, college]);
    if (Number.isFinite(college.cost)) {
      userTypedBudget.current = false;
      setModalBudgetAmount(String(college.cost));
    }
    setCollegeDropdownOpen(false);
  };

  // Budget tab — clicking a match does NOT overwrite typed budget
  const selectMatchingCollege = (college) => {
    setSaveError('');
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
    const raw = projectedCost.future_cost?.raw ?? projectedCost.future_cost ?? projectedCost.projected_cost;
    return Number.isFinite(Number(raw)) && Number(raw) > 0 ? Number(raw) : null;
  };

  const getSIPValue = () => {
    if (!projectedCost) return null;
    const raw = projectedCost.monthly_sip?.raw ?? projectedCost.monthly_sip;
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
    onSave({ goalType: 'Higher Education', targetYear: modalTargetYear || String(new Date().getFullYear() + 10), todaysCost: String(calculatedCost) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1C1B1A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#EFE9DF] w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[32px] p-5 sm:p-8 relative shadow-2xl shadow-black/10 space-y-5 scrollbar-thin">

        <button type="button" onClick={onClose} className="absolute right-6 top-6 w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive transition-all cursor-pointer text-lg font-bold select-none outline-none hover:text-[#F0883E]">&times;</button>

        {/* Header */}
        <div className="space-y-1 pt-2 text-center select-none">
          <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#2B2A28] flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Child Education Planning
          </h3>
          <p className="text-[#8A8578] text-[11px] leading-relaxed max-w-sm mx-auto font-normal">Plan your child's dream education — choose a college or set a budget to estimate future funding needs.</p>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'college', label: 'Dream College', sub: 'Pick a college, we estimate funding.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
            { key: 'budget', label: 'Set a Budget', sub: 'Enter budget, we show top matches.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /> },
          ].map(({ key, label, sub, icon }) => (
            <button key={key} type="button" onClick={() => setModalPlanningType(key)}
              className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${modalPlanningType === key ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#F0883E] ${modalPlanningType !== key && 'opacity-50'}`}>
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{icon}</svg>
              </div>
              <span className={`text-[12px] font-bold mt-2 ${modalPlanningType === key ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>{label}</span>
              <span className="text-[9.5px] leading-tight font-normal text-[#8A8578] mt-1">{sub}</span>
            </button>
          ))}
        </div>

        {/* Category & Country filters */}
        <div className="grid grid-cols-2 gap-3">
          {/* Course Category */}
          <div>
            <label className="block text-[13px] font-bold text-[#2B2A28] mb-1.5 select-none">Course Category</label>
            <button type="button" onClick={() => setCatDropdownOpen(true)}
              className="neu-field w-full px-3 py-2.5 text-xs font-semibold rounded-2xl outline-none flex justify-between items-center cursor-pointer gap-1 hover:border-[#F0883E]/50 transition-all">
              <span className={selectedCourseCategory ? 'text-[#2B2A28] truncate' : 'text-[#8A8578] truncate'}>{selectedCourseCategory || 'All Categories'}</span>
              <svg className="w-3.5 h-3.5 shrink-0 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <FloatingDropdownModal
              isOpen={catDropdownOpen}
              onClose={() => setCatDropdownOpen(false)}
              title="Select Course Category"
              subtitle="Filter programs by stream or degree type"
              placeholder="Search category..."
              selectedValue={selectedCourseCategory}
              onSelect={(opt) => setSelectedCourseCategory(opt.value)}
              options={[
                { label: 'All Categories', value: '', subtext: 'View programs across all fields', icon: '🎓' },
                ...courseCategories.map((c) => ({
                  label: c,
                  value: c,
                  subtext: `${c} degree programs`,
                  icon: '📚',
                })),
              ]}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-[13px] font-bold text-[#2B2A28] mb-1.5 select-none">Country</label>
            <button type="button" onClick={() => setCountryDropdownOpen(true)}
              className="neu-field w-full px-3 py-2.5 text-xs font-semibold rounded-2xl outline-none flex justify-between items-center cursor-pointer gap-1 hover:border-[#F0883E]/50 transition-all">
              <span className={selectedCountry ? 'text-[#2B2A28] truncate' : 'text-[#8A8578] truncate'}>{selectedCountry || 'All Countries'}</span>
              <svg className="w-3.5 h-3.5 shrink-0 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <FloatingDropdownModal
              isOpen={countryDropdownOpen}
              onClose={() => setCountryDropdownOpen(false)}
              title="Select Country"
              subtitle="Filter programs by study location"
              placeholder="Search country..."
              selectedValue={selectedCountry}
              onSelect={(opt) => setSelectedCountry(opt.value)}
              options={[
                { label: 'All Countries', value: '', subtext: 'Global institutions', icon: '🌐' },
                ...countries.map((c) => ({
                  label: c,
                  value: c,
                  subtext: `Institutions in ${c}`,
                  icon: '📍',
                })),
              ]}
            />
          </div>
        </div>

        {/* Content by mode */}
        <div className="space-y-4">
          {modalPlanningType === 'college' ? (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase select-none">SELECT YOUR COLLEGE</div>

              {/* Custom college dropdown */}
              <div>
                <label className="block text-[13px] font-bold text-[#2B2A28] mb-1.5 select-none">Select Dream College</label>
                <button type="button" onClick={() => setCollegeDropdownOpen(true)}
                  className="neu-field w-full px-4 py-3 text-sm font-semibold rounded-2xl outline-none flex justify-between items-center cursor-pointer hover:border-[#F0883E]/50 transition-all">
                  <span className="text-[#8A8578]">Search colleges or universities...</span>
                  <svg className="w-4 h-4 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <FloatingDropdownModal
                  isOpen={collegeDropdownOpen}
                  onClose={() => setCollegeDropdownOpen(false)}
                  title="Select Dream College"
                  subtitle="Browse top institutions and estimated course budgets"
                  placeholder="Type college name, country or degree..."
                  emptyMessage="No colleges found matching your search."
                  onSelect={(opt) => selectCollege(opt.raw)}
                  options={collegesList.map((c) => ({
                    id: c.id,
                    label: c.name,
                    subtext: [c.level, c.country].filter(Boolean).join(' · '),
                    rightTag: Number.isFinite(c.cost) && c.cost > 0 ? formatINR(c.cost) : null,
                    disabled: modalSelectedColleges.some((s) => s.id === c.id),
                    raw: c,
                    icon: '🏫',
                  }))}
                />
              </div>

              {/* Selected chips */}
              {modalSelectedColleges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {modalSelectedColleges.map(col => (
                    <div key={col.id}
                      className={`bg-[#FFF6ED] text-[#F0883E] border border-[#EFE9DF] rounded-full pl-3 pr-2 py-1.5 text-xs font-bold flex items-center gap-2 select-none transition-all ${addingId === col.id ? 'scale-105 shadow-md' : ''}`}>
                      <span>{col.name}</span>
                      {Number.isFinite(col.cost) && col.cost > 0 && <span className="text-[10px] text-[#8A8578] font-semibold">{formatINR(col.cost)}</span>}
                      <button type="button" onClick={() => removeCollege(col.id)} className="hover:text-[#E56A1F] font-extrabold cursor-pointer">&times;</button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <span className="neu-checkbox relative w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all duration-150">
                  <input type="checkbox" checked={modalIncludeForeign} onChange={e => setModalIncludeForeign(e.target.checked)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  {modalIncludeForeign && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#F0883E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className="text-[13px] font-bold text-[#2B2A28]">Include Foreign Colleges</span>
              </label>
            </>
          ) : (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase select-none">ENTER YOUR BUDGET</div>

              <div>
                <label className="block text-[13px] font-bold text-[#2B2A28] mb-1.5 select-none">Education Budget (Today's Value)*</label>
                <input type="number" value={modalBudgetAmount}
                  onChange={e => { setSaveError(''); userTypedBudget.current = true; setModalBudgetAmount(e.target.value); }}
                  placeholder="e.g. 1500000" onWheel={e => e.currentTarget.blur()}
                  className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none" />
              </div>

              {/* Top 5 matching programs */}
              {modalBudgetAmount && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-[#8A8578] uppercase tracking-wider select-none">
                    {loadingBudgetOptions ? 'Searching...' : 'Top 5 Matching Programs'}
                  </div>
                  {loadingBudgetOptions ? (
                    <div className="space-y-2">
                      {[1,2,3].map(i => <div key={i} className="h-14 rounded-xl bg-[#EFE9DF]/50 animate-pulse" />)}
                    </div>
                  ) : budgetOptions.length > 0 ? (
                    <div className="space-y-2">
                      {budgetOptions.map((opt, idx) => {
                        const isSelected = modalSelectedColleges.some(c => c.id === opt.id);
                        const isAdding = addingId === opt.id;
                        return (
                          <button key={opt.id} type="button"
                            onClick={() => selectMatchingCollege(opt)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all ${
                              isAdding ? 'scale-[1.02] shadow-md border-[#F0883E] bg-[#FFF6ED]' :
                              isSelected ? 'border-[#F0883E] bg-[#FFF6ED] shadow-inner' :
                              'border-[#EFE9DF] bg-white/50 hover:bg-[#FFF6ED]/80 hover:border-[#F0883E]/40 cursor-pointer'
                            }`}>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-colors"
                              style={{ background: isSelected ? '#F0883E' : '#EFE9DF', color: isSelected ? '#fff' : '#8A8578' }}>
                              {isSelected ? '✓' : idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-[#2B2A28] truncate">{opt.name}</div>
                              <div className="text-[10px] text-[#8A8578]">{[opt.level, opt.country].filter(Boolean).join(' · ')}</div>
                            </div>
                            <div className="text-right shrink-0">
                              {Number.isFinite(opt.cost) && opt.cost > 0 && <div className="text-xs font-bold text-[#F0883E]">{formatINR(opt.cost)}</div>}
                              {opt.category && <div className="text-[10px] text-[#8A8578]">{opt.category}</div>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-[#8A8578] italic">No programs found for this budget.</div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Target Year */}
          <div>
            <label className="block text-[13px] font-bold text-[#2B2A28] mb-1.5 select-none">Target Admission Year*</label>
            <input type="number" value={modalTargetYear} onChange={e => setModalTargetYear(e.target.value)}
              placeholder="e.g. 2035" onWheel={e => e.currentTarget.blur()}
              className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none" />
          </div>

          {/* Projected Cost Card */}
          {projectedCost && getProjectedValue() && (
            <div className="p-4 bg-[#FFF6ED] border border-[#EFE9DF] rounded-2xl animate-fade-in text-center shadow-inner">
              <p className="text-[10px] font-bold text-[#8A8578] uppercase tracking-wider mb-1">Projected Future Cost</p>
              <p className="text-2xl font-black text-[#2B2A28]">{formatINR(getProjectedValue())}</p>
              {getSIPValue() && (
                <p className="text-xs font-semibold text-[#2B2A28]/70 mt-1">Required SIP: <span className="text-[#F0883E] font-bold">{formatINR(getSIPValue())}</span> / mo</p>
              )}
              <p className="text-xs font-medium text-[#F0883E] mt-1">For admission in {modalTargetYear}</p>
            </div>
          )}
        </div>

        {/* Save */}
        <div className="text-center pt-1">
          {saveError && <p className="mb-3 text-xs font-semibold text-red-600">{saveError}</p>}
          <button type="button" onClick={handleSave}
            className="neu-btn-raised flex items-center gap-2 text-sm font-bold px-10 py-3.5 rounded-2xl transition-all active:scale-95 cursor-pointer justify-center mx-auto w-full sm:w-auto">
            Save &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
