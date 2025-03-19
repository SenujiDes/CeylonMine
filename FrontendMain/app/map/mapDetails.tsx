"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const EnhancedMiningMap = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [miningData, setMiningData] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Regions data with Sri Lankan provinces
  const regions = [
    {
      id: 'northern',
      name: 'Northern Province',
      resources: ['Limestone', 'Clay', 'Graphite'],
      licenses: 24,
      production: '120,000 tons/year',
      color: '#FFD700'
    },
    {
      id: 'north-central',
      name: 'North Central Province',
      resources: ['Phosphate', 'Quartz', 'Feldspar'],
      licenses: 31,
      production: '95,000 tons/year',
      color: '#FF8C00'
    },
    {
      id: 'eastern',
      name: 'Eastern Province',
      resources: ['Mineral Sands', 'Gemstones', 'Kaolin'],
      licenses: 42,
      production: '210,000 tons/year',
      color: '#FF6347'
    },
    {
      id: 'central',
      name: 'Central Province',
      resources: ['Gemstones', 'Graphite', 'Mica'],
      licenses: 56,
      production: '180,000 tons/year',
      color: '#32CD32'
    },
    {
      id: 'western',
      name: 'Western Province',
      resources: ['Clay', 'Sand', 'Limestone'],
      licenses: 68,
      production: '350,000 tons/year',
      color: '#4169E1'
    },
    {
      id: 'southern',
      name: 'Southern Province',
      resources: ['Graphite', 'Mineral Sands', 'Clay'],
      licenses: 47,
      production: '160,000 tons/year',
      color: '#9932CC'
    },
    {
      id: 'sabaragamuwa',
      name: 'Sabaragamuwa Province',
      resources: ['Gemstones', 'Graphite', 'Clays'],
      licenses: 74,
      production: '220,000 tons/year',
      color: '#20B2AA'
    },
    {
      id: 'uva',
      name: 'Uva Province',
      resources: ['Limestone', 'Dolomite', 'Phosphate'],
      licenses: 39,
      production: '130,000 tons/year',
      color: '#DAA520'
    },
    {
      id: 'north-western',
      name: 'North Western Province',
      resources: ['Clay', 'Limestone', 'Silica Sand'],
      licenses: 35,
      production: '145,000 tons/year',
      color: '#1E90FF'
    }
  ];

  // Particles for background effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 1,
          speed: Math.random() * 1 + 0.2,
          opacity: Math.random() * 0.7 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    // Scroll progress tracking
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const progress = scrollTop / (scrollHeight - clientHeight);
        setScrollProgress(progress);
      }
    };

    // Add scroll listener if not using framer-motion's useScroll
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    // Listen for theme changes from localStorage or system preference
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange);

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Simulate fetching mining data
    setTimeout(() => {
      const data = regions.reduce((acc, region) => {
        acc[region.id] = {
          resources: region.resources,
          licenses: region.licenses,
          production: region.production
        };
        return acc;
      }, {});
      setMiningData(data);
    }, 500);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Animation values based on scroll
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  const handleRegionHover = (region) => {
    setHoveredRegion(region);
  };

  const MapInfoCard = ({ region }) => {
    if (!region || !miningData[region.id]) return null;

    const data = miningData[region.id];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800/90 text-white' : 'bg-white/95 text-gray-900'
        } backdrop-blur-sm border border-orange-500/20 max-w-md z-20`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1 flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: region.color }}></div>
              {region.name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-600'} mb-4`}>
              Mining and Resource Information
            </p>
          </div>
          <button 
            onClick={() => setSelectedRegion(null)}
            className={`p-1 rounded-full ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            } transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            <h4 className="font-medium mb-2">Available Resources</h4>
            <div className="flex flex-wrap gap-2">
              {data.resources.map((resource, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-orange-500/20 text-orange-300' 
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {resource}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className="font-medium mb-1">Active Licenses</h4>
              <p className="text-2xl font-bold">{data.licenses}</p>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <h4 className="font-medium mb-1">Annual Production</h4>
              <p className="text-2xl font-bold">{data.production}</p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="py-2 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-medium shadow-lg transition-all duration-300 hover:shadow-orange-500/30 hover:scale-105">
              View Detailed Reports
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const HoverTooltip = ({ region }) => {
    if (!region) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className={`absolute pointer-events-none py-2 px-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } shadow-lg backdrop-blur-sm text-sm z-30`}
        style={{ 
          left: `calc(50% + ${Math.random() * 40 - 20}px)`, 
          top: `calc(50% + ${Math.random() * 40 - 20}px)` 
        }}
      >
        <p className="font-bold">{region.name}</p>
        <p className={isDarkMode ? 'text-orange-300' : 'text-orange-600'}>
          Click for details
        </p>
      </motion.div>
    );
  };

  return (
    <div 
      className={`relative w-full min-h-screen overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      ref={containerRef}
    >
      {/* Animated Particles Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${isDarkMode ? 'bg-orange-500' : 'bg-amber-500'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              y: ['0%', `${particle.speed * 100}%`],
              opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
            }}
            transition={{
              duration: 10 / particle.speed,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Background Elements */}
      <motion.div 
        className="fixed top-0 right-0 w-full h-full z-0"
        style={{ opacity: bgOpacity }}
      >
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent to-orange-500/5 filter blur-3xl opacity-60"
          animate={{
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen pt-24 pb-16" ref={scrollRef}>
        {/* Header Section */}
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{
            scale: headerScale,
            y: headerY,
          }}
        >
          <div className="text-center mb-16">
            <motion.span 
              className={`inline-block py-1 px-4 rounded-full text-sm font-semibold mb-4 ${
                isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              INTERACTIVE EXPERIENCE
            </motion.span>

            <motion.h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 ${
                isDarkMode 
                  ? 'text-white' 
                  : 'text-gray-900'
              } mb-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="relative inline-block">
                Sri Lanka Mining Map
                <div className={`absolute -inset-1 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-orange-600/20 to-amber-600/20 blur-lg' 
                    : 'bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-lg'
                } -z-10 opacity-70`}></div>
              </span>
            </motion.h1>

            <motion.p 
              className={`text-lg md:text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Explore Sri Lanka's mining activities by region. Scroll through the provinces and click on one to view detailed information about resources, licenses, and production.
            </motion.p>
          </div>

          {/* Main Content - Provinces and Info Panel */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 mt-12">
            {/* Scrollable Provinces Container */}
            <motion.div 
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className={`p-6 rounded-3xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-sm border border-orange-500/20 shadow-2xl`}
                whileHover={{ boxShadow: "0 20px 30px -10px rgba(249, 115, 22, 0.2)" }}
              >
                <h3 className={`text-xl font-medium mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Select a Province</h3>

                {/* Scrollable Provinces with 3D effect */}
                <div className="perspective-1000 overflow-x-auto pb-4">
                  <div className="flex space-x-4 min-w-max pb-2">
                    {regions.map((region, index) => (
                      <motion.div
                        key={region.id}
                        className={`w-48 h-48 rounded-2xl cursor-pointer flex flex-col justify-end p-4 ${
                          selectedRegion?.id === region.id 
                            ? 'ring-4 ring-orange-500/50' 
                            : 'hover:ring-2 ring-orange-500/30'
                        } transition-all duration-300`}
                        style={{ 
                          backgroundColor: `${region.color}${isDarkMode ? '40' : '30'}`,
                          border: `2px solid ${region.color}`,
                          transformStyle: "preserve-3d"
                        }}
                        onClick={() => handleRegionClick(region)}
                        onMouseEnter={() => handleRegionHover(region)}
                        onMouseLeave={() => handleRegionHover(null)}
                        initial={{ 
                          opacity: 0, 
                          y: 30,
                          rotateX: 10,
                          rotateY: -10
                        }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          rotateX: 0,
                          rotateY: 0,
                          transition: { 
                            delay: index * 0.1,
                            duration: 0.5
                          }
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          rotateX: 5,
                          rotateY: 5,
                          z: 20,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-lg font-bold" style={{ transform: "translateZ(10px)" }}>
                          {region.name}
                        </h3>
                        <div className="flex mt-2 flex-wrap gap-1" style={{ transform: "translateZ(15px)" }}>
                          {region.resources.slice(0, 2).map((resource, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isDarkMode 
                                  ? 'bg-gray-800/40 text-white' 
                                  : 'bg-white/60 text-gray-800'
                              }`}
                            >
                              {resource}
                            </span>
                          ))}
                          {region.resources.length > 2 && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-gray-800/40 text-white' 
                                : 'bg-white/60 text-gray-800'
                            }`}>
                              +{region.resources.length - 2} more
                            </span>
                          )}
                        </div>
                        {/* 3D hover effect with shadow */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent opacity-0 z-0"
                          style={{ transform: "translateZ(5px)" }}
                          whileHover={{ opacity: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scroll Indicator with animation */}
                <div className="mt-4 flex justify-center">
                  <motion.div 
                    className={`px-4 py-2 rounded-full text-xs ${
                      isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200/70 text-gray-700'
                    }`}
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Scroll to see all provinces
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Statistics Section with Parallax effect */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "9", label: "Provinces" },
                  { value: "416", label: "Active Licenses" },
                  { value: "1.5M", label: "Annual Production (tons)" },
                  { value: "42%", label: "Sustainability Score" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className={`text-center p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
                    } backdrop-blur-sm border border-orange-500/10 shadow-lg overflow-hidden`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.5, delay: index * 0.1 } 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(249, 115, 22, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="relative">
                      {/* Animated gradient background */}
                      <motion.div 
                        className={`absolute -inset-4 rounded-full ${
                          isDarkMode ? 'bg-orange-500/10' : 'bg-orange-500/10'
                        } blur-lg -z-10 opacity-60`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 3 + index,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <div className={`text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r ${
                        isDarkMode ? 'from-orange-300 to-amber-200' : 'from-orange-500 to-amber-600'
                      }`}>{stat.value}</div>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Info Panel with 3D hover effect */}
            <motion.div 
              className="w-full lg:w-1/3 sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatePresence>
                {selectedRegion ? (
                  <MapInfoCard region={selectedRegion} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-800/70' : 'bg-white/70'
                    } backdrop-blur-sm border border-orange-500/20 shadow-lg max-w-md`}
                    style={{ transformStyle: "preserve-3d" }}
                    whileHover={{
                      rotateX: 5,
                      rotateY: 5,
                      z: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                          isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                        }`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>

                      <h3 className="text-xl font-bold mb-2" style={{ transform: "translateZ(15px)" }}>
                        Province Details
                      </h3>

                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} style={{ transform: "translateZ(10px)" }}>
                        Select a province from the scrollable cards to view detailed mining information and statistics.
                      </p>
                    </div>

                    {/* Legend with floating animation */}
                    <div className="mt-8 border-t border-orange-500/10 pt-6" style={{ transform: "translateZ(10px)" }}>
                      <h4 className="text-sm font-bold mb-3">Resource Legend</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['Limestone', 'Gemstones', 'Graphite', 'Mineral Sands', 'Clay', 'Phosphate'].map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center gap-2"
                            animate={{
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: index * 0.2,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ 
                                backgroundColor: ['#FFD700', '#FF6347', '#4169E1', '#9932CC', '#32CD32', '#FF8C00'][index] 
                              }}
                            ></div>
                            <span className="text-xs">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedMiningMap;


