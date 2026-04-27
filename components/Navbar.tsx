'use client'

import Link from 'next/link'
import { Search, Upload, Home } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-carrot-start to-carrot-end flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">🎬</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-carrot-start to-carrot-end bg-clip-text text-transparent hidden sm:inline">
              NetflixFX
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Home size={18} />
              <span className="text-sm">Home</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Hidden on mobile, shows icon */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search movies..."
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-carrot-start transition-all duration-300 w-48 focus:w-64"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Mobile Search Icon */}
            <button className="sm:hidden text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>

            {/* Upload Button */}
            <Link
              href="/upload"
              className="flex items-center gap-2 btn-primary text-sm"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
