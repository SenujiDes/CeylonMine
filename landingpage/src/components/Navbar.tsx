// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const Navbar = () => {
//   return (
//     <nav className="flex items-center justify-between p-4 bg-black text-white">
//       <div className="flex items-center">
//         <Image 
//           src="/teamimg/logo.jpg"
//           alt="Ceylon Mine Logo"
//           width={50}
//           height={50}
//           className="mr-2"
//         />
//         <h1 className="text-2xl font-bold">Ceylon Mine</h1>
//       </div>
//       <div>
//         <Link href="#features" className="text-white mx-4">Features</Link>
//         <Link href="#team" className="text-white mx-4">Team</Link>
//         <Link href="#contact" className="text-white mx-4">Contact</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar; 

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white shadow-lg border-b border-orange-800">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 transition-all duration-300 hover:scale-110 hover:border-orange-500">
          <Image 
            src="/teamimg/logo.jpg"
            alt="Ceylon Mine Logo"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-amber-400 ml-3 tracking-wide">
          Ceylon Mine
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 text-lg font-medium">
        <Link href="#features" className="text-white hover:text-amber-400 transition-all duration-300 relative group">
          Features
          <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link href="#team" className="text-white hover:text-amber-400 transition-all duration-300 relative group">
          Team
          <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link href="#contact" className="text-white hover:text-amber-400 transition-all duration-300 relative group">
          Contact
          <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
