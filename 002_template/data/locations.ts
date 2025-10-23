import { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'downtown',
    name: 'Smash & Stack Downtown',
    address: '123 Main Street',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    phone: '(503) 555-SMAS',
    coordinates: {
      lat: 45.5202,
      lng: -122.6742,
    },
    hours: {
      Monday: '11:00 AM - 10:00 PM',
      Tuesday: '11:00 AM - 10:00 PM',
      Wednesday: '11:00 AM - 10:00 PM',
      Thursday: '11:00 AM - 10:00 PM',
      Friday: '11:00 AM - 11:00 PM',
      Saturday: '10:00 AM - 11:00 PM',
      Sunday: '10:00 AM - 9:00 PM',
    },
    features: ['Outdoor Seating', 'WiFi', 'Beer & Wine', 'Parking'],
  },
  {
    id: 'pearl-district',
    name: 'Smash & Stack Pearl District',
    address: '456 Pearl Ave',
    city: 'Portland',
    state: 'OR',
    zip: '97209',
    phone: '(503) 555-PERL',
    coordinates: {
      lat: 45.5272,
      lng: -122.6819,
    },
    hours: {
      Monday: '11:00 AM - 9:00 PM',
      Tuesday: '11:00 AM - 9:00 PM',
      Wednesday: '11:00 AM - 9:00 PM',
      Thursday: '11:00 AM - 9:00 PM',
      Friday: '11:00 AM - 10:00 PM',
      Saturday: '10:00 AM - 10:00 PM',
      Sunday: '10:00 AM - 8:00 PM',
    },
    features: ['Drive-Thru', 'Mobile Ordering', 'WiFi', 'Parking'],
  },
  {
    id: 'hawthorne',
    name: 'Smash & Stack Hawthorne',
    address: '789 Hawthorne Blvd',
    city: 'Portland',
    state: 'OR',
    zip: '97214',
    phone: '(503) 555-HAWN',
    coordinates: {
      lat: 45.5118,
      lng: -122.6208,
    },
    hours: {
      Monday: '11:00 AM - 10:00 PM',
      Tuesday: '11:00 AM - 10:00 PM',
      Wednesday: '11:00 AM - 10:00 PM',
      Thursday: '11:00 AM - 10:00 PM',
      Friday: '11:00 AM - 11:00 PM',
      Saturday: '10:00 AM - 11:00 PM',
      Sunday: '10:00 AM - 9:00 PM',
    },
    features: ['Outdoor Seating', 'WiFi', 'Bike Parking', 'Late Night'],
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};

export const getDefaultLocation = (): Location => {
  return locations[0];
};
