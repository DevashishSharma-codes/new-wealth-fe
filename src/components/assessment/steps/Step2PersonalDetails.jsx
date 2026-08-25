import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep2Fields } from '../../../hooks/useFormValidation';
import { StepNavigation } from '../../ui/StepNavigation';
import { FormField } from '../../ui/FormField';
import { NeumorphicDatePicker } from '../../ui/NeumorphicDatePicker';

export function Step2PersonalDetails() {
  const {
    formData,
    updateFormData,
    submitStep2,
    prevStep,
    isSubmitting
  } = useAssessment();

  const [touched, setTouched] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const errors = validateStep2Fields(formData);
  const isValid = Object.keys(errors).length === 0;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleNext = () => {
    setShowAllErrors(true);
    if (isValid) {
      submitStep2();
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col text-white">
      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 lg:gap-14 items-start flex-1">

          {/* Left Column: Form Fields in Glassmorphic Card */}
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
                Personal Details
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed max-w-lg font-light text-slate-300">
                Help us understand your personal and professional background so we can create a retirement strategy tailored to your future goals.
              </p>
            </div>

            {/* Form Areas */}
            <div className="space-y-6 relative z-10">

              {/* CLIENT INFORMATION SECTION */}
              <div className="space-y-4">
                <div className="flex items-center text-sky-300 font-medium text-xs uppercase tracking-wider border-l-2 border-sky-400 pl-2 mb-2 select-none">
                  Client Information
                </div>

                {/* Full Name */}
                <FormField
                  label="Your Full Name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={(touched.name || showAllErrors) ? errors.name : null}
                  placeholder="Enter your full name"
                  required={true}
                />

                {/* Occupation & Designation Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    label="Your Occupation"
                    name="occupation"
                    value={formData.occupation || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.occupation || showAllErrors) ? errors.occupation : null}
                    placeholder="Enter your occupation"
                    required={true}
                  />
                  <FormField
                    label="Your Designation"
                    name="designation"
                    value={formData.designation || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.designation || showAllErrors) ? errors.designation : null}
                    placeholder="Enter your designation"
                    required={true}
                  />
                </div>

                {/* Company Name & DOB Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    label="Your Company Name"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.companyName || showAllErrors) ? errors.companyName : null}
                    placeholder="Enter your company name"
                    required={true}
                  />
                  <NeumorphicDatePicker
                    label="Your Date Of Birth"
                    name="dob"
                    value={formData.dob || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.dob || showAllErrors) ? errors.dob : null}
                    required={true}
                  />
                </div>

                {/* Monthly Expenses */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <FormField
                    label="Monthly Household Expense P.M. (Per Month)"
                    name="monthlyExpense"
                    value={formData.monthlyExpense || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.monthlyExpense || showAllErrors) ? errors.monthlyExpense : null}
                    placeholder="Enter your monthly expense (P.M.)"
                    type="number"
                    required={true}
                  />
                </div>

              </div>

              {/* SPOUSE INFORMATION SECTION */}
              <div className="space-y-4">
                <div className="flex items-center text-sky-300 font-medium text-xs uppercase tracking-wider border-l-2 border-sky-400 pl-2 mb-2 select-none">
                  Spouse Information (Optional)
                </div>

                {/* Spouse Name */}
                <FormField
                  label="Spouse Name"
                  name="spouseName"
                  value={formData.spouseName || ''}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={(touched.spouseName || showAllErrors) ? errors.spouseName : null}
                  placeholder="Enter spouse's full name"
                  required={false}
                />

                {/* Spouse Occupation & Designation Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    label="Spouse Occupation"
                    name="spouseOccupation"
                    value={formData.spouseOccupation || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseOccupation || showAllErrors) ? errors.spouseOccupation : null}
                    placeholder="Enter spouse's occupation"
                    required={false}
                  />
                  <FormField
                    label="Spouse Designation"
                    name="spouseDesignation"
                    value={formData.spouseDesignation || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseDesignation || showAllErrors) ? errors.spouseDesignation : null}
                    placeholder="Enter spouse's designation"
                    required={false}
                  />
                </div>

                {/* Spouse Company & DOB Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    label="Spouse Company Name"
                    name="spouseCompanyName"
                    value={formData.spouseCompanyName || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseCompanyName || showAllErrors) ? errors.spouseCompanyName : null}
                    placeholder="Enter spouse's company name"
                    required={false}
                  />
                  <NeumorphicDatePicker
                    label="Spouse Date Of Birth"
                    name="spouseDob"
                    value={formData.spouseDob || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseDob || showAllErrors) ? errors.spouseDob : null}
                    required={false}
                  />
                </div>

              </div>

            </div>

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

          {/* Right Column: 3D ID Card Illustration with Ambient Glow */}
          <div className="w-full self-stretch flex items-start justify-center pt-8 overflow-hidden pointer-events-none">
            <div className="md:sticky md:top-32 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative">
              <div className="absolute inset-2 bg-blue-500/15 blur-2xl rounded-full pointer-events-none" />
              <img
                src="/assets/id_card_neu.png"
                alt="3D Personal details card illustration"
                className="w-full h-auto object-contain animate-float relative z-10 brightness-105"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
