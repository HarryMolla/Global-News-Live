import React from "react";

export const NavBar = () => {
  return (
    <nav className="bg-black-blue text-gray-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-2xl font-bold">
            Global Live News
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-8">
            <li className="hover:text-blue-500 cursor-pointer transition-colors">About Me</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact Me</li>
            <li className="hover:text-blue-500 cursor-pointer transition-colors">How I Made This</li>
          </ul>

          {/* Search */}
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
