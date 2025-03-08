// import React from 'react'
// import Navbar from '../navbar/page'

// export default function minebot() {
//   return (
//     <main>
//       <Navbar/>
//       <div>minebot</div>
//     </main>
//   )
// }

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../navbar/page";
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function MineBot() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MineBot, your sustainable mining assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef(null);
  const modelCanvasRef = useRef(null);
  const messagesEndRef = useRef(null);
  const modelRef = useRef(null);

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

  // Initialize 3D model
  useEffect(() => {
    if (!modelCanvasRef.current) return;

    // Set up Three.js scene for the 3D model
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 9, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: modelCanvasRef.current,
      alpha: true,
      antialias: true
    });

    // Set pixel ratio for sharper rendering on high-DPI screens
    renderer.setPixelRatio(window.devicePixelRatio);

    // Set initial size (will be updated in resize handler)
    const modelContainer = modelCanvasRef.current.parentElement;
    const width = modelContainer.clientWidth;
    const height = modelContainer.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/models/chatbot_v011.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;
        
        // Adjust scale: multiply the computed scale by 5 for a larger model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = (4.5/ maxDim) * 1;
        model.scale.set(scale, scale, scale);
        
        scene.add(model);
        
        // Position camera to see the model
        camera.position.z = 5;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );

    // Add orbit controls for interaction
    const controls = new OrbitControls(camera, modelCanvasRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Handle window resize
    function onWindowResize() {
      if (modelCanvasRef.current) {
        const container = modelCanvasRef.current.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = null;
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  // Initialize 3D sand effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create sand particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Sand material - color adjusts based on theme
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
    
    // Update particle color when theme changes
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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Bot response logic
  const generateBotResponse = (userMessage) => {
    setIsTyping(true);
    const responses = {
      'gold': 'Our sustainable gold mining operations use advanced extraction techniques that minimize environmental impact while maximizing yield. We currently have projects in development that require investments starting from $1.2M.',
      'gemstone': 'Ceylon Mine specializes in ethical gemstone mining across Sri Lanka. Our operations focus on responsible sourcing of sapphires, rubies, and other precious gems with minimal ecological footprint.',
      'industrial': 'Our industrial minerals division provides high-quality raw materials for manufacturing and construction industries worldwide, all extracted using sustainable methods.',
      'investment': 'We offer various investment opportunities starting from $500K for industrial minerals to $1.2M for gold mining operations. Each investment includes detailed sustainability reports and projected ROI.',
      'environment': 'Environmental conservation is at the core of our operations. We implement land restoration, water recycling systems, and carbon offset programs across all our mining sites.',
      'community': 'We believe in supporting local communities through fair employment practices, education initiatives, and healthcare improvements in all regions where we operate.',
      'technology': 'Ceylon Mine integrates cutting-edge technology including precision drilling, advanced ore sorting, and real-time monitoring systems to ensure efficient and environmentally sound operations.',
      'contact': 'You can reach our team at info@ceylonmine.com or call +94 112 345 678. Our headquarters is located at 123 Mining Rd, Colombo, Sri Lanka.',
      'location': 'We currently operate mining sites across various regions in Sri Lanka, specializing in areas known for rich mineral deposits while maintaining strict environmental standards.',
    };
    
    const userMessageLower = userMessage.toLowerCase();
    let botResponse = "I'm not sure I understand your query about mining. Could you please ask about our gold mining, gemstone operations, industrial minerals, investment opportunities, environmental practices, community engagement, technology, or contact information?";
    
    Object.keys(responses).forEach(key => {
      if (userMessageLower.includes(key)) {
        botResponse = responses[key];
      }
    });
    
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = inputValue;
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, isBot: false }]);
    setInputValue("");
    generateBotResponse(userMessage);
  };

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      <Navbar />
      
      {/* 3D Sand Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Chatbot Header with 3D Model */}
      <div className="relative z-10 pt-20 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            {/* 3D Model Container */}
            <div className="w-80 h-80 md:w-96 md:h-96 lg:w-112 lg:h-112 relative mb-8">
              <canvas 
                ref={modelCanvasRef} 
                className="w-full h-full"
              />
            </div>
            
            {/* Title and description below the model */}
            <motion.div 
              className="text-center w-full"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">MINEBOT</h1>
              <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                Your intelligent assistant for sustainable mining inquiries. Ask about our operations, investment opportunities, environmental practices, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* ChatBot Interface */}
      <div className="relative z-10 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Messages Display */}
            <div className={`h-96 md:h-[500px] overflow-y-auto p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`mb-4 max-w-[80%] ${message.isBot ? 'mr-auto' : 'ml-auto'}`}
                >
                  <div 
                    className={`rounded-lg px-4 py-3 ${
                      message.isBot 
                        ? isDarkMode 
                          ? 'bg-gray-800' 
                          : 'bg-gray-200' 
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-4 max-w-[80%] mr-auto">
                  <div className={`rounded-lg px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Form */}
            <form 
              onSubmit={handleSendMessage}
              className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`flex-grow px-4 py-2 rounded-l-md focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700' 
                      : 'bg-gray-100 text-gray-900 border-gray-200'
                  } border`}
                  placeholder="Ask about our mining operations..."
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-r-md transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Suggested Questions */}
          <motion.div 
            className="max-w-4xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Suggested Questions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Tell me about your gold mining operations",
                "What gemstone mining services do you offer?",
                "How do you ensure environmental sustainability?",
                "What investment opportunities are available?",
                "How do you support local communities?",
                "What technologies do you use in mining?",
                "Where are your mining operations located?",
                "How can I contact Ceylon Mine?"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    document.querySelector('input').focus();
                  }}
                  className={`text-left p-3 rounded-md transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-900 hover:bg-gray-800' 
                      : 'bg-white hover:bg-gray-100'
                  } shadow`}
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className={`relative z-10 py-6 ${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <p className="opacity-80">&copy; {new Date().getFullYear()} Ceylon Mine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
