import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { validateStep4Fields } from '../../../hooks/useFormValidation';
import { GoalIcon } from '../../ui/GoalIcon';
import { TripPlanModal } from '../modals/TripPlanModal';
import { CustomGoalModal } from '../modals/CustomGoalModal';
import { StepNavigation } from '../../ui/StepNavigation';

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
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const [touched, setTouched] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  const errors = validateStep4Fields(activeGoals);
  const isValid = Object.keys(errors).length === 0;

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

  const customGoals = activeGoals.filter(
    (g) => g.type === 'Other' || g.type === 'Others' || (!goalCategories.includes(g.type) && g.type)
  );

  const handleGoalInputChange = (id, field, value) => {
    updateGoal(id, { [field]: value });
  };

  const handleBlur = (goalId, fieldName) => {
    setTouched(prev => ({ ...prev, [`${goalId}-${fieldName}`]: true }));
  };

  const handleNext = () => {
    setShowAllErrors(true);
    if (isValid) {
      submitStep4();
    }
  };

  const openTripModal = (goalId) => {
    setSelectedGoalId(goalId);
    setIsTripModalOpen(true);
  };

  return (
    <div className="w-full flex-1 flex flex-col text-white">
      <div className="w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 lg:gap-14 items-start flex-1">

          {/* ── Left Column: Form Fields in Glassmorphic Card ── */}
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
                Lifestyle Goals
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed max-w-lg font-light text-slate-300">
                Help us understand your lifestyle aspirations and future priorities so we can create a
                retirement plan that supports the life you envision.
              </p>
            </div>

            {/* ── Goal Categories List ── */}
            <div className="space-y-3.5 pt-1 relative z-10">
              {goalCategories.map((catName) => {
                const categoryInstances = activeGoals.filter((g) => g.type === catName);

                /* ── INACTIVE row ── */
                if (categoryInstances.length === 0) {
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => addGoal(catName)}
                      className="w-full flex items-center justify-between rounded-2xl px-5 py-3.5 text-xs sm:text-sm font-medium text-left cursor-pointer transition-all duration-200 bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-sky-400/40 text-slate-200 hover:text-white shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <GoalIcon type={catName} />
                        <span>{catName}</span>
                      </div>
                      <span className="text-sky-400 text-lg font-bold leading-none">+</span>
                    </button>
                  );
                }

                /* ── ACTIVE: expanded card(s) ── */
                return (
                  <div key={catName} className="space-y-4">
                    {categoryInstances.map((goal, idx) => (
                      <div
                        key={goal.id}
                        className="w-full rounded-2xl p-5 sm:p-6 relative space-y-4 bg-white/[0.08] border border-sky-400/30 shadow-sm"
                      >
                        {/* Card header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3 font-medium text-sm sm:text-base text-white">
                            <GoalIcon type={catName} />
                            <span>
                              {catName}
                              {categoryInstances.length > 1 ? ` #${idx + 1}` : ''}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeGoal(goal.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold bg-white/10 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 border border-white/15 transition-colors cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>

                        {/* Input grid */}
                        {catName === 'Foreign Tour' ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {/* Target Year */}
                              <div className="space-y-2">
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                  Target Year
                                </label>
                                <input
                                  type="number"
                                  value={goal.targetYear || ''}
                                  onChange={(e) => handleGoalInputChange(goal.id, 'targetYear', e.target.value)}
                                  onBlur={() => handleBlur(goal.id, 'targetYear')}
                                  placeholder="Enter target year"
                                  className={`${
                                    goal.targetYear !== undefined && goal.targetYear !== null && goal.targetYear.toString().length > 0
                                      ? 'neu-field-filled'
                                      : 'neu-field'
                                  } w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                                    (touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear ? 'border-rose-400' : ''
                                  }`}
                                />
                                {(touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear && (
                                  <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].targetYear}</span>
                                )}
                              </div>

                              {/* Today's Cost (per person) */}
                              <div className="space-y-2">
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                  Approx. Today's Cost (per person)
                                </label>
                                <input
                                  type="number"
                                  value={
                                    goal.costPerPerson !== undefined
                                      ? goal.costPerPerson
                                      : goal.todaysCost && goal.travellers
                                      ? Math.round(Number(goal.todaysCost) / Number(goal.travellers))
                                      : goal.todaysCost || ''
                                  }
                                  onChange={(e) => {
                                    const perPerson = e.target.value;
                                    const people = Number(goal.travellers) || (2 + (childrenCount || 0));
                                    const total = (Number(perPerson) || 0) * people;
                                    updateGoal(goal.id, {
                                      costPerPerson: perPerson,
                                      travellers: String(people),
                                      todaysCost: String(total),
                                    });
                                  }}
                                  onBlur={() => handleBlur(goal.id, 'todaysCost')}
                                  placeholder="Cost per person"
                                  className={`${
                                    goal.costPerPerson || goal.todaysCost ? 'neu-field-filled' : 'neu-field'
                                  } w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                                    (touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost ? 'border-rose-400' : ''
                                  }`}
                                />
                                {(touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost && (
                                  <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].todaysCost}</span>
                                )}
                              </div>

                              {/* Number of People */}
                              <div className="space-y-2">
                                <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                  Number of People
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  value={goal.travellers !== undefined ? goal.travellers : 2 + (childrenCount || 0)}
                                  onChange={(e) => {
                                    const people = e.target.value;
                                    const perPerson =
                                      goal.costPerPerson !== undefined
                                        ? Number(goal.costPerPerson)
                                        : goal.todaysCost && goal.travellers
                                        ? Math.round(Number(goal.todaysCost) / Number(goal.travellers))
                                        : Number(goal.todaysCost) || 0;
                                    const total = perPerson * (Number(people) || 1);
                                    updateGoal(goal.id, {
                                      travellers: people,
                                      costPerPerson: String(perPerson),
                                      todaysCost: String(total),
                                    });
                                  }}
                                  placeholder="Number of travellers"
                                  className="neu-field w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400"
                                />
                              </div>
                            </div>

                            {/* Total Today's Cost Calculation Box */}
                            <div className="p-3.5 bg-white/[0.04] border border-white/15 rounded-xl text-xs font-light text-slate-200 flex flex-wrap items-center justify-between gap-2">
                              <span className="text-slate-400 font-medium uppercase tracking-wider text-[11px]">Calculated Total Today's Cost:</span>
                              <div>
                                <span>₹{(Number(goal.costPerPerson || (goal.todaysCost && goal.travellers ? Math.round(Number(goal.todaysCost) / Number(goal.travellers)) : goal.todaysCost)) || 0).toLocaleString('en-IN')} × {Number(goal.travellers || 2 + (childrenCount || 0))} people = </span>
                                <span className="text-sky-400 font-bold text-sm ml-1">
                                  ₹{(Number(goal.todaysCost) || 0).toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                Target Year
                              </label>
                              <input
                                type="number"
                                value={goal.targetYear || ''}
                                onChange={(e) =>
                                  handleGoalInputChange(goal.id, 'targetYear', e.target.value)
                                }
                                onBlur={() => handleBlur(goal.id, 'targetYear')}
                                placeholder="Enter target year"
                                className={`${
                                  goal.targetYear !== undefined && goal.targetYear !== null && goal.targetYear.toString().length > 0
                                    ? 'neu-field-filled'
                                    : 'neu-field'
                                } w-full px-5 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                                  (touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear ? 'border-rose-400' : ''
                                }`}
                              />
                              {(touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear && (
                                <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].targetYear}</span>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                                Today's Cost
                              </label>
                              <input
                                type="number"
                                value={goal.todaysCost || ''}
                                onChange={(e) =>
                                  handleGoalInputChange(goal.id, 'todaysCost', e.target.value)
                                }
                                onBlur={() => handleBlur(goal.id, 'todaysCost')}
                                placeholder="Enter today's cost"
                                className={`${
                                  goal.todaysCost !== undefined && goal.todaysCost !== null && goal.todaysCost.toString().length > 0
                                    ? 'neu-field-filled'
                                    : 'neu-field'
                                } w-full px-5 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                                  (touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost ? 'border-rose-400' : ''
                                }`}
                              />
                              {(touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost && (
                                <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].todaysCost}</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Foreign Tour: "Plan Your Trip" link-button */}
                        {catName === 'Foreign Tour' && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                openTripModal(goal.id);
                              }}
                              className="px-4 py-2 rounded-xl text-xs font-medium bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 inline-flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span>Plan Your Trip in Detail</span>
                              <svg
                                className="w-3.5 h-3.5 text-sky-400"
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

                    {/* "Add another" — Available for all categories */}
                    <div className="text-right pt-1">
                      <button
                        key={`add-another-${catName}`}
                        type="button"
                        onClick={() => addGoal(catName)}
                        className="px-4 py-2 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white border border-white/20 transition-all cursor-pointer"
                      >
                        + Add another {catName}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Custom Goals List ── */}
            {customGoals.length > 0 && (
              <div className="space-y-4 pt-2 relative z-10">
                {customGoals.map((goal, idx) => (
                  <div
                    key={goal.id}
                    className="w-full rounded-2xl p-5 sm:p-6 relative space-y-4 bg-white/[0.08] border border-sky-400/30 shadow-sm"
                  >
                    {/* Card header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3 font-medium text-sm sm:text-base text-white">
                        <GoalIcon type="Other" />
                        <span className="flex items-center gap-2">
                          {goal.goalName || goal.name || `Custom Goal #${idx + 1}`}
                          <span className="text-[10px] font-medium text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                            Custom
                          </span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeGoal(goal.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold bg-white/10 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 border border-white/15 transition-colors cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Input grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Goal Name */}
                      <div className="space-y-2">
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                          Goal Name
                        </label>
                        <input
                          type="text"
                          value={goal.goalName || ''}
                          onChange={(e) =>
                            handleGoalInputChange(goal.id, 'goalName', e.target.value)
                          }
                          placeholder="e.g. World Cup Trip"
                          className={`${
                            goal.goalName ? 'neu-field-filled' : 'neu-field'
                          } w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400`}
                        />
                      </div>

                      {/* Target Year */}
                      <div className="space-y-2">
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                          Target Year
                        </label>
                        <input
                          type="number"
                          value={goal.targetYear || ''}
                          onChange={(e) =>
                            handleGoalInputChange(goal.id, 'targetYear', e.target.value)
                          }
                          onBlur={() => handleBlur(goal.id, 'targetYear')}
                          placeholder="Target year"
                          className={`${
                            goal.targetYear !== undefined && goal.targetYear !== null && goal.targetYear.toString().length > 0
                              ? 'neu-field-filled'
                              : 'neu-field'
                          } w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                            (touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear ? 'border-rose-400' : ''
                          }`}
                        />
                        {(touched[`${goal.id}-targetYear`] || showAllErrors) && errors[goal.id]?.targetYear && (
                          <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].targetYear}</span>
                        )}
                      </div>

                      {/* Today's Cost */}
                      <div className="space-y-2">
                        <label className="block text-xs sm:text-[13px] font-medium text-slate-200 tracking-wide select-none">
                          Today's Cost
                        </label>
                        <input
                          type="number"
                          value={goal.todaysCost || ''}
                          onChange={(e) =>
                            handleGoalInputChange(goal.id, 'todaysCost', e.target.value)
                          }
                          onBlur={() => handleBlur(goal.id, 'todaysCost')}
                          placeholder="Today's cost"
                          className={`${
                            goal.todaysCost !== undefined && goal.todaysCost !== null && goal.todaysCost.toString().length > 0
                              ? 'neu-field-filled'
                              : 'neu-field'
                          } w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                            (touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost ? 'border-rose-400' : ''
                          }`}
                        />
                        {(touched[`${goal.id}-todaysCost`] || showAllErrors) && errors[goal.id]?.todaysCost && (
                          <span className="text-xs text-rose-400 font-medium block mt-1">{errors[goal.id].todaysCost}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* "Add Other" button */}
            <div className="pt-2 relative z-10">
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white border border-white/20 transition-all cursor-pointer"
              >
                + Add Other Goal
              </button>
            </div>

            {/* ── Navigation ── */}
            <div className="relative z-10">
              <StepNavigation
                onBack={prevStep}
                onNext={handleNext}
                isLoading={isSubmitting}
              />
            </div>
          </div>

          {/* ── Right Column: 3D Illustration with Ambient Glow ── */}
          <div className="w-full self-stretch flex items-start justify-center pt-8 overflow-hidden pointer-events-none">
            <div className="md:sticky md:top-32 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] relative">
              <div className="absolute inset-2 bg-sky-500/15 blur-2xl rounded-full pointer-events-none" />
              <img
                src="/assets/target_neu.png"
                alt="3D Target goals illustration"
                className="w-full h-auto object-contain animate-float relative z-10 brightness-105"
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

      {/* ── Custom Goal Modal ── */}
      <CustomGoalModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAddGoal={(customData) => {
          addGoal('Other', customData);
        }}
      />
    </div>
  );
}