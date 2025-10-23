'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartContextType } from '@/types/cart';
import { Dish } from '@/types/dish';

const TAX_RATE = 0.0875; // 8.75% tax rate
const DELIVERY_FEE = 4.99;

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateCartTotals = (items: CartItem[], includeDelivery: boolean = false): Cart => {
  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = includeDelivery ? DELIVERY_FEE : 0;
  const total = subtotal + tax + deliveryFee;

  return {
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('golden-wok-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('golden-wok-cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('golden-wok-cart');
    }
  }, [cartItems]);

  const addToCart = (dish: Dish, quantity: number = 1, specialInstructions?: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.dish.id === dish.id && item.specialInstructions === specialInstructions
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { dish, quantity, specialInstructions }];
      }
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const updateSpecialInstructions = (dishId: string, instructions: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.dish.id === dishId ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('golden-wok-cart');
  };

  const cart = calculateCartTotals(cartItems);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateSpecialInstructions,
    clearCart,
    itemCount,
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
