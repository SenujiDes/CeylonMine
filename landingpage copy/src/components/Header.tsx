


// "use client"

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Navigation, Users, Phone, Calendar } from 'lucide-react'

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const navItems = [
//     { href: "#features", icon: Navigation, label: "Features" },
//     { href: "#timeline", icon: Calendar, label: "Timeline" },
//     { href: "#team", icon: Users, label: "Team" },
//     { href: "#contact", icon: Phone, label: "Contact" }
//   ]

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' : 'bg-transparent'}`}>
//       <nav className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <Link href="/" className="flex items-center space-x-3">
//             <div className="relative">
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
//               <img src="/teamimg/logo.jpg" alt="Logo" className="relative w-12 h-12 rounded-full border-2 border-blue-500" />
//             </div>
//             <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//               Ceylon Mine
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="group flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
//               >
//                 <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                 <span className="relative">
//                   {item.label}
//                   <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
//                 </span>
//               </Link>
//             ))}
//           </div>

//           <button
//             className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
//               <span className={`block w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//               <span className={`block w-full h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
//               <span className={`block w-full h-0.5 bg-current transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//             </div>
//           </button>
//         </div>

//         {isMenuOpen && (
//           <div className="md:hidden mt-4 p-4 bg-gray-800 rounded-xl backdrop-blur-lg border border-gray-700">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors p-3"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <item.icon className="w-4 h-4" />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </div>
//         )}
//       </nav>
//     </header>
//   )
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation, Users, Phone, Calendar } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#features", icon: Navigation, label: "Features" },
    { href: "#timeline", icon: Calendar, label: "Timeline" },
    { href: "#team", icon: Users, label: "Team" },
    { href: "#contact", icon: Phone, label: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(255,215,0,0.2)] border-b border-amber-600"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-700 to-amber-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="/teamimg/logo.jpg"
                alt="Logo"
                className="relative w-12 h-12 rounded-full border-2 border-amber-500"
              />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-300">
              Ceylon Mine
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-all duration-300 relative"
              >
                <item.icon className="w-5 h-5 text-amber-500 group-hover:text-amber-300 transition-transform group-hover:rotate-12" />
                <span className="relative">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block w-full h-0.5 bg-current transform transition-transform ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-current transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-current transform transition-transform ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-black rounded-xl backdrop-blur-lg border border-amber-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-all p-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-4 h-4 text-amber-500" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
