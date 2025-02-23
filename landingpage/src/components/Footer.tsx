// import React from 'react';
// import Image from 'next/image';

// const Footer = () => {
//   return (
//     <footer className="flex items-center justify-center p-4 bg-black text-white">
//       <Image 
//         src="/teamimg/logo.jpg"
//         alt="Ceylon Mine Logo"
//         width={50}
//         height={50}
//         className="mr-2"
//       />
//       <p className="text-lg">© 2023 Ceylon Mine. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer; 

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-700 relative py-6">
      {/* Subtle Gold Glow for Elegance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_10%,rgba(0,0,0,0.95)_90%)]"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-400 rounded-full blur opacity-20 group-hover:opacity-75 transition duration-300"></div>
            <Image 
              src="/teamimg/logo.jpg"
              alt="Ceylon Mine Logo"
              width={35}
              height={35}
              className="relative rounded-full border border-amber-500"
            />
          </div>
          <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">
            Ceylon Mine
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-400">
          <a href="#features" className="hover:text-amber-500 transition-all duration-300">
            Features
          </a>
          <a href="#team" className="hover:text-amber-500 transition-all duration-300">
            Team
          </a>
          <a href="#contact" className="hover:text-amber-500 transition-all duration-300">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4 md:mt-0">
          © {currentYear} <span className="text-amber-500">Ceylon Mine</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
