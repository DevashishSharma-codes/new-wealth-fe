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
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-[13px] font-bold tracking-wide text-[#2B2A28]">
          {label}
          {required && <span className="text-[#F0883E] font-bold ml-0.5">*</span>}
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
          className={`${
            isFilled ? 'neu-field-filled' : 'neu-field'
          } w-full px-5 py-4 text-base font-medium rounded-2xl outline-none transition-all duration-200 ${
            rightIcon ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F0883E] pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}
