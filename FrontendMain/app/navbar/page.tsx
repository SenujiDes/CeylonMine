'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark') // Toggle dark class on the root element
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Minebot', path: '/minebot' },
    { name: 'Royalty', path: '/royalty' },
    { name: 'Complains', path: '/complains' },
    { name: 'License Portal', path: '/license-portal' },
    { name: 'Minemore', path: '/minemore' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ]

  const navAnimation = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={navAnimation}
      className={`${scrolled ? (isDarkMode ? 'bg-[#0A192F]' : 'bg-white') : 'bg-transparent'} 
        fixed w-full z-50 transition-all duration-300 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            variants={itemAnimation}
            className="flex-shrink-0 flex items-center"
          >
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/favicon.ico" 
                  alt="Logo" 
                  width={62} 
                  height={62} 
                  className="mr-2 hover:scale-105 transition-transform duration-200"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            variants={itemAnimation}
            className="hidden md:flex items-center space-x-4"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.path}>
                  <span className={`px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
                    hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200
                    relative after:content-[''] after:absolute after:bottom-0 after:left-0 
                    after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all 
                    after:duration-300 hover:after:w-full`}>
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side (Theme Toggle and Sign Up Button) */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} 
                hover:opacity-80 transition-all`}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </motion.button>

            {/* Sign Up Button */}
            <motion.div 
              variants={itemAnimation}
              className="hidden md:block"
            >
              <Link href="/signup">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FFA500] text-[#0A192F] px-4 py-2 rounded-lg 
                    hover:bg-[#FFD700] transition-colors duration-200 cursor-pointer
                    font-semibold"
                >
                  Sign Up
                </motion.span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${isDarkMode ? 'text-[#FFA500]' : 'text-gray-900'} 
                  hover:bg-[rgba(255,165,0,0.1)]`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isDarkMode ? 'bg-[#112240]' : 'bg-gray-100'} rounded-b-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemAnimation}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.path}>
                  <span className={`block px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
                    hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200`}>
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
            {/* Mobile Sign Up Button */}
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <Link href="/signup">
                <span className="block w-full text-center bg-[#FFA500] text-[#0A192F] 
                  px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors duration-200
                  font-semibold">
                  Sign Up
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}