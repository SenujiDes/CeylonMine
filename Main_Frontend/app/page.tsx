'use client';
import React from 'react';
import Navbar from './navbar/page';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
              Welcome to Mining Portal
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your comprehensive platform for mining management and operations
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {/* License Management */}
          <Link href="/license-portal" className="group">
            <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-6 h-full 
                          hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
              <h2 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-orange-400 transition-colors">
                License Management
              </h2>
              <p className="text-blue-100/70">
                Apply and manage your mining licenses efficiently through our portal
              </p>
            </div>
          </Link>

          {/* Royalty Calculator */}
          <Link href="/royalty" className="group">
            <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-6 h-full 
                          hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
              <h2 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-orange-400 transition-colors">
                Royalty Calculator
              </h2>
              <p className="text-blue-100/70">
                Calculate mining royalties and manage your payments
              </p>
            </div>
          </Link>

          {/* Complaints */}
          <Link href="/complains" className="group">
            <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-6 h-full 
                          hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
              <h2 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-orange-400 transition-colors">
                Submit Complaints
              </h2>
              <p className="text-blue-100/70">
                Report issues and track their resolution status
              </p>
            </div>
          </Link>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center animate-fadeIn delay-200">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-blue-100/70 max-w-2xl mx-auto">
            Join our platform to streamline your mining operations and ensure compliance with regulations
          </p>
          <div className="mt-8">
            <Link href="/signup" 
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-[#1a2942] 
                           bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400
                           transform hover:scale-105 transition-all duration-300 animate-gradient">
              Sign Up Now
            </Link>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
      </div>
    </div>
  );
}
 