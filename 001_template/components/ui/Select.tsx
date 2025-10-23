import React, { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Label text for the select
   */
  label?: string;
  /**
   * Help text displayed below the select
   */
  helpText?: string;
  /**
   * Error message to display (sets select to error state)
   */
  error?: string;
  /**
   * Success message to display (sets select to success state)
   */
  success?: string;
  /**
   * Visual state of the select
   */
  state?: 'default' | 'error' | 'success';
  /**
   * Size of the select
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Make the select take full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Options for the select dropdown
   */
  options?: SelectOption[];
  /**
   * Placeholder text (creates a disabled first option)
   */
  placeholder?: string;
}

/**
 * Select component for dropdowns with support for labels, validation states,
 * and help text. Perfect for filters, forms, and menu category selection.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      success,
      state = 'default',
      size = 'md',
      fullWidth = false,
      options = [],
      placeholder,
      className = '',
      id,
      disabled,
      required,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the actual state based on props
    const actualState = error ? 'error' : success ? 'success' : state;

    // Generate a unique ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClassNames = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const selectWrapperClassNames = [
      styles.selectWrapper,
      styles[size],
      styles[actualState],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required"> *</span>}
          </label>
        )}

        <div className={selectWrapperClassNames}>
          <select
            ref={ref}
            id={selectId}
            className={styles.select}
            disabled={disabled}
            required={required}
            aria-invalid={actualState === 'error'}
            aria-describedby={
              error
                ? `${selectId}-error`
                : success
                ? `${selectId}-success`
                : helpText
                ? `${selectId}-help`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {children
              ? children
              : options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
          </select>

          {/* Chevron Icon */}
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Validation icon */}
          {actualState === 'error' && (
            <span className={styles.validationIcon} aria-hidden="true">
              ✕
            </span>
          )}
          {actualState === 'success' && (
            <span className={styles.validationIcon} aria-hidden="true">
              ✓
            </span>
          )}
        </div>

        {/* Help text */}
        {helpText && !error && !success && (
          <p id={`${selectId}-help`} className={styles.helpText}>
            {helpText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={`${selectId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p id={`${selectId}-success`} className={styles.successText} role="status">
            {success}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

/**
 * OptGroup component for grouping select options
 */
export interface OptGroupProps {
  label: string;
  children: React.ReactNode;
}

export const OptGroup: React.FC<OptGroupProps> = ({ label, children }) => {
  return <optgroup label={label}>{children}</optgroup>;
};
