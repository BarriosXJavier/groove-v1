import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#eeebe7] text-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto">
            <h3 className="font-medium mb-2 text-lg">KEEP IN TOUCH</h3>
            <p className="text-sm">
              <Link
                href="#"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Subscribe to receive news from Groove Furniture
              </Link>
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Link
              href="#"
              className="inline-flex items-center text-sm hover:text-gray-900 transition-colors duration-200"
            >
              <MapPin size={18} className="mr-2" />
              FIND A STORE
            </Link>
          </div>
        </div>
        {/* Links section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-medium mb-3 text-base">SERVICES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Design & Styling Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-base">SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-base">FIND US</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Store Locator
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom section */}
        <div className="border-t border-gray-300 pt-4 text-xs">
          <p className="mb-2">© 2024 Groove Furniture. All rights reserved.</p>
          <ul className="flex flex-wrap space-x-4">
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
