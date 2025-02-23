

// "use client"

// import React from 'react';
// import Link from 'next/link';
// import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';

// const Contact = () => {
//   return (
//     <section id="contact" className="py-20 bg-gray-900">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//           Get in Touch
//         </h2>
        
//         <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
//           {/* Contact Info */}
//           <div className="space-y-8">
//             <div className="flex items-center space-x-4 group">
//               <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-blue-500/10 transition-colors">
//                 <MapPin className="w-6 h-6 text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-white font-semibold mb-1">Address</h3>
//                 <p className="text-gray-400">123 Ceylon Mine St, Colombo, Sri Lanka</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4 group">
//               <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-blue-500/10 transition-colors">
//                 <Phone className="w-6 h-6 text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-white font-semibold mb-1">Phone</h3>
//                 <p className="text-gray-400">+94 123 456 789</p>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4 group">
//               <div className="p-3 rounded-lg bg-gray-800 group-hover:bg-blue-500/10 transition-colors">
//                 <Mail className="w-6 h-6 text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-white font-semibold mb-1">Email</h3>
//                 <p className="text-gray-400">contact@ceylonmine.com</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Social Links */}
//           <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
//             <h3 className="text-2xl font-semibold text-white mb-8">Connect With Us</h3>
//             <div className="flex space-x-6">
//               <Link 
//                 href="https://www.linkedin.com/company/ceylonmine" 
//                 className="p-3 rounded-lg bg-gray-700 hover:bg-blue-500/20 transition-colors"
//                 target="_blank"
//               >
//                 <Linkedin className="w-6 h-6 text-blue-400" />
//               </Link>
//               <Link 
//                 href="https://github.com/ceylonmine" 
//                 className="p-3 rounded-lg bg-gray-700 hover:bg-purple-500/20 transition-colors"
//                 target="_blank"
//               >
//                 <Github className="w-6 h-6 text-purple-400" />
//               </Link>
//               <Link 
//                 href="https://instagram.com/ceylonmine" 
//                 className="p-3 rounded-lg bg-gray-700 hover:bg-pink-500/20 transition-colors"
//                 target="_blank"
//               >
//                 <Instagram className="w-6 h-6 text-pink-400" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, X } from 'lucide-react';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,94,117,0.25)_0%,rgba(0,0,0,1)_70%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
            Connect with Excellence
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with precision and expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            {[
              { icon: MapPin, title: "Global Headquarters", detail: "123 Ceylon Mine St, Colombo, Sri Lanka" },
              { icon: Phone, title: "Direct Line", detail: "+94 123 456 789" },
              { icon: Mail, title: "Executive Support", detail: "contact@ceylonmine.com" },
            ].map(({ icon: Icon, title, detail }, index) => (
              <div
                key={index}
                className="group flex items-start space-x-5 p-5 bg-gradient-to-b from-black/80 to-[#001220]/80 backdrop-blur-sm border border-amber-900/50 rounded-xl transition-all duration-300 hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-900/30"
              >
                <div className="p-3 rounded-lg bg-black border border-amber-800/50 group-hover:bg-amber-900/20 transition-all">
                  <Icon className="w-6 h-6 text-amber-500 group-hover:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300 font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-gray-400 font-light">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Connections */}
          <div className="p-8 bg-gradient-to-br from-black/80 via-[#001220]/80 to-black/80 backdrop-blur-sm border border-amber-900/50 rounded-xl shadow-2xl shadow-amber-900/10">
            <h3 className="text-2xl font-semibold text-amber-100 mb-8">Strategic Partnerships</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { href: "#", icon: Linkedin, label: "LinkedIn" },
                { href: "#", icon: Github, label: "GitHub" },
                { href: "#", icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="flex flex-col items-center p-4 space-y-3 bg-black/30 border border-amber-900/50 rounded-lg transition-all hover:border-amber-600 hover:bg-amber-900/20 hover:shadow-lg hover:shadow-amber-900/20"
                  target="_blank"
                >
                  <Icon className="w-8 h-8 text-amber-500 hover:text-amber-400" />
                  <span className="text-sm text-gray-400 font-light">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg font-semibold text-lg text-black hover:from-amber-500 hover:to-amber-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-900/40"
          >
            Initiate Consultation
          </button>
        </div>

        {/* Enhanced Contact Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="relative bg-gradient-to-br from-black via-[#001220] to-black/90 rounded-xl border border-amber-900/50 w-full max-w-md md:max-w-2xl p-6 md:p-8 shadow-2xl shadow-amber-900/20 transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-95">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6 md:mb-8">
                Strategic Consultation Request
              </h3>
              
              <form className="space-y-4 md:space-y-6">
                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm md:text-base text-gray-300 font-light">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      className="w-full px-4 py-2 md:py-3 text-sm md:text-base bg-black/30 border border-amber-900/50 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm md:text-base text-gray-300 font-light">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full px-4 py-2 md:py-3 text-sm md:text-base bg-black/30 border border-amber-900/50 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="projectOverview" className="text-sm md:text-base text-gray-300 font-light">
                    Project Overview
                  </label>
                  <textarea
                    id="projectOverview"
                    rows={4}
                    required
                    className="w-full px-4 py-2 md:py-3 text-sm md:text-base bg-black/30 border border-amber-900/50 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-gray-200"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 md:py-4 text-sm md:text-base bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg font-semibold text-black hover:from-amber-500 hover:to-amber-600 transition-all transform hover:scale-[1.01] active:scale-95"
                >
                  Submit Proposal
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;