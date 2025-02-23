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
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
              <Image 
                src="/teamimg/logo.jpg"
                alt="Ceylon Mine Logo"
                width={40}
                height={40}
                className="relative rounded-full border border-blue-500"
              />
            </div>
            <span className="text-lg font-semibold text-white">Ceylon Mine</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-4">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#team" className="text-gray-400 hover:text-white transition-colors">Team</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            
            <p className="text-gray-400">
              © {currentYear} Ceylon Mine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;