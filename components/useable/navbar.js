"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function DribbbleMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState({
    Explore: false,
    "Hire a Designer": false,
  });
  const { user, loading } = useAuth();

  // Dropdown menu items
  const exploreItems = [
    { name: "Shots", href: "/explore/shots" },
    { name: "Designers", href: "/explore/designers" },
    { name: "Teams", href: "/explore/teams" },
  ];
  const hireItems = [
    { name: "Post a Job", href: "/hire/post-job" },
    { name: "Freelancers", href: "/hire/freelancers" },
    { name: "Agencies", href: "/hire/agencies" },
  ];

  // Main menu items
  const navItems = [
    {
      name: "Explore",
      dropdown: true,
      items: exploreItems,
    },
    {
      name: "Hire a Designer",
      dropdown: true,
      items: hireItems,
    },
    {
      name: "Find Jobs",
      href: "/jobs",
      dropdown: false,
    },
    {
      name: "Blogs",
      href: "/blogs",
      dropdown: false,
    },
  ];

  // Helper to toggle dropdowns on mobile
  const toggleDropdown = (key) => {
    setDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo + Menu */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-extrabold text-pink-600 font-sans"
            >
              Dribbble
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() =>
                      setDropdown({ ...dropdown, [item.name]: true })
                    }
                    onMouseLeave={() =>
                      setDropdown({ ...dropdown, [item.name]: false })
                    }
                  >
                    <button className="flex items-center text-gray-700 hover:text-pink-600 font-semibold px-3 py-2 rounded-md text-sm transition-colors focus:outline-none">
                      {item.name}
                      <svg
                        className="ml-1 h-4 w-4 text-gray-400 group-hover:text-pink-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 mt-3 min-w-[180px] rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-30`}
                    >
                      <div className="py-2">
                        {item.items.map((sub, idx) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-5 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-medium transition-colors rounded-lg ${
                              idx !== item.items.length - 1 ? "mb-1" : ""
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-pink-600 font-semibold px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
          {/* Right: Login/Sign Up or Admin */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {loading ? null : user && user.role === "admin" ? (
              <Link href="/admin" className="text-pink-600 font-semibold px-4 py-2 rounded-md hover:bg-pink-50 transition-colors">
                Admin
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-pink-600 font-semibold px-4 py-2 rounded-md hover:bg-pink-50 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                  >
                    {item.name}
                    <svg
                      className={`ml-2 h-4 w-4 transform transition-transform ${
                        dropdown[item.name] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdown[item.name] && (
                    <div className="pl-6 py-1">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            {loading ? null : user && user.role === "admin" ? (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-pink-600 font-semibold px-3 py-2 rounded-md hover:bg-pink-50 transition-colors">
                Admin
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-left text-pink-600 font-semibold px-3 py-2 rounded-md hover:bg-pink-50 transition-colors">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-left bg-pink-600 text-white font-semibold px-3 py-2 rounded-md hover:bg-pink-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
