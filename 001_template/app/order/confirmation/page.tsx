'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { getDoorDashStatus, handoffToDoorDash } from '@/utils/doordash';
import { formatPrice, formatDateTime } from '@/utils/formatting';
import { DoorDashStatusResponse } from '@/types/order';
import styles from './page.module.css';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { clearCart } = useCart();
  const { resetOrder } = useOrder();

  const [order, setOrder] = useState<any>(null);
  const [doordashOrderId, setDoordashOrderId] = useState<string | null>(null);
  const [doordashStatus, setDoordashStatus] = useState<DoorDashStatusResponse | null>(null);
  const [isHandingOff, setIsHandingOff] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!orderId) {
      router.push('/menu');
      return;
    }

    // Load order from localStorage
    try {
      const ordersData = localStorage.getItem('golden-wok-orders');
      if (ordersData) {
        const orders = JSON.parse(ordersData);
        const foundOrder = orders.find((o: any) => o.id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          router.push('/menu');
        }
      } else {
        router.push('/menu');
      }
    } catch (error) {
      console.error('Failed to load order:', error);
      router.push('/menu');
    }
  }, [orderId, router]);

  useEffect(() => {
    // Clear cart on mount
    clearCart();
    resetOrder();
  }, [clearCart, resetOrder]);

  const handleHandoffToDoorDash = async () => {
    if (!order) return;

    setIsHandingOff(true);
    try {
      const response = await handoffToDoorDash({
        orderId: order.id,
        restaurantAddress: {
          street: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
        },
        deliveryAddress: order.address!,
        customerPhone: order.contactInfo.phone,
        items: order.cart.items.map((item: any) => ({
          name: item.dish.name,
          quantity: item.quantity,
          price: item.dish.price,
        })),
        subtotal: order.cart.subtotal,
      });

      if (response.success) {
        setDoordashOrderId(response.doordashOrderId);
        startStatusPolling(response.doordashOrderId);
      }
    } catch (error) {
      console.error('DoorDash handoff failed:', error);
      alert('Failed to hand off to DoorDash. Please contact support.');
    } finally {
      setIsHandingOff(false);
    }
  };

  const startStatusPolling = (ddOrderId: string) => {
    // Initial status fetch
    fetchDoorDashStatus(ddOrderId);

    // Poll every 30 seconds
    const interval = setInterval(() => {
      fetchDoorDashStatus(ddOrderId);
    }, 30000);

    setPollingInterval(interval);
  };

  const fetchDoorDashStatus = async (ddOrderId: string) => {
    try {
      const status = await getDoorDashStatus(ddOrderId);
      setDoordashStatus(status);

      // Stop polling if delivered
      if (status.status === 'delivered' && pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    } catch (error) {
      console.error('Failed to fetch DoorDash status:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleOrderAgain = () => {
    clearCart();
    resetOrder();
    router.push('/menu');
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { text: 'Order Confirmed', color: '#2196f3', icon: '✓' };
      case 'preparing':
        return { text: 'Preparing Your Order', color: '#ff9800', icon: '👨‍🍳' };
      case 'ready':
        return { text: 'Ready for Pickup', color: '#4caf50', icon: '✓' };
      case 'out-for-delivery':
        return { text: 'Out for Delivery', color: '#9c27b0', icon: '🚚' };
      case 'delivered':
        return { text: 'Delivered', color: '#4caf50', icon: '✓' };
      default:
        return { text: 'Processing', color: '#666', icon: '⏳' };
    }
  };

  if (!order) {
    return (
      <div className={styles.loading}>
        <p>Loading order details...</p>
      </div>
    );
  }

  const statusDisplay = doordashStatus ? getStatusDisplay(doordashStatus.status) : null;
  const isDelivery = order.orderType === 'delivery';

  return (
    <>
      {/* Success Header */}
      <section className={styles.header}>
        <Container>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.subtitle}>Thank you for your order</p>
          <div className={styles.orderNumber}>Order #{order.id}</div>
        </Container>
      </section>

      {/* Order Details */}
      <section className={styles.detailsSection}>
        <Container>
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.mainContent}>
              {/* Order Status */}
              {doordashStatus && (
                <div className={styles.statusCard}>
                  <div className={styles.statusHeader}>
                    <div
                      className={styles.statusIcon}
                      style={{ background: statusDisplay!.color }}
                    >
                      {statusDisplay!.icon}
                    </div>
                    <div>
                      <h2 className={styles.statusTitle}>{statusDisplay!.text}</h2>
                      {doordashStatus.estimatedDeliveryTime && (
                        <p className={styles.estimatedTime}>
                          Estimated {isDelivery ? 'delivery' : 'pickup'} time:{' '}
                          {formatDateTime(doordashStatus.estimatedDeliveryTime)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dasher Information */}
                  {doordashStatus.dasherName && (
                    <div className={styles.dasherInfo}>
                      <h3 className={styles.dasherTitle}>Your Dasher</h3>
                      <p className={styles.dasherName}>{doordashStatus.dasherName}</p>
                      {doordashStatus.dasherPhone && (
                        <a href={`tel:${doordashStatus.dasherPhone}`} className={styles.dasherPhone}>
                          {doordashStatus.dasherPhone}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Status Timeline */}
                  <div className={styles.timeline}>
                    <div
                      className={`${styles.timelineItem} ${
                        ['confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'].includes(
                          doordashStatus.status
                        )
                          ? styles.completed
                          : ''
                      }`}
                    >
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>Order Confirmed</div>
                    </div>
                    <div
                      className={`${styles.timelineItem} ${
                        ['preparing', 'ready', 'out-for-delivery', 'delivered'].includes(
                          doordashStatus.status
                        )
                          ? styles.completed
                          : ''
                      }`}
                    >
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>Preparing</div>
                    </div>
                    <div
                      className={`${styles.timelineItem} ${
                        ['ready', 'out-for-delivery', 'delivered'].includes(doordashStatus.status)
                          ? styles.completed
                          : ''
                      }`}
                    >
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        {isDelivery ? 'Ready for Delivery' : 'Ready for Pickup'}
                      </div>
                    </div>
                    {isDelivery && (
                      <>
                        <div
                          className={`${styles.timelineItem} ${
                            ['out-for-delivery', 'delivered'].includes(doordashStatus.status)
                              ? styles.completed
                              : ''
                          }`}
                        >
                          <div className={styles.timelineDot} />
                          <div className={styles.timelineContent}>Out for Delivery</div>
                        </div>
                        <div
                          className={`${styles.timelineItem} ${
                            doordashStatus.status === 'delivered' ? styles.completed : ''
                          }`}
                        >
                          <div className={styles.timelineDot} />
                          <div className={styles.timelineContent}>Delivered</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* DoorDash Handoff Button */}
              {isDelivery && !doordashOrderId && (
                <div className={styles.handoffCard}>
                  <h3 className={styles.handoffTitle}>Ready for Delivery</h3>
                  <p className={styles.handoffDescription}>
                    Your order is being prepared. Click below to hand off to DoorDash for delivery.
                  </p>
                  <Button
                    onClick={handleHandoffToDoorDash}
                    disabled={isHandingOff}
                    size="large"
                  >
                    {isHandingOff ? 'Handing off to DoorDash...' : 'Hand Off to DoorDash'}
                  </Button>
                </div>
              )}

              {/* Order Items */}
              <div className={styles.itemsCard}>
                <h2 className={styles.cardTitle}>Order Items</h2>
                <div className={styles.itemsList}>
                  {order.cart.items.map((item: any, index: number) => (
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
                        {formatPrice(item.dish.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.sidebar}>
              {/* Order Summary */}
              <div className={styles.summaryCard}>
                <h2 className={styles.cardTitle}>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(order.cart.subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax</span>
                  <span>{formatPrice(order.cart.tax)}</span>
                </div>
                {order.cart.deliveryFee > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Delivery Fee</span>
                    <span>{formatPrice(order.cart.deliveryFee)}</span>
                  </div>
                )}
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>{formatPrice(order.cart.total)}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <p>
                  {order.contactInfo.firstName} {order.contactInfo.lastName}
                </p>
                <p>{order.contactInfo.email}</p>
                <p>{order.contactInfo.phone}</p>
              </div>

              {/* Delivery/Pickup Info */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>
                  {isDelivery ? 'Delivery Address' : 'Pickup Location'}
                </h3>
                {isDelivery ? (
                  <>
                    <p>
                      {order.address.street}<br />
                      {order.address.city}, {order.address.state} {order.address.zipCode}
                    </p>
                    {order.address.instructions && (
                      <p className={styles.instructions}>
                        Instructions: {order.address.instructions}
                      </p>
                    )}
                  </>
                ) : (
                  <p>Pickup at selected location</p>
                )}
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <Button
                  onClick={handleOrderAgain}
                  variant="primary"
                  className={styles.actionButton}
                  fullWidth
                >
                  Order Again
                </Button>
                <Link href="/menu" style={{ width: '100%' }}>
                  <Button variant="outline" className={styles.actionButton} fullWidth>
                    Back to Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
