import { Dish } from './dish';

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (dish: Dish, quantity?: number, specialInstructions?: string) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  updateSpecialInstructions: (dishId: string, instructions: string) => void;
  clearCart: () => void;
  itemCount: number;
}
