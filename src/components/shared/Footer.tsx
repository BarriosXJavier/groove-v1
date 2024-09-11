import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#eeebe7] text-gray-700 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="font-medium mb-2">KEEP IN TOUCH</h3>
            <p className="text-sm">
              <Link href="#" className="hover:text-gray-900">
                Subscribe to receive news from Groove Furniture
              </Link>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="flex items-center text-sm hover:text-gray-900"
            >
              <MapPin size={18} className="mr-1" />
              FIND A STORE
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-medium mb-3">CUSTOMER SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Delivery & Handling
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Payments, Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">RESOURCES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Design & Styling Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">PRODUCT CARE</h4>
            <ul className="space-y-2 text-sm">
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">FIND US</h4>
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

        <div className="border-t border-gray-300 pt-4 text-xs">
          <p className="mb-2">© 2024 Groove Furniture.</p>
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
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
