
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Navbar from '../navbar/page';
// import RoyaltyCalculator from "../components/RoyaltyCalculator";
// import UserGreeting from "../components/UserGreeting";
// import MiningStats from "../components/MiningStats";
// import ErrorBoundary from '../components/ErrorBoundary';
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// interface MiningStatsType {
//   explosiveQuantity: number;
//   blastedVolume: number;
//   totalRoyalty: number;
//   dueDate: string;
//   lastCalculated: string;
// }

// interface RoyaltyCalculationData {
//   calculations: {
//     total_explosive_quantity: number;
//     blasted_rock_volume: number;
//     total_amount_with_vat: number;
//   };
//   calculation_date: string;
// }

// export default function Royalty() {
//   const [miningStats, setMiningStats] = useState<MiningStatsType>({
//     explosiveQuantity: 0,
//     blastedVolume: 0,
//     totalRoyalty: 0,
//     dueDate: '',
//     lastCalculated: ''
//   });

//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
//   // Parallax scroll effect
//   const { scrollYProgress } = useScroll();
//   const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
//   // Mouse tracking for 3D tilt effects
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
    
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };
    
//     // Initialize window size
//     handleResize();
    
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
  
//   // Particle animation refs
//   const particlesRef = React.useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     if (!particlesRef.current || !isDarkMode) return;
    
//     // Create particles
//     const particlesContainer = particlesRef.current;
//     particlesContainer.innerHTML = '';
    
//     for (let i = 0; i < 50; i++) {
//       const particle = document.createElement('div');
      
//       // Random properties
//       const size = Math.random() * 5 + 2;
//       const posX = Math.random() * 100;
//       const posY = Math.random() * 100;
//       const opacity = Math.random() * 0.5 + 0.1;
//       const animDuration = Math.random() * 100 + 50;
//       const animDelay = Math.random() * 50;
      
//       // Set styles
//       particle.style.position = 'absolute';
//       particle.style.width = `${size}px`;
//       particle.style.height = `${size}px`;
//       particle.style.borderRadius = '50%';
//       particle.style.left = `${posX}%`;
//       particle.style.top = `${posY}%`;
//       particle.style.opacity = `${opacity}`;
//       particle.style.background = `radial-gradient(circle at center, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0.1))`;
//       particle.style.boxShadow = '0 0 10px rgba(251, 191, 36, 0.3)';
//       particle.style.animation = `floatParticle ${animDuration}s infinite alternate ease-in-out ${animDelay}s`;
      
//       particlesContainer.appendChild(particle);
//     }
    
//     // Add keyframes for animation if not already added
//     if (!document.getElementById('particle-keyframes')) {
//       const style = document.createElement('style');
//       style.id = 'particle-keyframes';
//       style.textContent = `
//         @keyframes floatParticle {
//           0% {
//             transform: translate(0, 0) scale(1);
//           }
//           50% {
//             transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8});
//           }
//           100% {
//             transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() * 0.5 + 0.5});
//           }
//         }
//       `;
//       document.head.appendChild(style);
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleRoyaltyCalculated = (data: RoyaltyCalculationData) => {
//     setMiningStats({
//       explosiveQuantity: data.calculations.total_explosive_quantity,
//       blastedVolume: data.calculations.blasted_rock_volume,
//       totalRoyalty: data.calculations.total_amount_with_vat,
//       dueDate: data.calculation_date,
//       lastCalculated: data.calculation_date
//     });
//   };

//   const handleDueDateChange = (date: Date) => {
//     setMiningStats((prev: MiningStatsType) => ({
//       ...prev,
//       dueDate: date.toISOString()
//     }));
//   };

//   // Calculate the tilt based on mouse position
//   const calculateTilt = (element: HTMLElement | null, intensity = 20) => {
//     if (!element || !windowSize.width) return { rotateX: 0, rotateY: 0 };
    
//     const rect = element.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
    
//     // Calculate the mouse position relative to the center of the element
//     const relativeX = (mousePosition.x - centerX) / (rect.width / 2);
//     const relativeY = (mousePosition.y - centerY) / (rect.height / 2);
    
//     return {
//       rotateX: -relativeY * intensity,
//       rotateY: relativeX * intensity,
//     };
//   };

//   // Dynamic styles
//   const fontStyles = {
//     heading: "font-sans tracking-tight font-extrabold",
//     subheading: "font-sans tracking-wide font-semibold",
//     body: "font-sans",
//   };

//   // Enhanced color schemes
//   const darkModeColors = {
//     background: 'bg-gray-900',
//     cardBg: 'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
//     cardBorder: 'border-amber-500/50',
//     text: 'text-white',
//     subtext: 'text-amber-300',
//     goldGradient: 'from-amber-400 via-amber-500 to-amber-600',
//     buttonHover: 'hover:bg-amber-600',
//     cardShadow: 'shadow-[0_10px_50px_rgba(245,158,11,0.2)]',
//   };

//   const lightModeColors = {
//     background: 'bg-gradient-to-br from-blue-50 to-white',
//     cardBg: 'bg-gradient-to-br from-white/90 to-gray-50/90',
//     cardBorder: 'border-gray-200',
//     text: 'text-gray-900',
//     subtext: 'text-gray-600',
//     goldGradient: 'from-amber-500 via-amber-600 to-amber-700',
//     buttonHover: 'hover:bg-blue-100',
//     cardShadow: 'shadow-xl',
//   };

//   const colors = isDarkMode ? darkModeColors : lightModeColors;

//   // Card refs for tilt effect
//   const statsCardRef = React.useRef<HTMLDivElement>(null);
//   const calcCardRef = React.useRef<HTMLDivElement>(null);

//   return (
//     <div
//       className={`relative min-h-screen overflow-hidden ${isDarkMode ? colors.background : lightModeColors.background} ${colors.text} ${fontStyles.body} transition-colors duration-700`}
//       style={{ perspective: '2500px' }}
//     >
//       {/* Import Google Fonts */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
//         html {
//           font-family: 'Poppins', 'Montserrat', -apple-system, system-ui, sans-serif;
//           scroll-behavior: smooth;
//         }
        
//         h1, h2, h3, h4, h5, h6 {
//           font-family: 'Montserrat', -apple-system, system-ui, sans-serif;
//         }
        
//         /* Glassmorphism effect */
//         .glass-card {
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//         }
        
//         /* Ambient particle animations */
//         @keyframes glow {
//           0%, 100% { opacity: 0.6; filter: blur(15px); }
//           50% { opacity: 1; filter: blur(20px); }
//         }
        
//         .glow-effect {
//           animation: glow 8s infinite alternate ease-in-out;
//         }
        
//         /* Subtle shimmer effect for gold elements */
//         @keyframes shimmer {
//           0% {
//             background-position: -100% 0;
//           }
//           100% {
//             background-position: 200% 0;
//           }
//         }
        
//         .shimmer {
//           background: linear-gradient(90deg, 
//             rgba(251, 191, 36, 0) 0%, 
//             rgba(251, 191, 36, 0.8) 50%, 
//             rgba(251, 191, 36, 0) 100%
//           );
//           background-size: 200% 100%;
//           animation: shimmer 3s infinite;
//         }
//       `}</style>
      
//       <Navbar />
      
//       {/* Floating Particles Background */}
//       {isDarkMode && (
//         <div 
//           ref={particlesRef}
//           className="fixed inset-0 pointer-events-none overflow-hidden"
//         />
//       )}
      
//       {/* Animated Background Elements */}
//       {isDarkMode && (
//         <div className="fixed inset-0 pointer-events-none overflow-hidden">
//           <motion.div 
//             className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-700/10 glow-effect"
//             animate={{
//               x: [0, 30, 0],
//               y: [0, 50, 0],
//             }}
//             style={{ filter: 'blur(80px)' }}
//             transition={{
//               duration: 25,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           />
//           <motion.div 
//             className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-amber-500/15 glow-effect"
//             animate={{
//               x: [0, -40, 0],
//               y: [0, -30, 0],
//             }}
//             style={{ filter: 'blur(60px)' }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           />
//           <motion.div 
//             className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-amber-400/10 glow-effect"
//             animate={{
//               x: [0, 60, 0],
//               y: [0, -40, 0],
//             }}
//             style={{ filter: 'blur(50px)' }}
//             transition={{
//               duration: 15,
//               repeat: Infinity,
//               repeatType: "reverse"
//             }}
//           />
//         </div>
//       )}
      
//       {/* 3D Grid Background */}
//       <motion.div 
//         className="fixed inset-0 pointer-events-none"
//         style={{ 
//           opacity: 0.05,
//           backgroundImage: isDarkMode ? 
//             'linear-gradient(to right, rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(251, 191, 36, 0.3) 1px, transparent 1px)' : 
//             'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
//           backgroundSize: '50px 50px',
//           transform: 'translateZ(-10px) rotateX(70deg) scale(3) translateY(-30%)'
//         }}
//       />
      
//       {/* Theme Toggle Button with Animated Transition */}
//       <motion.button
//         onClick={toggleTheme}
//         whileHover={{ scale: 1.15, rotate: 10 }}
//         whileTap={{ scale: 0.9, rotate: -10 }}
//         className={`fixed bottom-8 right-8 p-4 rounded-full z-50 transform transition-all ${
//           isDarkMode 
//             ? 'bg-gray-800 text-amber-400 border border-amber-500/70' 
//             : 'bg-white text-gray-800 border border-gray-300'
//         }`}
//         style={{ 
//           boxShadow: isDarkMode ? '0 0 30px rgba(251, 191, 36, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//           transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
//         }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.span
//             key={isDarkMode ? 'dark' : 'light'}
//             initial={{ opacity: 0, rotate: -90, scale: 0 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 90, scale: 0 }}
//             transition={{ duration: 0.5 }}
//             className="block text-xl"
//           >
//             {isDarkMode ? '🌞' : '🌙'}
//           </motion.span>
//         </AnimatePresence>
//       </motion.button>

//       {/* Animated Hero Section */}
//       <motion.div 
//         className="relative z-10"
//         style={{ 
//           translateY: useTransform(smoothScrollY, [0, 1], [0, -150]),
//           opacity: useTransform(smoothScrollY, [0, 0.5], [1, 0]),
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
//           <div className="text-center relative">
//             {/* Animated background element for heading */}
//             {isDarkMode && (
//               <motion.div 
//                 className="absolute inset-0 -z-10 opacity-30"
//                 animate={{
//                   background: [
//                     'radial-gradient(circle at center, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
//                     'radial-gradient(circle at center, rgba(251, 191, 36, 0.3) 0%, transparent 60%)',
//                     'radial-gradient(circle at center, rgba(251, 191, 36, 0.2) 0%, transparent 70%)'
//                   ]
//                 }}
//                 transition={{
//                   duration: 10,
//                   repeat: Infinity,
//                   repeatType: "reverse"
//                 }}
//               />
//             )}
            
//             <motion.h1 
//               className={`text-5xl sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} ${fontStyles.heading} relative`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
//               style={{ 
//                 textShadow: isDarkMode ? '0 0 30px rgba(251, 191, 36, 0.3)' : 'none',
//               }}
//             >
//               Mining Royalty Dashboard
              
//               {/* Decorative elements */}
//               {isDarkMode && (
//                 <motion.span 
//                   className="absolute -z-10 inset-0 opacity-20 shimmer"
//                 />
//               )}
//             </motion.h1>
            
//             <motion.p 
//               className={`mt-6 max-w-md mx-auto text-xl md:text-2xl md:max-w-3xl ${isDarkMode ? 'text-amber-200' : colors.subtext} ${fontStyles.subheading}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               Calculate and track your mining royalties efficiently
//             </motion.p>
            
//             {/* 3D Animated Underline with Glow */}
//             <motion.div 
//               className="relative h-1 mx-auto mt-8"
//               initial={{ width: 0 }}
//               animate={{ width: "180px" }}
//               transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
//             >
//               <motion.div 
//                 className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.goldGradient}`}
//                 style={{
//                   boxShadow: isDarkMode ? '0 0 20px rgba(251, 191, 36, 0.7)' : 'none',
//                 }}
//               />
              
//               {isDarkMode && (
//                 <motion.div 
//                   className="absolute inset-0 -z-10 rounded-full opacity-70"
//                   animate={{
//                     boxShadow: [
//                       '0 0 10px 2px rgba(251, 191, 36, 0.5)',
//                       '0 0 20px 4px rgba(251, 191, 36, 0.7)',
//                       '0 0 10px 2px rgba(251, 191, 36, 0.5)'
//                     ]
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }}
//                 />
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
//         {/* Stats Section - with premium 3D hover effect */}
//         <motion.div 
//           ref={statsCardRef}
//           className={`rounded-2xl border glass-card p-8 md:p-10 mb-16 ${colors.cardBg} ${colors.cardBorder} ${colors.cardShadow} overflow-hidden`}
//           initial={{ opacity: 0, y: 60, rotateX: 10 }}
//           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ 
//             duration: 0.8,
//             type: "spring",
//             stiffness: 100,
//             damping: 20
//           }}
//           whileHover={{ scale: 1.02 }}
//           style={{ 
//             transformStyle: "preserve-3d",
//             boxShadow: isDarkMode ? '0 20px 80px -20px rgba(251, 191, 36, 0.3)' : '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
//             transform: `perspective(2000px) rotateX(${calculateTilt(statsCardRef.current).rotateX}deg) rotateY(${calculateTilt(statsCardRef.current).rotateY}deg)`,
//             transition: 'transform 0.2s ease-out',
//           }}
//         >
//           {/* Card inner glow effect */}
//           {isDarkMode && (
//             <motion.div 
//               className="absolute -inset-px rounded-2xl opacity-50 z-0 overflow-hidden"
//               style={{
//                 background: 'linear-gradient(120deg, rgba(251, 191, 36, 0) 40%, rgba(251, 191, 36, 0.2) 50%, rgba(251, 191, 36, 0) 60%)',
//                 backgroundSize: '200% 200%',
//               }}
//               animate={{
//                 backgroundPosition: ['0% 0%', '100% 100%'],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//             />
//           )}
          
//           <div className="relative">
//             <motion.div 
//               className="mb-8 transform"
//               style={{ 
//                 transform: 'translateZ(30px)',
//                 transformStyle: 'preserve-3d' 
//               }}
//             >
//               <UserGreeting 
//                 textClass={`${isDarkMode ? 'text-amber-300' : colors.text} ${fontStyles.subheading} text-2xl`} 
//               />
//             </motion.div>
            
//             <motion.h2 
//               className={`text-3xl ${fontStyles.heading} bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} mb-8`}
//               style={{ 
//                 transform: 'translateZ(40px)',
//                 transformStyle: 'preserve-3d' 
//               }}
//             >
//               Mining Statistics
//             </motion.h2>
            
//             <motion.div 
//               className="relative z-10" 
//               style={{ 
//                 transform: 'translateZ(25px)',
//                 transformStyle: 'preserve-3d' 
//               }}
//             >
//               <MiningStats 
//                 {...miningStats} 
//                 onDueDateChange={handleDueDateChange}
//                 theme={isDarkMode ? 'dark' : 'light'}
//                 colorAccent={isDarkMode ? 'text-amber-400' : 'text-amber-600'}
//                 bgAccent={isDarkMode ? 'bg-amber-900/30' : 'bg-amber-100'}
//                 fontClass={fontStyles.body}
//               />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Calculator Section - with premium 3D hover effect */}
//         <motion.div 
//           ref={calcCardRef}
//           className={`rounded-2xl border glass-card p-8 md:p-10 ${colors.cardBg} ${colors.cardBorder} ${colors.cardShadow} overflow-hidden`}
//           initial={{ opacity: 0, y: 60, rotateX: 10 }}
//           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ 
//             duration: 0.8, 
//             delay: 0.2,
//             type: "spring",
//             stiffness: 100,
//             damping: 20
//           }}
//           whileHover={{ scale: 1.02 }}
//           style={{ 
//             transformStyle: "preserve-3d",
//             boxShadow: isDarkMode ? '0 20px 80px -20px rgba(251, 191, 36, 0.3)' : '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
//             transform: `perspective(2000px) rotateX(${calculateTilt(calcCardRef.current).rotateX}deg) rotateY(${calculateTilt(calcCardRef.current).rotateY}deg)`,
//             transition: 'transform 0.2s ease-out',
//           }}
//         >
//           {/* Card inner glow effect */}
//           {isDarkMode && (
//             <motion.div 
//               className="absolute -inset-px rounded-2xl opacity-50 z-0 overflow-hidden"
//               style={{
//                 background: 'linear-gradient(120deg, rgba(251, 191, 36, 0) 40%, rgba(251, 191, 36, 0.2) 50%, rgba(251, 191, 36, 0) 60%)',
//                 backgroundSize: '200% 200%',
//               }}
//               animate={{
//                 backgroundPosition: ['0% 0%', '100% 100%'],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 1
//               }}
//             />
//           )}
          
//           <div className="relative">
//             <motion.h2 
//               className={`text-3xl ${fontStyles.heading} bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} mb-8`}
//               style={{ 
//                 transform: 'translateZ(40px)',
//                 transformStyle: 'preserve-3d' 
//               }}
//             >
//               Mining Royalty Calculator
//             </motion.h2>
            
//             <motion.div 
//               className="relative z-10" 
//               style={{ 
//                 transform: 'translateZ(25px)',
//                 transformStyle: 'preserve-3d' 
//               }}
//             >
//               <ErrorBoundary>
//                 <RoyaltyCalculator 
//                   onCalculated={handleRoyaltyCalculated} 
//                   theme={isDarkMode ? 'dark' : 'light'}
//                   buttonClass={`bg-gradient-to-r ${colors.goldGradient} text-white font-medium tracking-wide py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'hover:shadow-amber-500/30' : ''}`}
//                   inputClass={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-lg py-3 px-4 transition-all duration-300 focus:ring-2 ${isDarkMode ? 'focus:ring-amber-500' : 'focus:ring-amber-400'}`}
//                   labelClass={`${isDarkMode ? 'text-amber-300' : 'text-gray-700'} ${fontStyles.subheading} mb-2 block`}
//                   fontClass={fontStyles.body}
//                 />
//               </ErrorBoundary>
//             </motion.div>
//           </div>
//         </motion.div>
//       </main>

//       {/* Animated Footer with 3D parallax effect */}
//       <motion.footer 
//         className={`mt-16 py-8 border-t ${isDarkMode ? 'border-amber-900/30' : 'border-gray-200'}`}
//         style={{
//           transform: useTransform(
//             smoothScrollY,
//             [0, 1],
//             ['translateY(0px)', 'translateY(-20px)']
//           )
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.p 
//             className={`${isDarkMode ? 'text-amber-200/70' : 'text-gray-600'} ${fontStyles.body}`}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >
//             © {new Date().getFullYear()} Mining Royalty Dashboard
//           </motion.p>
//         </div>
//       </motion.footer>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../navbar/page';
import RoyaltyCalculator from "../components/RoyaltyCalculator";
import UserGreeting from "../components/UserGreeting";
import MiningStats from "../components/MiningStats";
import ErrorBoundary from '../components/ErrorBoundary';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface MiningStatsType {
  explosiveQuantity: number;
  blastedVolume: number;
  totalRoyalty: number;
  dueDate: string;
  lastCalculated: string;
}

interface RoyaltyCalculationData {
  calculations: {
    total_explosive_quantity: number;
    blasted_rock_volume: number;
    total_amount_with_vat: number;
  };
  calculation_date: string;
}

export default function Royalty() {
  const [miningStats, setMiningStats] = useState<MiningStatsType>({
    explosiveQuantity: 0,
    blastedVolume: 0,
    totalRoyalty: 0,
    dueDate: '',
    lastCalculated: ''
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Mouse tracking for 3D tilt effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    // Initialize window size
    handleResize();
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Initialize 3D sand effect
  useEffect(() => {
    if (!canvasRef.current || !isDarkMode) return;

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
    
    // Create sand material - adjust color based on theme
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xFFB700, // Gold/amber color for royalty page
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
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    
    // Dispatch theme change event to keep it consistent with home page
    const event = new CustomEvent('themeChange', { 
      detail: { isDarkMode: !isDarkMode } 
    });
    window.dispatchEvent(event);
    
    // Save preference
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const handleRoyaltyCalculated = (data: RoyaltyCalculationData) => {
    setMiningStats({
      explosiveQuantity: data.calculations.total_explosive_quantity,
      blastedVolume: data.calculations.blasted_rock_volume,
      totalRoyalty: data.calculations.total_amount_with_vat,
      dueDate: data.calculation_date,
      lastCalculated: data.calculation_date
    });
  };

  const handleDueDateChange = (date: Date) => {
    setMiningStats((prev: MiningStatsType) => ({
      ...prev,
      dueDate: date.toISOString()
    }));
  };

  // Calculate the tilt based on mouse position
  const calculateTilt = (element: HTMLElement | null, intensity = 20) => {
    if (!element || !windowSize.width) return { rotateX: 0, rotateY: 0 };
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the mouse position relative to the center of the element
    const relativeX = (mousePosition.x - centerX) / (rect.width / 2);
    const relativeY = (mousePosition.y - centerY) / (rect.height / 2);
    
    return {
      rotateX: -relativeY * intensity,
      rotateY: relativeX * intensity,
    };
  };

  // Dynamic styles
  const fontStyles = {
    heading: "font-sans tracking-tight font-extrabold",
    subheading: "font-sans tracking-wide font-semibold",
    body: "font-sans",
  };

  // Enhanced color schemes to match the home page
  const darkModeColors = {
    background: 'bg-black',
    cardBg: 'bg-gradient-to-br from-gray-900/90 to-black/90',
    cardBorder: 'border-orange-500/50',
    text: 'text-white',
    subtext: 'text-orange-300',
    goldGradient: 'from-orange-400 via-orange-500 to-amber-600',
    buttonHover: 'hover:bg-amber-600',
    cardShadow: 'shadow-[0_10px_50px_rgba(249,115,22,0.2)]',
  };

  const lightModeColors = {
    background: 'bg-gradient-to-br from-gray-50 to-white',
    cardBg: 'bg-gradient-to-br from-white/90 to-gray-50/90',
    cardBorder: 'border-gray-200',
    text: 'text-gray-900',
    subtext: 'text-gray-600',
    goldGradient: 'from-orange-500 via-orange-600 to-amber-700',
    buttonHover: 'hover:bg-orange-100',
    cardShadow: 'shadow-xl',
  };

  const colors = isDarkMode ? darkModeColors : lightModeColors;

  // Card refs for tilt effect
  const statsCardRef = React.useRef<HTMLDivElement>(null);
  const calcCardRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${isDarkMode ? colors.background : lightModeColors.background} ${colors.text} ${fontStyles.body} transition-colors duration-700`}
      style={{ perspective: '2500px' }}
    >
      {/* Import Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        html {
          font-family: 'Poppins', 'Montserrat', -apple-system, system-ui, sans-serif;
          scroll-behavior: smooth;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Montserrat', -apple-system, system-ui, sans-serif;
        }
        
        /* Glassmorphism effect */
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        
        /* Subtle shimmer effect for gold elements */
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .shimmer {
          background: linear-gradient(90deg, 
            rgba(249, 115, 22, 0) 0%, 
            rgba(249, 115, 22, 0.8) 50%, 
            rgba(249, 115, 22, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      <Navbar />
      
      {/* 3D Sand Background */}
      {isDarkMode && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 w-full h-full z-0"
        />
      )}
      
      {/* Animated Background Elements */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-orange-700/10"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
            }}
            style={{ filter: 'blur(80px)' }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-orange-500/15"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
            }}
            style={{ filter: 'blur(60px)' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-amber-400/10"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            style={{ filter: 'blur(50px)' }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      )}
      
      {/* 3D Grid Background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          opacity: 0.05,
          backgroundImage: isDarkMode ? 
            'linear-gradient(to right, rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(249, 115, 22, 0.3) 1px, transparent 1px)' : 
            'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'translateZ(-10px) rotateX(70deg) scale(3) translateY(-30%)'
        }}
      />
      
      {/* Theme Toggle Button with Animated Transition */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        className={`fixed bottom-8 right-8 p-4 rounded-full z-50 transform transition-all ${
          isDarkMode 
            ? 'bg-gray-900 text-orange-400 border border-orange-500/70' 
            : 'bg-white text-gray-800 border border-gray-300'
        }`}
        style={{ 
          boxShadow: isDarkMode ? '0 0 30px rgba(249, 115, 22, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkMode ? 'dark' : 'light'}
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="block text-xl"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Animated Hero Section */}
      <motion.div 
        className="relative z-10"
        style={{ 
          translateY: useTransform(smoothScrollY, [0, 1], [0, -150]),
          opacity: useTransform(smoothScrollY, [0, 0.5], [1, 0]),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center relative">
            {/* Animated background element for heading */}
            {isDarkMode && (
              <motion.div 
                className="absolute inset-0 -z-10 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
                    'radial-gradient(circle at center, rgba(249, 115, 22, 0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at center, rgba(249, 115, 22, 0.2) 0%, transparent 70%)'
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )}
            
            <motion.h1 
              className={`text-5xl sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} ${fontStyles.heading} relative uppercase`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
              style={{ 
                textShadow: isDarkMode ? '0 0 30px rgba(249, 115, 22, 0.3)' : 'none',
              }}
            >
              Mining Royalty Dashboard
              
              {/* Decorative elements */}
              {isDarkMode && (
                <motion.span 
                  className="absolute -z-10 inset-0 opacity-20 shimmer"
                />
              )}
            </motion.h1>
            
            <motion.p 
              className={`mt-6 max-w-md mx-auto text-xl md:text-2xl md:max-w-3xl ${isDarkMode ? 'text-orange-200' : colors.subtext} ${fontStyles.subheading}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Calculate and track your mining royalties efficiently
            </motion.p>
            
            {/* 3D Animated Underline with Glow */}
            <motion.div 
              className="relative h-1 mx-auto mt-8"
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              <motion.div 
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.goldGradient}`}
                style={{
                  boxShadow: isDarkMode ? '0 0 20px rgba(249, 115, 22, 0.7)' : 'none',
                }}
              />
              
              {isDarkMode && (
                <motion.div 
                  className="absolute inset-0 -z-10 rounded-full opacity-70"
                  animate={{
                    boxShadow: [
                      '0 0 10px 2px rgba(249, 115, 22, 0.5)',
                      '0 0 20px 4px rgba(249, 115, 22, 0.7)',
                      '0 0 10px 2px rgba(249, 115, 22, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        {/* Stats Section - with premium 3D hover effect */}
        <motion.div 
          ref={statsCardRef}
          className={`rounded-2xl border glass-card p-8 md:p-10 mb-16 ${colors.cardBg} ${colors.cardBorder} ${colors.cardShadow} overflow-hidden`}
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          whileHover={{ scale: 1.02 }}
          style={{ 
            transformStyle: "preserve-3d",
            boxShadow: isDarkMode ? '0 20px 80px -20px rgba(249, 115, 22, 0.3)' : '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
            transform: `perspective(2000px) rotateX(${calculateTilt(statsCardRef.current).rotateX}deg) rotateY(${calculateTilt(statsCardRef.current).rotateY}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Card inner glow effect */}
          {isDarkMode && (
            <motion.div 
              className="absolute -inset-px rounded-2xl opacity-50 z-0 overflow-hidden"
              style={{
                background: 'linear-gradient(120deg, rgba(249, 115, 22, 0) 40%, rgba(249, 115, 22, 0.2) 50%, rgba(249, 115, 22, 0) 60%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
          
          <div className="relative">
            <motion.div 
              className="mb-8 transform"
              style={{ 
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d' 
              }}
            >
              <UserGreeting 
                textClass={`${isDarkMode ? 'text-orange-300' : colors.text} ${fontStyles.subheading} text-2xl`} 
              />
            </motion.div>
            
            <motion.h2 
              className={`text-3xl ${fontStyles.heading} bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} mb-8 uppercase`}
              style={{ 
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d' 
              }}
            >
              Mining Statistics
            </motion.h2>
            
            <motion.div 
              className="relative z-10" 
              style={{ 
                transform: 'translateZ(25px)',
                transformStyle: 'preserve-3d' 
              }}
            >
              <MiningStats 
                {...miningStats} 
                onDueDateChange={handleDueDateChange}
                theme={isDarkMode ? 'dark' : 'light'}
                colorAccent={isDarkMode ? 'text-orange-400' : 'text-orange-600'}
                bgAccent={isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'}
                fontClass={fontStyles.body}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Calculator Section - with premium 3D hover effect */}
        <motion.div 
          ref={calcCardRef}
          className={`rounded-2xl border glass-card p-8 md:p-10 ${colors.cardBg} ${colors.cardBorder} ${colors.cardShadow} overflow-hidden`}
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          whileHover={{ scale: 1.02 }}
          style={{ 
            transformStyle: "preserve-3d",
            boxShadow: isDarkMode ? '0 20px 80px -20px rgba(249, 115, 22, 0.3)' : '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
            transform: `perspective(2000px) rotateX(${calculateTilt(calcCardRef.current).rotateX}deg) rotateY(${calculateTilt(calcCardRef.current).rotateY}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          {/* Card inner glow effect */}
          {isDarkMode && (
            <motion.div 
              className="absolute -inset-px rounded-2xl opacity-50 z-0 overflow-hidden"
              style={{
                background: 'linear-gradient(120deg, rgba(249, 115, 22, 0) 40%, rgba(249, 115, 22, 0.2) 50%, rgba(249, 115, 22, 0) 60%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          )}
          
          <div className="relative">
            <motion.h2 
              className={`text-3xl ${fontStyles.heading} bg-clip-text text-transparent bg-gradient-to-r ${colors.goldGradient} mb-8 uppercase`}
              style={{ 
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d' 
              }}
            >
              Mining Royalty Calculator
            </motion.h2>
            
            <motion.div 
              className="relative z-10" 
              style={{ 
                transform: 'translateZ(25px)',
                transformStyle: 'preserve-3d' 
              }}
            >
              <ErrorBoundary>
                <RoyaltyCalculator 
                  onCalculated={handleRoyaltyCalculated} 
                  theme={isDarkMode ? 'dark' : 'light'}
                  buttonClass={`bg-gradient-to-r ${colors.goldGradient} text-white font-medium tracking-wide py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'hover:shadow-orange-500/30' : ''}`}
                  inputClass={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} rounded-lg py-3 px-4 transition-all duration-300 focus:ring-2 ${isDarkMode ? 'focus:ring-orange-500' : 'focus:ring-orange-400'}`}
                  labelClass={`${isDarkMode ? 'text-orange-300' : 'text-gray-700'} ${fontStyles.subheading} mb-2 block`}
                  fontClass={fontStyles.body}
                />
              </ErrorBoundary>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Animated Footer with 3D parallax effect */}
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