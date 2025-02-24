// "use client";

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// const FAQ = () => {
//   const faqItems = [
//     {
//       question: "What is Ceylon Mine?",
//       answer:
//         "Ceylon Mine is a revolutionary platform designed to streamline mining operations in Sri Lanka, leveraging advanced technology for efficiency and sustainability.",
//     },
//     {
//       question: "How can I join the beta testing?",
//       answer:
//         "You can join the beta testing by signing up on our website and following the instructions provided in the confirmation email.",
//     },
//     {
//       question: "Is Ceylon Mine available internationally?",
//       answer:
//         "Currently, Ceylon Mine is focused on operations within Sri Lanka, but we plan to expand internationally in the future.",
//     },
//     {
//       question: "What makes Ceylon Mine unique?",
//       answer:
//         "Ceylon Mine combines cutting-edge technology with sustainable practices, ensuring efficient and environmentally friendly mining operations.",
//     },
//   ];

//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Check if we're running in a browser environment
//     if (typeof window === 'undefined') return;

//     // Initialize Three.js only if mountRef is available
//     if (!mountRef.current) return;

//     // Setup scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
    
//     // Setup renderer
//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create geometry
//     const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
//     const material = new THREE.MeshBasicMaterial({
//       color: 0xffd700,
//       wireframe: true,
//     });
//     const torusKnot = new THREE.Mesh(geometry, material);
//     scene.add(torusKnot);

//     camera.position.z = 5;

//     // Animation loop
//     const animate = () => {
//       torusKnot.rotation.x += 0.005;
//       torusKnot.rotation.y += 0.005;
//       renderer.render(scene, camera);
//       return requestAnimationFrame(animate);
//     };

//     const animationId = animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup function
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(animationId);
      
//       // Cleanup Three.js resources
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//       scene.clear();
//     };
//   }, []);

//   return (
//     <section id="faq" className="py-20 bg-black relative overflow-hidden">
//       <div ref={mountRef} className="absolute inset-0 z-0" />
//       <div className="absolute inset-0 bg-[url('/images/goldfish-texture.png')] opacity-10 mix-blend-overlay"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_10%,rgba(0,0,0,0.9)_80%)]"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 drop-shadow-[0_3px_6px_rgba(255,215,0,0.6)]">
//           Frequently Asked Questions
//         </h2>

//         <div className="max-w-4xl mx-auto space-y-8">
//           {faqItems.map((item, index) => (
//             <div
//               key={index}
//               className="p-6 bg-black/50 backdrop-blur-sm border border-amber-600/30 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
//             >
//               <h3 className="text-2xl font-bold text-amber-400 mb-2">{item.question}</h3>
//               <p className="text-gray-400">{item.answer}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


// export default FAQ;

//_______-
// "use client";

// import React, { useState } from "react";
// import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;

//   const faqItems = [
//     { question: "What is Ceylon Mine?", answer: "Ceylon Mine is an advanced digital platform designed to modernize and optimize mining operations in Sri Lanka through cutting-edge technology and sustainable mining practices." },
//     { question: "How does Ceylon Mine improve mining operations?", answer: "By utilizing AI, blockchain, and real-time monitoring, Ceylon Mine enhances efficiency, reduces environmental impact, and ensures compliance with mining regulations." },
//     { question: "Who can use Ceylon Mine?", answer: "Ceylon Mine is designed for mining companies, regulatory bodies, and independent miners seeking to streamline their operations and improve transparency." },
//     { question: "Is Ceylon Mine environmentally friendly?", answer: "Yes, Ceylon Mine incorporates sustainability-focused features, helping to monitor and minimize the ecological footprint of mining activities." },
//     { question: "How does Ceylon Mine enhance transparency?", answer: "With blockchain-based tracking, Ceylon Mine ensures full transparency in mining activities, resource extraction, and transactions." },
//     { question: "What security measures does Ceylon Mine use?", answer: "We implement end-to-end encryption, decentralized storage, and AI-powered anomaly detection to secure all mining data." },
//     { question: "Can small-scale miners benefit from Ceylon Mine?", answer: "Absolutely! Ceylon Mine provides scalable solutions tailored for both small-scale and large-scale mining operations." },
//     { question: "Does Ceylon Mine support legal compliance?", answer: "Yes, the platform includes automated compliance checks and reporting tools to help miners adhere to local and international regulations." },
//     { question: "What future features are planned for Ceylon Mine?", answer: "We are working on AI-powered predictive analytics, automated resource mapping, and integration with government regulatory systems." }
//   ];

//   const totalPages = Math.ceil(faqItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const displayedItems = faqItems.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="py-20 bg-black relative overflow-hidden flex justify-center items-center min-h-screen">
//       <div className="relative w-[90%] max-w-4xl bg-black p-8 rounded-3xl shadow-xl border border-gray-800 transform-gpu perspective-1000">
//         <div className="relative bg-black p-12 rounded-xl shadow-2xl border border-yellow-500/40 transform-gpu rotate-x-2 rotate-y-2">
//           <h2 className="text-4xl font-bold text-center mb-12 text-white">
//             Ceylon Mine <span className="text-yellow-500/80">FAQ</span>
//           </h2>
          
//           <div className="max-w-3xl mx-auto space-y-4">
//             {displayedItems.map((item, index) => (
//               <div key={index} className="transform-gpu hover:-translate-y-px transition-transform duration-300">
//                 <div className="relative border border-gray-800 rounded-lg overflow-hidden bg-black shadow-lg">
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-900/10 opacity-50"></div>
//                   <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-yellow-900/20 opacity-30"></div>
                  
//                   <button
//                     onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                     className="relative w-full p-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-yellow-900/5 hover:via-yellow-900/10 hover:to-yellow-900/5 transition-all duration-300"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-100">{item.question}</h3>
//                     <ChevronDown 
//                       className={`w-5 h-5 text-yellow-500/70 transition-transform duration-300 ${
//                         openIndex === index ? "rotate-180" : ""
//                       }`} 
//                     />
//                   </button>
                  
//                   <div className={`relative overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
//                     <p className="relative p-4 text-gray-300">{item.answer}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex justify-center items-center mt-8 space-x-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-black text-gray-100 rounded-lg disabled:opacity-50 shadow-lg border border-gray-800 hover:bg-yellow-900/10 transition-all duration-300"
//             >
//               <ChevronLeft />
//             </button>
//             <span className="text-lg font-semibold text-gray-100">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-black text-gray-100 rounded-lg disabled:opacity-50 shadow-lg border border-gray-800 hover:bg-yellow-900/10 transition-all duration-300"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const faqItems = [
    { question: "What is Ceylon Mine?", answer: "Ceylon Mine is an advanced digital platform designed to modernize and optimize mining operations in Sri Lanka through cutting-edge technology and sustainable mining practices." },
    { question: "How does Ceylon Mine improve mining operations?", answer: "By utilizing AI, blockchain, and real-time monitoring, Ceylon Mine enhances efficiency, reduces environmental impact, and ensures compliance with mining regulations." },
    { question: "Who can use Ceylon Mine?", answer: "Ceylon Mine is designed for mining companies, regulatory bodies, and independent miners seeking to streamline their operations and improve transparency." },
    { question: "Is Ceylon Mine environmentally friendly?", answer: "Yes, Ceylon Mine incorporates sustainability-focused features, helping to monitor and minimize the ecological footprint of mining activities." },
    { question: "How does Ceylon Mine enhance transparency?", answer: "With blockchain-based tracking, Ceylon Mine ensures full transparency in mining activities, resource extraction, and transactions." },
    { question: "What security measures does Ceylon Mine use?", answer: "We implement end-to-end encryption, decentralized storage, and AI-powered anomaly detection to secure all mining data." },
    { question: "Can small-scale miners benefit from Ceylon Mine?", answer: "Absolutely! Ceylon Mine provides scalable solutions tailored for both small-scale and large-scale mining operations." },
    { question: "Does Ceylon Mine support legal compliance?", answer: "Yes, the platform includes automated compliance checks and reporting tools to help miners adhere to local and international regulations." },
    { question: "What future features are planned for Ceylon Mine?", answer: "We are working on AI-powered predictive analytics, automated resource mapping, and integration with government regulatory systems." }
  ];

  const totalPages = Math.ceil(faqItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = faqItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-black relative overflow-hidden flex justify-center items-center min-h-screen">
      <Canvas className="absolute inset-0 z-0">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Box args={[4, 4, 4]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="yellow" metalness={0.5} roughness={0.3} />
        </Box>
      </Canvas>
      <div className="relative w-[90%] max-w-4xl bg-black p-8 rounded-3xl shadow-xl border border-gray-800 backdrop-blur-md z-10">
        <div className="relative bg-black p-12 rounded-xl shadow-2xl border border-yellow-500/40">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Ceylon Mine <span className="text-yellow-500/80">FAQ</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {displayedItems.map((item, index) => (
              <div key={index} className="transform-gpu hover:-translate-y-px transition-transform duration-300">
                <div className="relative border border-gray-800 rounded-lg overflow-hidden bg-black shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-900/10 opacity-50"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-yellow-900/20 opacity-30"></div>
                  
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="relative w-full p-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-yellow-900/5 hover:via-yellow-900/10 hover:to-yellow-900/5 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-100">{item.question}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-yellow-500/70 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  <div className={`relative overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
                    <p className="relative p-4 text-gray-300">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-black text-gray-100 rounded-lg disabled:opacity-50 shadow-lg border border-gray-800 hover:bg-yellow-900/10 transition-all duration-300"
            >
              <ChevronLeft />
            </button>
            <span className="text-lg font-semibold text-gray-100">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-black text-gray-100 rounded-lg disabled:opacity-50 shadow-lg border border-gray-800 hover:bg-yellow-900/10 transition-all duration-300"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
