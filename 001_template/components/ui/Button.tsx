import React, { ButtonHTMLAttributes, ReactElement, cloneElement } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  asChild = false,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // If asChild is true, clone the child element and pass the props to it
  if (asChild && React.isValidElement(children)) {
    return cloneElement(children as ReactElement<any>, {
      className: classNames,
      ...props,
    });
  }

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <span className={styles.spinner} />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};
