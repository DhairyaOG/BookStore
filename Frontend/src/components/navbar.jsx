import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-0">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Links */}
          <div className="flex items-center space-x-4 ">
            <a href="/"><img src="/assets/logo.png" alt="BookStore Logo" className="h-20 w-auto" /></a>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6 text-gray-600">
              <a href="/books/create" className="hover:text-indigo-600">
                Add Book
              </a>
              <a href="#" className="hover:text-indigo-600">
                Categories
              </a>
              <a href="#" className="hover:text-indigo-600">
                About
              </a>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-indigo-600">
              Cart
            </button>
            <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden space-x-4 ">
            <button className="text-gray-700 hover:text-indigo-600">
              Cart
            </button>
            <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Login
            </button>

            <button
              onClick={toggleMenu}
              className="text-gray-700 text-2xl focus:outline-none"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 text-gray-700">
            <a href="/" className="block hover:text-indigo-600">
              Home
            </a>
            <a href="/books/create" className="block hover:text-indigo-600">
              Add Book
            </a>
            <a href="#" className="block hover:text-indigo-600">
              Categories
            </a>
            <a href="#" className="block hover:text-indigo-600">
              About
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
