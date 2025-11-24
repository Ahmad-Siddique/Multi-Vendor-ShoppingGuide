"use client";
import { useState, useTransition, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  "Discover",
  "Animation",
  "Branding",
  "Illustration",
  "Mobile",
  "Print",
  "Product Design",
  "Typography",
  "Web Design",
];

const tags = [
  "Animation",
  "Branding",
  "Illustration",
  "Print Design",
  "Product Design",
  "Typography",
  "Web Design",
];

export default function ShotsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setView] = useState("Popular");
  const [viewDropdown, setViewDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",")?.filter(Boolean) || []
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState(
    searchParams.get("tags")?.split(",")?.filter(Boolean) || []
  );

  const [isPending, startTransition] = useTransition();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewDropdown && !event.target.closest('.dropdown-container')) {
        setViewDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [viewDropdown]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && filtersOpen) {
        setFiltersOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [filtersOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [filtersOpen]);

  // Centralized URL building function
  const buildUrl = useCallback((newTags, newCategories, newView) => {
    const params = new URLSearchParams();

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    }

    // if (newCategories.length > 0 && !newCategories.includes("Discover")) {
    //   params.set("category", newCategories.join(","));
    // }


     if (newCategories.length > 0 ) {
       params.set("category", newCategories.join(","));
     }

    if (newView && newView !== "Popular") {
      params.set("view", newView);
    }

    const queryString = params.toString();
    return queryString ? `/shots?${queryString}` : "/shots";
  }, []);

  // Toggle tag selection and navigate
  const toggleTag = useCallback((tag) => {
    startTransition(() => {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

      setSelectedTags(newTags);
      const targetUrl = buildUrl(newTags, selectedCategories, view);
      router.push(targetUrl);
    });
  }, [selectedTags, selectedCategories, view, buildUrl, router]);

  // Toggle category selection and navigate
  const toggleCategory = useCallback((cat) => {
    startTransition(() => {
      const newCategories = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];

      setSelectedCategories(newCategories);
      const targetUrl = buildUrl(selectedTags, newCategories, view);
      router.push(targetUrl);
    });
  }, [selectedCategories, selectedTags, view, buildUrl, router]);

  // Handle view change
  const handleViewChange = useCallback((newView) => {
    startTransition(() => {
      setView(newView);
      setViewDropdown(false);
      const targetUrl = buildUrl(selectedTags, selectedCategories, newView);
      router.push(targetUrl);
    });
  }, [selectedTags, selectedCategories, buildUrl, router]);

  // Modal component
  const FilterModal = ({ onClose }) => (
    <div 
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2 sm:px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto my-4 max-h-[90vh] overflow-hidden">
        <div className="w-full bg-white rounded-lg sm:rounded-[10px] flex flex-col justify-center items-start gap-6 sm:gap-8 md:gap-10 p-3 sm:p-6 md:p-8 lg:p-10">
          {/* Modal Header */}
          <div className="w-full p-3 sm:p-4 md:p-5 bg-slate-50 rounded-lg sm:rounded-[20px] flex justify-between items-center gap-4">
            <h2 className="text-gray-900 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['Inter']">
              Filter
            </h2>
            <button
              onClick={onClose}
              aria-label="Close filter modal"
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
              >
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="w-full min-h-[60px] sm:min-h-[80px] max-h-[140px] sm:max-h-[200px] flex flex-wrap gap-2 sm:gap-3 overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                type="button"
                disabled={isPending}
                className={`px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-full outline outline-1 outline-gray-200 flex items-center gap-1.5 font-['Inter'] text-sm sm:text-base md:text-lg font-normal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    selectedTags.includes(tag)
                      ? "bg-gray-900 text-white outline-gray-900 hover:bg-gray-800"
                      : "bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Close Button */}
          <button
            disabled={isPending}
            onClick={onClose}
            className="w-full max-w-xs mx-auto px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 rounded-lg sm:rounded-[20px] flex justify-center items-center text-white text-base sm:text-lg font-bold font-['Inter'] leading-tight transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Applying..." : "Close"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full border-b border-gray-200 bg-white font-sans">
      {/* Top Filter Bar */}
      <div className="max-w-full lg:max-w-[1800px] mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          
          {/* View Dropdown */}
          <div className="relative dropdown-container order-1 sm:order-1">
            <button
              className="flex items-center justify-between w-full sm:w-auto gap-2 px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors duration-200 min-w-[120px]"
              onClick={() => setViewDropdown(!viewDropdown)}
              type="button"
              aria-expanded={viewDropdown}
              aria-haspopup="true"
            >
              <span className="truncate">{view}</span>
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 ${
                  viewDropdown ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            
            {viewDropdown && (
              <div className="absolute left-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-30">
                <ul className="py-1">
                  <li>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200 ${
                        view === "Popular" ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={() => handleViewChange("Popular")}
                    >
                      Popular
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200 ${
                        view === "New & Noteworthy" ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={() => handleViewChange("New & Noteworthy")}
                    >
                      New & Noteworthy
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Category Scroll */}
         {/* Enhanced Category Scroll with better mobile UX */}
{/* Enhanced Category Scroll with center alignment only on desktop */}
<div className="w-full order-3 sm:order-2">
  <div className="relative">
    <div className="flex overflow-x-auto scrollbar-hide py-1 px-2 sm:px-0 gap-1 sm:gap-2 snap-x snap-mandatory justify-start sm:justify-center">
      {categories.map((cat, index) => (
        <button
          key={cat}
          className={`flex-shrink-0 snap-start px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${index === 0 ? 'ml-0' : ''}
            ${
              selectedCategories.includes(cat)
                ? "bg-[#DCEFF6] text-black font-bold border-2 border-[#1BB0CE] shadow-sm scale-105"
                : "text-gray-700 hover:bg-[#e0f7fa] border border-transparent active:bg-[#b2ebf2]"
            }
          `}
          onClick={() => toggleCategory(cat)}
          type="button"
          disabled={isPending}
        >
          {cat}
        </button>
      ))}
    </div>
    
    {/* Scroll indicators for mobile */}
    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden"></div>
  </div>
</div>



          {/* Filters Button */}
          <div className="order-2 sm:order-3">
            <button
              className="flex items-center justify-center w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setFiltersOpen(true)}
              type="button"
              disabled={isPending}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"
                  fill="currentColor"
                />
              </svg>
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {filtersOpen && <FilterModal onClose={() => setFiltersOpen(false)} />}
    </div>
  );
}
