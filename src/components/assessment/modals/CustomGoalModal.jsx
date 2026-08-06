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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1C1B1A]/45 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#FAF7F2] border border-[#EFE9DF] rounded-[28px] w-full max-w-[500px] p-6 sm:p-8 relative text-[#2B2A28] shadow-2xl overflow-hidden select-none animate-popup-scale"
        style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.12)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#EFE9DF]">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#2B2A28] flex items-center gap-2">
              <span className="text-[#F0883E]">🎯</span> Add Custom Goal
            </h3>
            <p className="text-xs text-[#8A8578] font-medium mt-0.5">
              Specify your unique lifestyle goal details below
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F1EDE6] border border-[#EFE9DF] text-[#8A8578] hover:text-[#F0883E] hover:border-[#F0883E]/40 text-lg font-bold transition-all cursor-pointer outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Preset Suggestions */}
          <div>
            <label className="block text-[11px] font-bold text-[#8A8578] uppercase tracking-wider mb-2 select-none">
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
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#F0883E] text-white border-[#F0883E] shadow-sm'
                        : 'bg-[#F1EDE6] text-[#2B2A28] border-[#EFE9DF] hover:border-[#F0883E]/50'
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
            <label className="block text-xs font-bold text-[#2B2A28] select-none">
              Goal Name <span className="text-[#F0883E]">*</span>
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => {
                setGoalName(e.target.value);
                if (errors.goalName) setErrors((prev) => ({ ...prev, goalName: null }));
              }}
              placeholder="e.g. World Cup Trip, Luxury Watch"
              className={`neu-field w-full px-4 py-3 text-sm font-medium rounded-2xl outline-none transition-all ${
                errors.goalName ? 'border-red-400' : ''
              }`}
              autoFocus
            />
            {errors.goalName && (
              <span className="text-xs text-red-500 font-medium block mt-1">
                {errors.goalName}
              </span>
            )}
          </div>

          {/* Target Year & Today's Cost Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Year */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2B2A28] select-none">
                Target Year <span className="text-[#F0883E]">*</span>
              </label>
              <input
                type="number"
                value={targetYear}
                onChange={(e) => {
                  setTargetYear(e.target.value);
                  if (errors.targetYear) setErrors((prev) => ({ ...prev, targetYear: null }));
                }}
                placeholder={`e.g. ${currentYear + 5}`}
                className={`neu-field w-full px-4 py-3 text-sm font-medium rounded-2xl outline-none transition-all ${
                  errors.targetYear ? 'border-red-400' : ''
                }`}
              />
              {errors.targetYear && (
                <span className="text-xs text-red-500 font-medium block mt-1">
                  {errors.targetYear}
                </span>
              )}
            </div>

            {/* Today's Cost */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#2B2A28] select-none">
                Today's Cost (₹) <span className="text-[#F0883E]">*</span>
              </label>
              <input
                type="number"
                value={todaysCost}
                onChange={(e) => {
                  setTodaysCost(e.target.value);
                  if (errors.todaysCost) setErrors((prev) => ({ ...prev, todaysCost: null }));
                }}
                placeholder="e.g. 500000"
                className={`neu-field w-full px-4 py-3 text-sm font-medium rounded-2xl outline-none transition-all ${
                  errors.todaysCost ? 'border-red-400' : ''
                }`}
              />
              {formattedCost && (
                <span className="text-xs text-[#F0883E] font-bold block mt-1">
                  {formattedCost}
                </span>
              )}
              {errors.todaysCost && (
                <span className="text-xs text-red-500 font-medium block mt-1">
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
              className="px-5 py-3 text-xs font-bold text-[#8A8578] hover:text-[#2B2A28] transition-colors rounded-2xl cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 text-xs font-bold text-white rounded-2xl transition-all active:scale-95 cursor-pointer shadow-md"
              style={{
                background: 'linear-gradient(145deg, #F0883E, #E07A2E)',
                boxShadow: '4px 4px 10px #D9D4C7, -2px -2px 6px #FFFFFF, 0 0 14px rgba(240,136,62,0.4)',
              }}
            >
              + Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
