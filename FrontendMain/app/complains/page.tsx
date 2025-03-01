'use client';

import React from 'react';
import Navbar from '../navbar/page';
import ComplaintForm from '../components/ComplaintForm';

export default function Complaints() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
              Submit a Complaint
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              We value your feedback and are committed to addressing your concerns
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-6 md:p-8 animate-fadeIn">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-amber-400 mb-2">
              Complaint Form
            </h2>
            <p className="text-blue-100/70">
              Please fill out the form below with your concerns. We'll get back to you as soon as possible.
            </p>
          </div>
          <ComplaintForm />
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