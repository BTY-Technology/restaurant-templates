export interface Hours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  hours: Hours[];
  features: string[];
  images: string[];
  isMainLocation: boolean;
}
