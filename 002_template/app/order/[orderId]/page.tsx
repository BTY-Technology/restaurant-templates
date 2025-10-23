'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOrder } from '@/contexts/OrderContext';
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDateTime, formatPhone } from '@/utils/formatting';
import { getDoorDashOrderStatus } from '@/lib/doordash-mock';
import { OrderStatus } from '@/types';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { currentOrder, updateOrderStatus } = useOrder();
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number>(0);
  const [dasherName, setDasherName] = useState<string>('');
  const [dasherPhone, setDasherPhone] = useState<string>('');
  const printRef = useRef<HTMLDivElement>(null);

  const orderId = params.orderId as string;

  // Redirect if no order found
  useEffect(() => {
    if (!currentOrder || currentOrder.id !== orderId) {
      // In a real app, we'd fetch the order from an API
      // For now, redirect to home if order not found
      console.warn('Order not found in context');
    }
  }, [currentOrder, orderId]);

  // Auto-refresh status every 5 seconds
  useEffect(() => {
    if (!currentOrder) return;

    const updateStatus = async () => {
      try {
        // For delivery orders, check DoorDash status
        if (currentOrder.orderType === 'delivery' && currentOrder.doordashOrderId) {
          const status = await getDoorDashOrderStatus(currentOrder.doordashOrderId);
          updateOrderStatus(orderId, status.status);
          setEstimatedTimeRemaining(status.estimatedTimeRemaining);

          // Set dasher info (in real app, this would come from initial order creation)
          if (status.status === 'out_for_delivery' || status.status === 'delivered') {
            setDasherName('Alex M.');
            setDasherPhone('(503) 555-0123');
          }
        } else {
          // For pickup orders, simulate status progression
          const placedTime = currentOrder.placedAt.getTime();
          const now = Date.now();
          const elapsedMinutes = (now - placedTime) / 1000 / 60;

          let newStatus: OrderStatus = currentOrder.status;

          if (elapsedMinutes > 15) {
            newStatus = 'completed';
          } else if (elapsedMinutes > 10) {
            newStatus = 'ready';
          } else if (elapsedMinutes > 5) {
            newStatus = 'preparing';
          } else if (elapsedMinutes > 1) {
            newStatus = 'confirmed';
          }

          if (newStatus !== currentOrder.status) {
            updateOrderStatus(orderId, newStatus);
          }

          setEstimatedTimeRemaining(Math.max(0, currentOrder.estimatedTime - Math.floor(elapsedMinutes)));
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    };

    // Initial update
    updateStatus();

    // Set up interval for auto-refresh
    const interval = setInterval(updateStatus, 5000);

    return () => clearInterval(interval);
  }, [currentOrder, orderId, updateOrderStatus]);

  const handleOrderAgain = () => {
    router.push('/');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <svg
            className="w-16 h-16 text-charcoal/40 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-near-black mb-2">Order Not Found</h2>
          <p className="text-charcoal/80 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </Card>
      </div>
    );
  }

  const isDelivery = currentOrder.orderType === 'delivery';
  const isCompleted = currentOrder.status === 'delivered' || currentOrder.status === 'completed';

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-near-black font-display mb-4">
            Order Tracking
          </h1>
          <p className="text-lg text-charcoal/80">Order #{orderId}</p>
          <p className="text-sm text-charcoal/60 mt-2">
            Placed on {formatDateTime(currentOrder.placedAt)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-near-black font-display mb-6">
                Order Status
              </h2>
              <OrderStatusTimeline
                currentStatus={currentOrder.status}
                orderType={currentOrder.orderType}
                placedAt={currentOrder.placedAt}
                estimatedTime={estimatedTimeRemaining}
              />
            </Card>

            {/* Delivery Info - Show when out for delivery */}
            {isDelivery && currentOrder.status === 'out_for_delivery' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-r from-ketchup to-ketchup-dark text-white">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Your Dasher</h3>
                      <p className="text-white/90">{dasherName}</p>
                      <p className="text-white/90">{formatPhone(dasherPhone)}</p>
                      <p className="text-sm text-white/80 mt-2">
                        ETA: {estimatedTimeRemaining} minutes
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Card className="p-6 md:p-8" ref={printRef}>
                <h2 className="text-2xl font-bold text-near-black font-display mb-6">
                  Order Details
                </h2>

                <div className="space-y-4 mb-6">
                  {currentOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start pb-4 border-b border-charcoal/10 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-start">
                          <span className="font-medium text-near-black">
                            {item.quantity}x {item.menuItem.name}
                          </span>
                        </div>
                        {Object.keys(item.customizations).length > 0 && (
                          <div className="text-sm text-charcoal/60 mt-1 ml-6">
                            {Object.entries(item.customizations).map(([key, value]) => {
                              const customization = item.menuItem.customizations?.find(
                                (c) => c.id === key
                              );
                              if (!customization) return null;

                              const selectedOptions = Array.isArray(value) ? value : [value];
                              const optionNames = selectedOptions
                                .map((optionId) => {
                                  const option = customization.options.find((o) => o.id === optionId);
                                  return option?.name;
                                })
                                .filter(Boolean)
                                .join(', ');

                              return (
                                <div key={key}>
                                  {customization.name}: {optionNames}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-near-black ml-4">
                        {formatPrice(item.subtotal)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-charcoal/10 pt-4 space-y-2">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(currentOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Tax</span>
                    <span>{formatPrice(currentOrder.tax)}</span>
                  </div>
                  {currentOrder.deliveryFee > 0 && (
                    <div className="flex justify-between text-charcoal/80">
                      <span>Delivery Fee</span>
                      <span>{formatPrice(currentOrder.deliveryFee)}</span>
                    </div>
                  )}
                  <div className="border-t border-charcoal/10 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-bold text-near-black">
                      <span>Total</span>
                      <span>{formatPrice(currentOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sidebar - Customer Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-6">
              {/* Customer Info */}
              <Card className="p-6">
                <h3 className="font-bold text-lg text-near-black mb-4">Customer Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-charcoal/60">Name</p>
                    <p className="text-near-black font-medium">{currentOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60">Email</p>
                    <p className="text-near-black">{currentOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60">Phone</p>
                    <p className="text-near-black">{formatPhone(currentOrder.customer.phone)}</p>
                  </div>
                </div>
              </Card>

              {/* Location Info */}
              <Card className="p-6">
                <h3 className="font-bold text-lg text-near-black mb-4">
                  {isDelivery ? 'Delivery Address' : 'Pickup Location'}
                </h3>
                <div className="space-y-3 text-sm">
                  {isDelivery && currentOrder.deliveryAddress ? (
                    <>
                      <p className="text-near-black">
                        {currentOrder.deliveryAddress.street}{' '}
                        {currentOrder.deliveryAddress.apt}
                      </p>
                      <p className="text-near-black">
                        {currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.state}{' '}
                        {currentOrder.deliveryAddress.zip}
                      </p>
                      {currentOrder.deliveryAddress.instructions && (
                        <div className="pt-2 border-t border-charcoal/10">
                          <p className="text-charcoal/60">Instructions</p>
                          <p className="text-near-black">
                            {currentOrder.deliveryAddress.instructions}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-near-black font-medium">{currentOrder.location.name}</p>
                      <p className="text-charcoal/80">{currentOrder.location.address}</p>
                      <p className="text-charcoal/80">
                        {currentOrder.location.city}, {currentOrder.location.state}{' '}
                        {currentOrder.location.zip}
                      </p>
                      <p className="text-charcoal/80">{formatPhone(currentOrder.location.phone)}</p>
                    </>
                  )}
                </div>
              </Card>

              {/* Estimated Time */}
              {!isCompleted && (
                <Card className="p-6 bg-gradient-to-br from-mustard/20 to-mustard/10 border-mustard/30">
                  <div className="text-center">
                    <p className="text-sm text-charcoal/60 mb-2">Estimated Time Remaining</p>
                    <p className="text-4xl font-bold text-near-black font-display">
                      {estimatedTimeRemaining}
                    </p>
                    <p className="text-sm text-charcoal/60">minutes</p>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button fullWidth onClick={handleOrderAgain}>
                  Order Again
                </Button>
                <Button fullWidth variant="outline" onClick={handlePrintReceipt}>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print Receipt
                </Button>
              </div>

              {/* Help Section */}
              <Card className="p-6 bg-parchment">
                <h3 className="font-bold text-near-black mb-2">Need Help?</h3>
                <p className="text-sm text-charcoal/80 mb-4">
                  If you have any questions or concerns about your order, please contact us.
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Contact Support
                </Button>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          ${printRef.current && `
            #print-content,
            #print-content * {
              visibility: visible;
            }
            #print-content {
              position: absolute;
              left: 0;
              top: 0;
            }
          `}
        }
      `}</style>
    </div>
  );
}
