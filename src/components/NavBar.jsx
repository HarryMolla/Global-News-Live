import React, { useState } from 'react'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-50 shadow-lg px-4 py-3 rounded-full w-auto max-w-3xl z-50">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="text-lg font-bold text-blue-700">
          🌍 Go
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          <li className="hover:text-blue-500 cursor-pointer transition-colors">About Me</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact Me</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">How I Made This</li>
        </ul>

        {/* Subscribe Button (Desktop) */}
        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="flex flex-col mt-3 space-y-2 text-gray-700 font-medium md:hidden text-center">
          <li className="hover:text-blue-500 cursor-pointer transition-colors">About Me</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">Contact Me</li>
          <li className="hover:text-blue-500 cursor-pointer transition-colors">How I Made This</li>
          <li>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors mt-2">
              Subscribe
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
