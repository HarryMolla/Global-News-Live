import React, { useState, useEffect, useRef } from "react";

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
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const btnRefs = useRef({});

  // Detect keyboard via input focus/blur events
  useEffect(() => {
    const input = document.querySelector("input[type='text']");
    if (!input) return;

    const handleFocus = () => {
      setIsKeyboardOpen(true);
      setShowNavbar(true); // force navbar visible
    };

    const handleBlur = () => {
      setIsKeyboardOpen(false);
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Show on scroll down, hide on scroll up
  useEffect(() => {
    const handleScroll = () => {
      // Prevent hiding only if input is focused (keyboard open)
      if (document.activeElement.tagName === "INPUT" || isKeyboardOpen) {
        setShowNavbar(true);
        return;
      }

      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 5) {
        setShowNavbar(true); // hide on scroll down
      } else if (lastScrollY - currentScroll > 5) {
        setShowNavbar(false); // show on scroll up
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isKeyboardOpen]);

  const handleCategoryClick = (category) => {
    onCategoryChange(category);

    if (categoryTimeout) clearTimeout(categoryTimeout);

    const timeout = setTimeout(() => {
      onCategoryChange(category, true); // trigger fetch
    }, DEBOUNCE_DELAY);

    setCategoryTimeout(timeout);
  };

  // Move active indicator when selectedCategory changes
  useEffect(() => {
    const key = selectedCategory || "all";
    const currentBtn = btnRefs.current[key];
    if (currentBtn) {
      setIndicatorStyle({
        left: currentBtn.offsetLeft,
        width: currentBtn.offsetWidth,
        height: currentBtn.offsetHeight,
      });
    }
  }, [selectedCategory]);

  return (
    <div
      className={`fixed mr-3 ml-3 bottom-4 left-0 right-0 z-50 bg-white/70 dark:bg-gray-500/20 border-2 border-white/0 dark:border dark:border-white/20 backdrop-blur-xl p-4 rounded-2xl shadow-2xl mx-5 dark:shadow-gray-500/20
                md:left-1/2 md:transform md:-translate-x-1/2 md:w-max transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "translate-y-50"
      }`}
    >
      {/* Category Buttons */}
      <div className="overflow-x-auto scrollbar-hide relative mask-fade md:mask-none">
        <div className="inline-flex gap-0 min-w-max md:min-w-0 md:justify-center md:w-full md:flex-wrap relative">
          {/* Moving Background Highlight */}
          <span
            className="absolute bg-blue-500 rounded-full shadow transition-all duration-600"
            style={indicatorStyle}
          ></span>

          <button
            ref={(el) => (btnRefs.current["all"] = el)}
            className={`relative px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 ml-3 transition ${
              selectedCategory === "" ? "text-white" : "text-gray-700 dark:text-gray-400"
            }`}
            onClick={() => handleCategoryClick("")}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              ref={(el) => (btnRefs.current[cat] = el)}
              className={`relative px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full font-medium flex-shrink-0 transition ${
                selectedCategory === cat ? "text-white" : "text-gray-700 dark:text-gray-400"
              }`}
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
            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-500 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
