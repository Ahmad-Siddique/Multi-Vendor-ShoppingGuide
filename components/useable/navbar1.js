"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Explore", dropdown: true },
  { name: "Hire a Designer", dropdown: true },
  { name: "Find Jobs" },
  { name: "Blog" },
];

const exploreDropdownItems = [
  { name: "Popular", bold: true },
  { name: "New and Noteworthy", bold: true },
  "divider",
  { name: "Product Design" },
  { name: "Web Design" },
  { name: "Animation" },
  { name: "Branding" },
  { name: "Illustration" },
  { name: "Mobile" },
  { name: "Typography" },
  { name: "Print" },
];

const hireDropdownItems = [
  { name: "Browse Freelancers", icon: UserGroupIcon },
  { name: "Purchase Services", icon: ShoppingBagIcon },
  { name: "Submit a Project Brief", icon: DocumentTextIcon },
  { name: "Post a Full time Job", icon: BriefcaseIcon },
];

const DropdownIcon = () => (
  <svg
    className="w-4 h-4 ml-1 text-gray-700"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar1 = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchType, setSearchType] = useState("shots");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter?.() || null; // for Next.js 13+ app dir

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Search logic matching your HeroSection
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!router) return;
    if (searchValue.trim()) {
      performSearch(searchValue);
    } else {
      switch (searchType) {
        case "shots":
          router.push(`/shots`);
          break;
        case "blog":
          router.push(`/blog`);
          break;
        case "services":
          router.push(`/services`);
          break;
        default:
          router.push(`/shots`);
      }
    }
  };

  const performSearch = (query) => {
    if (!router) return;
    const encodedQuery = encodeURIComponent(query.trim());
    switch (searchType) {
      case "shots":
        router.push(`/shots?search=${encodedQuery}`);
        break;
      case "blog":
        router.push(`/blog?search=${encodedQuery}`);
        break;
      case "services":
        router.push(`/services?search=${encodedQuery}`);
        break;
      default:
        router.push(`/shots?search=${encodedQuery}`);
    }
  };

  return (
    <header className="w-full bg-transparent py-3 px-2 md:px-8">
      {/* Background blur */}
      <div className="fixed z-0 w-40 h-40 left-[-60px] top-[-120px] bg-teal-600/20 rounded-full blur-2xl pointer-events-none" />

      <nav className="relative z-10 max-w-screen-2xl mx-auto rounded-2xl bg-white/20 outline outline-1 outline-white flex items-center px-3 sm:px-6 md:px-12 py-3">
        <div className="flex w-full items-center justify-between gap-x-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pr-6">
            <Link href="/">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-x-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setHoveredDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setHoveredDropdown(null)}
              >
                {link.name === "Blog" ? (
                  <Link
                    href="/blog"
                    className="flex items-center text-slate-950 text-lg font-normal font-['Arial'] cursor-pointer hover:text-pink-600 transition"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div className="flex items-center text-slate-950 text-lg font-normal font-['Arial'] cursor-pointer hover:text-pink-600 transition">
                    {link.name}
                    {link.dropdown && <DropdownIcon />}
                  </div>
                )}

                {link.name === "Explore" && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-xl py-2 flex-col z-50${hoveredDropdown === 'Explore' ? ' flex' : ' hidden'} pt-2 -mt-2`}
                    onMouseEnter={() => setHoveredDropdown('Explore')}
                    onMouseLeave={() => setHoveredDropdown(null)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {exploreDropdownItems.map((item, index) =>
                      item === "divider" ? (
                        <hr
                          key={index}
                          className="my-1 border-t border-gray-200"
                        />
                      ) : (
                        <div
                          key={item.name}
                          className={`px-4 py-2 text-base text-gray-800 hover:bg-gray-100 transition cursor-pointer ${
                            item.bold ? "font-semibold" : ""
                          }`}
                        >
                          {item.name}
                        </div>
                      )
                    )}
                  </div>
                )}

                {link.name === "Hire a Designer" && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-xl py-2 flex-col z-50${hoveredDropdown === 'Hire a Designer' ? ' flex' : ' hidden'} pt-2 -mt-2`}
                    onMouseEnter={() => setHoveredDropdown('Hire a Designer')}
                    onMouseLeave={() => setHoveredDropdown(null)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {hireDropdownItems.map((item) => (
                      <div
                        key={item.name}
                        className="px-4 py-2 text-base text-gray-800 hover:bg-gray-100 transition cursor-pointer flex items-center gap-2"
                      >
                        <item.icon className="w-4 h-4 text-gray-600" />
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Search & Auth */}
          <div className="hidden md:flex items-center gap-x-6 flex-shrink-0">
            <form
              className="flex items-center w-[360px] lg:w-[420px] xl:w-[500px]"
              onSubmit={handleSearchSubmit}
              autoComplete="off"
            >
              <div className="flex items-center border border-black rounded-xl px-2 py-2 h-[48px] w-full">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search designers, jobs, inspiration…"
                  className="flex-1 bg-transparent px-3 py-2 text-gray-900 text-base focus:outline-none placeholder-black"
                  style={{ height: "32px" }}
                />
                {/* Dropdown with SVG */}
                <div className="relative flex items-center">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="appearance-none bg-transparent border-0 text-gray-900 text-base font-semibold pr-8 pl-2 py-1 h-10 focus:outline-none cursor-pointer min-w-[110px]"
                  >
                    <option value="shots">Shots</option>
                    <option value="blog">Blogs</option>
                    <option value="services">Services</option>
                  </select>
                  {/* Dropdown SVG */}
                  <svg
                    className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center aspect-square h-10 rounded-full bg-black hover:bg-gray-800 transition-colors ml-2 cursor-pointer"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </form>
            <Link href="/login">
              <button className="px-4 py-2 rounded-xl outline outline-1 outline-gray-900 bg-transparent text-slate-950 text-lg font-bold font-['Arial'] hover:bg-gray-100 transition cursor-pointer">
              Log in
            </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 rounded-xl outline outline-1 outline-gray-900 bg-gray-900 text-white text-lg font-bold font-['Arial'] hover:bg-gray-800 transition cursor-pointer">
              Sign up
            </button>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isClient && menuOpen && (
          <div className="absolute top-full left-0 w-full max-w-full bg-white shadow-lg rounded-b-2xl flex flex-col items-center py-4 gap-4 md:hidden z-30 overflow-x-hidden">
            <div className="w-full px-4 flex flex-col gap-2 max-w-full">
              <div className="font-semibold text-gray-800">Explore</div>
              {exploreDropdownItems.map((item, index) =>
                item === "divider" ? (
                  <hr key={index} className="border-t border-gray-200" />
                ) : (
                  <div
                    key={item.name}
                    className={`px-2 py-1 text-sm text-gray-800 hover:bg-gray-100 transition cursor-pointer ${
                      item.bold ? "font-semibold" : ""
                    }`}
                  >
                    {item.name}
                  </div>
                )
              )}
              <div className="font-semibold text-gray-800 mt-4">
                Hire a Designer
              </div>
              {hireDropdownItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-gray-600" />
                  {item.name}
                </div>
              ))}
              <div className="mt-4 text-sm text-gray-800 cursor-pointer hover:text-pink-600">
                Find Jobs
              </div>
              <Link href="/blog">
                <div className="text-sm text-gray-800 cursor-pointer hover:text-pink-600">
                  Blog
                </div>
              </Link>
            </div>

            <form
              className="flex items-center w-11/12 max-w-full my-2"
              onSubmit={handleSearchSubmit}
              autoComplete="off"
            >
              <div className="flex items-center border border-black rounded-xl px-2 py-2 h-[44px] w-full max-w-full min-w-0">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 min-w-0 bg-transparent px-2 py-1 text-gray-900 text-sm focus:outline-none placeholder-black"
                />
                {/* Dropdown with SVG */}
                <div className="relative flex items-center">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="bg-transparent border-0 text-gray-900 text-base font-semibold px-2 py-1 mr-2 h-8 focus:outline-none cursor-pointer appearance-none pr-8"
                  >
                    <option value="shots">Shots</option>
                    <option value="blog">Blogs</option>
                    <option value="services">Services</option>
                  </select>
                  {/* Dropdown SVG */}
                  <svg
                    className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center aspect-square h-8 rounded-full bg-black hover:bg-gray-800 transition-colors ml-2"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-white" />
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-2 w-full max-w-full items-center pt-2 border-t border-gray-200">
              <Link href="/login" className="w-11/12">
                <button className="w-full px-4 py-2 rounded-xl outline outline-1 outline-gray-900 bg-transparent text-slate-950 text-base font-bold hover:bg-gray-100 transition">
                Log in
              </button>
              </Link>
              <Link href="/signup" className="w-11/12">
                <button className="w-full px-4 py-2 rounded-xl outline outline-1 outline-gray-900 bg-gray-900 text-white text-base font-bold hover:bg-gray-800 transition cursor-pointer">
                Sign up
              </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar1;
