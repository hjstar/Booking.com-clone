"use client"; // MUST be at the very top

import React from 'react';
import Image from 'next/image';
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className='bg-[#003b95] text-white'>
      {/* TOP ROW - Logo opposite 3 Navlinks + 3 Buttons */}
      <div className='container mx-auto flex items-center justify-between p-4 text-2xl'>
        {/* Logo (left side) */}
        <Image 
          src="/images/BookingLogo.svg" 
          alt="Booking Logo" 
          width={150} 
          height={50} 
          priority
        />

        {/* Right side container */}
        <div className='flex items-center space-x-6'>
          {/* 3 Additional Navlinks (SVG only with hover) */}
          <div className='hidden md:flex items-center space-x-2'>
            <button className='hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors text-blue-100 flex items-center'>
              <span>INR</span>
            </button>
            <button
              className='hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center'
              title="Change country"
            >
              <Image
                src="/images/india.svg"
                alt="country"
                width={24}
                height={24}
              />
            </button>

            <Link 
              href="/help" 
              className='hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center'
            >
              <Image 
                src="/images/qna.svg" 
                alt="qna" 
                width={24} 
                height={24} 
              />
            </Link>
          </div>

          {/* 3 Action Buttons */}
          <div className='flex items-center space-x-4'>
            <button className='text-sm font-medium text-white hover:bg-[#1a4fa0] px-4 py-2 rounded-md transition-colors'>
              List your property
            </button>
            <button className='text-sm font-medium bg-white text-[#1a4fa0] border border-white hover:bg-white hover:text-[#003b95] px-4 py-2 rounded-md transition-colors'>
              Register
            </button>
            <button className='text-sm font-medium bg-white text-[#1a4fa0] hover:bg-[#0062a7] px-4 py-2 rounded-md transition-colors'>
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW - Main Navlinks */}
      <div className='container mx-auto px-4 pb-4'>
        <div className='flex flex-wrap gap-x-6 gap-y-2'>
          {navLinks.map((link) => (
            <Link 
              href={link.url} 
              key={link.id}
              className={`flex items-center hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                pathname === link.url ? '"border-l border-r border-white rounded-l-full rounded-r-full"' : ''
              }`}
            >
              {link.icon && <span className='mr-2 filter brightness-0 invert'>{link.icon}</span>}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;