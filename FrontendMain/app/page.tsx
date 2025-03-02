'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "./navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark'); // Apply dark mode globally
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Products data
  const products = [
    {
      id: 1,
      title: "GOLD MINING",
      subtitle: "PRECIOUS METAL EXTRACTION",
      description: "Specializing in sustainable gold mining practices with advanced technology.",
      image: "/images/gold-mining.jpg",
      price: "FROM $1.2M INVESTMENT",
    },
    {
      id: 2,
      title: "GEMSTONE MINING",
      subtitle: "LUXURY GEMSTONE EXTRACTION",
      description: "Unearth rare and exquisite gemstones from Sri Lanka's rich mineral deposits.",
      image: "/images/gemstone-mining.jpg",
      price: "FROM $800K INVESTMENT",
    },
    {
      id: 3,
      title: "INDUSTRIAL MINERALS",
      subtitle: "HIGH-QUALITY MINERAL EXTRACTION",
      description: "Providing industrial minerals for global manufacturing and construction.",
      image: "/images/industrial-minerals.jpg",
      price: "FROM $500K INVESTMENT",
    },
  ];

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
    
    function onDocumentMouseMove(event: MouseEvent) {
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

  // Slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
      <Navbar />
      <Head>
        <title>Ceylon Mine | Sustainable Mining Solutions</title>
        <meta name="description" content="Ceylon Mine specializes in sustainable mining of gold, gemstones, and industrial minerals in Sri Lanka." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 3D Sand Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />

      {/* Dark/Light Mode Toggle Button (Bottom-Right Corner) */}
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
      <main className="relative z-10 pt-24 pb-16"> {/* Added padding-top for spacing */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4" // Responsive font size
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              SUSTAINABLE MINING<br />FOR A BETTER FUTURE
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`} // Responsive font size
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Committed to ethical mining practices and environmental conservation.
            </motion.p>
          </div>

          {/* Product Slider */}
          <div className="relative overflow-hidden rounded-lg">
            <div className={`product-slider relative h-96 md:h-[600px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg overflow-hidden`}>
              {/* Slides */}
              {products.map((product, index) => (
                <motion.div 
                  key={product.id}
                  className={`absolute inset-0 flex items-center ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: index === activeSlide ? 1 : 0,
                    scale: index === activeSlide ? 1 : 0.9,
                    x: index === activeSlide ? 0 : (index < activeSlide ? -100 : 100)
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">{product.title}</h2>
                      <p className="text-lg md:text-xl lg:text-2xl text-orange-500 mb-4">{product.subtitle}</p>
                      <p className={`text-base md:text-lg lg:text-xl mb-6 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{product.description}</p>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">{product.price}</p>
                      <div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors mr-4">
                          Learn More
                        </button>
                        <button className={`border ${isDarkMode ? 'border-white' : 'border-gray-900'} hover:border-orange-500 hover:text-orange-500 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
                          View Projects
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <motion.img 
                        src={product.image} 
                        alt={product.title} 
                        className="rounded-lg object-cover w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide} 
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-orange-500' : isDarkMode ? 'bg-white bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR COMMITMENT</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              We are dedicated to sustainable mining practices that benefit both people and the planet.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "ENVIRONMENTAL CARE",
                icon: "🌱",
                description: "Minimizing environmental impact through responsible mining techniques."
              },
              {
                title: "COMMUNITY ENGAGEMENT",
                icon: "🤝",
                description: "Supporting local communities and creating sustainable livelihoods."
              },
              {
                title: "TECHNOLOGY DRIVEN",
                icon: "💻",
                description: "Using cutting-edge technology for efficient and safe mining operations."
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-70'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR MINING OPERATIONS</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Explore our mining sites and see how we operate sustainably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "/images/mining-1.jpg",
              "/images/mining-2.jpg",
              "/images/mining-3.jpg",
              "/images/mining-4.jpg",
              "/images/mining-5.jpg",
              "/images/mining-6.jpg"
            ].map((image, index) => (
              <motion.div 
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image} 
                  alt={`Mining Operation ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">WHAT OUR PARTNERS SAY</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Hear from our partners and clients who trust us for sustainable mining solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                location: "Colombo, Sri Lanka",
                testimonial: "Ceylon Mine has been a reliable partner in our gold mining ventures. Their commitment to sustainability is unmatched.",
                image: "/images/partner-1.jpg",
              },
              {
                name: "Jane Smith",
                location: "Kandy, Sri Lanka",
                testimonial: "Their gemstone mining operations are both ethical and efficient. Highly recommend Ceylon Mine for any mining project.",
                image: "/images/partner-2.jpg",
              },
              {
                name: "Mike Johnson",
                location: "Galle, Sri Lanka",
                testimonial: "The industrial minerals provided by Ceylon Mine have been crucial for our manufacturing processes.",
                image: "/images/partner-3.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className={`bg-gray-900 bg-opacity-70 rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p className="text-sm opacity-70 mb-4">{testimonial.location}</p>
                <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{testimonial.testimonial}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`bg-orange-500 rounded-lg p-8 md:p-12 text-center ${isDarkMode ? 'bg-orange-500' : 'bg-orange-400'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">READY TO PARTNER WITH US?</h2>
            <p className={`text-base md:text-lg lg:text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Contact us today to explore sustainable mining opportunities.
            </p>
            <button className={`bg-white text-orange-500 hover:bg-gray-100 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <motion.div 
            className={`rounded-lg p-8 md:p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">STAY UPDATED</h2>
            <p className={`text-base md:text-lg lg:text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Subscribe to our newsletter for the latest updates on our mining projects and initiatives.
            </p>
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className={`flex-1 px-6 py-3 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              <button 
                className={`px-8 py-3 rounded-md font-medium ${
                  isDarkMode ? 
                  'bg-orange-500 hover:bg-orange-600 text-white' : 
                  'bg-gray-900 hover:bg-gray-800 text-white'
                } transition-colors`}
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 py-12 ${isDarkMode ? 'bg-black' : 'bg-gray-900'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CEYLON MINE</h3>
              <p className="opacity-70 mb-4">
                Sustainable mining solutions for a better future.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.15 11.65L12 17.78l-5.15-4.13c-.26-.21-.42-.53-.42-.87 0-.34.16-.66.42-.87l4.82-3.86c.2-.16.48-.16.68 0l4.82 3.86c.26.21.42.53.42.87s-.16.66-.42.87z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">SERVICES</h3>
              <ul className="space-y-2">
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Gold Mining</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Gemstone Mining</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Industrial Minerals</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Our Mission</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">News</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">CONTACT</h3>
              <ul className="space-y-2">
                <li className="opacity-70">123 Mining Road, Colombo, Sri Lanka</li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">+94 112 345 678</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">info@ceylonmine.lk</a></li>
                <li><a href="#" className="opacity-70 hover:opacity-100 hover:text-orange-500 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center opacity-70">
            <p>© 2025 Ceylon Mine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}