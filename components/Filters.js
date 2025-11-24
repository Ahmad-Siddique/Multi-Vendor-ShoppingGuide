"use client"
import { useState } from "react";

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

const timeframes = [
  "Now",
  "This Past Week",
  "This Past Month",
  "This Past Year",
  "All Time",
];

const colors = [
  "#faddd1",
  "#fad3d1",
  "#fad1e6",
  "#e5d1fa",
  "#d4d1fa",
  "#d1e3fa",
  "#d1f3fa",
  "#d1faf0",
  "#d1fad7",
  "#ebfad1",
  "#faf9d1",
  "#faefd1",
  "#fae6d1",
  "#f2e2d9",
  "#ffffff",
  "#f4b69c",
  "#f4a09c",
  "#f49cc8",
  "#c69cf4",
  "#a39cf4",
  "#9cc2f4",
  "#9ce5f4",
  "#9cf4df",
  "#9cf4a7",
  "#d4f49c",
  "#f4f19c",
  "#f4dc9c",
  "#f4c89c",
  "#e3c0ac",
  "#e4e4e4",
  "#ee8f66",
  "#ee6d66",
  "#ee66aa",
  "#a866ee",
  "#7166ee",
  "#66a1ee",
  "#66d7ee",
  "#66eece",
  "#66ee78",
  "#bcee66",
  "#eee966",
  "#eeca66",
  "#eeaa66",
  "#d59f80",
  "#b4b4b4",
  "#e86830",
  "#e83a30",
  "#e8308c",
  "#8930e8",
  "#4030e8",
  "#3080e8",
  "#30c9e8",
  "#30e8bd",
  "#30e849",
  "#a5e830",
  "#e8e230",
  "#e8b730",
  "#e88c30",
  "#c67d53",
  "#848484",
  "#c74b16",
  "#c71f16",
  "#c7166f",
  "#6c16c7",
  "#2516c7",
  "#1663c7",
  "#16a9c7",
  "#16c79e",
  "#16c72e",
  "#86c716",
  "#c7c116",
  "#c79816",
  "#c76f16",
  "#a66037",
  "#545454",
  "#913710",
  "#911710",
  "#911051",
  "#4f1091",
  "#1b1091",
  "#104891",
  "#107c91",
  "#109173",
  "#109121",
  "#629110",
  "#918d10",
  "#916f10",
  "#915110",
  "#794628",
  "#242424",
  "#5c230a",
  "#5c0e0a",
  "#5c0a33",
  "#320a5c",
  "#110a5c",
  "#0a2e5c",
  "#0a4e5c",
  "#0a5c49",
  "#0a5c15",
  "#3e5c0a",
  "#5c590a",
  "#5c460a",
  "#5c330a",
  "#4d2c19",
  "#000000",
];

export default function DribbbleFilterBar() {
  const [view, setView] = useState("Popular");
  const [viewDropdown, setViewDropdown] = useState(false);
  const [category, setCategory] = useState();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [color, setColor] = useState("");
  const [colorDropdown, setColorDropdown] = useState(false);
  const [timeframe, setTimeframe] = useState("Now");
  const [timeframeDropdown, setTimeframeDropdown] = useState(false);

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
                    onClick={() => {
                      setView("Popular");
                      setViewDropdown(false);
                    }}
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
                    onClick={() => {
                      setView("New & Noteworthy");
                      setViewDropdown(false);
                    }}
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
                  onClick={() => setCategory(cat)}
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
          className="flex items-center px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-base hover:bg-gray-50 transition relative"
          onClick={() => setFiltersOpen(!filtersOpen)}
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
          <span className="bg-[#DCEFF6]-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>
      </div>

      {/* Bottom Filters Row - Responsive */}
      {filtersOpen && (
        <div className="w-full bg-white border-b border-gray-100 py-3">
          <form className="max-w-[1800px] mx-auto flex flex-wrap gap-4 items-center px-2 sm:px-4">
            {/* Tags */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Tags
              </label>
              <div className="relative">
                <input
                  type="search"
                  className="border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#DCEFF6]-100 w-full sm:w-56"
                  placeholder="Search tags"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            {/* Color */}
            <div className="relative w-full sm:w-auto">
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Color
              </label>
              <div className="flex items-center relative">
                <input
                  type="search"
                  className="border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#DCEFF6]-100 w-full sm:w-56"
                  placeholder="Hex or select"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  onFocus={() => setColorDropdown(true)}
                  onBlur={() => setTimeout(() => setColorDropdown(false), 200)}
                  maxLength={7}
                />
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color || "#fff" }}
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  viewBox="0 0 20 21"
                >
                  <circle cx="10" cy="10.5" r="10" fill="#C4C4C4" />
                  <rect x="10" y="0.5" width="10" height="20" fill="#3A8BBB" />
                  <circle cx="10" cy="10.5" r="3" fill="#F5F6F7" />
                </svg>
              </div>
              {/* Color Chips Dropdown */}
              {colorDropdown && (
                <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto grid grid-cols-8 gap-1 p-2">
                  {colors.map((clr) => (
                    <button
                      key={clr}
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: clr, borderRadius: 0 }}
                      type="button"
                      onClick={() => {
                        setColor(clr);
                        setColorDropdown(false);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Timeframe */}
            <div className="relative w-full sm:w-auto">
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Timeframe
              </label>
              <button
                className="flex items-center px-6 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 font-medium text-base hover:bg-gray-50 transition w-full sm:w-56 justify-between"
                onClick={(e) => {
                  e.preventDefault();
                  setTimeframeDropdown(!timeframeDropdown);
                }}
                type="button"
              >
                <span className="mr-2">{timeframe}</span>
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
              {timeframeDropdown && (
                <div className="absolute left-0 mt-2 w-full sm:w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                  <ul>
                    {timeframes.map((tf) => (
                      <li key={tf}>
                        <button
                          className={`block w-full text-left px-4 py-2 text-base ${
                            timeframe === tf ? "bg-gray-100 font-semibold" : ""
                          }`}
                          onClick={() => {
                            setTimeframe(tf);
                            setTimeframeDropdown(false);
                          }}
                          type="button"
                        >
                          {tf}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}