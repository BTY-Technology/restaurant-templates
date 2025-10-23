'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatting';
import { getCustomizationText } from '@/utils/cart';

export const CartDrawer: React.FC = () => {
  const { cart, itemCount, isCartOpen, closeCart, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-parchment">
              <h2 className="text-2xl font-display uppercase text-near-black">
                Your Cart ({itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="text-charcoal/60 hover:text-charcoal transition-colors"
                aria-label="Close cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg
                    className="w-24 h-24 text-charcoal/20 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-lg text-charcoal/60 mb-2">Your cart is empty</p>
                  <p className="text-sm text-charcoal/40">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map(item => {
                    const customizations = getCustomizationText(item.menuItem, item.customizations);

                    return (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-parchment">
                        {/* Image */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-near-black truncate">
                            {item.menuItem.name}
                          </h4>
                          {customizations.length > 0 && (
                            <p className="text-sm text-charcoal/60 mt-1">
                              {customizations.join(', ')}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-charcoal/20 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-parchment transition-colors"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 min-w-[3ch] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-parchment transition-colors"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-ketchup hover:text-ketchup-dark transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-display text-lg text-near-black">
                            {formatPrice(item.subtotal)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer - Totals & Checkout */}
            {cart.items.length > 0 && (
              <div className="border-t border-parchment px-6 py-4 bg-parchment/30">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Subtotal</span>
                    <span className="text-near-black">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Tax</span>
                    <span className="text-near-black">{formatPrice(cart.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-display border-t border-charcoal/20 pt-2">
                    <span className="text-near-black">Total</span>
                    <span className="text-ketchup">{formatPrice(cart.subtotal + cart.tax)}</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={closeCart}>
                  <Button fullWidth size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
