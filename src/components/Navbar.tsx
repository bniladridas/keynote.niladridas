import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c2128] border-b border-[#30363d]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300">
          <Home className="w-5 h-5" />
          <span className="font-semibold">ML Learning Platform</span>
        </Link>

        {/* Center section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Add your navigation links here */}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Other navbar items can go here */}
        </div>
      </div>
    </nav>
  );
}
