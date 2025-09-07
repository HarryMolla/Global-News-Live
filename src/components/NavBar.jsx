import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Global News live logo.svg";
import { FaSun, FaMoon, FaBars, FaTimes, FaGripLines } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["How I Built This", "Let’s Connect"];
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const [drawerY, setDrawerY] = useState(0);
  const dragStartRef = useRef(0);

  const startDrag = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = clientY;

    const move = (ev) => {
      const currentY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const diff = currentY - dragStartRef.current;
      if (diff > 0) setDrawerY(diff);
    };

    const end = () => {
      if (drawerY > 100) setIsMenuOpen(false); // close drawer if dragged enough
      setDrawerY(0);

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

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

  return (
    <>
      <nav
        className={`bg-white/70 border-1 mx-auto border-white backdrop-blur-sm z-50 ml-5 mr-5 md:ml-70 md:mr-70 mt-5 rounded-2xl shadow-blue-100 sticky top-0 ${
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
                className="h-8 w-auto md:h-10 lg:h-12"
              />
            </a>
          </div>

          {/* Right: Toggle + Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-4 transition duration-300 text-gray-500 bg-gray-100 rounded-full relative overflow-hidden flex items-center justify-center"
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
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:bg-blue-100 navbar-link text-gray-800 hover:text-blue-500 px-4 py-1 rounded-md"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Theme Toggle (desktop) */}
          <button
            onClick={toggleTheme}
            className="p-5 transition duration-300 text-gray-500 bg-gray-100 rounded-full relative overflow-hidden flex items-center justify-center"
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
            className="absolute inset-0 bg-black/40 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Draggable Bottom Drawer */}
          <div
            className="relative w-full h-1.5/5 bg-white rounded-t-2xl shadow-lg p-4 transition-transform duration-200"
            style={{ transform: `translateY(${drawerY}px)` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            {/* Drag handle */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col mt-4 gap-2 text-center">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className=" block py-3 px-2 text-lg font-medium text-blue-500 bg-blue-50 rounded-2xl "
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
