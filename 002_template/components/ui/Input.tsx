import React, { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const inputClasses = clsx(
      'w-full px-4 py-3 border-b-2 bg-transparent transition-colors duration-200',
      'focus:outline-none focus:border-ketchup',
      error ? 'border-red-500' : 'border-charcoal/20',
      'placeholder:text-charcoal/40',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-near-black mb-2">
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-charcoal/60">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
