import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep3Fields } from '../../../hooks/useFormValidation';
import { StepNavigation } from '../../ui/StepNavigation';
import { FormField } from '../../ui/FormField';
import { NeumorphicDatePicker } from '../../ui/NeumorphicDatePicker';
import { EducationPlanModal } from '../modals/EducationPlanModal';

export function Step3FamilyDetails() {
  const {
    childrenCount,
    setChildrenCount,
    childrenData,
    updateChild,
    submitStep3,
    prevStep,
    isSubmitting
  } = useAssessment();

  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);

  const [touched, setTouched] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const errors = validateStep3Fields(childrenData, childrenCount);
  const isValid = Object.keys(errors).length === 0;

  const openEducationModal = (childIndex, goalIndex) => {
    setSelectedChildIndex(childIndex);
    setSelectedGoalIndex(goalIndex);
    setIsEducationModalOpen(true);
  };

  const handleChildInputChange = (index, field, value) => {
    updateChild(index, { [field]: value });
  };

  const handleChildGoalChange = (childIndex, goalIndex, field, value) => {
    const child = childrenData[childIndex] || {
      name: '',
      occupation: '',
      dependent: 'Yes',
      dob: '',
      age: '',
      goalType: '',
      targetYear: '',
      todaysCost: '',
      goals: [{ id: Date.now() + Math.random(), goalType: '', targetYear: '', todaysCost: '' }]
    };
    const goalsList = child.goals && Array.isArray(child.goals) ? child.goals : [
      { id: Date.now() + Math.random(), goalType: child.goalType || '', targetYear: child.targetYear || '', todaysCost: child.todaysCost || '' }
    ];
    const updatedGoals = goalsList.map((g, gIdx) => {
      if (gIdx === goalIndex) {
        return { ...g, [field]: value };
      }
      return g;
    });
    updateChild(childIndex, { goals: updatedGoals });
  };

  const handleAddGoalToChild = (childIndex) => {
    const child = childrenData[childIndex] || {
      name: '',
      occupation: '',
      dependent: 'Yes',
      dob: '',
      age: '',
      goalType: '',
      targetYear: '',
      todaysCost: '',
      goals: []
    };
    const goalsList = child.goals && Array.isArray(child.goals) ? child.goals : [
      { id: Date.now() + Math.random(), goalType: child.goalType || '', targetYear: child.targetYear || '', todaysCost: child.todaysCost || '' }
    ];
    const updatedGoals = [
      ...goalsList,
      { id: Date.now() + Math.random(), goalType: '', targetYear: '', todaysCost: '' }
    ];
    updateChild(childIndex, { goals: updatedGoals });
  };

  const handleRemoveGoalFromChild = (childIndex, goalIndex) => {
    const child = childrenData[childIndex];
    if (!child || !child.goals || child.goals.length <= 1) return;
    const updatedGoals = child.goals.filter((_, gIdx) => gIdx !== goalIndex);
    updateChild(childIndex, { goals: updatedGoals });
  };

  const handleBlur = (childIndex, fieldName) => {
    setTouched(prev => ({ ...prev, [`${childIndex}-${fieldName}`]: true }));
  };

  const handleNext = () => {
    setShowAllErrors(true);
    if (isValid) {
      submitStep3();
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 md:gap-12 lg:gap-16 items-start flex-1">
          
          {/* Left Column: Form Fields */}
          <div className="space-y-7 w-full">
            
            <div className="space-y-2">
              <h1 className="font-heading text-[26px] sm:text-[32px] lg:text-[34px] font-extrabold leading-tight text-[#2B2A28]">
                Family Details
              </h1>
              <p className="text-sm leading-relaxed max-w-lg font-normal text-[#8A8578]">
                Help us understand your family structure and financial responsibilities so we can build a retirement strategy that protects your family.
              </p>
            </div>

            {/* Number of Children selector */}
            <div className="space-y-2.5">
              <label className="block text-[13px] font-bold text-[#2B2A28] tracking-wide select-none">
                Number of Children <span className="text-[#8A8578] font-normal">(optional)</span>
              </label>
              <div className="flex gap-3">
                {[0, 1, 2, 3, '4+'].map((num) => {
                  const parsedNum = num === '4+' ? 4 : num;
                  const isSelected = num === '4+' ? childrenCount >= 4 : childrenCount === parsedNum;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setChildrenCount(parsedNum)}
                      className={`w-12 h-10 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Show controls to add more children if childrenCount is 4 or more */}
              {childrenCount >= 4 && (
                <div className="flex flex-wrap items-center gap-4 pt-2.5 pb-1 animate-fade-in">
                  <span className="text-xs font-bold text-[#2B2A28] select-none">
                    Total Children: <span className="text-[#F0883E] text-sm font-extrabold">{childrenCount}</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="px-3 h-8 rounded-xl text-xs font-bold neu-btn-flat-inactive flex items-center justify-center hover:text-[#F0883E] cursor-pointer whitespace-nowrap"
                    >
                      + Add More
                    </button>
                    <button
                      type="button"
                      onClick={() => childrenCount > 4 && setChildrenCount(childrenCount - 1)}
                      className="px-3 h-8 rounded-xl text-xs font-bold neu-btn-flat-inactive flex items-center justify-center hover:text-red-500 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                      disabled={childrenCount <= 4}
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Child Details Forms */}
            <div className="space-y-6 pt-2">
              {Array.from({ length: childrenCount }).map((_, i) => {
                const child = childrenData[i] || { name: '', occupation: '', dependent: 'Yes', dob: '', age: '', goalType: '', targetYear: '', todaysCost: '', goals: [{ id: 'g-' + i, goalType: '', targetYear: '', todaysCost: '' }] };
                const goalsList = child.goals && Array.isArray(child.goals) ? child.goals : [
                  { id: Date.now() + Math.random(), goalType: child.goalType || '', targetYear: child.targetYear || '', todaysCost: child.todaysCost || '' }
                ];
                return (
                  <div key={i} className="space-y-8 border-b border-[#EFE9DF] pb-8 last:border-b-0 last:pb-0 pt-4">
                    
                    {/* CHILD X INFORMATION CONTAINER - ORANGISH/WHITISH NEUMORPHIC CARD */}
                    <div className="neu-card-orange-classic p-5 sm:p-6 rounded-[24px] space-y-6">
                      
                      {/* CHILD X INFORMATION HEADER */}
                      <div className="text-[#F0883E] font-bold text-xs uppercase tracking-wider select-none neu-text-embossed">
                        CHILD {i + 1} INFORMATION
                      </div>

                      {/* Full Name */}
                      <FormField
                        label="Full Name"
                        name={`childName-${i}`}
                        value={child.name}
                        onChange={(e) => handleChildInputChange(i, 'name', e.target.value)}
                        onBlur={() => handleBlur(i, 'name')}
                        error={(touched[`${i}-name`] || showAllErrors) ? errors[i]?.name : null}
                        placeholder="Enter child's full name"
                        required={true}
                      />

                      {/* Dependent & DOB Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-1.5 w-full">
                          <label className="block text-[13px] font-bold text-[#2B2A28] tracking-wide select-none">
                            Financially Dependent?<span className="text-[#F0883E] font-bold ml-0.5">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleChildInputChange(i, 'dependent', opt)}
                                className={`py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                                  child.dependent === opt ? 'neu-btn-flat-active' : 'neu-btn-flat-inactive'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <NeumorphicDatePicker
                          label="Date Of Birth"
                          name={`childDob-${i}`}
                          value={child.dob}
                          onChange={(e) => handleChildInputChange(i, 'dob', e.target.value)}
                          onBlur={() => handleBlur(i, 'dob')}
                          error={(touched[`${i}-dob`] || showAllErrors) ? errors[i]?.dob : null}
                          required={true}
                        />
                      </div>

                      {/* Calculated Age */}
                      <div className="space-y-1.5 w-full">
                        <label className="block text-[13px] font-bold text-[#2B2A28] tracking-wide select-none">
                          Calculated Age<span className="text-[#F0883E] font-bold ml-0.5">*</span>
                        </label>
                        <input 
                          type="text"
                          value={child.age || ''}
                          readOnly
                          placeholder="Calculated age here"
                          className="neu-field w-full px-4 py-3.5 text-sm font-semibold rounded-2xl outline-none transition-all duration-150 text-[#8A8578] cursor-not-allowed"
                        />
                      </div>

                    </div>

                    {/* CHILD X GOALS CONTAINER WITH BRACKET CONNECTOR */}
                    <div className="relative pl-6 sm:pl-7 ml-1 sm:ml-2 space-y-6">
                      {/* Left bracket connector */}
                      <div className="absolute left-0 top-1 bottom-1 w-[14px] border-l-[3px] border-t-[3px] border-b-[3px] border-[#F0883E] rounded-l-xl select-none pointer-events-none" />
                      
                      {/* CHILD X GOALS HEADER */}
                      <div className="text-[#F0883E] font-bold text-xs uppercase tracking-wider select-none neu-text-embossed">
                        CHILD {i + 1} GOALS
                      </div>

                      {/* Dynamic Goal Sections */}
                      <div className="space-y-5">
                        {goalsList.map((g, gIdx) => {
                          const hasGoalTypeErr = errors[i]?.goals?.[gIdx]?.goalType;
                          const hasTargetYearErr = errors[i]?.goals?.[gIdx]?.targetYear;
                          const hasTodaysCostErr = errors[i]?.goals?.[gIdx]?.todaysCost;

                          return (
                            <div key={gIdx} className="space-y-4 neu-card-inset p-5 rounded-[24px] relative pt-6">
                              {goalsList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGoalFromChild(i, gIdx)}
                                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xs font-bold transition-all cursor-pointer outline-none select-none"
                                >
                                  Remove Goal
                                </button>
                              )}

                              <div className="text-[11px] font-bold text-[#8A8578] uppercase tracking-wider select-none mb-1">
                                Goal #{gIdx + 1}
                              </div>

                              {/* Goal Type */}
                              <div className="space-y-1.5 w-full">
                                <label className="block text-[13px] font-bold text-[#2B2A28] tracking-wide select-none">
                                  Goal Type<span className="text-[#F0883E] font-bold ml-0.5">*</span>
                                </label>
                                <div className="relative">
                                  <select
                                    value={g.goalType}
                                    onChange={(e) => handleChildGoalChange(i, gIdx, 'goalType', e.target.value)}
                                    onBlur={() => handleBlur(i, `goals-${gIdx}-goalType`)}
                                    className={`${
                                      g.goalType ? 'neu-field-filled' : 'neu-field'
                                    } w-full px-5 py-4 pr-10 text-base font-semibold rounded-2xl outline-none transition-all duration-200 appearance-none cursor-pointer ${
                                      (touched[`${i}-goals-${gIdx}-goalType`] || showAllErrors) && hasGoalTypeErr ? 'border-red-400' : ''
                                    }`}
                                  >
                                    <option value="">Select an option</option>
                                    <option value="Higher Education">Higher Education</option>
                                    <option value="Marriage">Marriage</option>
                                    <option value="Business Setup">Business Setup</option>
                                    <option value="Career Fund">Career Fund</option>
                                    <option value="Others">Others</option>
                                  </select>
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#F0883E]">
                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </div>
                                </div>
                                {(touched[`${i}-goals-${gIdx}-goalType`] || showAllErrors) && hasGoalTypeErr && (
                                  <span className="text-xs text-red-500 font-medium block mt-1">{hasGoalTypeErr}</span>
                                )}
                              </div>

                              {/* Target Year & Today's Cost Row */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <FormField
                                  label="Target Year"
                                  name={`childTargetYear-${i}-${gIdx}`}
                                  value={g.targetYear}
                                  onChange={(e) => handleChildGoalChange(i, gIdx, 'targetYear', e.target.value)}
                                  onBlur={() => handleBlur(i, `goals-${gIdx}-targetYear`)}
                                  error={(touched[`${i}-goals-${gIdx}-targetYear`] || showAllErrors) ? hasTargetYearErr : null}
                                  placeholder="Enter target year"
                                  type="number"
                                  required={true}
                                />
                                <FormField
                                  label="Today's Cost"
                                  name={`childTodaysCost-${i}-${gIdx}`}
                                  value={g.todaysCost}
                                  onChange={(e) => handleChildGoalChange(i, gIdx, 'todaysCost', e.target.value)}
                                  onBlur={() => handleBlur(i, `goals-${gIdx}-todaysCost`)}
                                  error={(touched[`${i}-goals-${gIdx}-todaysCost`] || showAllErrors) ? hasTodaysCostErr : null}
                                  placeholder="Enter today's cost"
                                  type="number"
                                  required={true}
                                />
                              </div>

                              {/* Education Planner Tool link */}
                              {g.goalType === 'Higher Education' && (
                                <div className="pt-1">
                                  <a 
                                    href="#education-plan"
                                    onClick={(e) => { e.preventDefault(); openEducationModal(i, gIdx); }}
                                    className="text-[#F0883E] text-xs font-bold hover:underline inline-flex items-center gap-1.5 transition-all select-none"
                                  >
                                    Plan with Dream Colleges / Budget Calculator
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>

                      {/* Action buttons under child */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button 
                          type="button"
                          onClick={() => handleAddGoalToChild(i)}
                          className="neu-btn-flat-inactive text-xs font-bold px-4 py-2.5 rounded-2xl hover:text-[#F0883E] transition-all cursor-pointer"
                        >
                          + Add Another Goal
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* CTA to add more child forms at the end of the list */}
            {childrenCount >= 4 && (
              <div className="pt-2 pb-6 flex justify-start animate-fade-in select-none">
                <button
                  type="button"
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="neu-btn-flat-active px-5 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:shadow-md hover:translate-y-[-1px] active:translate-y-0 transition-all cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  + Add Another Child
                </button>
              </div>
            )}

            {/* Navigation Actions */}
            <StepNavigation
              onBack={prevStep}
              onNext={handleNext}
              isDisabled={false}
              isLoading={isSubmitting}
            />

          </div>

          {/* Right Column: Protective hand family illustration */}
          <div className="w-full self-stretch flex items-start justify-center pt-8">
            <div className="md:sticky md:top-32 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-md">
              <img 
                src="/assets/family_neu.png" 
                alt="3D Protective hand family illustration"
                className="w-full h-auto object-contain animate-float"
              />
            </div>
          </div>

        </div>
      </div>

      <EducationPlanModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        child={childrenData[selectedChildIndex]?.goals?.[selectedGoalIndex]}
        onSave={(data) => {
          const child = childrenData[selectedChildIndex];
          const goalsList = child?.goals && Array.isArray(child.goals) ? child.goals : [
            { id: Date.now() + Math.random(), goalType: child?.goalType || '', targetYear: child?.targetYear || '', todaysCost: child?.todaysCost || '' }
          ];
          const updatedGoals = goalsList.map((g, gIdx) => {
            if (gIdx === selectedGoalIndex) {
              return { ...g, ...data };
            }
            return g;
          });
          updateChild(selectedChildIndex, { goals: updatedGoals });
          setIsEducationModalOpen(false);
        }}
      />
    </div>
  );
}