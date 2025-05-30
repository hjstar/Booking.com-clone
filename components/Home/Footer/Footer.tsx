"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';

type FooterLink = {
  text: string;
  href: string;
};

type FooterSection = {
  id: string;
  title: string;
  links: FooterLink[];
};

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections: FooterSection[] = [
    {
      id: 'support',
      title: 'Support',
      links: [
        { text: 'Coronavirus (COVID-19) FAQs', href: '#' },
        { text: 'Manage your trips', href: '#' },
        { text: 'Contact Customer Service', href: '#' },
        { text: 'Safety Resource Center', href: '#' },
      ],
    },
    {
      id: 'discover',
      title: 'Discover',
      links: [
        { text: 'Genius loyalty program', href: '#' },
        { text: 'Seasonal and holiday deals', href: '#' },
        { text: 'Travel articles', href: '#' },
        { text: 'Booking.com for Business', href: '#' },
        { text: 'Traveller Review Awards', href: '#' },
        { text: 'Car rental', href: '#' },
        { text: 'Flight finder', href: '#' },
        { text: 'Restaurant reservations', href: '#' },
        { text: 'Travel Agents', href: '#' },
      ],
    },
    {
      id: 'terms',
      title: 'Terms & Settings',
      links: [
        { text: 'Privacy & cookies', href: '#' },
        { text: 'Terms & conditions', href: '#' },
        { text: 'Grievance officer', href: '#' },
        { text: 'Slavery Statement', href: '#' },
        { text: 'Human Rights Statement', href: '#' },
      ],
    },
    {
      id: 'partners',
      title: 'Partners',
      links: [
        { text: 'Extranet login', href: '#' },
        { text: 'Partner help', href: '#' },
        { text: 'List your property', href: '#' },
        { text: 'Become an affiliate', href: '#' },
      ],
    },
    {
      id: 'about',
      title: 'About',
      links: [
        { text: 'About Booking.com', href: '#' },
        { text: 'How We Work', href: '#' },
        { text: 'Sustainability', href: '#' },
        { text: 'Press center', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Investor relations', href: '#' },
        { text: 'Corporate contact', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 text-sm mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile view - dropdown sections */}
        <div className="block sm:hidden space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-300 pb-2">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center font-semibold text-gray-900 py-2"
              >
                <span>{section.title}</span>
                {openSection === section.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openSection === section.id && (
                <ul className="space-y-2 pl-4 pb-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="hover:underline block py-1">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Desktop view - grid layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {sections.map((section) => (
            <div key={section.id}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="hover:underline">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Booking.com Clone. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 text-gray-600">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;