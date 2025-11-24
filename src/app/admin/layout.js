"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../components/useable/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const tabs = [
  { name: "Shots", href: "/admin/shots" },
  { name: "Services", href: "/admin/services" },
  { name: "Blogs", href: "/admin/blogs" },
  { name: "Service Requests", href: "/admin/service-requests" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex h-screen bg-gray-100 font-['Inter']">
      {/* Sidebar for Mobile (when toggled) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-gray-200">
            <div className="flex items-center h-16 px-4 bg-gray-900 justify-between">
              <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
              <button
                className="text-white focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 bg-white">
              {tabs.map((tab) => {
                const isActive = pathname.startsWith(tab.href);
                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 bg-gray-900">
            <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 bg-white">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="w-full bg-white shadow flex items-center justify-between px-4 py-3">
          <button
            className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  sidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          <div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
