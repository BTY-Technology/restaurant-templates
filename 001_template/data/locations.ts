import { Location } from '@/types/location';

export const locations: Location[] = [
  {
    id: 'downtown',
    name: 'Golden Wok Downtown',
    address: {
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    phone: '+1 (415) 555-0123',
    email: 'downtown@goldenwok.com',
    hours: [
      { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Saturday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
    ],
    features: [
      'Dine-in',
      'Takeout',
      'Delivery',
      'Outdoor Seating',
      'Private Dining Room',
      'Full Bar',
      'Wheelchair Accessible',
    ],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    ],
    isMainLocation: true,
  },
  {
    id: 'mission',
    name: 'Golden Wok Mission',
    address: {
      street: '456 Valencia Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
    },
    coordinates: {
      lat: 37.7599,
      lng: -122.4204,
    },
    phone: '+1 (415) 555-0456',
    email: 'mission@goldenwok.com',
    hours: [
      { day: 'Monday', open: '11:30 AM', close: '9:30 PM' },
      { day: 'Tuesday', open: '11:30 AM', close: '9:30 PM' },
      { day: 'Wednesday', open: '11:30 AM', close: '9:30 PM' },
      { day: 'Thursday', open: '11:30 AM', close: '9:30 PM' },
      { day: 'Friday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Saturday', open: '12:00 PM', close: '10:30 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
    ],
    features: [
      'Dine-in',
      'Takeout',
      'Delivery',
      'Outdoor Seating',
      'Family Friendly',
      'Wheelchair Accessible',
    ],
    images: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    ],
    isMainLocation: false,
  },
  {
    id: 'marina',
    name: 'Golden Wok Marina',
    address: {
      street: '789 Chestnut Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94123',
      country: 'USA',
    },
    coordinates: {
      lat: 37.8021,
      lng: -122.4366,
    },
    phone: '+1 (415) 555-0789',
    email: 'marina@goldenwok.com',
    hours: [
      { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Sunday', open: '11:00 AM', close: '10:00 PM' },
    ],
    features: [
      'Dine-in',
      'Takeout',
      'Delivery',
      'Bay View',
      'Full Bar',
      'Private Events',
      'Valet Parking',
      'Wheelchair Accessible',
    ],
    images: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    ],
    isMainLocation: false,
  },
];

export const getMainLocation = (): Location => {
  return locations.find(loc => loc.isMainLocation) || locations[0];
};

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};

export const getAllLocations = (): Location[] => {
  return locations;
};
