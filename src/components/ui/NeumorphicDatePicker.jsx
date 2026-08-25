import React, { useState, useRef, useEffect } from 'react';

export function NeumorphicDatePicker({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = "DD/MM/YYYY", 
  required = false, 
  error = null,
  onBlur
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showYearGrid, setShowYearGrid] = useState(false);
  const containerRef = useRef(null);
  
  // Parse date from "DD/MM/YYYY" format
  const parseDateStr = (dateStr) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
        return new Date(y, m, d);
      }
    }
    return new Date();
  };

  const initialDate = parseDateStr(value);
  const [viewDate, setViewDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(value ? initialDate : null);

  useEffect(() => {
    if (value) {
      setSelectedDate(parseDateStr(value));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Close calendar dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowYearGrid(false);
        if (onBlur) {
          onBlur({ target: { name } });
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [name, onBlur]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleYearChange = (yearVal) => {
    setViewDate(new Date(yearVal, currentMonth, 1));
  };

  const handleMonthChange = (e) => {
    setViewDate(new Date(currentYear, parseInt(e.target.value, 10), 1));
  };

  const handleDateSelect = (day) => {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const formatted = `${dayStr}/${monthStr}/${currentYear}`;
    
    onChange({
      target: {
        name,
        value: formatted
      }
    });
    setIsOpen(false);
    setShowYearGrid(false);
  };

  const toggleOpen = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    setShowYearGrid(false);
    if (!nextOpen && onBlur) {
      onBlur({ target: { name } });
    }
  };

  // Generate days array
  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  const daysGrid = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    daysGrid.push(d);
  }

  // Generate Year options (from 1940 to currentYear + 10)
  const years = [];
  const startYear = 1940;
  const endYear = new Date().getFullYear() + 10;
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  const isSelectedDay = (day) => {
    if (!selectedDate || !day) return false;
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const isFilled = value !== undefined && value !== null && value.toString().length > 0;

  return (
    <div className="space-y-2 w-full relative" ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-[13px] font-medium tracking-wide text-slate-200 select-none">
          {label}
          {required && <span className="text-amber-400 font-bold ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          name={name}
          value={value || ''}
          onClick={toggleOpen}
          readOnly
          placeholder={placeholder}
          className={`${
            isFilled ? 'neu-field-filled' : 'neu-field'
          } w-full px-5 py-3.5 text-sm sm:text-base font-normal rounded-2xl outline-none transition-all duration-200 pr-10 cursor-pointer text-white placeholder-slate-400 ${
            error ? 'border-rose-400/80 focus:box-shadow-none' : ''
          }`}
        />
        <div 
          onClick={toggleOpen}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-400 cursor-pointer hover:text-sky-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 mt-2 p-4 w-[295px] rounded-2xl bg-[#0F172A]/95 backdrop-blur-2xl border border-sky-400/30 text-white shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)]">
          <div className="flex items-center justify-between gap-1 pb-3 mb-2 border-b border-white/10">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={showYearGrid}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed border border-white/15"
            >
              &larr;
            </button>
            <div className="flex gap-1.5 items-center">
              <select
                value={currentMonth}
                onChange={handleMonthChange}
                disabled={showYearGrid}
                className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {monthsList.map((m, idx) => (
                  <option key={m} value={idx} className="bg-slate-900 text-white">{m}</option>
                ))}
              </select>
              
              <button
                type="button"
                onClick={() => setShowYearGrid(!showYearGrid)}
                className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer text-white hover:bg-white/20 transition-colors flex items-center gap-1"
              >
                <span>{currentYear}</span>
                <span className="text-[8px] text-sky-400">{showYearGrid ? '▲' : '▼'}</span>
              </button>
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              disabled={showYearGrid}
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer select-none disabled:opacity-30 disabled:cursor-not-allowed border border-white/15"
            >
              &rarr;
            </button>
          </div>

          {showYearGrid ? (
            <div className="max-h-[170px] overflow-y-auto grid grid-cols-4 gap-1 p-1 scrollbar-thin select-none">
              {years.map((y) => {
                const selected = y === currentYear;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      handleYearChange(y);
                      setShowYearGrid(false);
                    }}
                    className={`py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                      selected
                        ? 'bg-sky-500 text-white shadow-sm font-bold'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-1 text-center font-medium text-[10px] text-slate-400 mb-2 select-none">
                {weekdays.map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {daysGrid.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="w-8 h-8" />;
                  }

                  const selected = isSelectedDay(day);

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={`w-8 h-8 text-xs rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        selected
                          ? 'bg-sky-500 text-white font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)] border border-white/40'
                          : 'text-slate-200 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
      {error && <span className="text-xs text-rose-400 font-medium block mt-1">{error}</span>}
    </div>
  );
}
