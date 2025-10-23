import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Help text displayed below the input
   */
  helpText?: string;
  /**
   * Error message to display (sets input to error state)
   */
  error?: string;
  /**
   * Success message to display (sets input to success state)
   */
  success?: string;
  /**
   * Visual state of the input
   */
  state?: 'default' | 'error' | 'success';
  /**
   * Size of the input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  /**
   * Make the input take full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Input component for form fields with support for labels, validation states,
 * help text, and icons. Designed for contact forms, reservation forms, and search.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      success,
      state = 'default',
      size = 'md',
      startIcon,
      endIcon,
      fullWidth = false,
      className = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    // Determine the actual state based on props
    const actualState = error ? 'error' : success ? 'success' : state;

    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClassNames = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputWrapperClassNames = [
      styles.inputWrapper,
      styles[size],
      styles[actualState],
      disabled && styles.disabled,
      startIcon && styles.hasStartIcon,
      endIcon && styles.hasEndIcon,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required"> *</span>}
          </label>
        )}

        <div className={inputWrapperClassNames}>
          {startIcon && <span className={styles.startIcon}>{startIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            required={required}
            aria-invalid={actualState === 'error'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : success
                ? `${inputId}-success`
                : helpText
                ? `${inputId}-help`
                : undefined
            }
            {...props}
          />

          {endIcon && <span className={styles.endIcon}>{endIcon}</span>}

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
          <p id={`${inputId}-help`} className={styles.helpText}>
            {helpText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p id={`${inputId}-success`} className={styles.successText} role="status">
            {success}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea component with the same features as Input
 */
export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpText?: string;
  error?: string;
  success?: string;
  state?: 'default' | 'error' | 'success';
  fullWidth?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      success,
      state = 'default',
      fullWidth = false,
      className = '',
      id,
      disabled,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const actualState = error ? 'error' : success ? 'success' : state;
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClassNames = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClassNames = [
      styles.input,
      styles.textarea,
      styles[actualState],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required"> *</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={textareaClassNames}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={actualState === 'error'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : success
              ? `${inputId}-success`
              : helpText
              ? `${inputId}-help`
              : undefined
          }
          {...(props as any)}
        />

        {helpText && !error && !success && (
          <p id={`${inputId}-help`} className={styles.helpText}>
            {helpText}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}

        {success && (
          <p id={`${inputId}-success`} className={styles.successText} role="status">
            {success}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
