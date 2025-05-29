// components/Rooms.tsx
"use client" // Enables client-side rendering for this component

import React, { useRef } from 'react';
import { hotels } from '@/data/data'; // Import hotel data from a local file
import RoomCard from './RoomCard'; // Import the RoomCard component

const Rooms = () => {
  // Ref to access the scrollable room container DOM element
  const roomContainerRef = useRef<HTMLDivElement>(null);

  // Amount to scroll when clicking the left or right button
  const scrollAmount = 304; // 280px card + 24px gap (based on Tailwind CSS spacing)

  // Scrolls the container to the left
  const scrollLeft = () => {
    if (roomContainerRef.current) {
      roomContainerRef.current.scrollBy({
        left: -scrollAmount, // Negative to scroll left
        behavior: 'smooth',  // Smooth scroll animation
      });
    }
  };

  // Scrolls the container to the right
  const scrollRight = () => {
    if (roomContainerRef.current) {
      roomContainerRef.current.scrollBy({
        left: scrollAmount, // Positive to scroll right
        behavior: 'smooth', // Smooth scroll animation
      });
    }
  };

  return (
    <div className='bg-white pt-8 pb-0 px-4 md:px-8 relative'>

      {/* Section Title and Subtitle */}
      <h1 className='text-2xl font-bold mb-4 text-black '>Browse Our Rooms</h1>
      <p className='text-xl text-gray-600  mb-8'>Find the perfect room for your stay</p>

      <div className='container mx-auto relative'>
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          {/* Left arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Container for Room Cards */}
        <div
          ref={roomContainerRef}
          className='flex overflow-x-auto pb-4 gap-6 px-4 scrollbar-hide'
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Loop through hotel data and render RoomCard components */}
          {hotels.map((data) => (
            // Important: prop name should be 'hotel', not 'Hotel'
            <RoomCard key={data.id} hotel={data} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          {/* Right arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Rooms;
