'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, MenuItem, Cart } from '@/types';
import { createCartItem, calculateCartTotals, areCartItemsEqual } from '@/utils/cart';

interface CartContextType {
  cart: Cart;
  itemCount: number;
  addItem: (
    menuItem: MenuItem,
    quantity: number,
    customizations: { [key: string]: string | string[] }
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate cart totals
  const cart = calculateCartTotals(cartItems, false);

  // Calculate total item count
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add item to cart
  const addItem = useCallback(
    (
      menuItem: MenuItem,
      quantity: number,
      customizations: { [key: string]: string | string[] }
    ) => {
      setCartItems(prevItems => {
        const newItem = createCartItem(menuItem, quantity, customizations);

        // Check if item already exists with same customizations
        const existingItemIndex = prevItems.findIndex(item =>
          areCartItemsEqual(item, newItem)
        );

        if (existingItemIndex > -1) {
          // Update quantity of existing item
          const updatedItems = [...prevItems];
          const existingItem = updatedItems[existingItemIndex];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
            subtotal: existingItem.subtotal + newItem.subtotal,
          };
          return updatedItems;
        }

        // Add new item
        return [...prevItems, newItem];
      });

      // Open cart when item is added
      setIsCartOpen(true);
    },
    []
  );

  // Remove item from cart
  const removeItem = useCallback((cartItemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== cartItemId) return item;

        const unitPrice = item.subtotal / item.quantity;
        return {
          ...item,
          quantity,
          subtotal: unitPrice * quantity,
        };
      })
    );
  }, [removeItem]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Cart drawer controls
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  const value: CartContextType = {
    cart,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
