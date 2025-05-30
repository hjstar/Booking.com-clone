"use client"
import React, { useRef } from 'react';
import RoomCard from './RoomCard';
import { useBookingStore } from '@/store';

const Rooms = () => {
  const roomContainerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 304;
  const { filteredHotels, searchPerformed } = useBookingStore();

  const scrollLeft = () => {
    if (roomContainerRef.current) {
      roomContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (roomContainerRef.current) {
      roomContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const hotelsToDisplay = searchPerformed ? filteredHotels : useBookingStore.getState().hotels;

  return (
    <div className='bg-white pt-8 pb-0 px-4 md:px-8 relative'>
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold mb-4 text-black'>Browse Our Rooms</h1>
        <p className='text-lg text-gray-600 mb-8'>Find the perfect room for your stay</p>
      </div>

      <div className='container mx-auto relative'>
        {/* Left Scroll Button */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={scrollLeft}
            className="bg-white rounded-full w-10 h-10 shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={roomContainerRef}
          className='flex overflow-x-auto pb-8 gap-6 px-4 scrollbar-hide scroll-smooth'
        >
          {hotelsToDisplay.length > 0 ? (
            hotelsToDisplay.map((data) => (
              <div key={data.id} className='flex-shrink-0 w-[280px]'>
                <RoomCard hotel={data} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-gray-500">No rooms found matching your filters</p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Right Scroll Button */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={scrollRight}
            className="bg-white rounded-full w-10 h-10 shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;