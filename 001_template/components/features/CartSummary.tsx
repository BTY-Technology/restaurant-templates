'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import styles from './CartSummary.module.css';

export interface CartSummaryProps {
  /**
   * Display mode: sidebar for slide-in cart, modal for popup cart
   * @default 'sidebar'
   */
  mode?: 'sidebar' | 'modal';
  /**
   * Callback when close button is clicked (for modal/sidebar)
   */
  onClose?: () => void;
  /**
   * Show delivery fee in calculations
   * @default true
   */
  includeDeliveryFee?: boolean;
  /**
   * Show the "Proceed to Checkout" button
   * @default true
   */
  showCheckoutButton?: boolean;
}

/**
 * CartSummary displays cart items with quantity controls, pricing breakdown,
 * and checkout button. Works as both sidebar and modal content.
 */
export const CartSummary: React.FC<CartSummaryProps> = ({
  mode = 'sidebar',
  onClose,
  includeDeliveryFee = true,
  showCheckoutButton = true,
}) => {
  const { cart, updateQuantity, removeFromCart, itemCount } = useCart();

  const handleIncreaseQuantity = (dishId: string, currentQuantity: number) => {
    updateQuantity(dishId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (dishId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(dishId, currentQuantity - 1);
    } else {
      removeFromCart(dishId);
    }
  };

  const handleRemoveItem = (dishId: string) => {
    removeFromCart(dishId);
  };

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className={`${styles.cartSummary} ${styles[mode]}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          {onClose && (
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close cart"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>Your cart is empty</h3>
          <p className={styles.emptyText}>
            Add some delicious dishes to get started!
          </p>
          <Link href="/menu" onClick={onClose}>
            <Button variant="primary">Start Ordering</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.cartSummary} ${styles[mode]}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your Cart <span className={styles.itemCount}>({itemCount})</span>
        </h2>
        {onClose && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.items}>
        {cart.items.map((item) => (
          <div key={item.dish.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <Image
                src={item.dish.images.thumbnail}
                alt={item.dish.name}
                width={80}
                height={80}
                className={styles.thumbnail}
              />
            </div>

            <div className={styles.itemDetails}>
              <div className={styles.itemHeader}>
                <h4 className={styles.itemName}>{item.dish.name}</h4>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(item.dish.id)}
                  aria-label={`Remove ${item.dish.name} from cart`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <p className={styles.itemNameZh}>{item.dish.nameZh}</p>

              {item.specialInstructions && (
                <p className={styles.specialInstructions}>
                  Note: {item.specialInstructions}
                </p>
              )}

              <div className={styles.itemFooter}>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleDecreaseQuantity(item.dish.id, item.quantity)}
                    aria-label="Decrease quantity"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleIncreaseQuantity(item.dish.id, item.quantity)}
                    aria-label="Increase quantity"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className={styles.itemPrice}>
                  ${(item.dish.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>${cart.subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Tax (8.75%)</span>
          <span className={styles.summaryValue}>${cart.tax.toFixed(2)}</span>
        </div>

        {includeDeliveryFee && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Delivery Fee</span>
            <span className={styles.summaryValue}>
              ${cart.deliveryFee.toFixed(2)}
            </span>
          </div>
        )}

        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span className={styles.summaryLabel}>Total</span>
          <span className={styles.summaryValue}>
            ${(includeDeliveryFee
              ? cart.total
              : cart.subtotal + cart.tax
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {showCheckoutButton && (
        <div className={styles.actions}>
          <Link href="/order" onClick={onClose}>
            <Button variant="primary" fullWidth>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
