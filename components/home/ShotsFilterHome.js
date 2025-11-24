"use client";
import { useState, useTransition } from "react";
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

export default function ShotsFilterHome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setView] = useState("Popular");
  const [viewDropdown, setViewDropdown] = useState(false);
  const [category, setCategory] = useState();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Modal state
  const [selectedTags, setSelectedTags] = useState(
    searchParams.get("tags")?.split(",")?.filter(Boolean) || []
  );

  const [isPending, startTransition] = useTransition();

  // Helper to build and push filter URL
  const pushFilterUrl = (opts = {}) => {
    const params = new URLSearchParams();
    // Tags
    const tagsToUse = opts.tags !== undefined ? opts.tags : selectedTags;
    if (tagsToUse.length > 0) {
      params.set("tags", tagsToUse.join(","));
    }
    // Category
    const catToUse = opts.category !== undefined ? opts.category : category;
    if (catToUse && catToUse !== "Discover") {
      params.set("category", catToUse);
    }
    // View
    const viewToUse = opts.view !== undefined ? opts.view : view;
    if (viewToUse && viewToUse !== "Popular") {
      params.set("view", viewToUse);
    }
    // (Removed page and limit)
    const queryString = params.toString();
    const targetUrl = queryString ? `/shots?${queryString}` : "/shots";
    router.push(targetUrl);
  };

  // Toggle tag selection and navigate to /shots
  const toggleTag = (tag) => {
    startTransition(() => {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
      setSelectedTags(newTags);
      pushFilterUrl({ tags: newTags });
    });
  };

  // Apply filters and navigate to /shots
  const handleOpenModal = () => {
    startTransition(() => {
      pushFilterUrl();
    });
  };

  // Handle category click
  const handleCategoryClick = (cat) => {
    setCategory(cat);
    startTransition(() => {
      pushFilterUrl({ category: cat });
    });
  };

  // Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
    setViewDropdown(false);
    startTransition(() => {
      pushFilterUrl({ view: newView });
    });
  };

  // Modal component
  const FilterModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto m-4">
        <div className="w-full bg-white rounded-[10px] flex flex-col justify-center items-start gap-10 overflow-hidden p-4 sm:p-8 md:p-10">
          {/* Modal Header */}
          <div className="w-full p-4 sm:p-5 bg-slate-50 rounded-[20px] flex justify-between items-center gap-4">
            <div className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold font-['Inter']">
              Filter
            </div>
            <button
              onClick={onClose}
              aria-label="Close filter modal"
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-900"
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
          <div className="w-full min-h-[80px] max-h-[200px] flex flex-wrap gap-3 overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                type="button"
                className={`p-4 sm:p-5 rounded-full outline outline-1 outline-gray-200 flex items-center gap-1.5 font-['Inter'] text-base sm:text-xl font-normal transition
                  ${
                    selectedTags.includes(tag)
                      ? "bg-gray-900 text-white outline-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Apply Filter Button */}
          <button
            disabled={isPending}
            onClick={onClose}
            className="w-full max-w-xs mx-auto px-8 py-4 bg-gray-900 rounded-[20px] flex justify-center items-center text-white text-lg sm:text-xl font-bold font-['Inter'] leading-tight transition hover:bg-gray-800 disabled:opacity-50"
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
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-[72px] gap-4 md:gap-0">
        {/* View Dropdown */}
        <div className="relative mb-2 md:mb-0">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-base font-medium hover:bg-gray-50 transition"
            onClick={() => setViewDropdown(!viewDropdown)}
            type="button"
          >
            <span>{view}</span>
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-400"
            >
              <path
                d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {viewDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
              <ul>
                <li>
                  <button
                    className={`block w-full text-left px-4 py-2 text-base ${
                      view === "Popular" ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => handleViewChange("Popular")}
                  >
                    Popular
                  </button>
                </li>
                <li>
                  <button
                    className={`block w-full text-left px-4 py-2 text-base ${
                      view === "New & Noteworthy"
                        ? "bg-gray-100 font-semibold"
                        : ""
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
        <div className="w-full flex justify-center overflow-x-auto scrollbar-hide py-2">
          <ul className="flex flex-row gap-2 whitespace-nowrap">
            {categories.map((cat) => (
              <li key={cat} className="shrink-0">
                <button
                  className={`px-4 py-2 rounded-lg font-medium text-base whitespace-nowrap transition
                    ${
                      category === cat
                        ? "bg-[#DCEFF6] text-black font-bold border-2 border-[#1BB0CE] shadow-sm scale-105"
                        : "text-gray-700 hover:bg-[#e0f7fa] border border-transparent"
                    }
                  `}
                  onClick={() => handleCategoryClick(cat)}
                  type="button"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Filters Button */}
        <button
          className="flex items-center px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-base hover:bg-gray-50 transition relative cursor-pointer"
          onClick={handleOpenModal}
          type="button"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-500 mr-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"
              fill="currentColor"
            />
          </svg>
          <span className="mr-2">Filters</span>
        </button>
      </div>

      {/* Modal */}
      {filtersOpen && <FilterModal onClose={() => setFiltersOpen(false)} />}
    </div>
  );
}
