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

const deliveryOptions = [
  "Any",
  "1 day",
  "3 days",
  "1 week",
  "2 weeks",
  "1 month",
];










export default function ServiceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Modal state
  const [selectedTags, setSelectedTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("Any");

  const [isPending, startTransition] = useTransition();

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Toggle category selection
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Inside your ServiceFilter component, before the return statement:

  function FilterModal({ onClose }) {
    return (
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
            {/* Price */}
            <div className="w-full flex flex-col gap-3">
              <div className="text-gray-900 text-lg sm:text-xl font-medium font-['Inter']">
                Price
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
                <div className="flex-1 flex flex-col gap-2.5">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    className="w-full p-4 sm:p-5 bg-emerald-50/30 rounded-xl outline outline-1 outline-gray-900/20 text-zinc-700 text-sm font-normal font-['Inter']"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    className="w-full p-4 sm:p-5 bg-emerald-50/30 rounded-xl outline outline-1 outline-gray-900/20 text-zinc-700 text-sm font-normal font-['Inter']"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Delivery Time */}
            <div className="w-full flex flex-col gap-3">
              <div className="text-gray-900 text-lg sm:text-xl font-medium font-['Inter']">
                Delivery time
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 w-full">
                <select
                  className="w-full p-4 sm:p-5 bg-emerald-50/30 rounded-xl outline outline-1 outline-gray-900/20 text-zinc-700 text-sm font-normal font-['Inter']"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                >
                  {deliveryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Apply Filter Button */}
            <button
              disabled={isPending}
              onClick={() => {
                startTransition(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  // Combine categories and tags, deduplicate, and set as tags
                  const combined = Array.from(
                    new Set([...selectedCategories, ...selectedTags])
                  );
                  if (combined.length > 0) {
                    params.set("tags", combined.join(","));
                  } else {
                    params.delete("tags");
                  }
                  // Min/Max price
                  if (minPrice) {
                    params.set("minPrice", minPrice);
                  } else {
                    params.delete("minPrice");
                  }
                  if (maxPrice) {
                    params.set("maxPrice", maxPrice);
                  } else {
                    params.delete("maxPrice");
                  }
                  // Delivery time
                  if (deliveryTime && deliveryTime !== "Any") {
                    params.set("deliveryTime", deliveryTime);
                  } else {
                    params.delete("deliveryTime");
                  }
                  router.push(`${pathname}?${params.toString()}`);
                  onClose();
                });
              }}
              className="w-full max-w-xs mx-auto px-8 py-4 bg-gray-900 rounded-[20px] flex justify-center items-center text-white text-lg sm:text-xl font-bold font-['Inter'] leading-tight transition hover:bg-gray-800 disabled:opacity-50"
            >
              {isPending ? "Applying..." : "Apply filter"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  // Only open modal on click
  const handleOpenModal = () => setFiltersOpen(true);

  return (
    <div className="w-full border-b border-gray-200 bg-white font-sans">
      {/* Top Filter Bar */}
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-[72px] gap-4 md:gap-0">
        {/* Filter Button (left) */}
        <div className="mb-2 md:mb-0">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-base font-medium hover:bg-gray-50 transition cursor-pointer"
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

        {/* Category Scroll */}
        <div className="w-full flex justify-center overflow-x-auto scrollbar-hide py-2">
          <ul className="flex flex-row gap-2 whitespace-nowrap">
            {categories.map((cat) => (
              <li key={cat} className="shrink-0">
                <button
                  className={`px-4 py-2 rounded-lg font-medium text-base whitespace-nowrap transition
                    ${
                      selectedCategories.includes(cat)
                        ? "bg-[#DCEFF6] text-black font-bold border-2 border-[#1BB0CE] shadow-sm scale-105"
                        : "text-gray-700 hover:bg-[#e0f7fa] border border-transparent"
                    }
                  `}
                  onClick={() => {
                    toggleCategory(cat);
                    // Combine categories and tags, deduplicate, and set as tags in query params
                    const combined = Array.from(
                      new Set([
                        ...(selectedCategories.includes(cat)
                          ? selectedCategories.filter((c) => c !== cat)
                          : [...selectedCategories, cat]),
                        ...selectedTags,
                      ])
                    );
                    const params = new URLSearchParams(searchParams.toString());
                    if (combined.length > 0) {
                      params.set("tags", combined.join(","));
                    } else {
                      params.delete("tags");
                    }
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                  type="button"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {filtersOpen && <FilterModal onClose={() => setFiltersOpen(false)} />}
    </div>
  );
}
