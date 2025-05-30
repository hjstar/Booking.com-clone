'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#003b95] text-white">
      {/* TOP ROW */}
      <div className="container mx-auto flex items-center justify-between p-4 text-2xl">
        {/* Logo */}
        <Link href="/">
          <div className="relative w-32 md:w-40 lg:w-48 h-10 md:h-12 lg:h-14 cursor-pointer">
            <Image
              src="/images/BookingLogo.svg"
              alt="Booking Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Icons */}
          <div className="flex items-center space-x-2">
            <button className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors text-blue-100 flex items-center">
              <span>INR</span>
            </button>
            <button className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center" title="Change country">
              <Image src="/images/india.svg" alt="country" width={24} height={24}  />
            </button>
            <Link href="/help" className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center">
              <Image src="/images/qna.svg" alt="qna" width={24} height={24} className="filter invert brightness-200" />
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-white hover:bg-[#1a4fa0] px-4 py-2 rounded-md transition-colors">
              List your property
            </button>
            <button className="text-sm font-medium bg-white text-[#1a4fa0] border border-white hover:bg-white hover:text-[#003b95] px-4 py-2 rounded-md transition-colors">
              Register
            </button>
            <button className="text-sm font-medium bg-white text-[#1a4fa0] hover:bg-[#0062a7] px-4 py-2 rounded-md transition-colors">
              Sign in
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-[#1a4fa0] hover:border-[#1a4fa0]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003b95] px-4 pb-4 space-y-4">
          <div className="flex items-center space-x-4 justify-center">
            <button className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors text-blue-100 flex items-center">
              <span>INR</span>
            </button>
            <button className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center" title="Change country">
              <Image src="/images/india.svg" alt="country" width={24} height={24} className="filter invert brightness-200" />
            </button>
            <Link href="/help" className="hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors flex items-center">
              <Image src="/images/qna.svg" alt="qna" width={24} height={24} className="filter invert brightness-200" />
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="text-sm font-medium text-white hover:bg-[#1a4fa0] px-4 py-2 rounded-md transition-colors">
              List your property
            </button>
            <button className="text-sm font-medium bg-white text-[#1a4fa0] border border-white hover:bg-white hover:text-[#003b95] px-4 py-2 rounded-md transition-colors">
              Register
            </button>
            <button className="text-sm font-medium bg-white text-[#1a4fa0] hover:bg-[#0062a7] px-4 py-2 rounded-md transition-colors">
              Sign in
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav Links with hidden scrollbar */}
      <div className="w-full overflow-x-auto whitespace-nowrap px-2 pb-4 scrollbar-hide">
        <div className="flex space-x-4 min-w-max">
          {navLinks.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={`flex items-center hover:bg-[#1a4fa0] px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                pathname === link.url ? "border-l border-r border-white rounded-l-full rounded-r-full" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="mr-2 w-5 h-5 min-w-[20px] min-h-[20px] text-white">
                {React.cloneElement(link.icon, {
                  className: "w-5 h-5 filter invert brightness-200",
                })}
              </span>
              <span className="truncate">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
