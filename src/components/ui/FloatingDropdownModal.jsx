import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Pure Inline SVG Icons for zero external dependencies in new-wealth-fe */
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

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
  isFullScreen = false,
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

  /* Full Screen Window Panel Variant */
  if (isFullScreen) {
    const fullScreenJSX = (
      <div
        className="fixed inset-0 z-[9999] w-screen h-screen bg-[#070D1B]/95 backdrop-blur-3xl flex flex-col overflow-hidden select-none animate-fade-in text-white"
        aria-modal="true"
        role="dialog"
      >
        {/* Fixed Header */}
        <div className="shrink-0 h-16 sm:h-20 px-6 sm:px-10 border-b border-white/10 bg-[#0B132B]/80 backdrop-blur-xl flex items-center justify-between gap-4 z-10">
          <div>
            <h3 className="font-heading text-base sm:text-xl font-light text-white flex items-center gap-2">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-300 font-light mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer text-slate-300 hover:text-white outline-none shrink-0"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="shrink-0 px-6 sm:px-10 py-4 bg-slate-900/50 border-b border-white/10">
            <div className="max-w-4xl mx-auto relative flex items-center">
              <SearchIcon className="absolute left-4 w-5 h-5 text-sky-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="neu-field w-full pl-12 pr-10 py-3 text-sm font-normal rounded-2xl outline-none transition-all text-white placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-slate-400 hover:text-sky-300 cursor-pointer"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable 3-4 Column Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-thin">
          <div className="max-w-7xl mx-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-20 text-center text-sm text-slate-400 italic font-light">
                {emptyMessage}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredOptions.map((option, idx) => {
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
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 flex items-start justify-between gap-3 ${
                        option.disabled
                          ? 'opacity-40 cursor-not-allowed border-transparent bg-white/[0.02]'
                          : isSelected
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-medium shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                          : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.12] hover:border-sky-400/50 hover:shadow-md text-white cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {option.icon && typeof option.icon !== 'string' ? (
                          <div className="shrink-0 w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-sky-300 mt-0.5">
                            {option.icon}
                          </div>
                        ) : (
                          <div className="shrink-0 w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mt-0.5">
                            <GlobeIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-medium truncate text-white">
                            {option.label || option.name}
                          </div>
                          {option.subtext && (
                            <div className="text-xs font-light text-slate-300 truncate mt-0.5">
                              {option.subtext}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-right">
                        {option.rightTag && (
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-xl border ${isSelected ? 'bg-sky-500/30 text-sky-200 border-sky-400/50' : 'bg-white/10 text-slate-300 border-white/15'}`}>
                            {option.rightTag}
                          </span>
                        )}
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                            <CheckIcon className="w-4 h-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="shrink-0 h-16 sm:h-20 px-6 sm:px-10 border-t border-white/10 bg-[#0B132B]/80 backdrop-blur-xl flex items-center justify-between gap-4 text-xs font-light text-slate-300 z-10">
          <span>Showing {filteredOptions.length} option{filteredOptions.length !== 1 ? 's' : ''}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer text-white rounded-full"
          >
            Close Panel
          </button>
        </div>
      </div>
    );
    return createPortal(fullScreenJSX, document.body);
  }

  /* Normal Compact Dropdown Popup Variant */
  const normalJSX = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-200 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-[#0F172A]/95 border border-sky-400/40 rounded-3xl w-full ${widthClass} max-h-[65vh] flex flex-col p-5 sm:p-7 relative text-white shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] backdrop-blur-3xl animate-popup-scale overflow-hidden select-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/10 shrink-0">
          <div>
            <h3 className="font-heading text-base sm:text-lg font-light text-white flex items-center gap-2">
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-300 font-light mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer text-lg font-bold text-slate-400 hover:text-white outline-none shrink-0"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Sticky Search Bar */}
        {showSearch && (
          <div className="py-3 shrink-0">
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-3.5 w-4 h-4 text-sky-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="neu-field w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm font-normal rounded-2xl outline-none transition-all text-white placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto pr-1 py-1 scrollbar-thin">
          {filteredOptions.length === 0 ? (
            <div className="py-8 text-center text-xs sm:text-sm text-slate-400 italic font-light">
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
                  className={`w-full text-left p-3 mb-2 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 ${
                    option.disabled
                      ? 'opacity-40 cursor-not-allowed border-transparent bg-white/[0.02]'
                      : isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-medium shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                      : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.12] hover:border-sky-400/50 hover:shadow-md text-white cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {option.icon && typeof option.icon !== 'string' ? (
                      <div className="shrink-0 w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-sky-300">
                        {option.icon}
                      </div>
                    ) : (
                      <div className="shrink-0 w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                        <GlobeIcon className="w-4 h-4" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium truncate text-white">
                        {option.label || option.name}
                      </div>
                      {option.subtext && (
                        <div className="text-[11px] font-light text-slate-300 truncate mt-0.5">
                          {option.subtext}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-right">
                    {option.rightTag && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-xl border ${isSelected ? 'bg-sky-500/30 text-sky-200 border-sky-400/40' : 'bg-white/10 text-slate-300 border-white/15'}`}>
                        {option.rightTag}
                      </span>
                    )}
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
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

  return createPortal(normalJSX, document.body);
}
