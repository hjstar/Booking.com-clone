"use client";

import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";

const ASearch = () => {
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
    rooms: 1,
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

  const updateGuests = (
    type: "adults" | "children" | "rooms",
    value: number
  ) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, value),
    }));
  };

  return (
    <div className="w-full bg-yellow-300 p-4 rounded-lg shadow-md max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        {/* Date Picker */}
        <div className="flex-1 relative min-w-0">
          <div
            className={`bg-white rounded-lg shadow-sm h-full flex items-center ${showDatePicker ? "ring-2 ring-blue-500" : ""
              }`}
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
                className={`cursor-pointer ${showDatePicker ? "opacity-100" : "opacity-70"
                  }`}
              />
            </div>
          </div>
          {showDatePicker && (
            <div
              ref={datePickerRef}
              className="absolute top-full left-0 z-50 mt-2 shadow-lg rounded-lg overflow-hidden bg-white"
            >
              <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={1}
                direction="vertical"
                minDate={new Date()}
              />
            </div>
          )}
        </div>

        {/* Guests Select */}
        <div className="flex-1 relative min-w-0">
          <div
            className={`bg-white rounded-lg shadow-sm h-full flex items-center cursor-pointer ${showGuestPicker ? "ring-2 ring-blue-500" : ""
              }`}
            onClick={() => setShowGuestPicker(!showGuestPicker)}
          >
            <div className="w-full outline-none text-base px-3 py-2 h-full flex items-center">
              {`${guests.adults} Adult${guests.adults !== 1 ? "s" : ""
                }, ${guests.children} Child${guests.children !== 1 ? "ren" : ""
                }, ${guests.rooms} Room${guests.rooms !== 1 ? "s" : ""}`}
            </div>
            <div className="pr-3 pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {showGuestPicker && (
            <div
              ref={guestPickerRef}
              className="absolute top-full left-0 z-50 mt-2 shadow-lg rounded-lg overflow-hidden bg-white p-4 w-full"
            >
              <div className="flex justify-between items-center mb-3 text-sm">
                <span>Adults</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests("adults", guests.adults - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{guests.adults}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests("adults", guests.adults + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
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
                      updateGuests("children", guests.children - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{guests.children}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests("children", guests.children + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
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
                      updateGuests("rooms", guests.rooms - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{guests.rooms}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateGuests("rooms", guests.rooms + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Update Button */}
        <div className="flex-[0.5] min-w-[150px]">
          <button className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ASearch;
