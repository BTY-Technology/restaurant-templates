import {
  DoorDashHandoffRequest,
  DoorDashHandoffResponse,
  DoorDashStatusResponse,
  OrderStatus,
} from '@/types/order';

/**
 * Mock DoorDash API Integration
 * Simulates the handoff of an order to DoorDash and status polling
 */

const MOCK_API_DELAY = 1500; // Simulate network delay

/**
 * Hand off an order to DoorDash for delivery
 */
export const handoffToDoorDash = async (
  request: DoorDashHandoffRequest
): Promise<DoorDashHandoffResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  // Mock DoorDash order ID generation
  const doordashOrderId = `DD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`.toUpperCase();

  // Calculate estimated times
  const now = new Date();
  const estimatedPickupTime = new Date(now.getTime() + 25 * 60000); // 25 minutes
  const estimatedDeliveryTime = new Date(now.getTime() + 45 * 60000); // 45 minutes

  // Mock tracking URL
  const trackingUrl = `https://doordash.com/track/${doordashOrderId}`;

  // Simulate successful handoff
  return {
    success: true,
    doordashOrderId,
    estimatedPickupTime,
    estimatedDeliveryTime,
    trackingUrl,
  };
};

/**
 * Poll DoorDash for order status updates
 */
export const getDoorDashStatus = async (
  doordashOrderId: string
): Promise<DoorDashStatusResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get the order creation time from the ID (mock extraction)
  const timestamp = parseInt(doordashOrderId.split('-')[1], 10);
  const orderTime = new Date(timestamp);
  const now = new Date();
  const elapsedMinutes = (now.getTime() - orderTime.getTime()) / 60000;

  // Determine status based on elapsed time
  let status: OrderStatus;
  let dasherName: string | undefined;
  let dasherPhone: string | undefined;
  let dasherLocation: { lat: number; lng: number } | undefined;

  if (elapsedMinutes < 5) {
    status = 'confirmed';
  } else if (elapsedMinutes < 20) {
    status = 'preparing';
  } else if (elapsedMinutes < 25) {
    status = 'ready';
    dasherName = 'Mike D.';
    dasherPhone = '+1 (555) 123-4567';
  } else if (elapsedMinutes < 45) {
    status = 'out-for-delivery';
    dasherName = 'Mike D.';
    dasherPhone = '+1 (555) 123-4567';
    // Mock dasher location (moving towards delivery)
    dasherLocation = {
      lat: 37.7749 + (Math.random() - 0.5) * 0.01,
      lng: -122.4194 + (Math.random() - 0.5) * 0.01,
    };
  } else {
    status = 'delivered';
    dasherName = 'Mike D.';
  }

  const estimatedDeliveryTime = new Date(orderTime.getTime() + 45 * 60000);

  return {
    orderId: doordashOrderId,
    status,
    dasherName,
    dasherPhone,
    dasherLocation,
    estimatedDeliveryTime,
    lastUpdated: now,
  };
};

/**
 * Cancel a DoorDash order
 */
export const cancelDoorDashOrder = async (doordashOrderId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock cancellation logic - can only cancel if not picked up yet
  const status = await getDoorDashStatus(doordashOrderId);

  if (status.status === 'confirmed' || status.status === 'preparing' || status.status === 'ready') {
    return true; // Cancellation successful
  }

  return false; // Cannot cancel - already out for delivery
};

/**
 * Get dasher location updates (for real-time tracking)
 */
export const trackDasher = async (
  doordashOrderId: string
): Promise<{ lat: number; lng: number } | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const status = await getDoorDashStatus(doordashOrderId);

  if (status.status === 'out-for-delivery' && status.dasherLocation) {
    return status.dasherLocation;
  }

  return null;
};

/**
 * Estimate delivery time for a given address
 */
export const estimateDeliveryTime = async (
  pickupAddress: { lat: number; lng: number },
  deliveryAddress: { lat: number; lng: number }
): Promise<{ prepTime: number; deliveryTime: number; totalTime: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock distance calculation (simplified)
  const latDiff = Math.abs(pickupAddress.lat - deliveryAddress.lat);
  const lngDiff = Math.abs(pickupAddress.lng - deliveryAddress.lng);
  const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);

  // Mock time estimates
  const prepTime = 20 + Math.floor(Math.random() * 10); // 20-30 minutes
  const deliveryTime = Math.max(10, Math.floor(distance * 1000)); // Based on "distance"
  const totalTime = prepTime + deliveryTime;

  return {
    prepTime,
    deliveryTime,
    totalTime,
  };
};

/**
 * Check if delivery is available for an address
 */
export const checkDeliveryAvailability = async (zipCode: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock availability check - SF zip codes
  const availableZipCodes = [
    '94102', '94103', '94104', '94105', '94107', '94108', '94109', '94110',
    '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94121',
    '94122', '94123', '94124', '94127', '94129', '94130', '94131', '94132',
    '94133', '94134',
  ];

  return availableZipCodes.includes(zipCode.substring(0, 5));
};
