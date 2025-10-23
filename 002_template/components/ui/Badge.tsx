import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { DietaryBadge } from '@/types';

interface BadgeProps {
  children: ReactNode;
  variant?: DietaryBadge | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const variantClasses: Record<string, string> = {
    default: 'bg-parchment text-near-black',
    Vegetarian: 'bg-green-100 text-green-800',
    Vegan: 'bg-green-200 text-green-900',
    'Gluten-Free': 'bg-blue-100 text-blue-800',
    Spicy: 'bg-red-100 text-red-800',
    New: 'bg-mustard text-near-black',
    Popular: 'bg-ketchup text-white',
  };

  return (
    <span
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {children}
    </span>
  );
};
