import { Cart } from './cart';

export type OrderType = 'delivery' | 'pickup';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'completed';

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  deliveryInstructions?: string;
  instructions?: string; // Alias for deliveryInstructions
}

export interface Order {
  id: string;
  cart: Cart;
  contactInfo: ContactInfo;
  orderType: OrderType;
  address?: Address; // Only required for delivery
  locationId?: string; // Required for pickup
  scheduledTime?: Date;
  paymentMethod?: 'credit-card' | 'cash' | 'doordash';
  status: OrderStatus;
  doordashOrderId?: string; // If handed off to DoorDash
  createdAt: Date;
  estimatedDeliveryTime?: Date;
}

export interface OrderContextType {
  currentOrder: Partial<Order> | null;
  setContactInfo: (info: ContactInfo) => void;
  setOrderType: (type: OrderType) => void;
  setAddress: (address: Address) => void;
  setLocationId: (locationId: string) => void;
  setScheduledTime: (time: Date) => void;
  submitOrder: (cart: Cart) => Promise<Order>;
  resetOrder: () => void;
}

export interface DoorDashHandoffRequest {
  orderId: string;
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deliveryAddress: Address;
  contactInfo: ContactInfo;
  orderTotal: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface DoorDashHandoffResponse {
  success: boolean;
  doordashOrderId: string;
  estimatedPickupTime: Date;
  estimatedDeliveryTime: Date;
  trackingUrl: string;
  dasherId?: string;
}

export interface DoorDashStatusResponse {
  orderId: string;
  status: OrderStatus;
  dasherName?: string;
  dasherPhone?: string;
  dasherLocation?: {
    lat: number;
    lng: number;
  };
  estimatedDeliveryTime: Date;
  lastUpdated: Date;
}
