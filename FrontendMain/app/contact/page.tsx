
// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
// import Navbar from "../navbar/page";
// import { motion, useScroll, useTransform } from 'framer-motion';
// import * as THREE from 'three';

// export default function Contact() {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const canvasRef = useRef(null);
//   const scrollRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [formStatus, setFormStatus] = useState(null);

//   // Toggle dark/light mode
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle('dark'); // Apply dark mode globally
//   };

//   // Scroll-based animations
//   const { scrollYProgress } = useScroll({
//     target: scrollRef,
//     offset: ["start start", "end end"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate form submission
//     setFormStatus('sending');
//     setTimeout(() => {
//       setFormStatus('success');
//       // Reset form after success
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         subject: '',
//         message: ''
//       });
//       // Reset status after 3 seconds
//       setTimeout(() => setFormStatus(null), 3000);
//     }, 1500);
//   };

//   // Initialize 3D sand effect (same as in home page)
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
//     const particlesCount = 1000;
    
//     const posArray = new Float32Array(particlesCount * 3);
    
//     // for (let i = 0; i < particlesCount * 0.1; i++) {
//     //   posArray[i] = (Math.random() - 0.5) * 5;
//     // }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
//     // Create sand material
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.002,
//       color: 0xD2B48C, // Sand color
//       transparent: true,
//       blending: THREE.AdditiveBlending,
//     });
    
//     // Create the particles mesh
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);
    
//     // Position camera
//     // camera.position.z = 2;
    
//     // Mouse movement effect
//     // let mouseX = 0;
//     // let mouseY = 0;
    
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
      
//       // particlesMesh.rotation.x += 0.00005;
//       // particlesMesh.rotation.y += 0.00005;
      
//       // Respond to mouse movement
//       // particlesMesh.rotation.x += mouseY * 0.0005;
//       // particlesMesh.rotation.y += mouseX * 0.0005;
      
//       renderer.render(scene, camera);
//     };
    
//     animate();
    
//     // Cleanup
//     return () => {
//       document.removeEventListener('mousemove', onDocumentMouseMove);
//       window.removeEventListener('resize', onWindowResize);
//     };
//   }, []);

//   return (
//     <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
//       <Navbar />
//       <Head>
//         <title>Contact Us | Mars Campers | Premium Australian Camper Trailers</title>
//         <meta name="description" content="Get in touch with Mars Campers for inquiries about our Australian-made camper trailers" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       {/* 3D Sand Background */}
//       <canvas 
//         ref={canvasRef} 
//         className="fixed inset-0 w-full h-full z-0"
//       />

//       {/* Dark/Light Mode Toggle Button */}
//       <motion.button
//         onClick={toggleTheme}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${
//           isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
//         } hover:opacity-80 transition-all z-50`}
//       >
//         {isDarkMode ? '🌞' : '🌙'}
//       </motion.button>

//       {/* Contact Section */}
//       <main className="relative z-10 pt-32 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <motion.h1 
//               className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               CONTACT US
//             </motion.h1>
//             <motion.p 
//               className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               Get in touch with our team to learn more about our premium Australian-made campers.
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//             {/* Contact Form */}
//             <motion.div 
//               className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-8 shadow-lg`}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <h2 className="text-2xl md:text-3xl font-bold mb-6">Send Us A Message</h2>
              
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className={`w-full px-4 py-3 rounded-md ${
//                         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
//                       } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                       placeholder="Your name"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className={`w-full px-4 py-3 rounded-md ${
//                         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
//                       } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                       placeholder="your.email@example.com"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone (Optional)</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-3 rounded-md ${
//                         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
//                       } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                       placeholder="Your phone number"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
//                     <select
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleInputChange}
//                       required
//                       className={`w-full px-4 py-3 rounded-md ${
//                         isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
//                       } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                     >
//                       <option value="" disabled>Select a subject</option>
//                       <option value="Sales Inquiry">Mine Inquiry</option>
//                       <option value="Product Support">Technical Support</option>
//                       <option value="Test Drive Request">Licensing Request</option>
//                       <option value="Spare Parts">Construction Work</option>
//                       <option value="General Inquiry">General Inquiry</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     required
//                     rows={6}
//                     className={`w-full px-4 py-3 rounded-md ${
//                       isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
//                     } border focus:outline-none focus:ring-2 focus:ring-orange-500`}
//                     placeholder="Tell us about your requirements or questions..."
//                   ></textarea>
//                 </div>
                
//                 <div>
//                   <button
//                     type="submit"
//                     disabled={formStatus === 'sending'}
//                     className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
//                       formStatus === 'sending' 
//                         ? 'bg-gray-500 cursor-not-allowed' 
//                         : 'bg-orange-500 hover:bg-orange-600 text-white'
//                     }`}
//                   >
//                     {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
//                   </button>
                  
//                   {formStatus === 'success' && (
//                     <motion.div 
//                       className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                     >
//                       Your message has been sent successfully! We'll get back to you soon.
//                     </motion.div>
//                   )}
//                 </div>
//               </form>
//             </motion.div>
            
//             {/* Contact Information */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
              
//               <div className="space-y-8">
//                 {/* Visit Us */}
//                 <div className="flex items-start space-x-4">
//                   <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-medium mb-1">Visit Us</h3>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>528 R.A.De Mel Mawatha</p>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Colombo</p>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Sri Lanka</p>
//                   </div>
//                 </div>
                
//                 {/* Call Us */}
//                 <div className="flex items-start space-x-4">
//                   <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-medium mb-1">Call Us</h3>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Support: +94 759 171 701</p>
//                   </div>
//                 </div>
                
//                 {/* Email Us */}
//                 <div className="flex items-start space-x-4">
//                   <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-medium mb-1">Email Us</h3>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Technical: technical@ceylonmine.lk</p>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Support: support@ceylonmine.lk</p>
//                   </div>
//                 </div>
                
//                 {/* Business Hours */}
//                 <div className="flex items-start space-x-4">
//                   <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-orange-100'}`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-medium mb-1">Working Hours</h3>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Monday - Friday: 9:00 AM - 5:30 PM</p>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'} mb-1`}>Saturday: 9:00 AM - 4:00 PM</p>
//                     <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>Sunday: 10:00 AM - 3:00 PM</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Social Media Links */}
//               <div className="mt-8">
//                 <h3 className="text-xl font-medium mb-4">Follow Us</h3>
//                 <div className="flex space-x-4">
//                   <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"></path>
//                     </svg>
//                   </a>
//                   <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
//                     </svg>
//                   </a>
//                   {/* <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                     </svg>
//                   </a> */}
//                   {/* <a href="#" className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
//                     <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//                     </svg>
//                   </a> */}
//                 </div>
//               </div>


//             </motion.div>
//           </div>
//         </div>
//       </main>

//       {/* Map Section */}
//       <section className="relative z-10 py-16 bg-gray-900 bg-opacity-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <motion.h2 
//               className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               FIND US
//             </motion.h2>
//             <motion.p 
//               className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               Visit the head office to experience process  in person.
//             </motion.p>
//           </div>
          
//           <motion.div 
//             className="rounded-lg overflow-hidden h-96 shadow-xl"
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             {/* Placeholder for the map (in a real project you'd use Google Maps or similar) */}
//             <div className="w-full h-full bg-gray-800 flex items-center justify-center">
//             <div className="w-full h-96"> {/* Adjust height as needed */}
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757687!2d79.91845431477226!3d6.914657295003654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sIIT%20Battaramulla!5e0!3m2!1sen!2slk!4v1698765432105!5m2!1sen!2slk"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//           </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="relative z-10 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <motion.h2 
//               className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               FREQUENTLY ASKED QUESTIONS
//             </motion.h2>
//             <motion.p 
//               className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               Find answers to common questions about our services.
//             </motion.p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             {[
//               {
//                 question: "How do I apply for a mining license?",
//                 answer: "You can apply for a mining license by submitting the required documents through our web portal or visiting the nearest provincial office. Our system allows for both digital and physical submissions."
//               },
//               {
//                 question: "What documents are required for a mining license?",
//                 answer: "The required documents include an Environmental Clearance Report, Police and Grama Niladhari reports, landowner consent forms, and details of the intended mining site."
//               },
//               {
//                 question: "How long does it take to get a mining license approved?",
//                 answer: "The approval process varies depending on the completeness of the submitted documents and regulatory review. Typically, it takes between 4 to 6 weeks."
//               },
//               {
//                 question: "How is the royalty for mining calculated?",
//                 answer: "Our platform integrates real-time mineral pricing and extraction data from the Geological Survey and Mines Bureau (GSMB) to ensure accurate royalty calculations. Royalties are based on the type and volume of minerals extracted."
//               },
//               {
//                 question: "Can I pay my royalties online?",
//                 answer: "Yes! Our system supports integrated payment solutions, allowing miners to calculate and pay royalties securely without visiting GSMB offices."
//               },
//               {
//                 question: "Does the system support environmental compliance tracking?",
//                 answer: "Absolutely! Our platform uses GIS-based mapping to monitor mining sites and ensure compliance with environmental regulations."
//               }
//             ].map((faq, index) => (
//               <motion.div
//                 key={index}
//                 className={`p-6 rounded-lg ${
//                   isDarkMode ? 'bg-gray-900' : 'bg-white'
//                 } shadow-md`}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
//                 <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
//                   {faq.answer}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`relative z-10 py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
//         <div className="container mx-auto px-4 text-center">
//           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
//             &copy; {new Date().getFullYear()} Ceylon Mine. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "../navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

export default function Contact() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    const handleLanguageChange = (event) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('themeChange', handleThemeChange);
    window.addEventListener('languageChange', handleLanguageChange);

    // Set initial theme based on local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Set initial language based on local storage
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'si') {
      setLanguage('si');
    } else {
      setLanguage('en');
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Three.js Sand (Particle) Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.004,
      color: isDarkMode ? 0xD2B48C : 0xFFD700, // Sand color
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
      particlesMesh.rotation.x += 0.0002 + mouseY * 0.0002; // Slowed down rotation
      particlesMesh.rotation.y += 0.0002 + mouseX * 0.0002; // Slowed down rotation
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

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const translations = {
    en: {
      contactUs: "Contact Us",
      getInTouch: "Get in Touch",
      contactDescription: "Have questions about CeylonMine? Our team is here to help. Fill out the form below and we'll get back to you as soon as possible.",
      fullName: "Full Name",
      email: "Email Address",
      phoneNumber: "Phone Number",
      subject: "Subject",
      message: "Message",
      sendMessage: "Send Message",
      ourOffice: "Our Office",
      officeAddress: "123 Mining Avenue, Colombo 10, Sri Lanka",
      phoneContact: "Phone: +94 11 234 5678",
      emailContact: "Email: info@ceylonmine.com",
      followUs: "Follow Us",
      allRightsReserved: "All rights reserved.",
      faqTitle: "Frequently Asked Questions",
      faqDescription: "Here are some common questions and answers about our services.",
      findUs: "Find Us",
      findUsDescription: "Visit the head office to experience the process in person."
    },
    si: {
      contactUs: "අපව සම්බන්ධ කරගන්න",
      getInTouch: "සම්බන්ධ වන්න",
      contactDescription: "CeylonMine ගැන ප්‍රශ්න තිබේද? අපගේ කණ්ඩායම උදව් කිරීමට සූදානම්. පහත ආකෘතිය පුරවන්න, අපි හැකි ඉක්මනින් ඔබට පිළිතුරු දෙන්නෙමු.",
      fullName: "සම්පූර්ණ නම",
      email: "විද්‍යුත් තැපැල් ලිපිනය",
      phoneNumber: "දුරකථන අංකය",
      subject: "විෂය",
      message: "පණිවිඩය",
      sendMessage: "පණිවිඩය යවන්න",
      ourOffice: "අපගේ කාර්යාලය",
      officeAddress: "123 මයිනින් ඇවනියු, කොළඹ 10, ශ්‍රී ලංකාව",
      phoneContact: "දුරකථනය: +94 11 234 5678",
      emailContact: "විද්‍යුත් තැපෑල: info@ceylonmine.com",
      followUs: "අපව අනුගමනය කරන්න",
      allRightsReserved: "සියලු හිමිකම් ඇවිරිණි.",
      faqTitle: "නිතර අසන ප්‍රශ්න",
      faqDescription: "අපගේ සේවාවන් පිළිබඳ සමහර පොදු ප්‍රශ්න සහ පිළිතුරු මෙන්න.",
      findUs: "අපව සොයන්න",
      findUsDescription: "ක්‍රියාවලිය පුද්ගලිකව අත්දැකීමට ප්‍රධාන කාර්යාලයට පැමිණෙන්න."
    }
  };

  const t = translations[language];

  const faqs = [
    {
      question: "How do I apply for a mining license?",
      answer: "You can apply for a mining license by submitting the required documents through our web portal or visiting the nearest provincial office. Our system allows for both digital and physical submissions."
    },
    {
      question: "What documents are required for a mining license?",
      answer: "The required documents include an Environmental Clearance Report, Police and Grama Niladhari reports, landowner consent forms, and details of the intended mining site."
    },
    {
      question: "How long does it take to get a mining license approved?",
      answer: "The approval process varies depending on the completeness of the submitted documents and regulatory review. Typically, it takes between 4 to 6 weeks."
    },
    {
      question: "How is the royalty for mining calculated?",
      answer: "Our platform integrates real-time mineral pricing and extraction data from the Geological Survey and Mines Bureau (GSMB) to ensure accurate royalty calculations. Royalties are based on the type and volume of minerals extracted."
    },
    {
      question: "Can I pay my royalties online?",
      answer: "Yes! Our system supports integrated payment solutions, allowing miners to calculate and pay royalties securely without visiting GSMB offices."
    },
    {
      question: "Does the system support environmental compliance tracking?",
      answer: "Absolutely! Our platform uses GIS-based mapping to monitor mining sites and ensure compliance with environmental regulations."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      } overflow-hidden`}
      ref={scrollRef}
    >
      <Head>
        <title>Contact Us | CeylonMine</title>
        <meta
          name="description"
          content="Contact CeylonMine for information about our digital platform for mining licensing and royalty calculation in Sri Lanka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative z-10 pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.contactUs}
            </motion.h1>
            <motion.p
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'opacity-80' : 'opacity-90'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.contactDescription}
            </motion.p>
          </div>

          {/* Contact Form and Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div 
              className={`lg:col-span-2 rounded-xl p-8 ${
                isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white shadow-lg'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.getInTouch}</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className={`w-full px-4 py-3 rounded-md focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-orange-500' 
                          : 'bg-gray-50 border border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-md focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-orange-500' 
                          : 'bg-gray-50 border border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={`w-full px-4 py-3 rounded-md focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-orange-500' 
                          : 'bg-gray-50 border border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="+94 71 234 5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 rounded-md focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border border-gray-700 focus:border-orange-500' 
                          : 'bg-gray-50 border border-gray-200 focus:border-orange-500'
                      }`}
                      placeholder="Licensing Inquiry"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t.message}
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className={`w-full px-4 py-3 rounded-md focus:outline-none ${
                      isDarkMode 
                        ? 'bg-gray-800 border border-gray-700 focus:border-orange-500' 
                        : 'bg-gray-50 border border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div>
                  <motion.button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md text-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.sendMessage}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`mb-10 rounded-xl p-8 ${
                isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white shadow-lg'
              }`}>
                <h3 className="text-xl font-bold mb-4">{t.ourOffice}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="ml-3">{t.officeAddress}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="ml-3">{t.phoneContact}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="ml-3">{t.emailContact}</p>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-xl p-8 ${
                isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white shadow-lg'
              }`}>
                <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-orange-500 hover:text-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.section 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t.findUs}
              </motion.h2>
              <motion.p 
                className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.findUsDescription}
              </motion.p>
            </div>

            <motion.div 
              className="rounded-lg overflow-hidden h-96 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757687!2d79.91845431477226!3d6.914657295003654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sIIT%20Battaramulla!5e0!3m2!1sen!2slk!4v1698765432105!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </motion.section>

        
          {/* FAQ Section */}
          <motion.div
            className={`mt-20 rounded-xl p-12 ${
              isDarkMode ? 'bg-gray-900 bg-opacity-60' : 'bg-white shadow-lg'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">{t.faqTitle}</h2>
            <p className="text-lg mb-10 text-center max-w-3xl mx-auto">
              {t.faqDescription}
            </p>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
                >
                  <button
                    className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`p-4 pt-0 ${
                      isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
                    }`}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      <footer
        className={`relative z-10 py-8 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-800'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}
          >
            &copy; {new Date().getFullYear()} CeylonMine. {t.allRightsReserved}
          </p>
        </div>
      </footer>

      {/* Three.js Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
    </div>
  );
}