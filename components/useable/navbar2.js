"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "./AuthProvider"; // Assuming you have this hook
import { useRouter } from "next/navigation";

const Navbar = () => {
  // If useAuth is not available, you can use dummy data
  const { user, loading, logout } = useAuth ? useAuth() : { user: null, loading: false, logout: () => {} };
  
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <header className="w-full bg-white py-4 px-6 md:px-12 border-b border-gray-200">
      <nav className="relative z-10 max-w-screen-2xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Name */}
        <Link href="/" className="font-serif text-3xl font-semibold tracking-tight text-gray-900">
          Shopping Guide
        </Link>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <Link
            href="/shop"
            className="font-sans font-semibold text-gray-700 hover:text-gray-900 transition duration-200 text-base"
          >
            Shop
          </Link>
        </div>

        {/* Right: Auth Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          ) : user ? (
            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-100 transition">
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="lg:hidden relative z-50"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            {/* Panel */}
            <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 p-6 flex flex-col gap-8">
              <div className="flex justify-end">
                <button onClick={() => setMenuOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-800" />
                </button>
              </div>
              
              <div className="flex flex-col gap-6 text-center text-lg font-semibold">
                <button onClick={() => handleLinkClick('/')}>Home</button>
                <button onClick={() => handleLinkClick('/shop')}>Shop</button>
              </div>

              <div className="mt-auto flex flex-col gap-4">
                {loading ? null : user ? (
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="px-4 py-3 border border-gray-300 rounded-lg font-semibold w-full">Logout</button>
                ) : (
                  <>
                    <button onClick={() => handleLinkClick('/login')} className="px-4 py-3 border border-gray-300 rounded-lg font-semibold w-full">Log in</button>
                    <button onClick={() => handleLinkClick('/signup')} className="px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold w-full">Sign up</button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
