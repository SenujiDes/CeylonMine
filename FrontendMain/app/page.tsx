

// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Navbar from "./navbar/page";
// import { motion, useScroll, useTransform } from 'framer-motion';
// import * as THREE from 'three';

// export default function Home() {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const canvasRef = useRef(null);
//   const scrollRef = useRef(null);

//   // Products data
//   const products = [
//     {
//       id: 1,
//       title: "GOLD MINING",
//       subtitle: "PRECIOUS METAL EXTRACTION",
//       description: "Specializing in sustainable gold mining practices with advanced technology for minimal environmental impact.",
//       image: "/images/gold-mining.jpg",
//       price: "FROM $1.2M INVESTMENT",
//     },
//     {
//       id: 2,
//       title: "GEMSTONE MINING",
//       subtitle: "LUXURY GEMSTONE EXTRACTION",
//       description: "Unearth rare and exquisite gemstones from Sri Lanka's rich mineral deposits with ethical sourcing practices.",
//       image: "/images/gemstone-mining.jpg",
//       price: "FROM $800K INVESTMENT",
//     },
//     {
//       id: 3,
//       title: "INDUSTRIAL MINERALS",
//       subtitle: "HIGH-QUALITY MINERAL EXTRACTION",
//       description: "Providing industrial minerals for global manufacturing and construction with sustainable extraction methods.",
//       image: "/images/industrial-minerals.jpg",
//       price: "FROM $500K INVESTMENT",
//     },
//   ];

//   // Listen for theme changes from navbar
//   useEffect(() => {
//     const handleThemeChange = (event) => {
//       setIsDarkMode(event.detail.isDarkMode);
//     };
    
//     window.addEventListener('themeChange', handleThemeChange);
    
//     // Initial theme check
//     const savedTheme = localStorage.getItem('theme');
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
//     if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
//       setIsDarkMode(true);
//     } else {
//       setIsDarkMode(false);
//     }
    
//     return () => {
//       window.removeEventListener('themeChange', handleThemeChange);
//     };
//   }, []);

//   // Scroll-based animations
//   const { scrollYProgress } = useScroll({
//     target: scrollRef,
//     offset: ["start start", "end end"],
//   });

//   const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
//   const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

//   // Initialize 3D sand effect
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Set up Three.js scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // Create sand particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 5000;
    
//     const posArray = new Float32Array(particlesCount * 3);
    
//     for (let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 5;
//     }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
//     // Create sand material - adjust color based on theme
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.005,
//       color: isDarkMode ? 0xD2B48C : 0xFFD700, // Sand color: darker for dark mode, gold for light mode
//       transparent: true,
//       blending: THREE.AdditiveBlending,
//     });
    
//     // Create the particles mesh
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);
    
//     // Position camera
//     camera.position.z = 2;
    
//     // Mouse movement effect
//     let mouseX = 0;
//     let mouseY = 0;
    
//     function onDocumentMouseMove(event) {
//       mouseX = (event.clientX - window.innerWidth / 2) / 100;
//       mouseY = (event.clientY - window.innerHeight / 2) / 100;
//     }
    
//     document.addEventListener('mousemove', onDocumentMouseMove);
    
//     // Handle window resize
//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }
    
//     window.addEventListener('resize', onWindowResize);
    
//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       particlesMesh.rotation.x += 0.0005;
//       particlesMesh.rotation.y += 0.0005;
      
//       // Respond to mouse movement
//       particlesMesh.rotation.x += mouseY * 0.0005;
//       particlesMesh.rotation.y += mouseX * 0.0005;
      
//       renderer.render(scene, camera);
//     };
    
//     animate();
    
//     // Update particle color when theme changes
//     const updateParticleColor = () => {
//       particlesMaterial.color.set(isDarkMode ? 0xD2B48C : 0xFFD700);
//     };
    
//     const themeChangeListener = () => {
//       updateParticleColor();
//     };
    
//     window.addEventListener('themeChange', themeChangeListener);
    
//     // Cleanup
//     return () => {
//       document.removeEventListener('mousemove', onDocumentMouseMove);
//       window.removeEventListener('resize', onWindowResize);
//       window.removeEventListener('themeChange', themeChangeListener);
      
//       // Dispose of resources
//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//       renderer.dispose();
//     };
//   }, [isDarkMode]);

//   // Slide navigation
//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setActiveSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
//   };

//   return (
//     <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
//       <Head>
//         <title>Ceylon Mine | Sustainable Mining Solutions</title>
//         <meta name="description" content="Ceylon Mine specializes in sustainable mining of gold, gemstones, and industrial minerals in Sri Lanka." />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Navbar />

//       {/* 3D Sand Background */}
//       <canvas 
//         ref={canvasRef} 
//         className="fixed inset-0 w-full h-full z-0"
//       />

//       {/* Hero Section */}
//       <main className="relative z-10 pt-28 pb-16"> {/* Added padding-top for spacing below navbar */}
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h1 
//               className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4" 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               SUSTAINABLE MINING<br />FOR A BETTER FUTURE
//             </motion.h1>
//             <motion.p 
//               className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`} 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               Committed to ethical mining practices and environmental conservation in Sri Lanka.
//             </motion.p>
//           </div>

//           {/* Product Slider */}
//           <div className="relative overflow-hidden rounded-lg">
//             <div className={`product-slider relative h-96 md:h-[600px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg overflow-hidden`}>
//               {/* Slides */}
//               {products.map((product, index) => (
//                 <motion.div 
//                   key={product.id}
//                   className={`absolute inset-0 flex items-center ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ 
//                     opacity: index === activeSlide ? 1 : 0,
//                     scale: index === activeSlide ? 1 : 0.9,
//                     x: index === activeSlide ? 0 : (index < activeSlide ? -100 : 100)
//                   }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
//                     <div className="flex flex-col justify-center">
//                       <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">{product.title}</h2>
//                       <p className="text-lg md:text-xl lg:text-2xl text-orange-500 mb-4">{product.subtitle}</p>
//                       <p className={`text-base md:text-lg lg:text-xl mb-6 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{product.description}</p>
//                       <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-8">{product.price}</p>
//                       <div>
//                         <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors mr-4">
//                           Learn More
//                         </button>
//                         <button className={`border ${isDarkMode ? 'border-white' : 'border-gray-900'} hover:border-orange-500 hover:text-orange-500 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
//                           View Projects
//                         </button>
//                       </div>
//                     </div>
//                     <div className="relative h-full flex items-center justify-center">
//                       <motion.div 
//                         className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-700"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         {/* Placeholder for actual images */}
//                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600">
//                           <span className="text-2xl text-white">{product.title} Image</span>
//                         </div>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
              
//               {/* Navigation Arrows */}
//               <button 
//                 onClick={prevSlide} 
//                 className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
//                 aria-label="Previous slide"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
//                 </svg>
//               </button>
//               <button 
//                 onClick={nextSlide} 
//                 className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
//                 aria-label="Next slide"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//               </button>
              
//               {/* Dots Indicator */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//                 {products.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveSlide(index)}
//                     className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-orange-500' : isDarkMode ? 'bg-white bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR COMMITMENT</h2>
//             <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
//               We are dedicated to sustainable mining practices that benefit both people and the planet.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "ENVIRONMENTAL CARE",
//                 icon: "🌱",
//                 description: "Minimizing environmental impact through responsible mining techniques and land restoration."
//               },
//               {
//                 title: "COMMUNITY ENGAGEMENT",
//                 icon: "🤝",
//                 description: "Supporting local communities with fair employment and investing in education and healthcare."
//               },
//               {
//                 title: "TECHNOLOGY DRIVEN",
//                 icon: "💻",
//                 description: "Using cutting-edge technology for efficient, safe, and environmentally-friendly mining operations."
//               },
//             ].map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
//               >
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Gallery Section */}
//       <section className="relative z-10 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR MINING OPERATIONS</h2>
//             <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
//               Explore our state-of-the-art mining sites and see how we operate sustainably.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((item, index) => (
//               <motion.div 
//                 key={index}
//                 className="relative aspect-square overflow-hidden rounded-lg bg-gray-700"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Placeholder for actual images */}
//                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-600">
//                   <span className="text-xl text-white">Mining Operation {index + 1}</span>
//                 </div>
//                 <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">WHAT OUR PARTNERS SAY</h2>
//             <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
//               Hear from our partners and clients who trust us for sustainable mining solutions.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "John Doe",
//                 role: "Investment Partner",
//                 testimonial: "Ceylon Mine has been a reliable partner in our gold mining ventures. Their commitment to sustainability is unmatched.",
//               },
//               {
//                 name: "Jane Smith",
//                 role: "Environmental Consultant",
//                 testimonial: "Their gemstone mining operations are both ethical and efficient. Highly recommend Ceylon Mine for any mining project.",
//               },
//               {
//                 name: "Mike Johnson",
//                 role: "Manufacturing Executive",
//                 testimonial: "The industrial minerals provided by Ceylon Mine have been crucial for our manufacturing processes.",
//               },
//             ].map((testimonial, index) => (
//               <motion.div 
//                 key={index}
//                 className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
//               >
//                 <div className="text-4xl mb-4">🌟</div>
//                 <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
//                 <p className={`text-sm ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{testimonial.role}</p>
//                 <p className={`mt-4 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{testimonial.testimonial}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className={`relative z-10 py-8 ${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white`}>
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Ceylon Mine</h3>
//               <p className="opacity-80">
//                 Committed to sustainable mining practices and environmental conservation.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Home</a></li>
//                 <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">About Us</a></li>
//                 <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Projects</a></li>
//                 <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//               <p className="opacity-80">Email: info@ceylonmine.com</p>
//               <p className="opacity-80">Phone: +94 112 345 678</p>
//               <p className="opacity-80">Address: 123 Mining Rd, Colombo, Sri Lanka</p>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-8 text-center">
//             <p className="opacity-80">&copy; {new Date().getFullYear()} Ceylon Mine. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "./navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  // Features data based on the CeylonMine project report – no pricing info
  const features = [
    {
      id: 1,
      title: "DIGITAL LICENSING",
      subtitle: "Streamlined Applications",
      description: "Centralize your mining license applications with CeylonMine for efficient processing and transparent oversight.",
      image: "/images/13.jpg",
    },
    {
      id: 2,
      title: "AUTOMATED ROYALTY CALCULATION",
      subtitle: "Transparent & Fair",
      description: "Leverage real-time data to ensure accurate and fair royalty computations, reducing manual errors and administrative burdens.",
      image: "/images/8.jpg",
    },
    {
      id: 3,
      title: "SUSTAINABLE MINING OVERSIGHT",
      subtitle: "Environmental Stewardship",
      description: "Monitor mining activities with integrated GIS mapping, educational resources, and AI-powered support to promote sustainable practices.",
      image: "/images/9.jpg",
    },
  ];

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

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Initialize 3D sand effect using Three.js
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

  // Slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
      <Head>
        <title>CeylonMine | Digital Transformation in Mining Licensing</title>
        <meta name="description" content="CeylonMine is a digital platform that streamlines mining licensing processes and automates royalty calculations for sustainable mining practices in Sri Lanka." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* 3D Sand Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />

      {/* Hero Section */}
      <main className="relative z-10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CeylonMine
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Streamlining mining licensing and royalty calculation to promote transparency and sustainability in Sri Lanka.
            </motion.p>
          </div>

          {/* Feature Slider */}
          <div className="relative overflow-hidden rounded-lg">
            <div className={`feature-slider relative h-96 md:h-[600px] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} rounded-lg overflow-hidden`}>
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.id}
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
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">{feature.title}</h2>
                      <p className="text-lg md:text-xl lg:text-2xl text-orange-500 mb-4">{feature.subtitle}</p>
                      <p className={`text-base md:text-lg lg:text-xl mb-6 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{feature.description}</p>
                      <div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors mr-4">
                          Discover More
                        </button>
                        <button className={`border ${isDarkMode ? 'border-white' : 'border-gray-900'} hover:border-orange-500 hover:text-orange-500 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}>
                          Explore Platform
                        </button>
                      </div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <motion.div 
                        className="w-full h-64 md:h-96 rounded-lg overflow-hidden bg-gray-700"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={feature.image} 
                          alt={feature.title} 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide} 
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-orange-500' : isDarkMode ? 'bg-white bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR COMMITMENT</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              CeylonMine is dedicated to transforming mining processes through digital innovation, ensuring transparency, efficiency, and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "TRANSPARENCY",
                icon: "🔍",
                description: "Real-time data and centralized systems ensure clear visibility across all operations."
              },
              {
                title: "EFFICIENCY",
                icon: "⚙️",
                description: "Streamlined processes reduce administrative burdens and improve regulatory compliance."
              },
              {
                title: "SUSTAINABILITY",
                icon: "🌱",
                description: "Empowering sustainable mining practices through innovative digital solutions."
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OUR PLATFORM IN ACTION</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Experience the seamless integration of digital licensing, automated royalty calculation, and sustainable mining oversight with CeylonMine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div 
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={`/images/${index + 1}.jpg`} 
                  alt={`Platform Snapshot ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">WHAT OUR USERS SAY</h2>
            <p className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Hear from industry professionals and stakeholders who have embraced the digital revolution with CeylonMine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Industry Expert",
                role: "Mining Regulator",
                testimonial: "CeylonMine has streamlined our licensing process, making monitoring and compliance more efficient than ever."
              },
              {
                name: "Tech Innovator",
                role: "Digital Transformation Lead",
                testimonial: "The platform's automated royalty calculations ensure fairness and transparency, setting new industry standards."
              },
              {
                name: "Environmental Advocate",
                role: "Sustainability Consultant",
                testimonial: "By integrating real-time data and GIS mapping, CeylonMine empowers sustainable mining practices that protect our environment."
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className={`rounded-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
              >
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p className={`text-sm ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{testimonial.role}</p>
                <p className={`mt-4 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>{testimonial.testimonial}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
