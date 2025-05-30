"use client";
import React, { useRef, useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { useBookingStore } from "@/store";

const Rooms = () => {
  const roomContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const { filteredHotels, searchPerformed } = useBookingStore();

  const checkScrollable = () => {
    if (roomContainerRef.current) {
      setShowScrollButtons(
        roomContainerRef.current.scrollWidth > roomContainerRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [filteredHotels]);

  const scroll = (direction: "left" | "right") => {
    if (roomContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      roomContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const hotelsToDisplay = searchPerformed ? filteredHotels : useBookingStore.getState().hotels;

  return (
    <div className="bg-white pt-8 pb-12 px-4 md:px-8 relative">
      <div className="container mx-auto">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold mb-2">Browse Our Rooms</h2>
          <p className="text-xl text-gray-600">Find the perfect room for your stay</p>
        </div>
      </div>

      <div className="container mx-auto relative">
        {/* Scroll buttons - only show when content overflows */}
        {showScrollButtons && (
          <>
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 shadow-md hover:bg-gray-100 transition-colors items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 shadow-md hover:bg-gray-100 transition-colors items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Scrollable container */}
        <div
          ref={roomContainerRef}
          className="flex overflow-x-auto pb-8 gap-6 px-2 md:px-4 scrollbar-hide scroll-smooth"
          onScroll={checkScrollable}
          tabIndex={0}
          aria-label="Hotel rooms carousel"
        >
          {hotelsToDisplay.length > 0 ? (
            hotelsToDisplay.map((data) => (
              <div key={data.id} className="flex-shrink-0 w-[280px] sm:w-[300px]">
                <RoomCard hotel={data} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 px-4">
              <p className="text-gray-500 text-lg">No rooms found matching your filters</p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Mobile scroll indicators */}
        <div className="sm:hidden flex justify-center gap-2 mt-4">
          {hotelsToDisplay.length > 0 &&
            Array.from({ length: Math.min(5, hotelsToDisplay.length) }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-300"
                aria-hidden="true"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;