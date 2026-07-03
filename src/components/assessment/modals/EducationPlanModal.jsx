import React, { useState, useEffect } from 'react';

export function EducationPlanModal({ isOpen, onClose, onSave, child }) {
  const [modalPlanningType, setModalPlanningType] = useState('college'); // 'college' | 'budget'
  const [modalSelectedColleges, setModalSelectedColleges] = useState([]);
  const [modalIncludeForeign, setModalIncludeForeign] = useState(false);
  const [modalTargetYear, setModalTargetYear] = useState('');
  const [modalBudgetAmount, setModalBudgetAmount] = useState('');

  useEffect(() => {
    if (child) {
      setModalTargetYear(child.targetYear || '');
      setModalSelectedColleges([]);
      setModalIncludeForeign(false);
      setModalPlanningType('college');
      setModalBudgetAmount(child.todaysCost || '');
    }
  }, [child, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    if (e) e.preventDefault();

    const collegeCosts = {
      'BITS Pilani': 1800000,
      'IIT University': 1200000,
      'Delhi University': 300000,
      'Parul University': 600000,
      'MIT University': 4500000,
      'Stanford University': 5000000,
      'Others': 1000000
    };

    let calculatedCost = 0;
    if (modalPlanningType === 'budget') {
      calculatedCost = parseFloat(modalBudgetAmount) || 1000000;
    } else {
      if (modalSelectedColleges.length === 0) {
        calculatedCost = 1000000;
      } else {
        modalSelectedColleges.forEach(col => {
          let cCost = collegeCosts[col] || 1000000;
          if (modalIncludeForeign && !col.includes('MIT') && !col.includes('Stanford')) {
            cCost = cCost * 3.5;
          }
          calculatedCost += cCost;
        });
        calculatedCost = Math.round(calculatedCost / modalSelectedColleges.length);
      }
    }

    onSave({
      goalType: 'Higher Education',
      targetYear: modalTargetYear || String(new Date().getFullYear() + 10),
      todaysCost: String(calculatedCost)
    });
  };

  return (
    <div className="fixed inset-0 bg-[#1C1B1A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
    <div className="bg-[#FAF7F2] border border-[#EFE9DF] w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[32px] p-5 sm:p-8 relative shadow-[0_20px_40px_rgba(43,42,40,0.15)] space-y-6 scrollbar-thin">
        
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
            </svg>
            Child Education Planning
          </h3>
          <p className="text-[#8A8578] text-[11px] leading-relaxed max-w-sm mx-auto font-normal">
            Help us understand your child's future education aspirations so we can estimate the funding required to achieve them.
          </p>
        </div>

        {/* Planning Mode Tabs */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setModalPlanningType('college')}
            className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${
              modalPlanningType === 'college' ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#F0883E] ${modalPlanningType !== 'college' && 'opacity-60'}`}>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className={`text-[12px] font-bold mt-2 ${modalPlanningType === 'college' ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>
              Dream College
            </span>
            <span className="text-[9.5px] leading-tight font-normal text-[#8A8578] mt-1">
              Select college, we'll estimate funding.
            </span>
          </button>

          <button
            type="button"
            onClick={() => setModalPlanningType('budget')}
            className={`flex flex-col items-center text-center p-4 rounded-3xl transition-all cursor-pointer ${
              modalPlanningType === 'budget' ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#F0883E] ${modalPlanningType !== 'budget' && 'opacity-60'}`}>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className={`text-[12px] font-bold mt-2 ${modalPlanningType === 'budget' ? 'text-[#F0883E]' : 'text-[#8A8578]'}`}>
              Set a Budget
            </span>
            <span className="text-[9.5px] leading-tight font-normal text-[#8A8578] mt-1">
              Enter your goal education budget amount.
            </span>
          </button>
        </div>

        {/* Modal Input fields depending on active tab */}
        <div className="space-y-4 pt-2">
          {modalPlanningType === 'college' ? (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase mb-1 select-none">
                SELECT YOUR COLLEGE
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Select Dream Colleges</label>
                <div className="relative">
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && !modalSelectedColleges.includes(val)) {
                        setModalSelectedColleges(prev => [...prev, val]);
                      }
                      e.target.value = "";
                    }}
                    className="neu-field w-full px-4 py-3 text-xs sm:text-sm pr-10 font-semibold rounded-2xl outline-none transition-all duration-150 appearance-none cursor-pointer"
                  >
                    <option value="">Select a college/university...</option>
                    <option value="BITS Pilani">BITS Pilani (₹18 Lakhs)</option>
                    <option value="IIT University">IIT University (₹12 Lakhs)</option>
                    <option value="Delhi University">Delhi University (₹3 Lakhs)</option>
                    <option value="Parul University">Parul University (₹6 Lakhs)</option>
                    <option value="MIT University">MIT University (₹45 Lakhs - US)</option>
                    <option value="Stanford University">Stanford University (₹50 Lakhs - US)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F0883E]">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Render Selected College Chips */}
              {modalSelectedColleges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {modalSelectedColleges.map((col) => (
                    <div 
                      key={col} 
                      className="bg-[#FFF6ED] text-[#F0883E] border border-[#EFE9DF] shadow-[inset_1px_1px_3px_rgba(240,136,62,0.15)] rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 select-none"
                    >
                      <span>{col}</span>
                      <button
                        type="button"
                        onClick={() => setModalSelectedColleges(prev => prev.filter(c => c !== col))}
                        className="hover:text-[#E56A1F] text-xs font-extrabold focus:outline-none cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <span className="neu-checkbox relative w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all duration-150">
                  <input 
                    type="checkbox"
                    checked={modalIncludeForeign}
                    onChange={(e) => setModalIncludeForeign(e.target.checked)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {modalIncludeForeign && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#F0883E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="text-[13px] font-bold text-[#2B2A28]">Include Foreign Colleges / Universities</span>
              </label>
            </>
          ) : (
            <>
              <div className="text-[10px] font-bold text-[#F0883E] tracking-wider uppercase mb-1 select-none">
                ENTER YOUR BUDGET
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Education Budget Amount (Today's Value)*</label>
                <input 
                  type="number"
                  value={modalBudgetAmount}
                  onChange={(e) => setModalBudgetAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 1500000)"
                  className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150"
                />
              </div>
            </>
          )}

          {/* Target Year */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-bold text-[#2B2A28] select-none">Target Year*</label>
            <input 
              type="number"
              value={modalTargetYear}
              onChange={(e) => setModalTargetYear(e.target.value)}
              placeholder="Enter expected admission year"
              className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150"
            />
          </div>
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
