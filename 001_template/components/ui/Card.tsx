import React, { HTMLAttributes } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional image URL to display at the top of the card
   */
  image?: string;
  /**
   * Alt text for the image (required if image is provided)
   */
  imageAlt?: string;
  /**
   * Padding size for the card content
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Enable hover effect with scale and shadow
   * @default false
   */
  hoverable?: boolean;
  /**
   * Make the entire card clickable
   */
  onClick?: () => void;
  /**
   * Add border to the card
   * @default false
   */
  bordered?: boolean;
  /**
   * Aspect ratio for the image
   * @default '16/9'
   */
  imageAspectRatio?: '1/1' | '4/3' | '16/9' | '21/9';
}

/**
 * Card component for displaying content in a contained, elevated surface.
 * Perfect for menu items, promotional content, and feature highlights.
 */
export const Card: React.FC<CardProps> = ({
  children,
  image,
  imageAlt = '',
  padding = 'md',
  hoverable = false,
  onClick,
  bordered = false,
  imageAspectRatio = '16/9',
  className = '',
  ...props
}) => {
  const classNames = [
    styles.card,
    styles[`padding-${padding}`],
    hoverable && styles.hoverable,
    bordered && styles.bordered,
    onClick && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const imageClassNames = [
    styles.image,
    styles[`aspect-${imageAspectRatio.replace('/', '-')}`],
  ].join(' ');

  // Accessibility: if card is clickable, make it keyboard accessible
  const interactiveProps = onClick
    ? {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <div className={classNames} {...interactiveProps} {...props}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={imageAlt} className={imageClassNames} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

/**
 * Card Header component for title and subtitle
 */
export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.header} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Title component
 */
export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3 className={`${styles.title} ${className}`} {...props}>
      {children}
    </h3>
  );
};

/**
 * Card Description component
 */
export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`${styles.description} ${className}`} {...props}>
      {children}
    </p>
  );
};

/**
 * Card Footer component for actions and metadata
 */
export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.footer} ${className}`} {...props}>
      {children}
    </div>
  );
};
