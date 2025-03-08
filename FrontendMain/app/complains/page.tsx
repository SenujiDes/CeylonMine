
// 'use client';

// import React from 'react';
// import Navbar from '../navbar/page';


// import ComplaintForm from '../components/ComplaintForm';

// export default function Complaints() {
//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative overflow-hidden pt-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center relative z-10">
//             <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
//               Submit a Complaint
//             </h1>
//             <p className="mt-3 max-w-md mx-auto text-base text-white opacity-80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//               We value your feedback and are committed to addressing your concerns
//             </p>
//           </div>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
//       </div>

//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
//         <div className="bg-gray-900 bg-opacity-70 backdrop-blur-xl rounded-lg shadow-lg border border-gray-800 p-6 md:p-8 animate-fadeIn">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-amber-400 mb-2">
//               Complaint Form
//             </h2>
//             <p className="text-white opacity-70">
//               Please fill out the form below with your concerns. We'll get back to you as soon as possible.
//             </p>
//           </div>
//           <ComplaintForm />
//         </div>
//       </main>

//       {/* Decorative Elements - Similar to the home page's sand effect */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-black bg-opacity-70"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
//       </div>

     
//     </div>
//   );
// }

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../navbar/page';
import ComplaintForm from '../components/ComplaintForm';
import * as THREE from 'three';

export default function Complaints() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);

  // Listen for theme changes from navbar
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange);

    // Initial theme check
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Initialize 3D sand effect using Three.js - matching the home page
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: isDarkMode ? 0xD2B48C : 0xFFD700,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;
    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    document.addEventListener('mousemove', onDocumentMouseMove);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005 + mouseY * 0.0005;
      particlesMesh.rotation.y += 0.0005 + mouseX * 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const updateParticleColor = () => {
      particlesMaterial.color.set(isDarkMode ? 0xD2B48C : 0xFFD700);
    };
    const themeChangeListener = () => {
      updateParticleColor();
    };
    window.addEventListener('themeChange', themeChangeListener);

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('themeChange', themeChangeListener);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      <Navbar />
      
      {/* 3D Sand Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
              Submit a Complaint
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-white opacity-80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              We value your feedback and are committed to addressing your concerns
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className={`${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-white'} backdrop-blur-xl rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-6 md:p-8`}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-500 mb-2">
              Complaint Form
            </h2>
            <p className={`${isDarkMode ? 'text-white opacity-70' : 'text-gray-700'}`}>
              Please fill out the form below with your concerns. We'll get back to you as soon as possible.
            </p>
          </div>
          <ComplaintForm />
          
        </div>
         {/* Commitment banner */}
         <div className="mt-8 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-800 text-white text-center">
          <h3 className="text-xl font-bold text-amber-400 mb-2">Our Commitment To You</h3>
          <p className="opacity-90">We review all complaints within 24 hours and are committed to addressing your concerns promptly and thoroughly.</p>
        </div>
        
      </main>

      {/* Footer */}
      <footer className={`relative z-10 py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
            &copy; {new Date().getFullYear()} Ceylon Mine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}