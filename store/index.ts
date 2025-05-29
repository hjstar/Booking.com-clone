import { create } from 'zustand';
import { Hotel } from '@/data/types';

type BookingStore = {
  hotels: Hotel[];
  hotel: Hotel | null;
  selectedDates: {
    startDate: Date;
    endDate: Date;
  } | null;
  setHotels: (hotels: Hotel[]) => void;
  setHotel: (hotel: Hotel) => void;
  setSelectedDates: (dates: { startDate: Date; endDate: Date }) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  hotels: [],
  hotel: null,
  selectedDates: null,
  setHotels: (hotels) => set({ hotels }),
  setHotel: (hotel) => set({ hotel }),
  setSelectedDates: (selectedDates) => set({ selectedDates }),
}));