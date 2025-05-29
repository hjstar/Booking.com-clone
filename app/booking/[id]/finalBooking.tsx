"use client"
import React, { useState } from 'react';
import { Hotel, Room } from '@/types'; // Assuming your types are defined in a types file

interface FinalBookingProps {
  hotel: Hotel;
  selectedDates: {
    startDate: Date;
    endDate: Date;
  };
}

const FinalBooking: React.FC<FinalBookingProps> = ({ hotel, selectedDates }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const calculateTotalNights = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) return 0;
    const diffTime = Math.abs(selectedDates.endDate.getTime() - selectedDates.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateTotalNights();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 border border-blue-200 rounded-lg overflow-hidden mb-6">
      {/* Room Type Selection */}
      <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-blue-200">
        <div className="bg-blue-600 text-white p-2.5 mb-2.5 rounded text-center">
          Room Type
        </div>
        <div className="flex flex-col gap-2">
          {hotel.rooms.map((room) => (
            <div 
              key={room.id}
              className={`p-2 rounded cursor-pointer ${selectedRoom?.id === room.id ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="font-medium">{room.type}</div>
              <div className="text-sm text-gray-600">{room.beds}</div>
              <div className="text-sm text-gray-600">{room.size} sq. ft.</div>
            </div>
          ))}
        </div>
      </div>

      {/* Number of Guests */}
      <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-blue-200">
        <div className="bg-blue-600 text-white p-2.5 mb-2.5 rounded text-center">
          Number of Guests
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`p-2 rounded cursor-pointer ${numberOfGuests === num ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
              onClick={() => setNumberOfGuests(num)}
            >
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </div>
          ))}
        </div>
      </div>

      {/* Price Information */}
      <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-blue-200">
        <div className="bg-blue-600 text-white p-2.5 mb-2.5 rounded text-center">
          Price Details
        </div>
        <div className="flex flex-col gap-2">
          {selectedRoom ? (
            <>
              <div className="p-2">
                <div className="text-gray-600">Price per night:</div>
                <div className="font-medium">${selectedRoom.price}</div>
              </div>
              <div className="p-2">
                <div className="text-gray-600">Nights:</div>
                <div className="font-medium">{calculateTotalNights()}</div>
              </div>
              <div className="p-2">
                <div className="text-gray-600">Total:</div>
                <div className="font-medium">${calculateTotalPrice()}</div>
              </div>
            </>
          ) : (
            <div className="p-2 text-gray-500">Select a room to see pricing</div>
          )}
        </div>
      </div>

      {/* Your Choices Summary */}
      <div className="flex-1 p-4 border-b lg:border-b-0 lg:border-r border-blue-200">
        <div className="bg-blue-600 text-white p-2.5 mb-2.5 rounded text-center">
          Your Choices
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-2">
            <div className="text-gray-600">Room:</div>
            <div className="font-medium">{selectedRoom?.type || 'Not selected'}</div>
          </div>
          <div className="p-2">
            <div className="text-gray-600">Guests:</div>
            <div className="font-medium">{numberOfGuests}</div>
          </div>
          <div className="p-2">
            <div className="text-gray-600">Dates:</div>
            <div className="font-medium">
              {selectedDates.startDate?.toLocaleDateString()} - {selectedDates.endDate?.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Action */}
      <div className="flex-1 p-4">
        <div className="bg-blue-600 text-white p-2.5 mb-2.5 rounded text-center">
          Complete Booking
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <button
            className={`px-5 py-3 text-white rounded-lg w-full ${
              selectedRoom
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
            disabled={!selectedRoom}
            onClick={() => alert(`Booking confirmed for ${selectedRoom?.type} at ${hotel.name}`)}
          >
            Confirm Booking
          </button>
          {selectedRoom && (
            <div className="mt-4 text-center">
              <div className="text-lg font-bold">${calculateTotalPrice()}</div>
              <div className="text-sm text-gray-600">for {calculateTotalNights()} nights</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalBooking;