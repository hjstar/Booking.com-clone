export type Hotel = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  stars: number;
  amenities: string[];
  images: string[];
  location: {
    city: string;
    country: string;
    address: string;
    coordinates: [number, number];
  };
  reviews: Review[];
  rooms: Room[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: boolean;
  };
};

export type Room = {
  id: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  beds: string;
  amenities: string[];
  images: string[];
  available: number;
  dailyAvailability: DailyRoomAvailability[]; // NEW
};

export type DailyRoomAvailability = {
  date: string; // e.g. '2025-06-01'
  price: number;
  available: number;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
};

export type Destination = {
  id: string;
  city: string;
  country: string;
  image: string;
  propertiesCount: number;
};

export type PropertyType = {
  id: string;
  type: string;
  image: string;
  description: string;
};
// ... your existing types

export type RoomCardProps = {
  imageUrl: string;
  name: string;
  location: string;
  pricePerNight: number;
};