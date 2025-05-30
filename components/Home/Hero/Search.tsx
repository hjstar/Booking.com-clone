"use client";
import { useState, useRef, useEffect } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Image from "next/image";
import { useBookingStore } from "@/store/index";

const HeroSearch = () => {
  const { filters, setFilters, setSearchPerformed } = useBookingStore();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestPickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive months and direction states initialized safely
  const [months, setMonths] = useState(2);
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMonths(1);
        setDirection("vertical");
      } else {
        setMonths(2);
        setDirection("horizontal");
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[aria-label="Date range"]')
      ) {
        setShowDatePicker(false);
      }
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[aria-label="Guests selection"]')
      ) {
        setShowGuestPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
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
          endDate: range.endDate,
        },
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-6xl bg-yellow-400 p-2 sm:p-4 rounded-lg shadow-md mx-auto">
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        {/* Destination Search */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow-sm h-full">
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full outline-none text-sm md:text-base px-3 py-2 h-full truncate"
              value={filters.destination}
              onChange={(e) => setFilters({ destination: e.target.value })}
            />
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex-1 relative min-w-0">
          <div
            className={`bg-white rounded-lg shadow-sm h-full flex items-center cursor-pointer ${
              showDatePicker ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => {
              setShowGuestPicker(false);
              setShowDatePicker(!showDatePicker);
            }}
            aria-label="Date range"
          >
            <input
              id="dateRange"
              title="Select date range"
              type="text"
              readOnly
              placeholder="Check-in - Check-out"
              className="w-full outline-none text-sm md:text-base px-3 py-2 cursor-pointer h-full truncate"
              value={`${format(
                filters.dateRange.startDate,
                "MMM dd, yyyy"
              )} - ${format(filters.dateRange.endDate, "MMM dd, yyyy")}`}
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
              className="absolute top-full left-0 z-50 mt-1 shadow-lg rounded-lg overflow-hidden bg-white
                w-[90vw] max-w-md md:max-w-2xl md:w-auto"
              style={{
                // Ensure it stays above other elements on mobile
                zIndex: 1000,
              }}
            >
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: filters.dateRange.startDate,
                    endDate: filters.dateRange.endDate,
                    key: "selection",
                  },
                ]}
                months={months}
                direction={direction}
                minDate={new Date()}
                className="!w-full"
              />
            </div>
          )}
        </div>

        {/* Guests Select */}
        <div className="flex-1 relative min-w-0">
          <div
            className={`bg-white rounded-lg shadow-sm h-full flex items-center cursor-pointer ${
              showGuestPicker ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => {
              setShowDatePicker(false);
              setShowGuestPicker(!showGuestPicker);
            }}
            aria-label="Guests selection"
          >
            <div className="w-full outline-none text-sm md:text-base px-3 py-2 h-full flex items-center truncate">
              {`${filters.guests.adults} Adult${
                filters.guests.adults !== 1 ? "s" : ""
              }, ${filters.guests.children} Child${
                filters.guests.children !== 1 ? "ren" : ""
              }, ${filters.guests.rooms} Room${
                filters.guests.rooms !== 1 ? "s" : ""
              }`}
            </div>
          </div>

          {showGuestPicker && (
            <div
              ref={guestPickerRef}
              className="absolute top-full left-0 z-50 mt-1 shadow-lg rounded-lg overflow-hidden bg-white p-4
                w-[90vw] max-w-xs md:w-auto"
              style={{
                // Ensure it stays above other elements on mobile
                zIndex: 1000,
              }}
            >
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex justify-between items-center">
                  <span>Adults</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            adults: Math.max(1, filters.guests.adults - 1),
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{filters.guests.adults}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            adults: filters.guests.adults + 1,
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center">
                  <span>Children</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            children: Math.max(0, filters.guests.children - 1),
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{filters.guests.children}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            children: filters.guests.children + 1,
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex justify-between items-center">
                  <span>Rooms</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            rooms: Math.max(1, filters.guests.rooms - 1),
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{filters.guests.rooms}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilters({
                          guests: {
                            ...filters.guests,
                            rooms: filters.guests.rooms + 1,
                          },
                        });
                      }}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex-[0.3] flex items-stretch mt-2 md:mt-0">
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