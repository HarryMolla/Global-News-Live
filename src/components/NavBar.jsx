import React, { useState, useEffect } from "react";

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["About Me", "How I Made It", "Contact"];

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 15) {
        // scrolling down beyond 50px → hide
        setShowNavbar(false);
      } else if (lastScrollY - currentScroll > 15) {
        // scrolling up more than 50px → show
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={` bg-white/70 border-1 border-white backdrop-blur-sm  z-50  ml-5 mr-5  md:ml-70 md:mr-70 mt-5  rounded-2xl shadow-blue-100 sticky  top-0 ${
        showNavbar ? "translate-y-5" : "-translate-y-full"
      }`} >
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:hidden">
        <div className="flex items-center space-x-2">
          <AcmeLogo />
          <span className="font-bold text-lg">ACME</span>
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-gray-700 focus:outline-none"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-white h-full w-full">
          {/* Drawer Menu */}
          <div className=" bg-white h-full backdrop-blur-xs w-full p-10 flex flex-col z-10 relative ml-auto ">
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`block py-3 px-2 rounded text-lg font-medium hover:to-blue-500
                    
                } hover:bg-gray-100`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center justify-between px-6 py-4 ">
        <div className="flex items-center space-x-2">
          <AcmeLogo />
          <span className="font-bold text-lg">ACME</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-800  hover:text-blue-500">
            About Me
          </a>
          <a href="#" className="text-gray-800  hover:text-blue-500">
            How I Made It
          </a>
          <a href="#" className="text-gray-800  hover:text-blue-500">
            contact
          </a>
        </div>
        <div className="flex items-center space-x-2">bvb</div>
      </div>
    </nav>
  );
}
