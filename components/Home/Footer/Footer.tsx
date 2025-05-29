import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Support Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Coronavirus (COVID-19) FAQs</Link></li>
              <li><Link href="#" className="hover:underline">Manage your trips</Link></li>
              <li><Link href="#" className="hover:underline">Contact Customer Service</Link></li>
              <li><Link href="#" className="hover:underline">Safety Resource Center</Link></li>
            </ul>
          </div>

          {/* Discover Column */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Genius loyalty program</Link></li>
              <li><Link href="#" className="hover:underline">Seasonal and holiday deals</Link></li>
              <li><Link href="#" className="hover:underline">Travel articles</Link></li>
              <li><Link href="#" className="hover:underline">Booking.com for Business</Link></li>
              <li><Link href="#" className="hover:underline">Traveller Review Awards</Link></li>
              <li><Link href="#" className="hover:underline">Car rental</Link></li>
              <li><Link href="#" className="hover:underline">Flight finder</Link></li>
              <li><Link href="#" className="hover:underline">Restaurant reservations</Link></li>
              <li><Link href="#" className="hover:underline">Booking.com for Travel Agents</Link></li>
            </ul>
          </div>

          {/* Terms and settings Column */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Terms and settings</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Privacy & cookies</Link></li>
              <li><Link href="#" className="hover:underline">Terms & conditions</Link></li>
              <li><Link href="#" className="hover:underline">Grievance officer</Link></li>
              <li><Link href="#" className="hover:underline">Modern Slavery Statement</Link></li>
              <li><Link href="#" className="hover:underline">Human Rights Statement</Link></li>
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Partners</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Extranet login</Link></li>
              <li><Link href="#" className="hover:underline">Partner help</Link></li>
              <li><Link href="#" className="hover:underline">List your property</Link></li>
              <li><Link href="#" className="hover:underline">Become an affiliate</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">About Booking.com</Link></li>
              <li><Link href="#" className="hover:underline">How We Work</Link></li>
              <li><Link href="#" className="hover:underline">Sustainability</Link></li>
              <li><Link href="#" className="hover:underline">Press center</Link></li>
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Investor relations</Link></li>
              <li><Link href="#" className="hover:underline">Corporate contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        
      </div>
    </footer>
  );
};

export default Footer;