import React, { useState, useEffect } from "react";

const CATEGORIES = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const DEBOUNCE_DELAY = 600;

function Category({ selectedCategory, onCategoryChange, searchQuery, onSearch }) {
  const [categoryTimeout, setCategoryTimeout] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show on scroll down, hide on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 15) {
        
        setShowNavbar(false);
      } else if (lastScrollY - currentScroll > 15) {
        
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (category) => {
    onCategoryChange(category);

    if (categoryTimeout) clearTimeout(categoryTimeout);

    const timeout = setTimeout(() => {
      onCategoryChange(category, true); // trigger fetch
    }, DEBOUNCE_DELAY);

    setCategoryTimeout(timeout);
  };

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-50 bg-white/70 border border-white backdrop-blur-sm p-4 rounded-2xl shadow-2xl mx-5
                md:left-1/2 md:transform md:-translate-x-1/2 md:w-max ${
        showNavbar ? "translate-y-50" : "-translate-y-0"
      }`}
    >
      {/* Category Buttons */}
      <div className="overflow-x-auto scrollbar-hide relative mask-fade md:mask-none">
        <div className="inline-flex gap-2 min-w-max md:min-w-0 md:justify-center md:w-full md:flex-wrap">
          <button
            className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 ml-3 ${
              selectedCategory === ""
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
            onClick={() => handleCategoryClick("")}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="mt-4 md:w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Category;
