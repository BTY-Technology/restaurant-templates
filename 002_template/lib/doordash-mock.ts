import {
  DoorDashOrderRequest,
  DoorDashOrderResponse,
  DoorDashOrderStatus,
  OrderStatus,
} from '@/types';
import { generateId } from '@/utils/formatting';

/**
 * Mock DoorDash API - simulates DoorDash integration
 * In production, this would make real API calls to DoorDash
 */

const mockDashers = [
  { name: 'Alex M.', phone: '(503) 555-0123' },
  { name: 'Jordan K.', phone: '(503) 555-0124' },
  { name: 'Taylor P.', phone: '(503) 555-0125' },
  { name: 'Casey R.', phone: '(503) 555-0126' },
];

/**
 * Create a mock DoorDash order
 */
export const createDoorDashOrder = async (
  request: DoorDashOrderRequest
): Promise<DoorDashOrderResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const randomDasher = mockDashers[Math.floor(Math.random() * mockDashers.length)];
  const orderId = `DD-${generateId()}`;
  const estimatedDeliveryTime = Math.floor(Math.random() * 15) + 25; // 25-40 minutes

  return {
    orderId,
    estimatedDeliveryTime,
    trackingUrl: `/order/${orderId}/track`,
    dasherName: randomDasher.name,
    dasherPhone: randomDasher.phone,
  };
};

/**
 * Get mock DoorDash order status
 */
export const getDoorDashOrderStatus = async (
  orderId: string
): Promise<DoorDashOrderStatus> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock status progression based on time
  const now = Date.now();
  const orderTime = parseInt(orderId.split('-')[1]?.split('-')[0] || '0', 10);
  const elapsedMinutes = (now - orderTime) / 1000 / 60;

  let status: OrderStatus = 'created';
  let estimatedTimeRemaining = 35;

  if (elapsedMinutes > 20) {
    status = 'delivered';
    estimatedTimeRemaining = 0;
  } else if (elapsedMinutes > 15) {
    status = 'out_for_delivery';
    estimatedTimeRemaining = Math.max(0, 35 - elapsedMinutes);
  } else if (elapsedMinutes > 10) {
    status = 'ready';
    estimatedTimeRemaining = Math.max(5, 35 - elapsedMinutes);
  } else if (elapsedMinutes > 2) {
    status = 'preparing';
    estimatedTimeRemaining = Math.max(10, 35 - elapsedMinutes);
  } else {
    status = 'confirmed';
    estimatedTimeRemaining = 35;
  }

  // Mock dasher location (moving towards destination)
  const dasherLocation =
    status === 'out_for_delivery'
      ? {
          lat: 45.5202 + (Math.random() - 0.5) * 0.01,
          lng: -122.6742 + (Math.random() - 0.5) * 0.01,
        }
      : undefined;

  return {
    orderId,
    status,
    estimatedTimeRemaining: Math.floor(estimatedTimeRemaining),
    dasherLocation,
  };
};

/**
 * Cancel mock DoorDash order
 */
export const cancelDoorDashOrder = async (orderId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // In real implementation, would check if order can be cancelled
  return true;
};

/**
 * Get human-readable status text
 */
export const getOrderStatusText = (status: OrderStatus): string => {
  const statusTexts: Record<OrderStatus, string> = {
    created: 'Order Created',
    confirmed: 'Order Confirmed',
    preparing: 'Being Prepared',
    ready: 'Ready for Pickup',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    completed: 'Completed',
  };

  return statusTexts[status] || 'Unknown';
};

/**
 * Get status progress percentage
 */
export const getOrderStatusProgress = (status: OrderStatus): number => {
  const progressMap: Record<OrderStatus, number> = {
    created: 10,
    confirmed: 25,
    preparing: 50,
    ready: 75,
    out_for_delivery: 90,
    delivered: 100,
    completed: 100,
  };

  return progressMap[status] || 0;
};
