'use client';

import React from 'react';
import Navbar from '../navbar/page';
import Link from 'next/link';

export default function Minemore() {
  const resources = [
    {
      title: "Mining Guidelines",
      description: "Comprehensive guides and best practices for mining operations",
      link: "/guidelines"
    },
    {
      title: "Safety Protocols",
      description: "Essential safety measures and emergency procedures",
      link: "/safety"
    },
    {
      title: "Equipment Manual",
      description: "Detailed documentation for mining equipment and tools",
      link: "/equipment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
              Mine More Resources
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Access additional resources and documentation for mining operations
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {resources.map((resource, index) => (
            <Link href={resource.link} key={index} className="group">
              <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
                            border border-indigo-900/50 p-6 h-full 
                            hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
                <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
                <h2 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-orange-400 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-blue-100/70">
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-16 bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
                      border border-indigo-900/50 p-8 animate-fadeIn delay-200">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
            Need More Information?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-amber-400 mb-3">Contact Support</h3>
              <p className="text-blue-100/70 mb-4">
                Our support team is available 24/7 to assist you with any queries.
              </p>
              <Link href="/contact" 
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 
                             text-[#1a2942] font-semibold rounded-lg hover:from-orange-500 hover:to-amber-400 
                             transform hover:scale-105 transition-all duration-300">
                Contact Us
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-400 mb-3">Download Resources</h3>
              <p className="text-blue-100/70 mb-4">
                Access our comprehensive documentation and guides.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 
                               text-[#1a2942] font-semibold rounded-lg hover:from-orange-500 hover:to-amber-400 
                               transform hover:scale-105 transition-all duration-300">
                Download PDF
              </button>
            </div>
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