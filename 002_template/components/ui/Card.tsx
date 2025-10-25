import React, { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  hoverable = false,
  padding = 'md',
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'bg-white rounded-lg shadow-md',
        hoverable && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
