import React, { useState, useEffect } from 'react';

const formatINR = (val) => {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return null;
  return `₹${num.toLocaleString('en-IN')}`;
};

const PRESETS = [
  'World Cup Trip',
  'Luxury Watch',
  'Farm House',
  'Art Collection',
  'Sailing Trip',
  'Start Business',
];

export function CustomGoalModal({ isOpen, onClose, onAddGoal }) {
  const [goalName, setGoalName] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [todaysCost, setTodaysCost] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setGoalName('');
      setTargetYear('');
      setTodaysCost('');
      setErrors({});
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();

  const handlePresetClick = (presetName) => {
    setGoalName(presetName);
    if (errors.goalName) {
      setErrors((prev) => ({ ...prev, goalName: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!goalName.trim()) {
      newErrors.goalName = 'Goal name is required';
    }

    if (!targetYear) {
      newErrors.targetYear = 'Target year is required';
    } else {
      const yr = parseInt(targetYear, 10);
      if (isNaN(yr) || yr <= currentYear || yr > currentYear + 60) {
        newErrors.targetYear = `Year must be in the future (between ${currentYear + 1} and ${currentYear + 60})`;
      }
    }

    if (!todaysCost) {
      newErrors.todaysCost = "Today's cost is required";
    } else {
      const cost = parseFloat(todaysCost);
      if (isNaN(cost) || cost <= 0) {
        newErrors.todaysCost = 'Cost must be a positive number';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddGoal({
      goalName: goalName.trim(),
      targetYear: targetYear.toString().trim(),
      todaysCost: todaysCost.toString().trim(),
    });
    onClose();
  };

  const formattedCost = formatINR(todaysCost);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#0F172A]/95 border border-sky-400/40 rounded-3xl w-full max-w-[500px] p-6 sm:p-8 relative text-white shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] backdrop-blur-3xl overflow-hidden select-none animate-popup-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-light text-white flex items-center gap-2">
              <span className="text-sky-400">🎯</span> Add Custom Goal
            </h3>
            <p className="text-xs text-slate-300 font-light mt-0.5">
              Specify your unique lifestyle goal details below
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-slate-400 hover:text-white text-lg font-bold transition-all cursor-pointer outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Preset Suggestions */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2 select-none">
              Quick Suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => {
                const isSelected = goalName === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                        : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20'
                    }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-200 select-none">
              Goal Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => {
                setGoalName(e.target.value);
                if (errors.goalName) setErrors((prev) => ({ ...prev, goalName: null }));
              }}
              placeholder="e.g. World Cup Trip, Luxury Watch"
              className={`neu-field w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                errors.goalName ? 'border-rose-400' : ''
              }`}
              autoFocus
            />
            {errors.goalName && (
              <span className="text-xs text-rose-400 font-medium block mt-1">
                {errors.goalName}
              </span>
            )}
          </div>

          {/* Target Year & Today's Cost Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Year */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200 select-none">
                Target Year <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                value={targetYear}
                onChange={(e) => {
                  setTargetYear(e.target.value);
                  if (errors.targetYear) setErrors((prev) => ({ ...prev, targetYear: null }));
                }}
                placeholder={`e.g. ${currentYear + 5}`}
                className={`neu-field w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                  errors.targetYear ? 'border-rose-400' : ''
                }`}
              />
              {errors.targetYear && (
                <span className="text-xs text-rose-400 font-medium block mt-1">
                  {errors.targetYear}
                </span>
              )}
            </div>

            {/* Today's Cost */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200 select-none">
                Today's Cost (₹) <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                value={todaysCost}
                onChange={(e) => {
                  setTodaysCost(e.target.value);
                  if (errors.todaysCost) setErrors((prev) => ({ ...prev, todaysCost: null }));
                }}
                placeholder="e.g. 500000"
                className={`neu-field w-full px-4 py-3 text-sm font-normal rounded-2xl outline-none text-white placeholder-slate-400 ${
                  errors.todaysCost ? 'border-rose-400' : ''
                }`}
              />
              {formattedCost && (
                <span className="text-xs text-sky-400 font-medium block mt-1">
                  {formattedCost}
                </span>
              )}
              {errors.todaysCost && (
                <span className="text-xs text-rose-400 font-medium block mt-1">
                  {errors.todaysCost}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="relative group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-white/[0.25] via-white/[0.14] to-white/[0.06] border border-white/60 text-white font-medium text-xs shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              + Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
