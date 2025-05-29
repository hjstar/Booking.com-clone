"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useBookingStore } from '@/store';
import type {Hotel} from '@/data/types';
import Asearch from './Search';
import FinalBooking from './finalBooking';
import { useParams } from 'next/navigation';

const BookingPage = () => {
  const { id } = useParams();
  const { hotel, selectedDates, setHotel, hotels } = useBookingStore();

  useEffect(() => {
    // Find the hotel in the store that matches the ID from params
    const selectedHotel = hotels.find(h => h.id === id);
    if (selectedHotel) {
      setHotel(selectedHotel);
    }
  }, [id, hotels, setHotel]);

  const popularFacilities = [
    "Airport shuttle",
    "Fitness centre",
    "Room service",
    "Non-smoking rooms",
    "Restaurant",
    "Free parking",
    "Family rooms",
    "24-hour front desk",
    "Terrace",
    "Breakfast"
  ];

  if (!hotel || !selectedDates) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-blue-800">{hotel.name}</h1>
                <p className="text-gray-600 mt-2">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {hotel.location.address}
                  </span>
                </p>
              </div>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                onClick={() => alert(`Booking confirmed for ${hotel.name}`)}
              >
                Reserve
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="lg:w-3/4 h-96 relative">
                <Image
                  src={hotel.images[0]}
                  alt={`${hotel.name} featured image`}
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="lg:w-1/4 h-96 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  title="Hotel Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${hotel.location.coordinates[0]},${hotel.location.coordinates[1]}&z=15&output=embed`}
                  className="border-0"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 p-6">
              <div className="lg:w-2/3">
                <h2 className="text-xl font-bold mb-4">About this property</h2>
                <div className="space-y-4 text-gray-700">
                  <p>{hotel.description}</p>
                  <p><span className="font-bold">Location:</span> {hotel.location.city}, {hotel.location.country}</p>
                </div>
              </div>

              <div className="lg:w-1/3">
                <h3 className="text-xl font-bold mb-4">Most popular facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularFacilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Availability</h2>
            
            <div className="mb-6 w-[75%]">
              <Asearch />
            </div>

            <FinalBooking 
              hotel={hotel} 
              selectedDates={{
                startDate: selectedDates.startDate,
                endDate: selectedDates.endDate
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;