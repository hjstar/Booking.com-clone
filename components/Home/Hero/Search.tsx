"use client";

import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";

const HeroSearch = () => {
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target as Node)
      ) {
        setShowGuestPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", {
      destination,
      checkIn: dateRange[0].startDate,
      checkOut: dateRange[0].endDate,
      guests
    });
  };

  const updateGuests = (type: 'adults' | 'children' | 'rooms', value: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, value)
    }));
  };

  return (
    <div className="w-[80%] bg-yellow-400 p-1 rounded-lg shadow-md mx-auto">
      <div className="flex flex-col md:flex-row gap-1 items-stretch">
        {/* Destination Search */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full outline-none text-base px-3 py-2 h-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex-1 relative">
          <div 
            className={`bg-white rounded-lg shadow-sm h-full flex items-center ${showDatePicker ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <input
              id="dateRange"
              title="Select date range"
              aria-label="Date range"
              type="text"
              readOnly
              placeholder="Check-in - Check-out"
              className="w-full outline-none text-base px-3 py-2 cursor-pointer h-full"
              value={`${format(
                dateRange[0].startDate!,
                "MMM dd, yyyy"
              )} - ${format(dateRange[0].endDate!, "MMM dd, yyyy")}`}
            />
            <div className="pr-3 pl-2">
              <Image 
                src="/images/calender.svg" 
                alt="Calendar icon" 
                width={20} 
                height={20} 
                className="cursor-pointer"
              />
            </div>
          </div>
          {showDatePicker && (
            <div
              ref={datePickerRef}
              className="absolute top-full left-0 z-50 mt-1 shadow-lg rounded-lg overflow-hidden bg-white"
            >
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={2}
                direction="horizontal"
                minDate={new Date()}
              />
            </div>
          )}
        </div>

        {/* Guests Select */}
        <div className="flex-1 relative">
          <div 
            className={`bg-white rounded-lg shadow-sm h-full flex items-center cursor-pointer ${showGuestPicker ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setShowGuestPicker(!showGuestPicker)}
          >
            <div className="w-full outline-none text-base px-3 py-2 h-full flex items-center">
              {`${guests.adults} Adult${guests.adults !== 1 ? 's' : ''}, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}, ${guests.rooms} Room${guests.rooms !== 1 ? 's' : ''}`}
            </div>
          </div>
          
          {showGuestPicker && (
            <div
              ref={guestPickerRef}
              className="absolute top-full left-0 z-50 mt-1 shadow-lg rounded-lg overflow-hidden bg-white p-4 w-full"
            >
              <div className="flex justify-between items-center mb-3 text-sm">
                <span>Adults</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('adults', guests.adults - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm">{guests.adults}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('adults', guests.adults + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3 text-sm">
                <span>Children</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('children', guests.children - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm">{guests.children}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('children', guests.children + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Rooms</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('rooms', guests.rooms - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm">{guests.rooms}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests('rooms', guests.rooms + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex-[0.3] flex items-stretch">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full font-medium py-2 px-2 rounded-lg transition-colors h-full text-sm flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;