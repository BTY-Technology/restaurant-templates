/**
 * UI Components Library for Golden Wok Restaurant
 *
 * This module exports all reusable UI components for the restaurant website.
 * All components follow the design system with the Golden Wok color palette:
 * - Primary Red: #C4001D
 * - Gold: #D4AF37
 * - Parchment: #F1E6C8
 * - Charcoal: #1A1A1A
 */

// Button Component
export { Button } from './Button';
export type { ButtonProps } from './Button';

// Card Components
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from './Card';
export type { CardProps } from './Card';

// Badge Components
export {
  Badge,
  VegetarianBadge,
  VeganBadge,
  GlutenFreeBadge,
  SpiceBadge,
  AllergenBadge,
} from './Badge';
export type {
  BadgeProps,
  SpiceBadgeProps,
  AllergenBadgeProps,
} from './Badge';

// Input Components
export { Input, Textarea } from './Input';
export type { InputProps, TextareaProps } from './Input';

// Select Components
export { Select, OptGroup } from './Select';
export type {
  SelectProps,
  SelectOption,
  OptGroupProps,
} from './Select';

// Modal Components
export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './Modal';
export type { ModalProps } from './Modal';
