// Core menu item types
export type Category = 'Burgers' | 'Chicken' | 'Sides' | 'Shakes' | 'Featured';

export type DietaryBadge = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Spicy' | 'New' | 'Popular';

export type Allergen =
  | 'Dairy'
  | 'Eggs'
  | 'Fish'
  | 'Shellfish'
  | 'Tree Nuts'
  | 'Peanuts'
  | 'Wheat'
  | 'Soy';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  images?: string[]; // Additional images for detail page
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  ingredients: string[];
  allergens: Allergen[];
  dietaryBadges: DietaryBadge[];
  popularity: number; // For sorting
  featured?: boolean;
  relatedItems?: string[]; // IDs of related items
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number; // Additional price (0 if no additional cost)
}

// Cart types
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: string | string[] }; // customization id -> selected option id(s)
  subtotal: number;
  id: string; // Unique cart item ID
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
}

// Location types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    [key: string]: string; // day -> hours
  };
  features: string[]; // e.g., "Outdoor Seating", "Drive-Thru"
}

// Order types
export type OrderType = 'pickup' | 'delivery';
export type OrderStatus = 'created' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'completed';

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  orderType: OrderType;
  location: Location;
  deliveryAddress?: DeliveryAddress;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  estimatedTime: number; // minutes
  placedAt: Date;
  doordashOrderId?: string; // Mock DoorDash integration
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface DeliveryAddress {
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  instructions?: string;
}

// Team member type for About Us page
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Filter and sort types
export interface MenuFilters {
  categories: Category[];
  search?: string;
  priceRange?: [number, number];
  dietary?: DietaryBadge[];
}

export type SortOption = 'popularity' | 'price-low' | 'price-high' | 'name';

// Newsletter subscription
export interface NewsletterSubscription {
  email: string;
  subscribed: boolean;
}

// Mock DoorDash types
export interface DoorDashOrderRequest {
  items: CartItem[];
  deliveryAddress: DeliveryAddress;
  customer: CustomerInfo;
  restaurantId: string;
}

export interface DoorDashOrderResponse {
  orderId: string;
  estimatedDeliveryTime: number; // minutes
  trackingUrl: string;
  dasherName?: string;
  dasherPhone?: string;
}

export interface DoorDashOrderStatus {
  orderId: string;
  status: OrderStatus;
  estimatedTimeRemaining: number;
  dasherLocation?: {
    lat: number;
    lng: number;
  };
}
