"use client";
import { useState, useRef, useEffect } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import { useBookingStore } from "@/store";

const HeroSearch = () => {
  const { filters, setFilters, setSearchPerformed } = useBookingStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setShowGuestPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    setSearchPerformed(true);
  };

  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const range = rangesByKey.selection;
    if (range.startDate && range.endDate) {
      setFilters({ 
        dateRange: {
          startDate: range.startDate,
          endDate: range.endDate
        }
      });
    }
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
              value={filters.destination}
              onChange={(e) => setFilters({ destination: e.target.value })}
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
              value={`${format(filters.dateRange.startDate, "MMM dd, yyyy")} - ${format(filters.dateRange.endDate, "MMM dd, yyyy")}`}
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
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={[{
                  startDate: filters.dateRange.startDate,
                  endDate: filters.dateRange.endDate,
                  key: 'selection'
                }]}
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
              {`${filters.guests.adults} Adult${filters.guests.adults !== 1 ? 's' : ''}, ${filters.guests.children} Child${filters.guests.children !== 1 ? 'ren' : ''}, ${filters.guests.rooms} Room${filters.guests.rooms !== 1 ? 's' : ''}`}
            </div>
          </div>
          
          {showGuestPicker && (
            <div
              ref={guestPickerRef}
              className="absolute top-full left-0 z-50 mt-1 shadow-lg rounded-lg overflow-hidden bg-white p-4 w-full"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setFilters({
                        guests: {
                          ...filters.guests,
                          adults: Math.max(1, filters.guests.adults - 1)
                        }
                      })}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{filters.guests.adults}</span>
                    <button 
                      onClick={() => setFilters({
                        guests: {
                          ...filters.guests,
                          adults: filters.guests.adults + 1
                        }
                      })}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Children and Rooms selectors... */}
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