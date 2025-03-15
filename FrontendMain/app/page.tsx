"use client";

import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Navbar from "./navbar/page";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'si'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Image Slider Component
  const ImageSlider = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
      {
        src: "/images/1.jpg",
        title: "Empowering Sustainable Mining",
        description: "Join us in revolutionizing the mining industry with cutting-edge technology."
      },
      {
        src: "/images/2.jpg",
        title: "Transparent Licensing",
        description: "Streamline your mining license applications with our digital platform."
      },
      {
        src: "/images/3.jpg",
        title: "Automated Royalty Calculations",
        description: "Ensure fairness and accuracy with real-time royalty computations."
      },
      {
        src: "/images/4.jpg",
        title: "Environmental Stewardship",
        description: "Promote sustainable practices with integrated GIS mapping and AI support."
      },
      {
        src: "/images/5.jpg",
        title: "Digital Transformation",
        description: "Embrace the future of mining with CeylonMine's innovative solutions."
      }
    ];

    const nextImage = () => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              zIndex: index === currentImage ? 10 : 0
            }}
            transition={{ duration: 1 }}
          >
            <img 
              src={image.src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === currentImage ? 1 : 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                {image.title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto">
                {image.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
        
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-8 z-20">
          <button 
            onClick={prevImage}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? 'bg-orange-500' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

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

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    const savedLang = localStorage.getItem('language');
    if (savedLang === 'si') {
      setLanguage('si');
    } else {
      setLanguage('en');
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

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

    function onDocumentMouseMove(event: MouseEvent) {
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

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const translations = {
    en: {
      heroSubtitle: "Streamlining mining licensing and royalty calculation to promote transparency and sustainability in Sri Lanka.",
      discoverMore: "Discover More",
      explorePlatform: "Explore Platform",
      ourCommitment: "OUR COMMITMENT",
      commitmentText: "CeylonMine is dedicated to transforming mining processes through digital innovation, ensuring transparency, efficiency, and sustainable practices.",
      transparency: "TRANSPARENCY",
      efficiency: "EFFICIENCY",
      sustainability: "SUSTAINABILITY",
      featuresHeading: "OUR PLATFORM IN ACTION",
      featuresText: "Experience the seamless integration of digital licensing, automated royalty calculation, and sustainable mining oversight with CeylonMine.",
      testimonialsHeading: "WHAT OUR USERS SAY",
      testimonialsText: "Hear from industry professionals and stakeholders who have embraced the digital revolution with CeylonMine.",
      userFooter: "All rights reserved."
    },
    si: {
      heroSubtitle: "ශ්‍රී ලංකාවේ läbima නීතිකරණ සහ සිදුරු ගණනය කිරීම ක්‍රියාත්මක කිරීමට විනිවිද පෙනෙනභාවය හා ස්ථාවරතාවය ඉහළ නංවා ගැනීම.",
      discoverMore: "තව දුරටත් සොයා බලන්න",
      explorePlatform: "වේදිකාව සොයා බලන්න",
      ourCommitment: "අපගේ කැපවීම",
      commitmentText: "CeylonMine නවීන දීප්තිමත් තාක්ෂණය ඔස්සේ පතල් ක්‍රියාකාරකම් පරිවර්තනය කරමින් විනිවිද පෙනෙනභාවය, දක්ෂතාවය, හා ස්ථාවරතාවය තහවුරු කරයි.",
      transparency: "විනිවිද පෙනෙනභාවය",
      efficiency: "දක්ෂතාවය",
      sustainability: "ස්ථාවරතාවය",
      featuresHeading: "අපගේ වේදිකාව ක්‍රියාකාරීව",
      featuresText: "ඉතා ස්ථාවර දත්ත හා ස්වයංක්‍රීය රෝයල්ටි ගණනයක් සමඟ නීතිකරණ ක්‍රියාවලිය ස්වයංක්‍රීය කිරීමෙන් ඔබට අත්දැකීම් ලබා දෙන්න.",
      testimonialsHeading: "අපගේ පරිශීලකයින්ගේ අදහස්",
      testimonialsText: "CeylonMine සමඟ ඩිජිටල් විප්ලවය පිළිගෙන ඇති සංවිධානාත්මක වෘත්තිකයින්ගේ අදහස්.",
      userFooter: "සියලු හිමිකම් ඇවිරිණි."
    }
  };

  const t = translations[language];

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      } overflow-hidden`}
      ref={scrollRef}
    >
      <Head>
        <title>CeylonMine | Digital Transformation in Mining Licensing</title>
        <meta
          name="description"
          content="CeylonMine is a digital platform that streamlines mining licensing processes and automates royalty calculations for sustainable mining practices in Sri Lanka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative z-10 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <ImageSlider />

          <div className="text-center mb-16 mt-16">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CeylonMine
            </motion.h1>
            <motion.p
              className={`text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto ${
                isDarkMode ? 'opacity-80' : 'opacity-90'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.heroSubtitle}
            </motion.p>
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <div
              className={`feature-slider relative h-96 md:h-[600px] ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-200'
              } rounded-lg overflow-hidden`}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`absolute inset-0 flex items-center ${
                    index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === activeSlide ? 1 : 0,
                    scale: index === activeSlide ? 1 : 0.9,
                    x: index === activeSlide
                      ? 0
                      : index < activeSlide
                      ? -100
                      : 100
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                        {feature.title}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl text-orange-500 mb-4">
                        {feature.subtitle}
                      </p>
                      <p
                        className={`text-base md:text-lg lg:text-xl mb-6 ${
                          isDarkMode ? 'opacity-80' : 'opacity-90'
                        }`}
                      >
                        {feature.description}
                      </p>
                      <div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors mr-4">
                          {t.discoverMore}
                        </button>
                        <button
                          className={`border ${
                            isDarkMode ? 'border-white' : 'border-gray-900'
                          } hover:border-orange-500 hover:text-orange-500 py-2 px-6 md:py-3 md:px-8 rounded-md text-base md:text-lg font-medium transition-colors`}
                        >
                          {t.explorePlatform}
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

              <button
                onClick={prevSlide}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode
                    ? 'bg-black bg-opacity-50'
                    : 'bg-white bg-opacity-50'
                } rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode
                    ? 'bg-black bg-opacity-50'
                    : 'bg-white bg-opacity-50'
                } rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeSlide
                        ? 'bg-orange-500'
                        : isDarkMode
                        ? 'bg-white bg-opacity-50'
                        : 'bg-gray-900 bg-opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.ourCommitment}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'opacity-80' : 'opacity-90'
              }`}
            >
              {t.commitmentText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.transparency,
                icon: "🔍",
                description:
                  "Real-time data and centralized systems ensure clear visibility across all operations."
              },
              {
                title: t.efficiency,
                icon: "⚙️",
                description:
                  "Streamlined processes reduce administrative burdens and improve regulatory compliance."
              },
              {
                title: t.sustainability,
                icon: "🌱",
                description:
                  "Empowering sustainable mining practices through innovative digital solutions."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-8 text-center ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.featuresHeading}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'opacity-80' : 'opacity-90'
              }`}
            >
              {t.featuresText}
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

      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.testimonialsHeading}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? 'opacity-80' : 'opacity-90'
              }`}
            >
              {t.testimonialsText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Industry Expert",
                role: "Mining Regulator",
                testimonial:
                  "CeylonMine has streamlined our licensing process, making monitoring and compliance more efficient than ever."
              },
              {
                name: "Tech Innovator",
                role: "Digital Transformation Lead",
                testimonial:
                  "The platform's automated royalty calculations ensure fairness and transparency, setting new industry standards."
              },
              {
                name: "Environmental Advocate",
                role: "Sustainability Consultant",
                testimonial:
                  "By integrating real-time data and GIS mapping, CeylonMine empowers sustainable mining practices that protect our environment."
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-8 text-center ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'opacity-80' : 'opacity-90'
                  }`}
                >
                  {testimonial.role}
                </p>
                <p
                  className={`mt-4 ${
                    isDarkMode ? 'opacity-80' : 'opacity-90'
                  }`}
                >
                  {testimonial.testimonial}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            &copy; {new Date().getFullYear()} CeylonMine. {t.userFooter}
          </p>
        </div>
      </footer>

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
    </div>
  );
}