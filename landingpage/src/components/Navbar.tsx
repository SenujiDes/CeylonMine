import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <div className="flex items-center">
        <Image 
          src="/teamimg/logo.jpg"
          alt="Ceylon Mine Logo"
          width={50}
          height={50}
          className="mr-2"
        />
        <h1 className="text-2xl font-bold">Ceylon Mine</h1>
      </div>
      <div>
        <Link href="#features" className="text-white mx-4">Features</Link>
        <Link href="#team" className="text-white mx-4">Team</Link>
        <Link href="#contact" className="text-white mx-4">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar; 