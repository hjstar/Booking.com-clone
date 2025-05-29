import Image from "next/image";

export const navLinks = [
  {
    id: 1,
    url: "/",
    label: 'Stays',
    icon: (
      <Image 
        src="/images/Stays.svg" 
        alt="stays icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
  {
    id: 2,
    url: "#",
    label: 'Flights',
    icon: (
      <Image 
        src="/images/flights.svg" 
        alt="Flights icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
  {
    id: 3,
    url: "#",
    label: 'Flight+Hotel',
    icon: (
      <Image 
        src="/images/FlightHotel.svg" 
        alt="Flight+Hotel icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
  {
    id: 4,
    url: "#",
    label: 'Car rentals',
    icon: (
      <Image 
        src="/images/carrentals.svg" 
        alt="Car rentals icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
  {
    id: 5,
    url: "#",
    label: 'Attractions',
    icon: (
      <Image 
        src="/images/attractions.svg" 
        alt="Attractions icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
  {
    id: 6,
    url: "#",
    label: 'Airport taxis',
    icon: (
      <Image 
        src="/images/airporttaxis.svg" 
        alt="Airport taxis icon" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
    )
  },
];