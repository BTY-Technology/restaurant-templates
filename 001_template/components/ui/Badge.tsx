import React, { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /**
   * Size of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Display an icon before the text
   */
  icon?: React.ReactNode;
  /**
   * Make the badge rounded (pill shape)
   * @default true
   */
  rounded?: boolean;
  /**
   * Make the badge outlined instead of filled
   * @default false
   */
  outline?: boolean;
}

/**
 * Badge component for displaying allergens, spice levels, dietary labels, and status indicators.
 * Examples: Vegetarian, Vegan, Gluten-Free, Spicy, Contains Nuts, etc.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  rounded = true,
  outline = false,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    rounded && styles.rounded,
    outline && styles.outline,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </span>
  );
};

/**
 * Pre-configured badge for vegetarian items
 */
export const VegetarianBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => {
  return (
    <Badge variant="success" icon="🌱" {...props}>
      Vegetarian
    </Badge>
  );
};

/**
 * Pre-configured badge for vegan items
 */
export const VeganBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => {
  return (
    <Badge variant="success" icon="🌿" {...props}>
      Vegan
    </Badge>
  );
};

/**
 * Pre-configured badge for gluten-free items
 */
export const GlutenFreeBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => {
  return (
    <Badge variant="info" icon="🌾" {...props}>
      Gluten-Free
    </Badge>
  );
};

/**
 * Spice level badge with customizable heat level
 */
export interface SpiceBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  /**
   * Spice level from 1 (mild) to 3 (very spicy)
   */
  level: 1 | 2 | 3;
}

export const SpiceBadge: React.FC<SpiceBadgeProps> = ({ level, ...props }) => {
  const labels = {
    1: 'Mild',
    2: 'Spicy',
    3: 'Very Spicy',
  };

  const icons = {
    1: '🌶️',
    2: '🌶️🌶️',
    3: '🌶️🌶️🌶️',
  };

  return (
    <Badge variant="danger" icon={icons[level]} {...props}>
      {labels[level]}
    </Badge>
  );
};

/**
 * Allergen badge for common allergens
 */
export interface AllergenBadgeProps extends Omit<BadgeProps, 'variant' | 'children'> {
  /**
   * Type of allergen
   */
  allergen: 'nuts' | 'dairy' | 'eggs' | 'soy' | 'shellfish' | 'fish' | 'wheat' | 'sesame';
}

export const AllergenBadge: React.FC<AllergenBadgeProps> = ({ allergen, ...props }) => {
  const allergenConfig = {
    nuts: { label: 'Contains Nuts', icon: '🥜' },
    dairy: { label: 'Contains Dairy', icon: '🥛' },
    eggs: { label: 'Contains Eggs', icon: '🥚' },
    soy: { label: 'Contains Soy', icon: '🫘' },
    shellfish: { label: 'Contains Shellfish', icon: '🦞' },
    fish: { label: 'Contains Fish', icon: '🐟' },
    wheat: { label: 'Contains Wheat', icon: '🌾' },
    sesame: { label: 'Contains Sesame', icon: '⚪' },
  };

  const config = allergenConfig[allergen];

  return (
    <Badge variant="warning" icon={config.icon} outline {...props}>
      {config.label}
    </Badge>
  );
};
