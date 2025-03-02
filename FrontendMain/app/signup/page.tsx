// import React from 'react'
// import { FaUser, FaLock, FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa";

// export default function SignUp() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] flex items-center justify-center">
//       {/* Hero Section */}
//       <div className="relative z-10">
//         <form className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-8 w-96 animate-fadeIn">
//           <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Sign Up</h1>
//           <p className="text-blue-100/70 text-center mb-6">Welcome! Please sign up to continue</p>
          
//           <div className='relative mb-4'>
//             <input 
//               type="email"
//               placeholder='Email' 
//               required
//               className="w-full px-4 py-2 rounded-lg pl-10 bg-[#1a2942]/60 border border-indigo-900/50 
//                        text-blue-100 placeholder-blue-100/50 
//                        focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50
//                        hover:border-amber-400/30 transition-all duration-300"
//             />
//             <FaEnvelope className='absolute left-3 top-3 text-amber-400/70' />
//           </div>

//           <div className='relative mb-6'>
//             <input 
//               type="password"
//               placeholder='Password' 
//               required 
//               className="w-full px-4 py-2 rounded-lg pl-10 bg-[#1a2942]/60 border border-indigo-900/50 
//                        text-blue-100 placeholder-blue-100/50 
//                        focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50
//                        hover:border-amber-400/30 transition-all duration-300"
//             />
//             <FaLock className='absolute left-3 top-3 text-amber-400/70' />
//           </div>

//           <button 
//             type='submit'
//             className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1a2942] py-2 rounded-lg 
//                      hover:from-orange-500 hover:to-amber-400 transform hover:scale-105 
//                      transition-all duration-300 font-semibold"
//           >
//             Sign Up
//           </button>

//           <div className="relative my-6 text-center">
//             <hr className="border-indigo-900/50" />
//             <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
//                            bg-[#1a2942]/60 px-2 text-blue-100/70 rounded-full">
//               or continue with
//             </span>
//           </div>

//           <div className="flex gap-4 mb-6">
//             <button
//               type="button"
//               className="flex-1 flex items-center justify-center gap-2 bg-[#1a2942]/60 
//                        border border-indigo-900/50 text-blue-100 py-2 rounded-lg 
//                        hover:bg-[#1a2942]/80 hover:border-amber-400/30 
//                        transition-all duration-300"
//             >
//               <FaFacebook className="text-amber-400" />
//               Facebook
//             </button>
//             <button
//               type="button" 
//               className="flex-1 flex items-center justify-center gap-2 bg-[#1a2942]/60 
//                        border border-indigo-900/50 text-blue-100 py-2 rounded-lg 
//                        hover:bg-[#1a2942]/80 hover:border-amber-400/30 
//                        transition-all duration-300"
//             >
//               <FaGoogle className="text-amber-400" />
//               Google
//             </button>
//           </div>

//           <div className='text-center mt-4'>
//             <p className="text-blue-100/70">
//               Already have an account? 
//               <a href="/signin" className="text-amber-400 hover:text-orange-500 ml-1 transition-colors duration-300">
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* Decorative Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
//       </div>
//     </div>
//   )
// }
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa";
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function SignUp() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark'); // Apply dark mode globally
  };

  // Initialize 3D sand effect
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

    // Create sand particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create sand material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xD2B48C, // Sand color
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
  }, []);
  
  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      {/* 3D Sand Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Dark/Light Mode Toggle Button */}
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
      
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 via-transparent to-blue-600/5"></div>
      </div>
      
      {/* Sign Up Form */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form className={`${isDarkMode ? 'bg-gray-900/40' : 'bg-white/40'} backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border ${isDarkMode ? 'border-gray-800/50' : 'border-gray-200/50'} p-8 w-96 animate-fadeIn`}>
            <motion.h1 
              className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              SIGN UP
            </motion.h1>
            <motion.p 
              className={`${isDarkMode ? 'text-blue-100/70' : 'text-gray-700/70'} text-center mb-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Join our adventure community
            </motion.p>
            
            <motion.div 
              className='relative mb-4'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input 
                type="email"
                placeholder='Email' 
                required
                className={`w-full px-4 py-2 rounded-lg pl-10 ${
                  isDarkMode 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-blue-100 placeholder-blue-100/50' 
                    : 'bg-gray-100/60 border border-gray-300/50 text-gray-800 placeholder-gray-500/50'
                } focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50
                  hover:border-orange-400/30 transition-all duration-300`}
              />
              <FaEnvelope className={`absolute left-3 top-3 ${isDarkMode ? 'text-orange-400/70' : 'text-orange-500/70'}`} />
            </motion.div>

            <motion.div 
              className='relative mb-4'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <input 
                type="text"
                placeholder='Username' 
                required
                className={`w-full px-4 py-2 rounded-lg pl-10 ${
                  isDarkMode 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-blue-100 placeholder-blue-100/50' 
                    : 'bg-gray-100/60 border border-gray-300/50 text-gray-800 placeholder-gray-500/50'
                } focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50
                  hover:border-orange-400/30 transition-all duration-300`}
              />
              <FaUser className={`absolute left-3 top-3 ${isDarkMode ? 'text-orange-400/70' : 'text-orange-500/70'}`} />
            </motion.div>

            <motion.div 
              className='relative mb-6'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <input 
                type="password"
                placeholder='Password' 
                required 
                className={`w-full px-4 py-2 rounded-lg pl-10 ${
                  isDarkMode 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-blue-100 placeholder-blue-100/50' 
                    : 'bg-gray-100/60 border border-gray-300/50 text-gray-800 placeholder-gray-500/50'
                } focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50
                  hover:border-orange-400/30 transition-all duration-300`}
              />
              <FaLock className={`absolute left-3 top-3 ${isDarkMode ? 'text-orange-400/70' : 'text-orange-500/70'}`} />
            </motion.div>

            <motion.button 
              type='submit'
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-2 rounded-lg 
                         hover:from-orange-500 hover:to-amber-400 transform hover:scale-105 
                         transition-all duration-300 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Adventure
            </motion.button>

            <motion.div 
              className="relative my-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <hr className={`${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'}`} />
              <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              ${isDarkMode ? 'bg-gray-900/60' : 'bg-white/60'} px-2 ${
                                isDarkMode ? 'text-blue-100/70' : 'text-gray-700/70'
                              } rounded-full`}>
                or continue with
              </span>
            </motion.div>

            <motion.div 
              className="flex gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-blue-100' 
                    : 'bg-gray-100/60 border border-gray-300/50 text-gray-800'
                } py-2 rounded-lg 
                hover:bg-orange-500/10 hover:border-orange-400/30 
                transition-all duration-300`}
              >
                <FaFacebook className="text-orange-400" />
                Facebook
              </button>
              <button
                type="button" 
                className={`flex-1 flex items-center justify-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/60 border border-gray-700/50 text-blue-100' 
                    : 'bg-gray-100/60 border border-gray-300/50 text-gray-800'
                } py-2 rounded-lg 
                hover:bg-orange-500/10 hover:border-orange-400/30 
                transition-all duration-300`}
              >
                <FaGoogle className="text-orange-400" />
                Google
              </button>
            </motion.div>

            <motion.div 
              className='text-center mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p className={`${isDarkMode ? 'text-blue-100/70' : 'text-gray-700/70'}`}>
                Already have an account? 
                <a href="/signin" className="text-orange-400 hover:text-orange-500 ml-1 transition-colors duration-300">
                  Sign in
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}