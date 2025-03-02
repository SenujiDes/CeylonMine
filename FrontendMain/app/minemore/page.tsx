// 'use client';

// import React from 'react';
// import Navbar from '../navbar/page';
// import Link from 'next/link';

// export default function Minemore() {
//   const resources = [
//     {
//       title: "Mining Guidelines",
//       description: "Comprehensive guides and best practices for mining operations",
//       link: "/guidelines"
//     },
//     {
//       title: "Safety Protocols",
//       description: "Essential safety measures and emergency procedures",
//       link: "/safety"
//     },
//     {
//       title: "Equipment Manual",
//       description: "Detailed documentation for mining equipment and tools",
//       link: "/equipment"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
//       <Navbar />
      
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center relative z-10">
//             <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
//               Mine More Resources
//             </h1>
//             <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//               Access additional resources and documentation for mining operations
//             </p>
//           </div>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
//         {/* Resources Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
//           {resources.map((resource, index) => (
//             <Link href={resource.link} key={index} className="group">
//               <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
//                             border border-indigo-900/50 p-6 h-full 
//                             hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500">
//                 <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-4"></div>
//                 <h2 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-orange-400 transition-colors">
//                   {resource.title}
//                 </h2>
//                 <p className="text-blue-100/70">
//                   {resource.description}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Additional Information Section */}
//         <div className="mt-16 bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
//                       border border-indigo-900/50 p-8 animate-fadeIn delay-200">
//           <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
//             Need More Information?
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold text-amber-400 mb-3">Contact Support</h3>
//               <p className="text-blue-100/70 mb-4">
//                 Our support team is available 24/7 to assist you with any queries.
//               </p>
//               <Link href="/contact" 
//                     className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 
//                              text-[#1a2942] font-semibold rounded-lg hover:from-orange-500 hover:to-amber-400 
//                              transform hover:scale-105 transition-all duration-300">
//                 Contact Us
//               </Link>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-amber-400 mb-3">Download Resources</h3>
//               <p className="text-blue-100/70 mb-4">
//                 Access our comprehensive documentation and guides.
//               </p>
//               <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 
//                                text-[#1a2942] font-semibold rounded-lg hover:from-orange-500 hover:to-amber-400 
//                                transform hover:scale-105 transition-all duration-300">
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Decorative Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "../navbar/page";
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function MiningEducation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Educational content sections
  const educationSections = {
    overview: {
      title: "Mining Fundamentals",
      content: [
        {
          heading: "What is Mining?",
          text: "Mining is the extraction of valuable minerals or other geological materials from the Earth. Modern mining processes involve prospecting for ore bodies, analysis of the profit potential, extraction of the desired materials, and reclamation of the land after the mine is closed."
        },
        {
          heading: "Historical Significance",
          text: "Mining has been a human activity since pre-historic times. Modern mining processes have evolved significantly with technological advancements, allowing for more efficient and safer extraction methods."
        },
        {
          heading: "Economic Impact",
          text: "The mining industry is a crucial economic driver in many regions, providing employment, infrastructure development, and significant contributions to GDP. It serves as the foundation for many other industries by providing essential raw materials."
        }
      ]
    },
    techniques: {
      title: "Mining Techniques",
      content: [
        {
          heading: "Surface Mining",
          text: "Surface mining involves removing soil and rock overlying the mineral deposit. This method is more economical and safer compared to underground mining, particularly when the ore body is relatively close to the surface."
        },
        {
          heading: "Underground Mining",
          text: "Underground mining involves extracting minerals from deposits beneath the Earth's surface. This method is employed when the ore body is too deep for surface mining to be economical or when surface restrictions prevent open-pit mining."
        },
        {
          heading: "In-Situ Mining",
          text: "In-situ mining involves treating the ore body with chemicals in place and then processing the resulting solution. This technique minimizes surface disturbance and is particularly useful for minerals that are soluble in water, acids, or bases."
        },
        {
          heading: "Placer Mining",
          text: "Placer mining is used to extract minerals from alluvial deposits, such as gold from river beds. This method involves separating the heavy minerals from lighter ones using water or mechanical methods."
        }
      ]
    },
    safety: {
      title: "Mining Safety",
      content: [
        {
          heading: "Risk Assessment",
          text: "Comprehensive risk assessment is fundamental to mining safety. This involves identifying potential hazards, evaluating their likelihood and potential impact, and implementing appropriate control measures."
        },
        {
          heading: "Safety Training",
          text: "Regular safety training ensures that all personnel are aware of potential hazards and the proper procedures to mitigate risks. This includes emergency response protocols, equipment operation, and hazard recognition."
        },
        {
          heading: "Equipment Safety",
          text: "Modern mining equipment incorporates numerous safety features, including automatic shutoff mechanisms, rollover protection, and proximity detection systems. Regular maintenance and inspection are crucial for ensuring equipment safety."
        },
        {
          heading: "Environmental Monitoring",
          text: "Continuous monitoring of environmental conditions, such as air quality, ground stability, and water quality, is essential for early detection of potential safety issues and environmental impacts."
        }
      ]
    },
    environmental: {
      title: "Environmental Considerations",
      content: [
        {
          heading: "Land Reclamation",
          text: "After mining operations cease, land reclamation aims to restore the area to a natural or economically usable state. This often involves reshaping the land, adding topsoil, and planting vegetation."
        },
        {
          heading: "Water Management",
          text: "Proper water management is crucial in mining operations to prevent contamination of local water sources. This includes treatment of mine drainage, proper disposal of process water, and monitoring of groundwater quality."
        },
        {
          heading: "Biodiversity Conservation",
          text: "Mining operations can impact local ecosystems. Biodiversity conservation efforts aim to minimize these impacts through careful planning, monitoring, and implementation of mitigation measures."
        },
        {
          heading: "Sustainable Mining",
          text: "Sustainable mining practices focus on minimizing environmental impact, maximizing resource efficiency, and contributing positively to local communities. This approach considers the long-term consequences of mining activities."
        }
      ]
    },
    technology: {
      title: "Mining Technology",
      content: [
        {
          heading: "Automation and Robotics",
          text: "Autonomous vehicles, drones, and robotic systems are increasingly used in mining operations to improve efficiency and safety. These technologies can operate in hazardous environments, reducing the risk to human workers."
        },
        {
          heading: "Data Analytics",
          text: "Advanced data analytics and artificial intelligence are transforming mining operations by optimizing processes, predicting maintenance needs, and improving decision-making through real-time insights."
        },
        {
          heading: "Remote Operations",
          text: "Remote operation centers allow mining companies to control equipment and monitor operations from a distance, improving safety and enabling access to remote or challenging locations."
        },
        {
          heading: "Sustainable Technologies",
          text: "Innovations in renewable energy, water recycling, and waste management are helping mining operations reduce their environmental footprint and achieve sustainability goals."
        }
      ]
    }
  };

  // Courses data
  const courses = [
    {
      title: "Introduction to Mining Engineering",
      duration: "6 weeks",
      level: "Beginner",
      description: "Learn the fundamentals of mining engineering, including exploration, extraction, and processing methods.",
      topics: ["Mining principles", "Site evaluation", "Basic equipment", "Safety fundamentals"],
      image: "/api/placeholder/800/500"
    },
    {
      title: "Advanced Mining Techniques",
      duration: "8 weeks",
      level: "Intermediate",
      description: "Explore cutting-edge mining methods and technologies used in modern mining operations.",
      topics: ["Underground systems", "Automation technology", "Drilling techniques", "Production optimization"],
      image: "/api/placeholder/800/501"
    },
    {
      title: "Mining Safety and Regulations",
      duration: "4 weeks",
      level: "All Levels",
      description: "Comprehensive overview of safety protocols, regulatory frameworks, and compliance requirements in mining.",
      topics: ["Risk assessment", "Emergency protocols", "Regulatory compliance", "Safety culture"],
      image: "/api/placeholder/800/502"
    }
  ];

  // Initialize 3D rock particles effect
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

    // Create rock particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create rock material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x8B4513, // Rock/mineral color
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

  // Next Slide for courses
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  };

  // Previous Slide for courses
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`} ref={scrollRef}>
      <Navbar />
      <Head>
        <title>Mining Education Center | Comprehensive Mining Knowledge</title>
        <meta name="description" content="Comprehensive resources to expand your knowledge and skills in modern mining practices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 3D Rock Particles Background */}
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
              MINING EDUCATION<br />CENTER
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive resources to expand your knowledge and skills in modern mining practices
            </motion.p>
          </div>

          {/* Category Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.keys(educationSections).map((section) => (
              <motion.button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === section
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold'
                    : `${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:bg-opacity-80`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {educationSections[section].title}
              </motion.button>
            ))}
          </div>

          {/* Content Section */}
          <div className={`rounded-lg p-8 mb-12 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-white bg-opacity-90'} shadow-lg backdrop-blur-sm`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
              {educationSections[activeTab].title}
            </h2>
            
            <div className="space-y-8">
              {educationSections[activeTab].content.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-amber-400 mb-2">{item.heading}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Featured Courses Section - Slider */}
            {/* Featured Courses Section - Slider */}
            <section className="relative z-10 py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            Featured Courses
          </h2>

          {/* Courses Slider */}
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {courses.map((course, index) => (
                <div key={index} className="min-w-full flex-shrink-0 px-4">
                  <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6" />
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.duration}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.level}</span>
                    </div>
                    <ul className="list-disc list-inside mb-4">
                      {course.topics.map((topic, idx) => (
                        <li key={idx} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{topic}</li>
                      ))}
                    </ul>
                    <Link href="/courses" className="inline-block px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:opacity-80 transition-all">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
            >
              &larr;
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 py-8 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Mining Education Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}