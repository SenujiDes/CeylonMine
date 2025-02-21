import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-black text-white">
      <Image 
        src="/teamimg/logo.jpg"
        alt="Ceylon Mine Logo"
        width={50}
        height={50}
        className="mr-2"
      />
      <p className="text-lg">© 2023 Ceylon Mine. All rights reserved.</p>
    </footer>
  );
};

export default Footer; 