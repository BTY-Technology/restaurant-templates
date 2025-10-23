import { CartItem, MenuItem, Cart } from '@/types';
import { generateId } from './formatting';

const TAX_RATE = 0.08; // 8% tax
const DELIVERY_FEE = 4.99;

/**
 * Calculate cart item subtotal including customizations
 */
export const calculateCartItemSubtotal = (
  menuItem: MenuItem,
  quantity: number,
  customizations: { [key: string]: string | string[] }
): number => {
  let subtotal = menuItem.price;

  // Add customization prices
  if (menuItem.customizations) {
    menuItem.customizations.forEach(customization => {
      const selectedValue = customizations[customization.id];
      if (!selectedValue) return;

      if (Array.isArray(selectedValue)) {
        // Checkbox type - multiple selections
        selectedValue.forEach(optionId => {
          const option = customization.options.find(opt => opt.id === optionId);
          if (option) {
            subtotal += option.price;
          }
        });
      } else {
        // Radio type - single selection
        const option = customization.options.find(opt => opt.id === selectedValue);
        if (option) {
          subtotal += option.price;
        }
      }
    });
  }

  return subtotal * quantity;
};

/**
 * Create a cart item
 */
export const createCartItem = (
  menuItem: MenuItem,
  quantity: number,
  customizations: { [key: string]: string | string[] }
): CartItem => {
  const subtotal = calculateCartItemSubtotal(menuItem, quantity, customizations);
  return {
    id: generateId(),
    menuItem,
    quantity,
    customizations,
    subtotal,
  };
};

/**
 * Calculate cart totals
 */
export const calculateCartTotals = (
  items: CartItem[],
  includeDelivery: boolean = false
): Cart => {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = includeDelivery ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;

  return {
    items,
    subtotal,
    tax,
    deliveryFee,
    total,
  };
};

/**
 * Check if two cart items are the same (same item with same customizations)
 */
export const areCartItemsEqual = (item1: CartItem, item2: CartItem): boolean => {
  if (item1.menuItem.id !== item2.menuItem.id) return false;

  const custom1 = JSON.stringify(item1.customizations);
  const custom2 = JSON.stringify(item2.customizations);

  return custom1 === custom2;
};

/**
 * Get customization display text
 */
export const getCustomizationText = (
  menuItem: MenuItem,
  customizations: { [key: string]: string | string[] }
): string[] => {
  const texts: string[] = [];

  if (!menuItem.customizations) return texts;

  menuItem.customizations.forEach(customization => {
    const selectedValue = customizations[customization.id];
    if (!selectedValue) return;

    if (Array.isArray(selectedValue)) {
      selectedValue.forEach(optionId => {
        const option = customization.options.find(opt => opt.id === optionId);
        if (option && option.name !== 'Default') {
          texts.push(option.name);
        }
      });
    } else {
      const option = customization.options.find(opt => opt.id === selectedValue);
      if (option && !option.name.includes('Default')) {
        texts.push(option.name);
      }
    }
  });

  return texts;
};
