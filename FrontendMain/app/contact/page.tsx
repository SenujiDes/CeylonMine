// import React from 'react'
// import Navbar from '../navbar/page'

// export default function contact() {
//   return (
//     <main>
//       <Navbar/>
//       <div>contact</div>
//     </main>
//   )
// }

'use client';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "../navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function Contact() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000);
    }, 1500);
  };

  // Initialize 3D sand effect (same as in home page)
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
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
      <Navbar />
      <Head>
        <title>Contact Us | Mars Campers | Premium Australian Camper Trailers</title>
        <meta name="description" content="Get in touch with Mars Campers for inquiries about our Australian-made camper trailers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      {/* Contact Section */}
      <main className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CONTACT US
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get in touch with our team to learn more about our premium Australian-made campers.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-8 shadow-lg`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us A Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-md ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-md ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-md ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-md ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                      } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="Sales Inquiry">Sales Inquiry</option>
                      <option value="Product Support">Product Support</option>
                      <option value="Test Drive Request">Test Drive Request</option>
                      <option value="Spare Parts">Spare Parts</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-md ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Tell us about your requirements or questions..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                      formStatus === 'sending' 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {formStatus === 'success' && (
                    <motion.div 
                      className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Your message has been sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-8">
                {/* Visit Us */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Visit Us</h3>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>123 Camper Way</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Melbourne, VIC 3000</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Australia</p>
                  </div>
                </div>
                
                {/* Call Us */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Call Us</h3>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Sales: 1800 CAMPER (1800 226 737)</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Support: +61 3 9555 1234</p>
                  </div>
                </div>
                
                {/* Email Us */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Email Us</h3>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Sales: sales@marscampers.com.au</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Support: support@marscampers.com.au</p>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Business Hours</h3>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Monday - Friday: 9:00 AM - 5:30 PM</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Saturday: 9:00 AM - 4:00 PM</p>
                    <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Sunday: 10:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"></path>
                    </svg>
                  </a>
                  <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                    </svg>
                  </a>
                  <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Map Section */}
      <section className="relative z-10 py-16 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              FIND US
            </motion.h2>
            <motion.p 
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Visit our showroom to experience our premium campers in person.
            </motion.p>
          </div>
          
          <motion.div 
            className="rounded-lg overflow-hidden h-96 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Placeholder for the map (in a real project you'd use Google Maps or similar) */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <p className="text-xl font-medium">Interactive Map Would Be Displayed Here</p>
                <p className="opacity-70 mt-2">123 Camper Way, Melbourne, VIC 3000, Australia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>
            <motion.p 
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Find answers to common questions about our products and services.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How do I schedule a test drive?",
                answer: "You can schedule a test drive by filling out the contact form on this page, calling our sales team at 1800 CAMPER, or visiting our showroom during business hours."
              },              {
                question: "What warranty do your campers come with?",
                answer: "All our campers come with a comprehensive 3-year warranty covering major components and a 1-year warranty on accessories. We also offer extended warranty options."
              },
              {
                question: "Can I customize my camper?",
                answer: "Yes, we offer a wide range of customization options to suit your needs. From interior layouts to exterior colors, our team will work with you to create your dream camper."
              },
              {
                question: "Do you offer financing options?",
                answer: "We partner with several financial institutions to offer flexible financing options. Contact our sales team to discuss the best plan for your budget."
              },
              {
                question: "How long does it take to build a custom camper?",
                answer: "The build time for a custom camper typically ranges from 8 to 12 weeks, depending on the complexity of the customization and current demand."
              },
              {
                question: "Do you ship campers internationally?",
                answer: "Yes, we ship our campers worldwide. Contact us for a detailed quote and shipping timeline based on your location."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 py-8 bg-gray-900 bg-opacity-50 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              &copy; {new Date().getFullYear()} Mars Campers. All rights reserved.
            </p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
              Designed with ❤️ by Mars Campers Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}