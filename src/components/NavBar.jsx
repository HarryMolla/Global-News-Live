import React, { useState, useEffect } from "react";
import logo from "../assets/Global News live logo.svg";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 5) {
        setShowNavbar(false);
      } else if (lastScrollY - currentScroll > 5) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={` bg-white/90  dark:bg-gray-500/10 border-1 mx-auto border-white dark:border dark:border-white/20  backdrop-blur-md z-50 ml-3 mr-3 md:ml-70 md:mr-70 mt-5 rounded-2xl  sticky top-0 ${
          showNavbar ? "translate-y-5" : "-translate-y-full"
        }`}
      >
        {/* MOBILE NAV */}
        <div className="flex items-center justify-between px-4 py-3 sm:hidden">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="navbar-link no-underline">
              <img
                src={logo}
                alt="Global News"
                className="h-8 w-auto md:h-10 lg:h-12 "
              />
            </a>
          </div>

          {/* Right: Toggle + Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-4 transition duration-300 dark:bg-gray-600 dark:text-gray-300 text-gray-500 bg-gray-100 rounded-full relative overflow-hidden flex items-center justify-center"
            >
              <FaMoon
                className={`absolute transition-all duration-500 transform ${
                  darkMode
                    ? "opacity-0 scale-0 rotate-90"
                    : "opacity-100 scale-100 rotate-0"
                }`}
                size={18}
              />
              <FaSun
                className={`absolute transition-all duration-500 transform ${
                  darkMode
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-0 -rotate-90"
                }`}
                size={18}
              />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 focus:outline-none"
              aria-label="Open menu"
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden sm:flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <a href="/" className="navbar-link no-underline">
              <img
                src={logo}
                alt="Global News"
                className="h-8 w-auto md:h-10 lg:h-12"
              />
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <NavLink
              to="/HowIBuiltThis"
              className={({ isActive }) =>
                `px-4 py-1 rounded-md font-medium navbar-link 
    ${
      isActive
        ? "text-blue-600 dark:text-blue-400 dark:bg-gray-700"
        : "text-gray-500 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-gray-500/15"
    }`
              }
            >
              How I Built This
            </NavLink>
            <NavLink
              to="/LetsConnect"
              className={({ isActive }) =>
                `px-4 py-1 rounded-md font-medium navbar-link 
    ${
      isActive
        ? "text-blue-600 dark:text-blue-400 dark:bg-gray-700"
        : "text-gray-500 dark:text-gray-300 hover:bg-blue-100/50 dark:hover:bg-gray-500/15"
    }`
              }
            >
              Let’s Connect
            </NavLink>
          </div>

          {/* Theme Toggle (desktop) */}
          <button
            onClick={toggleDarkMode}
            className="p-5 transition duration-300 text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-full relative overflow-hidden flex items-center justify-center"
          >
            <FaMoon
              className={`absolute transition-all duration-500 transform ${
                darkMode
                  ? "opacity-0 scale-0 rotate-90"
                  : "opacity-100 scale-100 rotate-0"
              }`}
              size={20}
            />
            <FaSun
              className={`absolute transition-all duration-500 transform ${
                darkMode
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-0 -rotate-90"
              }`}
              size={20}
            />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
            onTouchMove={() => setIsMenuOpen(false)}
            onMouseMove={() => setIsMenuOpen(false)}
          />
          <div className="relative w-full h-1.5/5 bg-white dark:bg-gray-700/50 backdrop-blur-md rounded-t-2xl shadow-lg p-6 transition-transform duration-200">
            {/* Menu Items */}
            <div className="flex flex-col gap-2 text-center">
              <NavLink
                to="/HowIBuiltThis"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-4 rounded-2xl font-medium navbar-link 
    ${
      isActive
        ? "text-gray-500/80 dark:text-gray-300/50 bg-blue-100/10 dark:bg-gray-700/20"
        : "text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-gray-700"
    }`
                }
              >
                How I Built This
              </NavLink>

              <NavLink
                to="/LetsConnect"
                onClick={() => setIsMenuOpen(false)}
                 className={({ isActive }) =>
                `px-4 py-4 rounded-2xl font-medium navbar-link 
    ${
      isActive
        ? "text-gray-500/80 dark:text-gray-300/50 bg-blue-100/10 dark:bg-gray-700/20"
        : "text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-gray-700"
    }`
              }>
                Let’s Connect
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
