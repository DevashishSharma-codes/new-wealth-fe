import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep4 } from '../../../hooks/useFormValidation';
import { StepNavigation } from '../../ui/StepNavigation';
import { GoalIcon } from '../../ui/GoalIcon';
import { TripPlanModal } from '../modals/TripPlanModal';

/* ------------------------------------------------------------------
   Neumorphic design tokens — identical to Step1Communication
   Light source: top-left.
   Raised  -> shadow bottom-right (dark) + highlight top-left (light)
   Inset   -> inner shadow top-left (dark) + inner highlight bottom-right (light)
------------------------------------------------------------------ */
const SURFACE = '#F4F1EA';
const FIELD_BG = '#F1EDE6';
const FIELD_BORDER = '#EFE9DF';
const SHADOW_DARK = '#D9D4C7';
const SHADOW_LIGHT = '#FFFFFF';
const TEXT_DARK = '#2B2A28';
const TEXT_MUTED = '#8A8578';
const PLACEHOLDER = '#A8A094';
const ORANGE = '#F0883E';
const ORANGE_DARK = '#E07A2E';
const ORANGE_GLOW = 'rgba(240,136,62,0.45)';
const ORANGE_BORDER = 'rgba(240,136,62,0.4)';

/* Shadow helpers */
const neuRaised = `6px 6px 14px ${SHADOW_DARK}, -4px -4px 10px ${SHADOW_LIGHT}`;
const neuRaisedSoft = `4px 4px 10px ${SHADOW_DARK}, -4px -4px 10px ${SHADOW_LIGHT}`;
const neuInsetBase = `inset 5px 5px 6px rgba(221,212,199,0.75), inset -5px -5px 6px rgba(255,255,255,1)`;
const neuInsetSoft = `inset 3px 3px 5px rgba(221,212,199,0.75), inset -3px -3px 5px rgba(255,255,255,1)`;

const inputBase =
  'neu-field w-full px-5 py-4 text-base font-medium rounded-2xl outline-none transition-all duration-150';

export function Step4LifestyleGoals() {
  const {
    activeGoals,
    addGoal,
    removeGoal,
    updateGoal,
    childrenCount,
    submitStep4,
    prevStep,
    isSubmitting,
  } = useAssessment();

  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const goalCategories = [
    'Home Purchase',
    'Car Purchase',
    'Home Renovation',
    'Holiday Home',
    'Foreign Tour',
    'Family Gifting',
    'Charity',
    'Child Birth Expenses',
    'Big Purchases',
    'Estate For Children',
  ];

  const handleGoalInputChange = (id, field, value) => {
    updateGoal(id, { [field]: value });
  };

  const openTripModal = (goalId) => {
    setSelectedGoalId(goalId);
    setIsTripModalOpen(true);
  };

  const isValid = validateStep4(activeGoals);

  return (
    <div
      className="w-full flex-1 flex flex-col s4-root"
      style={{ color: TEXT_DARK }}
    >
      <style>{`
        /* ── Inactive goal row (Figma Inset Pill) ── */
        .s4-root .s4-inactive-pill {
          background: #F5F3ED !important;
          border: 1px solid transparent !important; 
          box-shadow: inset -3px -3px 8px rgba(255, 255, 255, 0.9), 
                      inset 2px 2px 8px #D5D0C5 !important;
          border-radius: 16px !important;
          color: ${TEXT_DARK} !important;
        }
        
        .s4-root .s4-inactive-pill:hover {
          /* Matches the .neu-field input hover exactly and removes orange outline */
          border-color: transparent !important;
          box-shadow: inset 4px 4px 6px 2px rgba(240, 136, 62, 0.45), 
                      inset -4px -4px 6px rgba(255, 255, 255, 1) !important; 
        }
        
        .s4-root .s4-inactive-pill:active {
          /* Deeper inset effect on click */
          box-shadow: inset -4px -4px 10px rgba(255, 255, 255, 1), 
                      inset 4px 4px 10px #D5D0C5 !important; 
        }

        /* ── Expanded goal card (raised surface) ── */
        .s4-root .s4-card {
          background: ${FIELD_BG} !important;
          border: 1px solid ${FIELD_BORDER} !important;
          box-shadow: ${neuRaised} !important;
        }

        /* ── Close (×) button ── */
        .s4-root .s4-close-btn {
          background: ${FIELD_BG} !important;
          border: 1px solid ${FIELD_BORDER} !important;
          box-shadow: 3px 3px 5px ${SHADOW_DARK}, -3px -3px 5px ${SHADOW_LIGHT} !important;
          color: ${TEXT_MUTED} !important;
          transition: all 0.15s ease;
        }
        .s4-root .s4-close-btn:hover {
          box-shadow: 4px 4px 8px ${SHADOW_DARK}, -3px -3px 6px ${SHADOW_LIGHT},
                      0 0 10px ${ORANGE_GLOW} !important;
          color: ${ORANGE} !important;
          border-color: ${ORANGE_BORDER} !important;
        }

        /* ── "Plan Your Trip" & "Add another" & "Add Other" secondary buttons ── */
        .s4-root .s4-secondary-btn {
          background: ${FIELD_BG} !important;
          border: 1px solid ${FIELD_BORDER} !important;
          box-shadow: 3px 3px 8px ${SHADOW_DARK}, -3px -3px 6px ${SHADOW_LIGHT} !important;
          color: ${TEXT_DARK} !important;
          transition: all 0.15s ease;
        }
        .s4-root .s4-secondary-btn:hover {
          color: ${ORANGE} !important;
          border-color: ${ORANGE_BORDER} !important;
          box-shadow: 4px 4px 10px ${SHADOW_DARK}, -3px -3px 8px ${SHADOW_LIGHT},
                      0 0 12px ${ORANGE_GLOW} !important;
        }
        .s4-root .s4-secondary-btn:active {
          box-shadow: ${neuInsetSoft} !important;
        }

        /* ── Card header divider ── */
        .s4-root .s4-card-header {
          border-bottom: 1px solid ${FIELD_BORDER};
        }

        /* ── Back button ── */
        .s4-root .s4-back-btn {
          color: ${TEXT_DARK} !important;
        }

        /* ── Continue button (active) ── */
        .s4-root .s4-continue-active {
          background: linear-gradient(145deg, ${ORANGE}, ${ORANGE_DARK}) !important;
          box-shadow: 6px 6px 14px ${SHADOW_DARK}, -4px -4px 10px ${SHADOW_LIGHT},
                      0 0 22px ${ORANGE_GLOW} !important;
          color: #FFFFFF !important;
        }

        /* ── Continue button (disabled) ── */
        .s4-root .s4-continue-disabled {
          background: #E7E3D9 !important;
          box-shadow: 4px 4px 10px ${SHADOW_DARK}, -4px -4px 10px ${SHADOW_LIGHT} !important;
          color: #B6B1A4 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 md:gap-12 lg:gap-16 items-start flex-1">

          {/* ── Left Column: List of Goals ── */}
          <div className="space-y-7 w-full">

            <div className="space-y-2">
              <h1
                className="font-heading text-[26px] sm:text-[32px] lg:text-[34px] font-extrabold leading-tight"
                style={{ color: TEXT_DARK }}
              >
                Lifestyle Goals
              </h1>
              <p className="text-sm leading-relaxed max-w-lg font-normal" style={{ color: TEXT_MUTED }}>
                Help us understand your lifestyle aspirations and future priorities so we can create a
                retirement plan that supports the life you envision.
              </p>
            </div>

            {/* ── Accordion List ── */}
            <div className="space-y-4 pt-2">
              {goalCategories.map((catName) => {
                const categoryInstances = activeGoals.filter((g) => g.type === catName);

                /* ── INACTIVE row (raised neumorphic pill) ── */
                if (categoryInstances.length === 0) {
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => addGoal(catName)}
                      className="s4-inactive-pill w-full flex items-center justify-between rounded-2xl px-5 py-4 text-xs sm:text-sm font-bold text-left cursor-pointer transition-all duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <GoalIcon type={catName} />
                        <span style={{ color: TEXT_DARK }}>{catName}</span>
                      </div>
                      <span style={{ color: ORANGE }} className="text-lg font-bold leading-none">+</span>
                    </button>
                  );
                }

                /* ── ACTIVE: expanded card(s) ── */
                return (
                  <div key={catName} className="space-y-4">
                    {categoryInstances.map((goal, idx) => (
                      <div
                        key={goal.id}
                        className="s4-card w-full rounded-[2rem] p-5 sm:p-6 relative space-y-5"
                      >
                        {/* Card header */}
                        <div className="s4-card-header flex items-center justify-between pb-3.5">
                          <div
                            className="flex items-center gap-3 font-bold text-sm sm:text-base"
                            style={{ color: TEXT_DARK }}
                          >
                            <GoalIcon type={catName} />
                            <span>
                              {catName}
                              {categoryInstances.length > 1 ? ` #${idx + 1}` : ''}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeGoal(goal.id)}
                            className="s4-close-btn w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold select-none outline-none cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>

                        {/* Input grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label
                              className="block text-[13px] font-bold tracking-wide select-none"
                              style={{ color: TEXT_DARK }}
                            >
                              Target Year
                              <span style={{ color: ORANGE }} className="font-bold ml-0.5">*</span>
                            </label>
                            <input
                              type="number"
                              value={goal.targetYear}
                              onChange={(e) =>
                                handleGoalInputChange(goal.id, 'targetYear', e.target.value)
                              }
                              placeholder="Enter target year"
                              className={`${
                                goal.targetYear !== undefined && goal.targetYear !== null && goal.targetYear.toString().length > 0
                                  ? 'neu-field-filled'
                                  : 'neu-field'
                              } w-full px-5 py-4 text-base font-medium rounded-2xl outline-none transition-all duration-200`}
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label
                              className="block text-[13px] font-bold tracking-wide select-none"
                              style={{ color: TEXT_DARK }}
                            >
                              Today's Cost
                              <span style={{ color: ORANGE }} className="font-bold ml-0.5">*</span>
                            </label>
                            <input
                              type="number"
                              value={goal.todaysCost}
                              onChange={(e) =>
                                handleGoalInputChange(goal.id, 'todaysCost', e.target.value)
                              }
                              placeholder="Enter today's cost"
                              className={`${
                                goal.todaysCost !== undefined && goal.todaysCost !== null && goal.todaysCost.toString().length > 0
                                  ? 'neu-field-filled'
                                  : 'neu-field'
                              } w-full px-5 py-4 text-base font-medium rounded-2xl outline-none transition-all duration-200`}
                            />
                          </div>
                        </div>

                        {/* Foreign Tour: "Plan Your Trip" link-button */}
                        {catName === 'Foreign Tour' && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                openTripModal(goal.id);
                              }}
                              className="s4-secondary-btn text-xs font-bold px-5 py-3 rounded-2xl cursor-pointer inline-flex items-center gap-1.5"
                            >
                              Plan Your Trip in Detail
                              <svg
                                className="w-3.5 h-3.5"
                                style={{ color: ORANGE }}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* "Add another" — Foreign Tour & Big Purchases only */}
                    {(catName === 'Foreign Tour' || catName === 'Big Purchases') && (
                      <div className="text-right pt-1">
                        <button
                          key={`add-another-${catName}`}
                          type="button"
                          onClick={() => addGoal(catName)}
                          className="s4-secondary-btn text-xs font-bold px-5 py-3 rounded-2xl cursor-pointer select-none"
                        >
                          + Add another {catName}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* "Add Other" button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => addGoal('Foreign Tour')}
                className="s4-secondary-btn text-xs font-bold px-6 py-3.5 rounded-2xl cursor-pointer"
              >
                + Add Other
              </button>
            </div>

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="s4-back-btn flex items-center gap-2 text-sm font-bold px-2 py-2 rounded-xl transition-transform active:scale-95"
              >
                <span aria-hidden="true">←</span> Back
              </button>

              <button
                type="button"
                onClick={submitStep4}
                disabled={!isValid || isSubmitting}
                className={`flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-2xl transition-all active:scale-95 ${isValid && !isSubmitting ? 's4-continue-active' : 's4-continue-disabled'
                  }`}
              >
                {isSubmitting ? 'Please wait…' : 'Continue'}{' '}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* ── Right Column: 3D Illustration ── */}
          <div className="w-full self-stretch flex items-start justify-center pt-8">
            <div className="md:sticky md:top-32 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-md">
              <img
                src="/src/target_neu.png"
                alt="3D Target goals illustration"
                className="w-full h-auto object-contain animate-float"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Trip Plan Modal ── */}
      <TripPlanModal
        isOpen={isTripModalOpen}
        onClose={() => setIsTripModalOpen(false)}
        goal={activeGoals.find((g) => g.id === selectedGoalId)}
        childrenCount={childrenCount}
        onSave={(data) => {
          updateGoal(selectedGoalId, data);
          setIsTripModalOpen(false);
        }}
      />
    </div>
  );
}