// 'use client';

// import React from 'react'
// import Navbar from '../navbar/page'
// import Link from 'next/link'

// export default function LicensePortal() {
//   const licenses = [
//     {
//       id: 1,
//       name: 'IML Type A License',
//       description: '',
//       path: '/license-portal/type-a'
//     },
//     {
//       id: 2, 
//       name: 'IML Type B License',
//       description: '',
//       path: '/license-portal/type-b'
//     },
//     {
//       id: 3,
//       name: 'IML Type C License',
//       description: '',
//       path: '/license-portal/type-c'
//     },
//     {
//       id: 4,
//       name: 'IML Type D License', 
//       description: '',
//       path: '/license-portal/type-d'
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center relative z-10">
//             <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
//               License Portal
//             </h1>
//             <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//               Manage your mining licenses and permits efficiently
//             </p>
//           </div>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
//         {/* License Management Section */}
//         <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-6 md:p-8 animate-fadeIn">
//           <h1 className="text-3xl font-bold text-amber-400 mb-6">License Portal</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             {licenses.map((license) => (
//               <Link href={license.path} key={license.id}>
//                 <div className="bg-[#1a2942] overflow-hidden shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
//                   <h2 className="text-xl font-semibold text-amber-400 mb-2">{license.name}</h2>
//                   <p className="text-blue-100/70">{license.description}</p>
//                   <div className="mt-4">
//                     <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#1a2942] bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400">
//                       Apply Now
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Decorative Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
//       </div>
//     </div>
//   )
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../navbar/page';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function LicensePortal() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Licenses data
  const licenses = [
    {
      id: 1,
      name: 'IML Type A License',
      description: 'Standard mining operations license for small-scale projects.',
      path: '/license-portal/type-a',
      icon: '🏗️'
    },
    {
      id: 2, 
      name: 'IML Type B License',
      description: 'Advanced license for medium-scale mineral extraction operations.',
      path: '/license-portal/type-b',
      icon: '⛏️'
    },
    {
      id: 3,
      name: 'IML Type C License',
      description: 'Comprehensive license for large-scale mining operations.',
      path: '/license-portal/type-c',
      icon: '🔍'
    },
    {
      id: 4,
      name: 'IML Type D License', 
      description: 'Specialized license for rare minerals and precious metals.',
      path: '/license-portal/type-d',
      icon: '💎'
    }
  ];

  // Initialize 3D background effect
  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: isDarkMode ? 0xD2B48C : 0x4682B4, // Sand/blue color based on theme
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    
    // Create the particles mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 2;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Respond to mouse movement
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [isDarkMode]);

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      <Navbar />
      
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Dark/Light Mode Toggle */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
        } hover:opacity-80 transition-all z-50`}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </motion.button>

      {/* Hero Section */}
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              LICENSE PORTAL
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Manage your mining licenses and permits efficiently with our streamlined portal.
            </motion.p>
          </div>

          {/* License Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {licenses.map((license, index) => (
              <Link href={license.path} key={license.id} legacyBehavior>
                <a>
                  <motion.div 
                    className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-70'} h-full`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                  >
                    <div className="text-4xl mb-4">{license.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{license.name}</h3>
                    <p className={`mb-6 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{license.description}</p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors">
                      Apply Now
                    </button>
                  </motion.div>
                </a>
              </Link>
            ))}
          </div>
          
          {/* Information Section */}
          <motion.div 
            className={`bg-orange-500 rounded-lg p-8 md:p-12 text-center mb-16 ${isDarkMode ? 'bg-orange-500' : 'bg-orange-400'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">NEED ASSISTANCE?</h2>
            <p className={`text-base md:text-lg lg:text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'opacity-90' : 'opacity-90'}`}>
              Our licensing experts are available to guide you through the application process.
            </p>
            <button className={`bg-white text-orange-500 hover:bg-gray-100 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
              Contact Support
            </button>
          </motion.div>
          
          {/* FAQs Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does the application process take?",
                  answer: "Most applications are processed within 5-10 business days. Complex applications may take longer."
                },
                {
                  question: "What documents do I need to apply?",
                  answer: "You'll need proof of identity, proof of mining qualifications, and site assessment documents."
                },
                {
                  question: "Can I upgrade my license type later?",
                  answer: "Yes, you can apply for an upgrade at any time through the portal."
                },
                {
                  question: "Are there annual renewal requirements?",
                  answer: "All licenses require annual renewal with updated documentation and safety certifications."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-70'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className={`relative z-10 py-12 ${isDarkMode ? 'bg-black' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-70">© 2025 Mining Licensing Authority. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
