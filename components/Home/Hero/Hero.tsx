"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HeroSearch from "./Search";
import Link from "next/link";

type Destination = {
  name: string;
  country: string;
  image: string;
};

type PropertyType = {
  type: string;
  image: string;
};

const Hero = () => {
  // Data configuration
  const destinations: Destination[] = [
    { name: "New Delhi", country: "India", image: "/images/Delhi.jpg" },
    { name: "Bangalore", country: "India", image: "/images/Banglore.jpg" },
    { name: "Mumbai", country: "India", image: "/images/Mumbai.jpg" },
    { name: "Chennai", country: "India", image: "/images/chennai.jpg" },
    { name: "Varanasi", country: "India", image: "/images/Varanasi.jpg" },
  ];

  const propertyTypes: PropertyType[] = [
    { type: "Hotels", image: "/images/Hotels.jpeg" },
    { type: "Apartments", image: "/images/Apartments.jpeg" },
    { type: "Resorts", image: "/images/Resorts.jpeg" },
    { type: "Villas", image: "/images/Villas.jpeg" },
    { type: "Cabins", image: "/images/Cabins.jpeg" },
    { type: "Cottage", image: "/images/Cottage.jpeg" },
    { type: "Glamping", image: "/images/Glamping.jpeg" },
  ];

  // Refs
  const propertyContainerRef = useRef<HTMLDivElement>(null!);
  const destinationContainerRef = useRef<HTMLDivElement>(null!);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Hero Banner Section - Hidden on small screens */}
      <section className="relative h-[80vh] min-h-[600px] w-full hidden sm:block">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 h-full w-full -z-10">
          <Image
            src="https://q-xx.bstatic.com/xdata/images/xphoto/2880x868/509350578.jpeg?k=0235723e5611f00b06b180b9dca15fd588c2d7ec65096a8944eae211ec7194d9&o="
            alt="Vacation background"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: "center center",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content - Text and button positioned on the image */}
        <div className="relative z-10 flex flex-col h-full container mx-auto px-4">
          <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
              <strong>Find your next stay</strong>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-5 sm:mb-6 text-white drop-shadow-lg">
              Search low prices on hotels, homes and much more
            </p>
            <Link href="/rooms">
              <button
                className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Browse our rooms"
              >
                Browse our Rooms
              </button>
            </Link>
          </div>
        </div>

        {/* Search Component */}
        <div className="absolute bottom-0 left-0 right-0 px-4 transform translate-y-1/2">
          <div className="container mx-auto">
            <div className="max-w-full mx-auto p-4">
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-only search section */}
      <div className="sm:hidden p-4 bg-white">
        <HeroSearch />
      </div>

      {/* Content below hero section */}
      <div className="pt-12 sm:pt-24 bg-white">
        {/* Trending Destinations Section */}
        <section className="bg-white py-12 px-4 md:px-8">
          <div className="container mx-auto">
            <header className="text-left mb-10 hidden sm:block">
              <h2 className="text-3xl font-bold mb-2">Trending destinations</h2>
              <p className="text-xl text-gray-600">
                Most popular choices for travelers from India
              </p>
            </header>

            {/* Desktop grid layout */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {destinations.slice(0, 2).map((destination) => (
                  <div key={destination.name} className="flex flex-col">
                    <div className="relative w-full h-[220px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-2">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{destination.name}</h3>
                      <p className="text-sm text-gray-500">{destination.country}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {destinations.slice(2, 5).map((destination) => (
                  <div key={destination.name} className="flex flex-col">
                    <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-2">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{destination.name}</h3>
                      <p className="text-sm text-gray-500">{destination.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile horizontal scrolling destinations */}
            <div className="relative sm:hidden">
              <button
                onClick={() => handleScroll(destinationContainerRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon />
              </button>

              <div
                ref={destinationContainerRef}
                className="flex overflow-x-auto pb-4 gap-4 px-2 scrollbar-hide"
              >
                {destinations.map((destination) => (
                  <div
                    key={destination.name}
                    className="flex flex-col min-w-[200px] flex-shrink-0"
                  >
                    <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-2">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 200px"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-lg font-bold">{destination.name}</h3>
                      <p className="text-sm text-gray-500">{destination.country}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleScroll(destinationContainerRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Scroll right"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="bg-white py-12 px-4 md:px-8">
          <div className="container mx-auto relative">
            <header className="mb-10 text-left">
              <h2 className="text-3xl font-bold mb-2">Browse by Property type</h2>
            </header>

            <div className="relative">
              <button
                onClick={() => handleScroll(propertyContainerRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon />
              </button>

              <div
                ref={propertyContainerRef}
                className="flex overflow-x-auto pb-4 gap-4 px-2 sm:px-4 scrollbar-hide"
              >
                {propertyTypes.map((property) => (
                  <div
                    key={property.type}
                    className="flex flex-col items-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] flex-shrink-0"
                  >
                    <div className="relative w-[140px] sm:w-44 md:w-48 h-[140px] sm:h-44 md:h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-2">
                      <Image
                        src={property.image}
                        alt={`Image of ${property.type}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 200px"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center">
                      {property.type}
                    </h3>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleScroll(propertyContainerRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Scroll right"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Chevron icons
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Hero;