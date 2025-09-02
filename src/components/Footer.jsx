import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left: Copyright */}
        <p className="text-blue-500 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} GlobalNewsLive. All rights reserved.
        </p>

        {/* Right: Links */}
        <ul className="flex space-x-6">
          <li className="text-blue-500 hover:text-blue-300 cursor-pointer transition-colors">About</li>
          <li className="text-blue-500 hover:text-blue-300 cursor-pointer transition-colors">Contact</li>
          <li className="text-blue-500 hover:text-blue-300 cursor-pointer transition-colors">How I Made This</li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;
