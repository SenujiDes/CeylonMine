"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-black/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Ceylon Mine
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-white hover:text-gray-300">Features</Link>
            <Link href="#timeline" className="text-white hover:text-gray-300">Timeline</Link>
            <Link href="#team" className="text-white hover:text-gray-300">Team</Link>
            <Link href="#contact" className="text-white hover:text-gray-300">Contact</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="#features" className="block text-white hover:text-gray-300">Features</Link>
            <Link href="#timeline" className="block text-white hover:text-gray-300">Timeline</Link>
            <Link href="#team" className="block text-white hover:text-gray-300">Team</Link>
            <Link href="#contact" className="block text-white hover:text-gray-300">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  )
} 