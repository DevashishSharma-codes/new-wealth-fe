import React from 'react';

export function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  error = null,
  className = '',
  rightIcon = null,
  ...props
}) {
  const isFilled = value !== undefined && value !== null && value.toString().length > 0;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-xs sm:text-[13px] font-medium tracking-wide text-slate-200">
          {label}
          {required && <span className="text-amber-400 font-bold ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onWheel={(e) => type === 'number' && e.currentTarget.blur()}
          className={`${
            isFilled ? 'neu-field-filled' : 'neu-field'
          } w-full px-5 py-3.5 text-sm sm:text-base font-normal rounded-2xl outline-none transition-all duration-200 text-white placeholder-slate-400 ${
            rightIcon ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-rose-400 font-medium block mt-1">{error}</span>}
    </div>
  );
}
