import React, { useState, useEffect } from 'react';

export function TripPlanModal({ isOpen, onClose, onSave, goal, childrenCount }) {
  const [tripPlanningType, setTripPlanningType] = useState('destinations'); // 'destinations' | 'budget'
  const [tripSelectedDestinations, setTripSelectedDestinations] = useState([]);
  const [tripTargetYear, setTripTargetYear] = useState('');
  const [tripBudgetPerPerson, setTripBudgetPerPerson] = useState('');

  useEffect(() => {
    if (goal) {
      setTripTargetYear(goal.targetYear || '');
      setTripSelectedDestinations([]);
      setTripPlanningType('destinations');
      setTripBudgetPerPerson('');
    }
  }, [goal, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    if (e) e.preventDefault();

    const destinationCosts = {
      'USA': 300000,
      'UK': 250000,
      'Switzerland': 300000,
      'France': 220000,
      'Italy': 220000,
      'Japan': 200000,
      'Russia': 180000,
      'Singapore': 120000,
      'Maldives': 150000,
      'Bali': 100000,
      'Dubai': 120000,
      'Thailand': 80000,
      'Bhutan': 60000,
      'China': 90000
    };

    const familySize = 2 + (childrenCount || 0);
    let calculatedCost = 0;

    if (tripPlanningType === 'budget') {
      const budgetVal = parseFloat(tripBudgetPerPerson) || 150000;
      calculatedCost = budgetVal * familySize;
    } else {
      if (tripSelectedDestinations.length === 0) {
        calculatedCost = 150000 * familySize;
      } else {
        let totalPerPerson = 0;
        tripSelectedDestinations.forEach(dest => {
          totalPerPerson += (destinationCosts[dest] || 150000);
        });
        const averagePerPerson = Math.round(totalPerPerson / tripSelectedDestinations.length);
        calculatedCost = averagePerPerson * familySize;
      }
    }

    onSave({
      targetYear: tripTargetYear || String(new Date().getFullYear() + 5),
      todaysCost: String(calculatedCost)
    });
  };

  return (
    <div className="fixed inset-0 bg-[#1C1B1A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      
      {/* ── Modal Container (Glow removed, replaced with clean shadow-2xl) ── */}
      <div className="bg-[#FAF7F2] border border-[#EFE9DF] w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[32px] p-5 sm:p-8 relative shadow-2xl shadow-black/10 space-y-6 scrollbar-thin">
        
        {/* Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive transition-all cursor-pointer text-lg font-bold select-none outline-none hover:text-[#F0883E]"
        >
          &times;
        </button>

        {/* Title & Desc */}
        <div className="space-y-1.5 pt-2 text-center select-none">
          <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#2B2A28] flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-[#F0883E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Foreign Tour Planning
          </h3>
          <p className="text-[#8A8578] text-[11px] leading-relaxed max-w-sm mx-auto font-normal">
            Tell us how you would like to plan your future travel goals, choose dream destinations or estimate your travel budget.
          </p>
        </div>

        {/* Planning Mode Tabs */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Tab 1: Destinations */}
          <button
            type="button"
            onClick={() => setTripPlanningType('destinations')}
            className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${
              tripPlanningType === 'destinations' ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#F0883E] ${tripPlanningType !== 'destinations' && 'opacity-60'}`}>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className={`text-[12px] font-bold mt-2 ${tripPlanningType === 'destinations' ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>
              Destinations
            </span>
            <span className="text-[9.5px] leading-tight font-normal text-[#8A8578] mt-1">
              Choose the countries you would like to visit in future.
            </span>
          </button>

          {/* Tab 2: Budget */}
          <button
            type="button"
            onClick={() => setTripPlanningType('budget')}
            className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${
              tripPlanningType === 'budget' ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#F0883E] ${tripPlanningType !== 'budget' && 'opacity-60'}`}>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className={`text-[12px] font-bold mt-2 ${tripPlanningType === 'budget' ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>
              Set a Budget
            </span>
            <span className="text-[9.5px] leading-tight font-normal text-[#8A8578] mt-1">
              Enter your expected travel budget and discover options.
            </span>
          </button>

        </div>

        {/* Modal Input fields depending on active tab */}
        <div className="space-y-4 pt-2">
          
          {tripPlanningType === 'destinations' ? (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase mb-1 select-none">
                SELECT DESTINATIONS
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Select Dream Destinations</label>
                <div className="relative">
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !tripSelectedDestinations.includes(val)) {
                        setTripSelectedDestinations(prev => [...prev, val]);
                      }
                      e.target.value = "";
                    }}
                    className="neu-field w-full px-4 py-3 text-xs sm:text-sm pl-10 pr-10 font-semibold rounded-2xl outline-none transition-all duration-150 appearance-none cursor-pointer"
                  >
                    <option value="">Search countries or destinations...</option>
                    <option value="USA">USA (₹3.0 Lakhs / person)</option>
                    <option value="UK">UK (₹2.5 Lakhs / person)</option>
                    <option value="Switzerland">Switzerland (₹3.0 Lakhs / person)</option>
                    <option value="France">France (₹2.2 Lakhs / person)</option>
                    <option value="Italy">Italy (₹2.2 Lakhs / person)</option>
                    <option value="Japan">Japan (₹2.0 Lakhs / person)</option>
                    <option value="Russia">Russia (₹1.8 Lakhs / person)</option>
                    <option value="Singapore">Singapore (₹1.2 Lakhs / person)</option>
                    <option value="Maldives">Maldives (₹1.5 Lakhs / person)</option>
                    <option value="Bali">Bali (₹1.0 Lakhs / person)</option>
                    <option value="Dubai">Dubai (₹1.2 Lakhs / person)</option>
                    <option value="Thailand">Thailand (₹80k / person)</option>
                    <option value="Bhutan">Bhutan (₹60k / person)</option>
                    <option value="China">China (₹90k / person)</option>
                  </select>
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F0883E] pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F0883E]">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Selected Chips */}
              {tripSelectedDestinations.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tripSelectedDestinations.map((dest) => (
                    <div 
                      key={dest} 
                      className="bg-[#FFF6ED] text-[#F0883E] border border-[#EFE9DF] shadow-[inset_1px_1px_3px_rgba(240,136,62,0.15)] rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 select-none"
                    >
                      <span>{dest}</span>
                      <button
                        type="button"
                        onClick={() => setTripSelectedDestinations(prev => prev.filter(c => c !== dest))}
                        className="hover:text-[#F0883E] text-xs font-extrabold focus:outline-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Target Year */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Target Travel Year*</label>
                <input 
                  type="number"
                  value={tripTargetYear}
                  onChange={(e) => setTripTargetYear(e.target.value)}
                  placeholder="Enter expected travel year"
                  className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150"
                />
              </div>
            </>
          ) : (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase mb-1 select-none">
                BUDGET PLANNING
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Estimated Travel Budget Per Person*</label>
                <div className="flex gap-3">
                  <input 
                    type="number"
                    value={tripBudgetPerPerson}
                    onChange={(e) => setTripBudgetPerPerson(e.target.value)}
                    placeholder="Enter your travel budget per person"
                    className="flex-1 neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tripBudgetPerPerson) {
                        alert(`Travel budget per person added: ₹${parseFloat(tripBudgetPerPerson).toLocaleString('en-IN')}`);
                      }
                    }}
                    className="neu-btn-flat-inactive text-xs font-bold px-4 py-3 rounded-2xl hover:text-[#F0883E] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Add Budget
                  </button>
                </div>
              </div>

              {/* Target Year */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Target Travel Year*</label>
                <input 
                  type="number"
                  value={tripTargetYear}
                  onChange={(e) => setTripTargetYear(e.target.value)}
                  placeholder="Enter expected travel year"
                  className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150"
                />
              </div>
            </>
          )}

        </div>

        {/* Save Button */}
        <div className="text-center pt-2">
          <button 
            type="button"
            onClick={handleSave}
            className="neu-btn-raised flex items-center gap-2 text-sm font-bold px-10 py-3.5 rounded-2xl transition-all active:scale-95 cursor-pointer justify-center mx-auto w-full sm:w-auto"
          >
            Save &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}