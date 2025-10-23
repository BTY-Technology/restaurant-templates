'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Order, CustomerInfo, DeliveryAddress, OrderType, Location } from '@/types';
import { generateId } from '@/utils/formatting';

interface OrderContextType {
  currentOrder: Order | null;
  createOrder: (
    cart: any,
    customer: CustomerInfo,
    orderType: OrderType,
    location: Location,
    deliveryAddress?: DeliveryAddress
  ) => Order;
  updateOrderStatus: (orderId: string, status: any) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const createOrder = useCallback(
    (
      cart: any,
      customer: CustomerInfo,
      orderType: OrderType,
      location: Location,
      deliveryAddress?: DeliveryAddress
    ): Order => {
      const estimatedTime = orderType === 'pickup' ? 15 : 35;

      const order: Order = {
        id: `ORD-${generateId()}`,
        items: cart.items,
        customer,
        orderType,
        location,
        deliveryAddress,
        subtotal: cart.subtotal,
        tax: cart.tax,
        deliveryFee: orderType === 'delivery' ? cart.deliveryFee : 0,
        total: orderType === 'delivery' ? cart.total : cart.subtotal + cart.tax,
        status: 'created',
        estimatedTime,
        placedAt: new Date(),
      };

      setCurrentOrder(order);
      return order;
    },
    []
  );

  const updateOrderStatus = useCallback((orderId: string, status: any) => {
    setCurrentOrder(prevOrder => {
      if (!prevOrder || prevOrder.id !== orderId) return prevOrder;
      return { ...prevOrder, status };
    });
  }, []);

  const clearOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const value: OrderContextType = {
    currentOrder,
    createOrder,
    updateOrderStatus,
    clearOrder,
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
