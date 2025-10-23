'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, OrderContextType, ContactInfo, Address, OrderType } from '@/types/order';
import { Cart } from '@/types/cart';
import { generateOrderId, calculateEstimatedDelivery } from '@/utils/formatting';

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<Partial<Order> | null>(null);

  const setContactInfo = (info: ContactInfo) => {
    setCurrentOrder((prev) => ({
      ...prev,
      contactInfo: info,
    }));
  };

  const setOrderType = (type: OrderType) => {
    setCurrentOrder((prev) => ({
      ...prev,
      orderType: type,
    }));
  };

  const setAddress = (address: Address) => {
    setCurrentOrder((prev) => ({
      ...prev,
      address,
    }));
  };

  const setLocationId = (locationId: string) => {
    setCurrentOrder((prev) => ({
      ...prev,
      locationId,
    }));
  };

  const setScheduledTime = (time: Date) => {
    setCurrentOrder((prev) => ({
      ...prev,
      scheduledTime: time,
    }));
  };

  const submitOrder = async (cart: Cart): Promise<Order> => {
    if (!currentOrder) {
      throw new Error('Order information is incomplete');
    }

    if (!currentOrder.contactInfo) {
      throw new Error('Contact information is required');
    }

    if (!currentOrder.orderType) {
      throw new Error('Order type is required');
    }

    if (currentOrder.orderType === 'delivery' && !currentOrder.address) {
      throw new Error('Delivery address is required');
    }

    if (currentOrder.orderType === 'pickup' && !currentOrder.locationId) {
      throw new Error('Pickup location is required');
    }

    const orderId = generateOrderId();
    const createdAt = new Date();
    const estimatedDeliveryTime = calculateEstimatedDelivery(createdAt);

    const order: Order = {
      id: orderId,
      cart,
      contactInfo: currentOrder.contactInfo,
      orderType: currentOrder.orderType,
      address: currentOrder.address,
      locationId: currentOrder.locationId,
      scheduledTime: currentOrder.scheduledTime,
      paymentMethod: currentOrder.paymentMethod,
      status: 'pending',
      createdAt,
      estimatedDeliveryTime,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save order to localStorage for persistence
    try {
      const existingOrders = localStorage.getItem('golden-wok-orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('golden-wok-orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Failed to save order:', error);
    }

    return order;
  };

  const resetOrder = () => {
    setCurrentOrder(null);
  };

  const value: OrderContextType = {
    currentOrder,
    setContactInfo,
    setOrderType,
    setAddress,
    setLocationId,
    setScheduledTime,
    submitOrder,
    resetOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
