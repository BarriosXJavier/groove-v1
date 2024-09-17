"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navMenuItems } from "../../../data";
import { Button } from "../ui/button";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

interface NavMenuItem {
  name: string;
  href: string;
  className?: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center relative">
            <Link
              href="/"
              className="font-medium text-lg tracking-wider relative after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:bottom-0 after:left-0 after:transition-all after:duration-500 hover:after:w-full"
              style={montserrat.style}
            >
              Groove Furniture
            </Link>
          </div>

          <div className="hidden lg:flex lg:space-x-5">
            {navMenuItems.map((item: NavMenuItem) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 relative text-sm lg:text-base font-medium tracking-wide after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:bottom-0 after:left-0 after:transition-all after:duration-500 hover:after:w-full ${
                  item.className || "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center space-x-4">
            <Link
              href="/dashboard"
              className="relative after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:bottom-0 after:left-0 after:transition-all after:duration-500 hover:after:w-full"
              style={montserrat.style}
            >
              Dashboard
            </Link>
            <Button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isSignedIn ? <UserButton /> : <SignInButton />}
            </Button>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <div className="flex items-center lg:hidden">
            <Button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navMenuItems.map((item: NavMenuItem) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium relative after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:bottom-0 after:left-0 after:transition-all after:duration-500 hover:after:w-full ${
                item.className
                  ? "border-red-400 text-red-700 bg-red-50"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4 space-x-4">
            <Link
              href="/dashboard"
              className="relative after:absolute after:w-0 after:h-0.5 after:bg-purple-600 after:bottom-0 after:left-0 after:transition-all after:duration-500 hover:after:w-full"
              style={montserrat.style}
            >
              Dashboard
            </Link>
            {isSignedIn ? <UserButton /> : <SignInButton />}
         
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
