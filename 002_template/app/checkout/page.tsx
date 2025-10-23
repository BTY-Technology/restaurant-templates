'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { CheckoutForm, CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { Card } from '@/components/ui/Card';
import { formatPrice } from '@/utils/formatting';
import { locations } from '@/data/locations';
import { createDoorDashOrder } from '@/lib/doordash-mock';
import { CustomerInfo, DeliveryAddress } from '@/types';
import { calculateCartTotals } from '@/utils/cart';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/');
    }
  }, [cart.items.length, router]);

  const handleCheckout = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Extract customer info
      const customer: CustomerInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      // Extract delivery address if delivery
      const deliveryAddress: DeliveryAddress | undefined =
        data.orderType === 'delivery'
          ? {
              street: data.street,
              apt: data.apt,
              city: data.city,
              state: data.state,
              zip: data.zip,
              instructions: data.instructions,
            }
          : undefined;

      // Get selected location
      const location = locations.find((loc) => loc.id === data.locationId);
      if (!location) {
        throw new Error('Invalid location selected');
      }

      // Calculate final totals with delivery fee if applicable
      const isDelivery = data.orderType === 'delivery';
      const finalCart = calculateCartTotals(cart.items, isDelivery);

      // Create the order
      const order = createOrder(
        finalCart,
        customer,
        data.orderType,
        location,
        deliveryAddress
      );

      // If delivery, initiate mock DoorDash order
      if (data.orderType === 'delivery' && deliveryAddress) {
        try {
          const doordashResponse = await createDoorDashOrder({
            items: cart.items,
            deliveryAddress,
            customer,
            restaurantId: location.id,
          });

          // Update order with DoorDash info
          order.doordashOrderId = doordashResponse.orderId;
          order.estimatedTime = doordashResponse.estimatedDeliveryTime;
        } catch (error) {
          console.error('Error creating DoorDash order:', error);
          // Continue with order even if DoorDash mock fails
        }
      }

      // Clear the cart
      clearCart();

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to order tracking page
      router.push(`/order/${order.id}`);
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-near-black font-display mb-4">
            Checkout
          </h1>
          <p className="text-lg text-charcoal/80">
            Just a few more steps to get your delicious burgers!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 md:p-8">
              <CheckoutForm onSubmit={handleCheckout} isSubmitting={isSubmitting} />
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-near-black font-display mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-near-black">
                          {item.quantity}x {item.menuItem.name}
                        </p>
                        {Object.keys(item.customizations).length > 0 && (
                          <div className="text-sm text-charcoal/60 mt-1">
                            {Object.entries(item.customizations).map(([key, value]) => {
                              const customization = item.menuItem.customizations?.find(
                                (c) => c.id === key
                              );
                              if (!customization) return null;

                              const selectedOptions = Array.isArray(value) ? value : [value];
                              const optionNames = selectedOptions
                                .map((optionId) => {
                                  const option = customization.options.find(
                                    (o) => o.id === optionId
                                  );
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
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/80">
                    <span>Tax</span>
                    <span>{formatPrice(cart.tax)}</span>
                  </div>
                  {cart.deliveryFee > 0 && (
                    <div className="flex justify-between text-charcoal/80">
                      <span>Delivery Fee</span>
                      <span>{formatPrice(cart.deliveryFee)}</span>
                    </div>
                  )}
                  <div className="border-t border-charcoal/10 pt-2 mt-2">
                    <div className="flex justify-between text-xl font-bold text-near-black">
                      <span>Total</span>
                      <span>{formatPrice(cart.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-parchment rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-ketchup flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-near-black">Secure Checkout</p>
                      <p className="text-xs text-charcoal/60 mt-1">
                        This is a demo. No actual payment will be processed.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
