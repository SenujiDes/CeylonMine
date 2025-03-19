// // 'use client'
// // import Link from 'next/link'
// // import Image from 'next/image'
// // import { motion } from 'framer-motion'
// // import { useState, useEffect } from 'react'

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const [scrolled, setScrolled] = useState(false)
// //   const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

// //   // Add scroll effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const isScrolled = window.scrollY > 20
// //       if (isScrolled !== scrolled) {
// //         setScrolled(isScrolled)
// //       }
// //     }

// //     window.addEventListener('scroll', handleScroll)
// //     return () => window.removeEventListener('scroll', handleScroll)
// //   }, [scrolled])

// //   // Toggle dark/light mode
// //   const toggleTheme = () => {
// //     const newTheme = !isDarkMode
// //     setIsDarkMode(newTheme)

// //     // Apply the theme to the root HTML element
// //     if (newTheme) {
// //       document.documentElement.classList.add('dark')
// //     } else {
// //       document.documentElement.classList.remove('dark')
// //     }

// //     // Save the theme preference to localStorage (optional)
// //     localStorage.setItem('theme', newTheme ? 'dark' : 'light')
// //   }

// //   // Initialize theme from localStorage or system preference
// //   useEffect(() => {
// //     const savedTheme = localStorage.getItem('theme')
// //     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// //     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
// //       setIsDarkMode(true)
// //       document.documentElement.classList.add('dark')
// //     } else {
// //       setIsDarkMode(false)
// //       document.documentElement.classList.remove('dark')
// //     }
// //   }, [])

// //   const navItems = [
// //     { name: 'Home', path: '/' },
// //     { name: 'Map', path: '/map' },
// //     { name: 'Minebot', path: '/minebot' },
// //     { name: 'Royalty', path: '/royalty' },
// //     { name: 'Complains', path: '/complains' },
// //     { name: 'License Portal', path: '/license-portal' },
// //     { name: 'Minemore', path: '/minemore' },
// //     { name: 'About Us', path: '/about' },
// //     { name: 'Contact Us', path: '/contact' }
// //   ]

// //   const navAnimation = {
// //     hidden: { y: -20, opacity: 0 },
// //     show: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   }

// //   const itemAnimation = {
// //     hidden: { y: -20, opacity: 0 },
// //     show: { y: 0, opacity: 1 },
// //   }

// //   return (
// //     <motion.div
// //       initial="hidden"
// //       animate="show"
// //       variants={navAnimation}
// //       className={`${scrolled ? (isDarkMode ? 'bg-[#0A192F]' : 'bg-white') : 'bg-transparent'} 
// //         fixed w-full z-50 transition-all duration-300 shadow-lg`}
// //     >
// //       <div className="max-w-7xl mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">
// //           {/* Logo Section */}
// //           <motion.div
// //             variants={itemAnimation}
// //             className="flex-shrink-0 flex items-center"
// //           >
// //             <Link href="/">
// //               <div className="flex items-center">
// //                 <Image 
// //                   src="/favicon.ico" 
// //                   alt="Logo" 
// //                   width={62} 
// //                   height={62} 
// //                   className="mr-2 hover:scale-105 transition-transform duration-200"
// //                 />
// //               </div>
// //             </Link>
// //           </motion.div>

// //           {/* Desktop Navigation */}
// //           <motion.div 
// //             variants={itemAnimation}
// //             className="hidden md:flex items-center space-x-4"
// //           >
// //             {navItems.map((item) => (
// //               <motion.div
// //                 key={item.path}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <Link href={item.path}>
// //                   <span className={`px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
// //                     hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200
// //                     relative after:content-[''] after:absolute after:bottom-0 after:left-0 
// //                     after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all 
// //                     after:duration-300 hover:after:w-full`}>
// //                     {item.name}
// //                   </span>
// //                 </Link>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           {/* Right Side (Theme Toggle and Sign Up Button) */}
// //           <div className="flex items-center space-x-4">
// //             {/* Theme Toggle Button */}
// //             <motion.button
// //               onClick={toggleTheme}
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} 
// //                 hover:opacity-80 transition-all`}
// //             >
// //               {isDarkMode ? '🌞' : '🌙'}
// //             </motion.button>

// //             {/* Sign Up Button */}
// //             <motion.div 
// //               variants={itemAnimation}
// //               className="hidden md:block"
// //             >
// //               <Link href="/signup">
// //                 <motion.span
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="bg-[#FFA500] text-[#0A192F] px-4 py-2 rounded-lg 
// //                     hover:bg-[#FFD700] transition-colors duration-200 cursor-pointer
// //                     font-semibold"
// //                 >
// //                   Sign Up
// //                 </motion.span>
// //               </Link>
// //             </motion.div>

// //             {/* Mobile Menu Button */}
// //             <div className="md:hidden">
// //               <button
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className={`p-2 rounded-md ${isDarkMode ? 'text-[#FFA500]' : 'text-gray-900'} 
// //                   hover:bg-[rgba(255,165,0,0.1)]`}
// //               >
// //                 <svg
// //                   className="w-6 h-6"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M4 6h16M4 12h16m-7 6h7"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Mobile Navigation Menu */}
// //         <motion.div
// //           initial={false}
// //           animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
// //           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
// //             ${isDarkMode ? 'bg-[#112240]' : 'bg-gray-100'} rounded-b-lg`}
// //         >
// //           <div className="px-2 pt-2 pb-3 space-y-1">
// //             {navItems.map((item) => (
// //               <motion.div
// //                 key={item.path}
// //                 variants={itemAnimation}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <Link href={item.path}>
// //                   <span className={`block px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
// //                     hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200`}>
// //                     {item.name}
// //                   </span>
// //                 </Link>
// //               </motion.div>
// //             ))}
// //             {/* Mobile Sign Up Button */}
// //             <motion.div
// //               whileTap={{ scale: 0.95 }}
// //               className="mt-4"
// //             >
// //               <Link href="/signup">
// //                 <span className="block w-full text-center bg-[#FFA500] text-[#0A192F] 
// //                   px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors duration-200
// //                   font-semibold">
// //                   Sign Up
// //                 </span>
// //               </Link>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   )
// // }

// 'use client'
// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

//   // Add scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 20
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled)
//       }
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [scrolled])

//   // Toggle dark/light mode
//   const toggleTheme = () => {
//     const newTheme = !isDarkMode
//     setIsDarkMode(newTheme)

//     // Apply the theme to the root HTML element
//     if (newTheme) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }

//     // Save the theme preference to localStorage
//     localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
//     // Emit an event for other components to listen to
//     const event = new CustomEvent('themeChange', { detail: { isDarkMode: newTheme } });
//     window.dispatchEvent(event);
//   }

//   // Initialize theme from localStorage or system preference
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme')
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       setIsDarkMode(true)
//       document.documentElement.classList.add('dark')
//     } else {
//       setIsDarkMode(false)
//       document.documentElement.classList.remove('dark')
//     }
    
//     // Emit initial theme state
//     const event = new CustomEvent('themeChange', { detail: { isDarkMode: savedTheme === 'dark' || (!savedTheme && systemPrefersDark) } });
//     window.dispatchEvent(event);
//   }, [])

//   const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Map', path: '/map' },
//     { name: 'Minebot', path: '/minebot' },
//     { name: 'Royalty', path: '/royalty' },
//     { name: 'Complains', path: '/complains' },
//     { name: 'License Portal', path: '/license-portal' },
//     { name: 'Minemore', path: '/minemore' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Contact Us', path: '/contact' }
//   ]

//   const navAnimation = {
//     hidden: { y: -20, opacity: 0 },
//     show: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemAnimation = {
//     hidden: { y: -20, opacity: 0 },
//     show: { y: 0, opacity: 1 },
//   }

//   return (
//     <motion.div
//       initial="hidden"
//       animate="show"
//       variants={navAnimation}
//       className={`${scrolled ? (isDarkMode ? 'bg-[#0A192F]' : 'bg-white') : 'bg-transparent'} 
//         fixed w-full z-50 transition-all duration-300 shadow-lg`}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo Section */}
//           <motion.div
//             variants={itemAnimation}
//             className="flex-shrink-0 flex items-center"
//           >
//             <Link href="/">
//               <div className="flex items-center">
//                 <Image 
//                   src="/favicon.ico" 
//                   alt="Logo" 
//                   width={62} 
//                   height={62} 
//                   className="mr-2 hover:scale-105 transition-transform duration-200"
//                 />
//               </div>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.div 
//             variants={itemAnimation}
//             className="hidden md:flex items-center space-x-4"
//           >
//             {navItems.map((item) => (
//               <motion.div
//                 key={item.path}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link href={item.path}>
//                   <span className={`px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
//                     hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200
//                     relative after:content-[''] after:absolute after:bottom-0 after:left-0 
//                     after:w-0 after:h-[2px] after:bg-[#FFA500] after:transition-all 
//                     after:duration-300 hover:after:w-full`}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Right Side (Theme Toggle and Sign Up Button) */}
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle Button */}
//             <motion.button
//               onClick={toggleTheme}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'} 
//                 hover:opacity-80 transition-all`}
//             >
//               {isDarkMode ? '🌞' : '🌙'}
//             </motion.button>

//             {/* Sign Up Button */}
//             <motion.div 
//               variants={itemAnimation}
//               className="hidden md:block"
//             >
//               <Link href="/signup">
//                 <motion.span
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-[#FFA500] text-[#0A192F] px-4 py-2 rounded-lg 
//                     hover:bg-[#FFD700] transition-colors duration-200 cursor-pointer
//                     font-semibold"
//                 >
//                   Sign Up
//                 </motion.span>
//               </Link>
//             </motion.div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`p-2 rounded-md ${isDarkMode ? 'text-[#FFA500]' : 'text-gray-900'} 
//                   hover:bg-[rgba(255,165,0,0.1)]`}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <motion.div
//           initial={false}
//           animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
//             ${isDarkMode ? 'bg-[#112240]' : 'bg-gray-100'} rounded-b-lg`}
//         >
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map((item) => (
//               <motion.div
//                 key={item.path}
//                 variants={itemAnimation}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link href={item.path}>
//                   <span className={`block px-3 py-2 ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
//                     hover:text-[#FFA500] hover:bg-[rgba(255,165,0,0.1)] rounded-md transition-all duration-200`}>
//                     {item.name}
//                   </span>
//                 </Link>
//               </motion.div>
//             ))}
//             {/* Mobile Sign Up Button */}
//             <motion.div
//               whileTap={{ scale: 0.95 }}
//               className="mt-4"
//             >
//               <Link href="/signup">
//                 <span className="block w-full text-center bg-[#FFA500] text-[#0A192F] 
//                   px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors duration-200
//                   font-semibold">
//                   Sign Up
//                 </span>
//               </Link>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [language, setLanguage] = useState('en')     // Default language

  // Scroll effect for background color
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

  // ----------------------------
  // THEME TOGGLE LOGIC
  // ----------------------------
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    // Apply to <html> element
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    // Emit themeChange event
    const event = new CustomEvent('themeChange', { detail: { isDarkMode: newTheme } })
    window.dispatchEvent(event)
  }

  // ----------------------------
  // LANGUAGE TOGGLE / SWITCH
  // ----------------------------
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'si' : 'en'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
    
    // Emit languageChange event
    const event = new CustomEvent('languageChange', { detail: { language: newLang } })
    window.dispatchEvent(event)
  }

  // Initialize theme & language from localStorage or system preference
  useEffect(() => {
    // THEME
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Emit initial theme event
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode: isDark } }))

    // LANGUAGE
    const savedLang = localStorage.getItem('language') || 'en'
    setLanguage(savedLang)
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: savedLang } }))
  }, [])

  // ----------------------------
  // NAVIGATION ITEMS
  // ----------------------------
  // Example: different text per language
  const navItemsEn = [
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

  // For demonstration, let's provide a Sinhala version of the same links
  // (Feel free to replace with actual translations)
  const navItemsSi = [
    { name: 'මුල් පිටුව', path: '/' },
    { name: 'සිතියම', path: '/map' },
    { name: 'Minebot', path: '/minebot' },
    { name: 'Royalty', path: '/royalty' },
    { name: 'Complains', path: '/complains' },
    { name: 'License Portal', path: '/license-portal' },
    { name: 'Minemore', path: '/minemore' },
    { name: 'අපි ගැන', path: '/about' },
    { name: 'අප හා සම්බන්ධ වන්න', path: '/contact' }
  ]

  const navItems = language === 'en' ? navItemsEn : navItemsSi

  // Framer Motion variants
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
      className={`
        fixed w-full z-50 transition-all duration-300 shadow-lg
        ${scrolled
          ? (isDarkMode ? 'bg-[#0A192F]' : 'bg-white')
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            variants={itemAnimation}
            className="flex-shrink-0 flex items-center"
          >
            <Link href="/">
              <div className="flex items-center cursor-pointer">
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
                  <span
                    className={`
                      px-3 py-2 
                      ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'} 
                      hover:text-[#FFA500] 
                      hover:bg-[rgba(255,165,0,0.1)] 
                      rounded-md transition-all duration-200
                      relative after:content-[''] 
                      after:absolute after:bottom-0 after:left-0 
                      after:w-0 after:h-[2px] after:bg-[#FFA500] 
                      after:transition-all after:duration-300 
                      hover:after:w-full
                    `}
                  >
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side (Theme Toggle, Language Switch, Sign Up Button) */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle (simple approach: just toggles between EN & SI) */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}
                hover:opacity-80 transition-all
              `}
              title="Switch Language"
            >
              {language === 'en' ? 'EN' : 'සි'}
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}
                hover:opacity-80 transition-all
              `}
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </motion.button>

            {/* Sign Up Button (desktop) */}
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
                  {language === 'en' ? 'Sign Up' : 'ලියාපදිංචි වන්න'}
                </motion.span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  p-2 rounded-md
                  ${isDarkMode ? 'text-[#FFA500]' : 'text-gray-900'}
                  hover:bg-[rgba(255,165,0,0.1)]
                `}
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
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isDarkMode ? 'bg-[#112240]' : 'bg-gray-100'}
            rounded-b-lg
          `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemAnimation}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.path}>
                  <span
                    className={`
                      block px-3 py-2
                      ${isDarkMode ? 'text-[#E6F1FF]' : 'text-gray-900'}
                      hover:text-[#FFA500]
                      hover:bg-[rgba(255,165,0,0.1)]
                      rounded-md transition-all duration-200
                    `}
                  >
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
                <span
                  className={`
                    block w-full text-center bg-[#FFA500] text-[#0A192F]
                    px-4 py-2 rounded-lg hover:bg-[#FFD700]
                    transition-colors duration-200 font-semibold
                  `}
                >
                  {language === 'en' ? 'Sign Up' : 'ලියාපදිංචි වන්න'}
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
