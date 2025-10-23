import React from 'react';
import clsx from 'clsx';

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'image';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  count = 1,
  className,
}) => {
  const baseClasses = 'animate-pulse bg-charcoal/10 rounded';

  const variantClasses = {
    text: 'h-4 w-full',
    card: 'h-64 w-full',
    image: 'aspect-square w-full',
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(baseClasses, variantClasses[variant], className)}
        />
      ))}
    </>
  );
};

export const MenuCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadingSkeleton variant="image" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton count={2} />
        <div className="flex justify-between items-center mt-4">
          <LoadingSkeleton className="h-8 w-20" />
          <LoadingSkeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};
