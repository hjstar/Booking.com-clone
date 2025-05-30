import { create } from 'zustand';
import { Hotel, Room } from '@/data/types';
import { addDays, format } from 'date-fns';
import { hotels } from '@/data/data';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

type GuestOptions = {
  adults: number;
  children: number;
  rooms: number;
};

type BookingState = {
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;
  bookingDetails: {
    dateRange: DateRange;
    guests: GuestOptions;
    specialRequests: string;
  };
};

type BookingStore = {
  // Data state
  hotels: Hotel[];
  filteredHotels: Hotel[];
  
  // Filter state
  filters: {
    destination: string;
    dateRange: DateRange;
    guests: GuestOptions;
  };
  searchPerformed: boolean;
  
  // Booking state
  booking: BookingState | null;

  // Filter actions
  setFilters: (filters: Partial<BookingStore['filters']>) => void;
  setSearchPerformed: (val: boolean) => void;
  
  // Booking actions
  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: Room) => void;
  setBookingDates: (dates: DateRange) => void;
  setBookingGuests: (guests: GuestOptions) => void;
  setSpecialRequests: (requests: string) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  // Initial data state
  hotels: hotels,
  filteredHotels: hotels,
  
  // Initial filter state
  searchPerformed: false,
  filters: {
    destination: '',
    dateRange: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
    guests: { adults: 1, children: 0, rooms: 1 }
  },
  
  // Initial booking state
  booking: null,

  // Filter actions
  setFilters: (filters) => {
    set(state => {
      const newFilters = { ...state.filters, ...filters };
      const filtered = filterHotels(state.hotels, newFilters);
      return { 
        filters: newFilters,
        filteredHotels: filtered,
        searchPerformed: true
      };
    });
  },
  
  setSearchPerformed: (val) => set({ searchPerformed: val }),

  // Booking actions
  setSelectedHotel: (hotel) => set(state => ({
    booking: {
      ...(state.booking || initializeBookingState()),
      selectedHotel: hotel,
      selectedRoom: null
    }
  })),

  setSelectedRoom: (room) => set(state => ({
    booking: {
      ...(state.booking || initializeBookingState()),
      selectedRoom: room
    }
  })),

  setBookingDates: (dates) => set(state => ({
    booking: {
      ...(state.booking || initializeBookingState()),
      bookingDetails: {
        ...(state.booking?.bookingDetails || initializeBookingDetails()),
        dateRange: dates
      }
    }
  })),

  setBookingGuests: (guests) => set(state => ({
    booking: {
      ...(state.booking || initializeBookingState()),
      bookingDetails: {
        ...(state.booking?.bookingDetails || initializeBookingDetails()),
        guests
      }
    }
  })),

  setSpecialRequests: (requests) => set(state => ({
    booking: {
      ...(state.booking || initializeBookingState()),
      bookingDetails: {
        ...(state.booking?.bookingDetails || initializeBookingDetails()),
        specialRequests: requests
      }
    }
  })),

  clearBooking: () => set({ booking: null })
}));

// Helper functions
function initializeBookingState(): BookingState {
  return {
    selectedHotel: null,
    selectedRoom: null,
    bookingDetails: initializeBookingDetails()
  };
}

function initializeBookingDetails() {
  return {
    dateRange: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3)
    },
    guests: { adults: 1, children: 0, rooms: 1 },
    specialRequests: ''
  };
}

function filterHotels(hotels: Hotel[], filters: BookingStore['filters']) {
  return hotels.filter(hotel => {
    const matchesLocation = !filters.destination || 
      hotel.location.city.toLowerCase().includes(filters.destination.toLowerCase()) ||
      hotel.location.country.toLowerCase().includes(filters.destination.toLowerCase());
    
    const hasAvailableRooms = hotel.rooms.some(room => {
      const hasCapacity = room.capacity >= (filters.guests.adults + filters.guests.children);
      const isAvailable = isRoomAvailable(room, filters.dateRange.startDate, filters.dateRange.endDate);
      return hasCapacity && isAvailable;
    });
    
    return matchesLocation && hasAvailableRooms;
  });
}

function isRoomAvailable(room: Room, checkIn: Date, checkOut: Date) {
  const dates = getDatesInRange(checkIn, checkOut);
  return dates.every(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dailyAvail = room.dailyAvailability.find(d => d.date === dateStr);
    return dailyAvail && dailyAvail.available >= 1;
  });
}

function getDatesInRange(start: Date, end: Date) {
  const dates: Date[] = [];
  let current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }
  return dates;
}