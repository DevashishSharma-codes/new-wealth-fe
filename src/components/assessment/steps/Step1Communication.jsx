import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep1Fields } from '../../../hooks/useFormValidation';
import { StepNavigation } from '../../ui/StepNavigation';
import { FormField } from '../../ui/FormField';

export function Step1Communication() {
  const {
    formData,
    updateFormData,
    submitStep1,
    isSubmitting
  } = useAssessment();

  const [touched, setTouched] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const errors = validateStep1Fields(formData);
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
      submitStep1();
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col text-white">
      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-14 items-center flex-1">

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
                Communication Details
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed max-w-lg font-light text-slate-300">
                Provide your contact information so we can securely reach you and save your assessment details.
              </p>
            </div>

            {/* Form Areas */}
            <div className="space-y-6 relative z-10">

              {/* CONTACT INFORMATION SECTION */}
              <div className="space-y-4">
                <div className="flex items-center text-sky-300 font-medium text-xs uppercase tracking-wider border-l-2 border-sky-400 pl-2 mb-2 select-none">
                  Contact Information
                </div>

                {/* Mobile & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.mobile || showAllErrors) ? errors.mobile : null}
                    placeholder="Enter your mobile number"
                    required={true}
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.email || showAllErrors) ? errors.email : null}
                    placeholder="Enter your email address"
                    type="email"
                    required={true}
                  />
                </div>

                {/* Address */}
                <FormField
                  label="Residential Address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  error={(touched.address || showAllErrors) ? errors.address : null}
                  placeholder="Enter your residential address"
                  required={true}
                />
              </div>

              {/* SPOUSE CONTACT INFORMATION SECTION */}
              <div className="space-y-4">
                <div className="flex items-center text-sky-300 font-medium text-xs uppercase tracking-wider border-l-2 border-sky-400 pl-2 mb-2 select-none">
                  Spouse Contact Information (Optional)
                </div>

                {/* Spouse Mobile & Spouse Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Spouse Mobile Number"
                    name="spouseMobile"
                    value={formData.spouseMobile || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseMobile || showAllErrors) ? errors.spouseMobile : null}
                    placeholder="Enter spouse's mobile number"
                    required={false}
                  />
                  <FormField
                    label="Spouse Email Address"
                    name="spouseEmail"
                    value={formData.spouseEmail || ''}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={(touched.spouseEmail || showAllErrors) ? errors.spouseEmail : null}
                    placeholder="Enter spouse's email address"
                    type="email"
                    required={false}
                  />
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={!!formData.consent}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-lg transition-all neu-checkbox flex items-center justify-center ${
                        formData.consent ? 'bg-sky-500 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'bg-white/10 border-white/20'
                      }`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 text-white transition-opacity ${formData.consent ? 'opacity-100' : 'opacity-0'}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs font-light text-slate-300 leading-tight">
                    I consent to share the communication details and allow contact to save this assessment.
                  </span>
                </label>
                {(touched.consent || showAllErrors) && errors.consent && (
                  <span className="text-xs text-rose-400 font-medium block mt-1.5 ml-8">{errors.consent}</span>
                )}
              </div>

            </div>

            {/* Navigation Actions */}
            <div className="relative z-10">
              <StepNavigation
                onNext={handleNext}
                isDisabled={false}
                isLoading={isSubmitting}
              />
            </div>

          </div>

          {/* Right Column: 3D Illustration with Ambient Glow */}
          <div className="flex items-center justify-center w-full overflow-hidden pointer-events-none">
            <div className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative">
              <div className="absolute inset-2 bg-sky-500/15 blur-2xl rounded-full pointer-events-none" />
              <img
                src="/assets/chat_bubbles_neu.png"
                alt="3D Chat bubbles illustration"
                className="w-full h-auto object-contain animate-float relative z-10 brightness-105"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}