'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { CartSummary } from '@/components/features/CartSummary';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { getLocationById } from '@/data/locations';
import styles from './page.module.css';

export default function ReviewPage() {
  const router = useRouter();
  const { cart, itemCount } = useCart();
  const { currentOrder, submitOrder, resetOrder } = useOrder();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty
    if (itemCount === 0) {
      router.push('/menu');
      return;
    }

    // Redirect if contact info is missing
    if (!currentOrder?.contactInfo) {
      router.push('/order');
      return;
    }

    // Redirect if order type is not set
    if (!currentOrder?.orderType) {
      router.push('/order/delivery');
      return;
    }

    // Redirect if delivery address is missing for delivery orders
    if (currentOrder.orderType === 'delivery' && !currentOrder.address) {
      router.push('/order/delivery');
      return;
    }

    // Redirect if pickup location is missing for pickup orders
    if (currentOrder.orderType === 'pickup' && !currentOrder.locationId) {
      router.push('/order/delivery');
    }
  }, [itemCount, currentOrder, router]);

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const order = await submitOrder(cart);
      resetOrder();
      router.push(`/order/confirmation?orderId=${order.id}`);
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/order/delivery');
  };

  if (
    itemCount === 0 ||
    !currentOrder?.contactInfo ||
    !currentOrder?.orderType ||
    (currentOrder.orderType === 'delivery' && !currentOrder.address) ||
    (currentOrder.orderType === 'pickup' && !currentOrder.locationId)
  ) {
    return null;
  }

  const isDelivery = currentOrder.orderType === 'delivery';
  const pickupLocation = currentOrder.locationId
    ? getLocationById(currentOrder.locationId)
    : null;

  return (
    <>
      {/* Header */}
      <section className={styles.header}>
        <Container>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.progressBar}>
            <div className={`${styles.progressStep} ${styles.active}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Contact</span>
            </div>
            <div className={styles.progressLine} />
            <div className={`${styles.progressStep} ${styles.active}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Delivery</span>
            </div>
            <div className={styles.progressLine} />
            <div className={`${styles.progressStep} ${styles.active}`}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Review</span>
            </div>
          </div>
          <p className={styles.stepIndicator}>Step 3 of 3</p>
        </Container>
      </section>

      {/* Main Content */}
      <section className={styles.mainSection}>
        <Container>
          <div className={styles.grid}>
            {/* Review Section */}
            <div className={styles.formSection}>
              <div className={styles.step}>
                <h2 className={styles.stepTitle}>Review Your Order</h2>
                <p className={styles.stepDescription}>
                  Please review your order details before placing your order.
                </p>

                <div className={styles.reviewSection}>
                  {/* Contact Information */}
                  <div className={styles.reviewGroup}>
                    <div className={styles.reviewHeader}>
                      <h3 className={styles.reviewLabel}>Contact Information</h3>
                      <Link href="/order" className={styles.editLink}>
                        Edit
                      </Link>
                    </div>
                    <p className={styles.reviewText}>
                      {currentOrder.contactInfo.firstName} {currentOrder.contactInfo.lastName}
                    </p>
                    <p className={styles.reviewText}>{currentOrder.contactInfo.email}</p>
                    <p className={styles.reviewText}>{currentOrder.contactInfo.phone}</p>
                  </div>

                  {/* Order Type */}
                  <div className={styles.reviewGroup}>
                    <div className={styles.reviewHeader}>
                      <h3 className={styles.reviewLabel}>Order Type</h3>
                      <Link href="/order/delivery" className={styles.editLink}>
                        Edit
                      </Link>
                    </div>
                    <p className={styles.orderTypeText}>
                      {isDelivery ? '🚚 Delivery' : '🏪 Pickup'}
                    </p>
                  </div>

                  {/* Delivery Address or Pickup Location */}
                  {isDelivery ? (
                    <div className={styles.reviewGroup}>
                      <div className={styles.reviewHeader}>
                        <h3 className={styles.reviewLabel}>Delivery Address</h3>
                        <Link href="/order/delivery" className={styles.editLink}>
                          Edit
                        </Link>
                      </div>
                      <p className={styles.reviewText}>
                        {currentOrder.address!.street}
                        <br />
                        {currentOrder.address!.city}, {currentOrder.address!.state}{' '}
                        {currentOrder.address!.zipCode}
                      </p>
                      {currentOrder.address!.deliveryInstructions && (
                        <p className={styles.instructions}>
                          Instructions: {currentOrder.address!.deliveryInstructions}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className={styles.reviewGroup}>
                      <div className={styles.reviewHeader}>
                        <h3 className={styles.reviewLabel}>Pickup Location</h3>
                        <Link href="/order/delivery" className={styles.editLink}>
                          Edit
                        </Link>
                      </div>
                      {pickupLocation && (
                        <>
                          <p className={styles.reviewText}>{pickupLocation.name}</p>
                          <p className={styles.reviewText}>
                            {pickupLocation.address.street}
                            <br />
                            {pickupLocation.address.city}, {pickupLocation.address.state}{' '}
                            {pickupLocation.address.zipCode}
                          </p>
                          <p className={styles.reviewText}>{pickupLocation.phone}</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Order Items */}
                  <div className={styles.reviewGroup}>
                    <h3 className={styles.reviewLabel}>Order Items</h3>
                    <div className={styles.itemsList}>
                      {cart.items.map((item, index) => (
                        <div key={index} className={styles.item}>
                          <div className={styles.itemDetails}>
                            <div className={styles.itemName}>
                              {item.quantity}x {item.dish.name}
                            </div>
                            {item.specialInstructions && (
                              <div className={styles.itemInstructions}>
                                Note: {item.specialInstructions}
                              </div>
                            )}
                          </div>
                          <div className={styles.itemPrice}>
                            ${(item.dish.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigation}>
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className={styles.nextButton}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className={styles.summarySection}>
              <CartSummary includeDeliveryFee={isDelivery} showCheckoutButton={false} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
