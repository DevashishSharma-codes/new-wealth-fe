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

  const [touched, setTouched] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const errors = validateStep3Fields(childrenData, childrenCount);
  const isValid = Object.keys(errors).length === 0;

  const openEducationModal = (index) => {
    setSelectedChildIndex(index);
    setIsEducationModalOpen(true);
  };

  const handleChildInputChange = (index, field, value) => {
    updateChild(index, { [field]: value });
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
                  const isSelected = childrenCount === parsedNum;
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
            </div>

            {/* Dynamic Child Details Forms */}
            <div className="space-y-6 pt-2">
              {Array.from({ length: childrenCount }).map((_, i) => {
                const child = childrenData[i] || { name: '', occupation: '', dependent: 'Yes', dob: '', age: '', goalType: '', targetYear: '', todaysCost: '' };
                return (
                  <div key={i} className="space-y-6 border-b border-[#EFE9DF] pb-8 last:border-b-0 last:pb-0 pt-4">
                    
                    {/* CHILD X INFORMATION HEADER */}
                    <div className="flex items-center text-[#F0883E] font-bold text-xs uppercase tracking-wider border-l-2 border-[#F0883E] pl-2 select-none">
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

                    {/* CHILD X GOALS HEADER */}
                    <div className="flex items-center text-[#F0883E] font-bold text-xs uppercase tracking-wider border-l-2 border-[#F0883E] pl-2 select-none mt-2">
                      CHILD {i + 1} GOALS
                    </div>

                    {/* Goal Type */}
                    <div className="space-y-1.5 w-full">
                      <label className="block text-[13px] font-bold text-[#2B2A28] tracking-wide select-none">
                        Goal Type<span className="text-[#F0883E] font-bold ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={child.goalType}
                          onChange={(e) => handleChildInputChange(i, 'goalType', e.target.value)}
                          onBlur={() => handleBlur(i, 'goalType')}
                          className={`${
                            child.goalType ? 'neu-field-filled' : 'neu-field'
                          } w-full px-5 py-4 pr-10 text-base font-semibold rounded-2xl outline-none transition-all duration-200 appearance-none cursor-pointer ${
                            (touched[`${i}-goalType`] || showAllErrors) && errors[i]?.goalType ? 'border-red-400' : ''
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
                      {(touched[`${i}-goalType`] || showAllErrors) && errors[i]?.goalType && (
                        <span className="text-xs text-red-500 font-medium block mt-1">{errors[i].goalType}</span>
                      )}
                    </div>

                    {/* Target Year & Today's Cost Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormField
                        label="Target Year"
                        name={`childTargetYear-${i}`}
                        value={child.targetYear}
                        onChange={(e) => handleChildInputChange(i, 'targetYear', e.target.value)}
                        onBlur={() => handleBlur(i, 'targetYear')}
                        error={(touched[`${i}-targetYear`] || showAllErrors) ? errors[i]?.targetYear : null}
                        placeholder="Enter target year"
                        type="number"
                        required={true}
                      />
                      <FormField
                        label="Today's Cost"
                        name={`childTodaysCost-${i}`}
                        value={child.todaysCost}
                        onChange={(e) => handleChildInputChange(i, 'todaysCost', e.target.value)}
                        onBlur={() => handleBlur(i, 'todaysCost')}
                        error={(touched[`${i}-todaysCost`] || showAllErrors) ? errors[i]?.todaysCost : null}
                        placeholder="Enter today's cost"
                        type="number"
                        required={true}
                      />
                    </div>

                    {/* Action buttons under child */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button 
                        type="button"
                        onClick={() => alert(`Add Another Goal feature details.`)}
                        className="neu-btn-flat-inactive text-xs font-bold px-4 py-2.5 rounded-2xl hover:text-[#F0883E] transition-all cursor-pointer"
                      >
                        + Add Another
                      </button>
                      
                      <a 
                        href="#education-plan"
                        onClick={(e) => { e.preventDefault(); openEducationModal(i); }}
                        className="text-[#F0883E] text-xs font-bold hover:underline inline-flex items-center gap-1.5 transition-all select-none"
                      >
                        Plan for Your Child {i + 1} Education
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

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
        child={childrenData[selectedChildIndex]}
        onSave={(data) => {
          updateChild(selectedChildIndex, data);
          setIsEducationModalOpen(false);
        }}
      />
    </div>
  );
}