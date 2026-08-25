import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep3Fields } from '../../../hooks/useFormValidation';
import { StepNavigation } from '../../ui/StepNavigation';
import { FormField } from '../../ui/FormField';
import { NeumorphicDatePicker } from '../../ui/NeumorphicDatePicker';
import { EducationPlanModal } from '../modals/EducationPlanModal';
import { FloatingDropdownModal } from '../../ui/FloatingDropdownModal';

const CHILD_GOAL_TYPE_OPTIONS = [
  { label: 'Higher Studies', value: 'Higher Studies', subtext: 'University, degree & college funding', icon: '🎓' },
  { label: 'Marriage', value: 'Marriage', subtext: 'Wedding expenses & celebration fund', icon: '💍' },
  { label: 'Business Setup', value: 'Business Setup', subtext: 'Seed capital & startup funding for child', icon: '💼' },
  { label: 'Career Fund', value: 'Career Fund', subtext: 'Professional training, skills & certifications', icon: '🚀' },
  { label: 'Others', value: 'Others', subtext: 'Other long-term milestone goals', icon: '⭐' },
];

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

  const [activeGoalTypeTarget, setActiveGoalTypeTarget] = useState(null);

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
    <div className="w-full flex-1 flex flex-col text-white">
      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 lg:gap-14 items-start flex-1">
          
          {/* Left Column: Form Fields in Glassmorphic Container */}
          <div
            className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 backdrop-blur-2xl border border-sky-400/30 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.35)] space-y-7 w-full"
            style={{
              background: 'radial-gradient(100% 45% at 50% 0%, rgba(56, 189, 248, 0.22) 0%, transparent 100%), radial-gradient(100% 45% at 50% 100%, rgba(56, 189, 248, 0.28) 0%, transparent 100%), linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(11, 19, 43, 0.92) 50%, rgba(7, 12, 27, 0.96) 100%)'
            }}
          >
            {/* Subtle top rim light beam */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />

            <div className="space-y-1.5 relative z-10">
              <h1 className="font-heading text-2xl sm:text-3xl font-light leading-tight text-white tracking-tight">
                Family Details
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed max-w-lg font-light text-slate-300">
                Help us understand your family structure and financial responsibilities so we can build a retirement strategy that protects your family.
              </p>
            </div>

            {/* Number of Children selector */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/15 space-y-4 relative z-10">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-slate-200 tracking-wide select-none">
                  Number of Children <span className="text-slate-400 font-light text-xs ml-1">(optional)</span>
                </label>
                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  Select the number of dependent children to plan for their education, marriage, and other key milestones.
                </p>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full">
                {[0, 1, 2, 3, '4+'].map((num) => {
                  const parsedNum = num === '4+' ? 4 : num;
                  const isSelected = num === '4+' ? childrenCount >= 4 : childrenCount === parsedNum;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setChildrenCount(parsedNum)}
                      className={`flex-1 min-w-[55px] h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        isSelected 
                          ? 'bg-sky-500 text-white font-bold shadow-[0_2px_10px_rgba(56,189,248,0.4)] border border-white/60 scale-[0.98]' 
                          : 'bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Show controls to add more children if childrenCount is 4 or more */}
              {childrenCount >= 4 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-300 uppercase tracking-wider select-none">
                      Total Children
                    </span>
                    <span className="flex items-center justify-center bg-sky-500 w-7 h-7 rounded-full font-bold text-xs text-white shadow-sm">
                      {childrenCount}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
                    >
                      + Add More
                    </button>
                    <button
                      type="button"
                      onClick={() => childrenCount > 4 && setChildrenCount(childrenCount - 1)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-rose-500/30 border border-white/20 text-rose-300 flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      disabled={childrenCount <= 4}
                    >
                      - Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Child Details Forms */}
            <div className="space-y-6 relative z-10">
              {Array.from({ length: childrenCount }).map((_, i) => {
                const child = childrenData[i] || { name: '', occupation: '', dependent: 'Yes', dob: '', age: '', goalType: '', targetYear: '', todaysCost: '', goals: [{ id: 'g-' + i, goalType: '', targetYear: '', todaysCost: '' }] };
                const goalsList = child.goals && Array.isArray(child.goals) ? child.goals : [
                  { id: Date.now() + Math.random(), goalType: child.goalType || '', targetYear: child.targetYear || '', todaysCost: child.todaysCost || '' }
                ];
                return (
                  <div key={i} className="space-y-6 border-b border-white/15 pb-6 last:border-b-0 last:pb-0 pt-2">
                    
                    {/* CHILD X INFORMATION CONTAINER */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.06] border border-white/15 space-y-5">
                      
                      {/* CHILD X INFORMATION HEADER */}
                      <div className="text-sky-300 font-medium text-xs uppercase tracking-wider select-none border-l-2 border-sky-400 pl-2">
                        Child {i + 1} Information
                      </div>

                      {/* Full Name */}
                      <FormField
                        label="Full Name"
                        name={`childName-${i}`}
                        value={child.name || ''}
                        onChange={(e) => handleChildInputChange(i, 'name', e.target.value)}
                        onBlur={() => handleBlur(i, 'name')}
                        error={(touched[`${i}-name`] || showAllErrors) ? errors[i]?.name : null}
                        placeholder="Enter child's full name"
                        required={true}
                      />

                      {/* Dependent & DOB Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2 w-full">
                          <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                            Financially Dependent?<span className="text-amber-400 font-bold ml-1">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {['Yes', 'No'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleChildInputChange(i, 'dependent', opt)}
                                className={`py-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                  child.dependent === opt
                                    ? 'bg-sky-500 text-white font-bold shadow-[0_2px_8px_rgba(56,189,248,0.35)] border border-white/50'
                                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
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
                          value={child.dob || ''}
                          onChange={(e) => handleChildInputChange(i, 'dob', e.target.value)}
                          onBlur={() => handleBlur(i, 'dob')}
                          error={(touched[`${i}-dob`] || showAllErrors) ? errors[i]?.dob : null}
                          required={true}
                        />
                      </div>

                      {/* Calculated Age */}
                      <div className="space-y-2 w-full">
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                          Calculated Age<span className="text-amber-400 font-bold ml-1">*</span>
                        </label>
                        <input 
                          type="text"
                          value={child.age || ''}
                          readOnly
                          placeholder="Calculated age automatically"
                          className="neu-field w-full px-5 py-3.5 text-sm font-normal rounded-2xl outline-none text-slate-300 cursor-not-allowed"
                        />
                      </div>

                    </div>

                    {/* CHILD X GOALS CONTAINER */}
                    <div className="relative pl-4 sm:pl-6 space-y-4 border-l-2 border-sky-400/40">
                      
                      {/* CHILD X GOALS HEADER */}
                      <div className="text-sky-300 font-medium text-xs uppercase tracking-wider select-none">
                        Child {i + 1} Life Goals
                      </div>

                      {/* Dynamic Goal Sections */}
                      <div className="space-y-4">
                        {goalsList.map((g, gIdx) => {
                          const hasGoalTypeErr = errors[i]?.goals?.[gIdx]?.goalType;
                          const hasTargetYearErr = errors[i]?.goals?.[gIdx]?.targetYear;
                          const hasTodaysCostErr = errors[i]?.goals?.[gIdx]?.todaysCost;

                          return (
                            <div key={gIdx} className="space-y-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 relative">
                              {goalsList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGoalFromChild(i, gIdx)}
                                  className="absolute top-3 right-4 text-rose-400 hover:text-rose-300 text-xs font-medium transition-all cursor-pointer"
                                >
                                  Remove Goal
                                </button>
                              )}

                              <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider select-none">
                                Goal #{gIdx + 1}
                              </div>

                              {/* Goal Type */}
                              <div className="space-y-2 w-full">
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                  Goal Type<span className="text-amber-400 font-bold ml-1">*</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => setActiveGoalTypeTarget({ childIndex: i, goalIndex: gIdx })}
                                  className={`${
                                    g.goalType ? 'neu-field-filled' : 'neu-field'
                                  } w-full px-5 py-3.5 pr-10 text-sm font-normal rounded-2xl outline-none text-left flex justify-between items-center cursor-pointer hover:border-sky-400/50 ${
                                    (touched[`${i}-goals-${gIdx}-goalType`] || showAllErrors) && hasGoalTypeErr ? 'border-rose-400' : ''
                                  }`}
                                >
                                  <span className={g.goalType ? 'text-white' : 'text-slate-400'}>{g.goalType || 'Select an option'}</span>
                                  <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                <FloatingDropdownModal
                                  isOpen={activeGoalTypeTarget?.childIndex === i && activeGoalTypeTarget?.goalIndex === gIdx}
                                  onClose={() => setActiveGoalTypeTarget(null)}
                                  title="Select Child Goal Type"
                                  subtitle="Choose milestone financial goal for your child"
                                  placeholder="Search goal type..."
                                  selectedValue={g.goalType}
                                  onSelect={(opt) => {
                                    handleChildGoalChange(i, gIdx, 'goalType', opt.value);
                                    handleBlur(i, `goals-${gIdx}-goalType`);
                                  }}
                                  options={CHILD_GOAL_TYPE_OPTIONS}
                                />
                                {(touched[`${i}-goals-${gIdx}-goalType`] || showAllErrors) && hasGoalTypeErr && (
                                  <span className="text-xs text-rose-400 font-medium block mt-1">{hasGoalTypeErr}</span>
                                )}
                              </div>

                              {/* Target Year & Today's Cost Row */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <FormField
                                  label="Target Year"
                                  name={`childTargetYear-${i}-${gIdx}`}
                                  value={g.targetYear || ''}
                                  onChange={(e) => handleChildGoalChange(i, gIdx, 'targetYear', e.target.value)}
                                  onBlur={() => handleBlur(i, `goals-${gIdx}-targetYear`)}
                                  error={(touched[`${i}-goals-${gIdx}-targetYear`] || showAllErrors) ? hasTargetYearErr : null}
                                  placeholder="Enter target year"
                                  type="number"
                                  required={true}
                                />
                                <FormField
                                  label={g.goalType?.toLowerCase().includes('education') || g.goalType?.toLowerCase().includes('graduation') || g.goalType?.toLowerCase().includes('studies') || g.goalType === 'Higher Education' || g.goalType === 'Higher Studies' ? "Approx. Today's Cost" : "Today's Cost"}
                                  name={`childTodaysCost-${i}-${gIdx}`}
                                  value={g.todaysCost || ''}
                                  onChange={(e) => handleChildGoalChange(i, gIdx, 'todaysCost', e.target.value)}
                                  onBlur={() => handleBlur(i, `goals-${gIdx}-todaysCost`)}
                                  error={(touched[`${i}-goals-${gIdx}-todaysCost`] || showAllErrors) ? hasTodaysCostErr : null}
                                  placeholder="Enter today's cost (approx.)"
                                  type="number"
                                  required={true}
                                />
                              </div>

                              {/* Education Planner Tool link */}
                              {(g.goalType === 'Higher Education' || g.goalType === 'Higher Studies') && (
                                <div className="pt-1">
                                  <a 
                                    href="#education-plan"
                                    onClick={(e) => { e.preventDefault(); openEducationModal(i, gIdx); }}
                                    className="text-sky-400 hover:text-sky-300 text-xs font-medium hover:underline inline-flex items-center gap-1.5 transition-all select-none"
                                  >
                                    <span>Plan with Dream Colleges / Budget Calculator</span>
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
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <button 
                          type="button"
                          onClick={() => handleAddGoalToChild(i)}
                          className="px-4 py-2 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-sky-300 hover:text-white transition-all cursor-pointer"
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
              <div className="pt-2 pb-4 flex justify-start animate-fade-in select-none relative z-10">
                <button
                  type="button"
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="px-5 py-3 rounded-full text-xs font-medium bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ Add Another Child</span>
                </button>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="relative z-10">
              <StepNavigation
                onBack={prevStep}
                onNext={handleNext}
                isDisabled={false}
                isLoading={isSubmitting}
              />
            </div>

          </div>

          {/* Right Column: Protective hand family illustration with Ambient Glow */}
          <div className="w-full self-stretch flex items-start justify-center pt-8 overflow-hidden pointer-events-none">
            <div className="md:sticky md:top-32 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative">
              <div className="absolute inset-2 bg-sky-500/15 blur-2xl rounded-full pointer-events-none" />
              <img 
                src="/assets/family_neu.png" 
                alt="3D Protective hand family illustration"
                className="w-full h-auto object-contain animate-float relative z-10 brightness-105"
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