"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import HeroSearch from './Search';
import Link from 'next/link';

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
    { name: "Varanasi", country: "India", image: "/images/varanasi.jpg" }
  ];

  const propertyTypes: PropertyType[] = [
    { type: "Hotels", image: "/images/Hotels.jpeg" },
    { type: "Apartments", image: "/images/Apartments.jpeg" },
    { type: "Resorts", image: "/images/Resorts.jpeg" },
    { type: "Villas", image: "/images/Villas.jpeg" },
    { type: "Cabins", image: "/images/Cabins.jpeg" },
    { type: "Cottage", image: "/images/Cottage.jpeg" },
    { type: "Glamping", image: "/images/Glamping.jpeg" }
  ];

  // Refs and handlers
  const propertyContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (propertyContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      propertyContainerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Hero Banner Section with fixed background */}
      <section className="relative h-[80vh] min-h-[600px] w-full">
        {/* Fixed Background Image with overlay */}
        <div className="absolute inset-0 h-full w-full -z-10">
          <Image
            src="https://q-xx.bstatic.com/xdata/images/xphoto/2880x868/509350578.jpeg?k=0235723e5611f00b06b180b9dca15fd588c2d7ec65096a8944eae211ec7194d9&o="
            alt="Vacation background"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: 'center center'
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content - Text positioned on the image */}
        <div className="relative z-10 flex flex-col h-full container mx-auto px-4">
          <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Recharge
            </h1>
            <p className="text-2xl md:text-3xl mb-6 text-white drop-shadow-lg">
              in a vacation home
            </p>
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              All together, in a place that's just for you
            </p>
            <Link href="/rooms">
              <button 
                className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              <HeroSearch className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content below hero section */}
      <div className="pt-24 bg-white">
        {/* Trending Destinations Section */}
        <section className="bg-white py-12 px-4 md:px-8">
          <div className="container mx-auto">
            <header className="text-left mb-10">
              <h2 className="text-3xl font-bold mb-2">Trending destinations</h2>
              <p className="text-xl text-gray-600">
                Most popular choices for travelers from India
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {destinations.slice(0, 2).map((destination) => (
                <DestinationCard key={destination.name} destination={destination} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {destinations.slice(2).map((destination) => (
                <DestinationCard key={destination.name} destination={destination} />
              ))}
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
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon />
              </button>

              <div 
                ref={propertyContainerRef}
                className="flex overflow-x-auto pb-4 gap-6 px-4 scrollbar-hide"
              >
                {propertyTypes.map((property) => (
                  <PropertyTypeCard key={property.type} property={property} />
                ))}
              </div>

              <button 
                onClick={() => handleScroll('right')}
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

// Sub-components remain the same
const DestinationCard = ({ destination }: { destination: Destination }) => (
  <article className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
    <div className="relative h-64 w-full">
      <Image 
        src={destination.image} 
        alt={destination.name} 
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="absolute inset-0 p-4 flex flex-col items-start justify-start">
      <h3 className="text-white text-lg font-bold">{destination.name}</h3>
      <p className="text-white/90 text-sm">{destination.country}</p>
    </div>
  </article>
);

const PropertyTypeCard = ({ property }: { property: PropertyType }) => (
  <div className="flex flex-col items-center min-w-[200px] flex-shrink-0">
    <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-2">
      <Image 
        src={property.image} 
        alt={property.type} 
        fill
        className="object-cover"
        sizes="200px"
      />
    </div>
    <h3 className="text-lg font-medium text-gray-800 text-center">{property.type}</h3>
  </div>
);

// Icons remain the same
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Hero;