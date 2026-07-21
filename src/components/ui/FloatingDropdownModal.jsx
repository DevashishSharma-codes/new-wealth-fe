import React, { useState, useEffect, useRef } from 'react';

export function FloatingDropdownModal({
  isOpen,
  onClose,
  title = 'Select Option',
  subtitle,
  placeholder = 'Search options...',
  options = [],
  selectedValue,
  onSelect,
  showSearch = true,
  emptyMessage = 'No options found',
  widthClass = 'max-w-[520px]',
  renderCustomItem,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus search input when opened & reset search query
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter options based on search query
  const filteredOptions = options.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const label = String(item.label || item.name || item.value || '').toLowerCase();
    const subtext = String(item.subtext || item.country || item.level || item.category || item.famousFor || '').toLowerCase();
    const rightTag = String(item.rightTag || item.cost || item.badge || '').toLowerCase();
    return label.includes(query) || subtext.includes(query) || rightTag.includes(query);
  });

  const handleSelect = (option) => {
    onSelect(option);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1C1B1A]/40 backdrop-blur-md transition-all duration-200 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-[#FAF7F2] border border-[#EFE9DF] rounded-[28px] w-full ${widthClass} max-h-[60vh] flex flex-col p-5 sm:p-7 relative text-[#2B2A28] animate-popup-scale overflow-hidden select-none`}
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.10)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#EFE9DF] shrink-0">
          <div>
            <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#2B2A28] flex items-center gap-2">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-[#8A8578] font-medium mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive transition-all cursor-pointer text-lg font-bold text-[#2B2A28] hover:text-[#F0883E] outline-none shrink-0"
          >
            &times;
          </button>
        </div>

        {/* Sticky Search Bar */}
        {showSearch && (
          <div className="py-3 shrink-0">
            <div className="relative flex items-center">
              <svg
                className="absolute left-3.5 w-4 h-4 text-[#F0883E] pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="neu-field w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-2xl outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs font-extrabold text-[#8A8578] hover:text-[#F0883E] cursor-pointer"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto pr-1 py-1 scrollbar-thin">
          {filteredOptions.length === 0 ? (
            <div className="py-8 text-center text-xs sm:text-sm text-[#8A8578] italic font-medium">
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option, idx) => {
              const val = option.value !== undefined ? option.value : (option.id !== undefined ? option.id : option.label);
              const isSelected =
                selectedValue !== undefined && selectedValue !== null &&
                (selectedValue === val || selectedValue === option.label || (typeof selectedValue === 'object' && selectedValue?.id === option.id));

              if (renderCustomItem) {
                return (
                  <div key={val || idx} onClick={() => !option.disabled && handleSelect(option)}>
                    {renderCustomItem(option, isSelected, idx)}
                  </div>
                );
              }

              return (
                <button
                  key={val || idx}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left p-3.5 mb-2 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 ${
                    option.disabled
                      ? 'opacity-40 cursor-not-allowed border-transparent bg-[#FAF7F2]/40'
                      : isSelected
                      ? 'bg-[#FFF6ED] border-[#F0883E] text-[#F0883E] font-bold shadow-inner'
                      : 'border-[#EFE9DF] bg-[#FAF7F2]/80 hover:bg-[#FFF6ED]/80 hover:border-[#F0883E]/50 hover:shadow-md text-[#2B2A28] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {option.icon && (
                      <div className="shrink-0 w-8 h-8 rounded-xl bg-[#F1EDE6] border border-[#EFE9DF] flex items-center justify-center text-sm shadow-inner">
                        {option.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold truncate text-[#2B2A28]">
                        {option.label || option.name}
                      </div>
                      {option.subtext && (
                        <div className="text-[11px] font-medium text-[#8A8578] truncate mt-0.5">
                          {option.subtext}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-right">
                    {option.rightTag && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${isSelected ? 'bg-[#FFF6ED] text-[#F0883E] border-[#F0883E]/30' : 'bg-[#EFE9DF]/60 text-[#8A8578] border-[#EFE9DF]'}`}>
                        {option.rightTag}
                      </span>
                    )}
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#F0883E] text-white flex items-center justify-center text-xs font-black shadow-sm">
                        ✓
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
