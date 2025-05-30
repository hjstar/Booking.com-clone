"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Hotel } from '@/data/types';
import { useBookingStore } from '@/store';
import { addDays } from 'date-fns';

type Props = {
  hotel: Hotel;
  className?: string;
};

const RoomCard = ({ hotel, className = '' }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { setSelectedHotel, setBookingDates } = useBookingStore();

  const imageUrl = hotel.images?.[0] || '/default-hotel.jpg';

  const handleBookNow = () => {
    try {
      setSelectedHotel(hotel);
      setBookingDates({
        startDate: new Date(),
        endDate: addDays(new Date(), 3)
      });
      router.push(`/booking/${hotel.id}`);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`relative h-[380px] min-w-[280px] flex-shrink-0 border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${className}`}
        aria-label={`View details for ${hotel.name}`}
      >
        <div className="relative w-full h-[200px]">
          <Image
            src={imageUrl}
            alt={`${hotel.name} featured image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 280px"
            priority
          />
        </div>

        <div className='p-4'>
          <h1 className='text-lg font-bold truncate'>{hotel.name}</h1>
          <p className='text-sm text-gray-600 truncate'>
            {hotel.location.city}, {hotel.location.country}
          </p>

          <div className='flex items-center justify-between mt-2'>
            <div className='flex items-center'>
              <span className='text-white font-semibold bg-blue-500 text-base mr-1'>
                {hotel.rating.toFixed(1)} ★
              </span>
              <span className='text-xs text-gray-500'>({hotel.stars} stars)</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 flex flex-row items-center space-x-2">
            <p className="text-sm text-red-500 line-through">
              ${(2 * hotel.price).toLocaleString()}
            </p>
            <p className="text-base font-semibold text-black">
              ${hotel.price.toLocaleString()}
              <span className="text-xs text-gray-500 ml-1">/ night</span>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full">
                <Image
                  src={imageUrl}
                  alt={hotel.name}
                  fill
                  className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold">{hotel.name}</h1>
                    <p className="text-gray-600 text-sm">
                      {hotel.location.city}, {hotel.location.country}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{hotel.description}</p>

                <div className="mt-4">
                  <h3 className="font-semibold text-base mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {hotel.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-base mb-1">Policies</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>Check-in: {hotel.policies.checkIn}</p>
                    <p>Check-out: {hotel.policies.checkOut}</p>
                    <p>Cancellation: {hotel.policies.cancellation}</p>
                    <p>Pets allowed: {hotel.policies.pets ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-black">${hotel.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">per night</p>
                  </div>
                  <button
                    onClick={handleBookNow}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm hover:shadow-md text-sm"
                    aria-label={`Book ${hotel.name}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;