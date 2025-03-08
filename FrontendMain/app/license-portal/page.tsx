

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../navbar/page';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// New ArrowIcon component for FAQ items
const ArrowIcon = ({ rotated }) => (
  <svg
    className={`w-6 h-6 transform transition-transform duration-200 ${rotated ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function LicensePortal() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const canvasRef = useRef(null);
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Updated licenses data with refined icons
  const licenses = [
    {
      id: 1,
      name: 'IML Type A License',
      description: 'Standard mining operations license for small-scale projects.',
      features: ['Suitable for operations under 5 hectares', 'Valid for 3 years', 'Basic environmental compliance'],
      path: '/license-portal/type-a',
     
      color: 'bg-amber-500'
    },
    {
      id: 2, 
      name: 'IML Type B License',
      description: 'Advanced license for medium-scale mineral extraction operations.',
      features: ['Operations between 5-20 hectares', 'Valid for 5 years', 'Advanced safety protocols required'],
      path: '/license-portal/type-b',
     
      color: 'bg-amber-500'
    },
    {
      id: 3,
      name: 'IML Type C License',
      description: 'Comprehensive license for large-scale mining operations.',
      features: ['Operations over 20 hectares', 'Valid for 7 years', 'Full environmental impact assessment required'],
      path: '/license-portal/type-c',
     
      color: 'bg-amber-500'
    },
    {
      id: 4,
      name: 'IML Type D License', 
      description: 'Specialized license for rare minerals and precious metals.',
      features: ['For restricted minerals and metals', 'Valid for 10 years', 'Requires enhanced security measures'],
      path: '/license-portal/type-d',
  
      color: 'bg-amber-500'
    }
  ];

  // FAQ data (unchanged)
  const faqs = [
    {
      question: "How long does the application process take?",
      answer: "Most applications are processed within 5-10 business days. Complex applications may take longer depending on the scope and scale of your intended mining operations. We recommend applying at least 30 days before your intended start date."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You'll need proof of identity, proof of mining qualifications, site assessment documents, environmental impact statements, safety protocols documentation, and insurance certificates. All documents should be uploaded in PDF format."
    },
    {
      question: "Can I upgrade my license type later?",
      answer: "Yes, you can apply for an upgrade at any time through the portal. The upgrade process typically takes 3-5 business days and requires documentation of expanded operations. There may be additional fees associated with license upgrades."
    },
    {
      question: "Are there annual renewal requirements?",
      answer: "All licenses require annual renewal with updated documentation and safety certifications. You'll receive automatic notifications 60, 30, and 15 days before your renewal date. Renewal fees vary by license type and operational scale."
    },
    {
      question: "What are the operational restrictions?",
      answer: "Each license type has specific operational restrictions regarding area size, depth, extraction methods, and environmental protection requirements. These are detailed in the full license documentation available after application submission."
    },
    {
      question: "How are fees calculated?",
      answer: "License fees are calculated based on operation size, mineral type, extraction volume, and environmental impact factors. Our fee calculator is available in the portal to provide estimates before application."
    }
  ];

  // Simplified 3D background effect with fewer particle colors
  useEffect(() => {
    if (!canvasRef.current) return;

    // Set up Three.js scene with black background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particle system with a single color scheme
    const createParticleSystem = (count, size, color, range) => {
      const geometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * range;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      
      return new THREE.Points(geometry, material);
    };

    // Simplified particles - using just one main color scheme
    const particleColor = isDarkMode ? 0xD2B48C : 0x4682B4;
    const particlesFg = createParticleSystem(3000, 0.008, particleColor, 5);
    const particlesBg = createParticleSystem(2000, 0.005, particleColor, 8);
    
    scene.add(particlesFg, particlesBg);
    
    // Position camera
    camera.position.z = 2;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    function onDocumentMouseMove(event) {
      targetMouseX = (event.clientX - window.innerWidth / 2) / 100;
      targetMouseY = (event.clientY - window.innerHeight / 2) / 100;
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
      
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      particlesFg.rotation.x += 0.0003;
      particlesFg.rotation.y += 0.0005;
      particlesBg.rotation.x -= 0.0002;
      particlesBg.rotation.y -= 0.0003;
      
      // Respond to mouse movement
      particlesFg.rotation.x += mouseY * 0.0008;
      particlesFg.rotation.y += mouseX * 0.0008;
      particlesBg.rotation.x += mouseY * 0.0003;
      particlesBg.rotation.y += mouseX * 0.0003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
      
      // Dispose of resources
      particlesFg.geometry.dispose();
      particlesFg.material.dispose();
      particlesBg.geometry.dispose();
      particlesBg.material.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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
        whileHover={{ scale: 1.1, rotate: isDarkMode ? 180 : 0 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-50 transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'
        }`}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </motion.button>

      {/* Hero Section */}
      <main className="relative z-10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div 
              className="inline-block mb-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="text-5xl">{isDarkMode ? '' : ''}</div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className={`${isDarkMode ? 'text-white' : 'text-amber-500'}`}>LICENSE PORTAL</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Streamlined management of mining permits and licenses for optimal operational efficiency.
            </motion.p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-8 rounded-full text-lg font-medium transition-all shadow-lg transform hover:-translate-y-1">
                Get Started Now
              </button>
            </motion.div>
          </div>

          {/* Progress Timeline */}
          <motion.div 
            className="max-w-4xl mx-auto mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-600 opacity-30"></div>
              {['Apply', 'Review', 'Approve', 'Issue'].map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="mt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* License Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {licenses.map((license, index) => (
              <Link href={license.path} key={license.id} legacyBehavior>
                <a>
                  <motion.div 
                    className={`rounded-xl overflow-hidden h-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border border-opacity-10 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-xl transition-all`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: isDarkMode ? "0 20px 30px rgba(0, 0, 0, 0.3)" : "0 20px 30px rgba(0, 0, 0, 0.1)" 
                    }}
                  >
                    <div className={`${license.color} h-2 w-full`}></div>
                    <div className="p-8">
                      <div className="text-5xl mb-6">{license.icon}</div>
                      <h3 className="text-2xl font-bold mb-3">{license.name}</h3>
                      <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{license.description}</p>
                      
                      <ul className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {license.features.map((feature, i) => (
                          <li key={i} className="flex items-start mb-2">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className={`${license.color} text-white py-3 px-8 rounded-md text-lg font-medium transition-all hover:scale-105`}>
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                </a>
              </Link>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 focus:outline-none"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                      <ArrowIcon rotated={expandedFaq === index} />
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`px-6 pb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
