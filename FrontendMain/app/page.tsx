// "use client"

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isVisible, setIsVisible] = useState({});
  
//   // Refs for sections
//   const featuresRef = useRef(null);
//   const testimonialRef = useRef(null);
//   const contactRef = useRef(null);
//   const discoverRef = useRef(null);
//   const categoryRef = useRef(null);
//   const guidesRef = useRef(null);
//   // NEW: Inspiration ref
//   const inspirationRef = useRef(null);

//   // Slider images
//   const sliderImages = [
//     "/api/placeholder/1920/800", // Replace with actual image paths
//     "/api/placeholder/1920/800",
//     "/api/placeholder/1920/800"
//   ];

//   // Auto-slider functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [sliderImages.length]);

//   // Intersection Observer for scroll animations
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.2,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
//         }
//       });
//     }, observerOptions);

//     // Add new section refs here
//     const elements = [
//       featuresRef.current,
//       testimonialRef.current,
//       contactRef.current,
//       discoverRef.current,
//       categoryRef.current,
//       guidesRef.current,
//       inspirationRef.current, // NEW: Inspiration section
//     ].filter(Boolean);

//     elements.forEach(el => {
//       if (el) observer.observe(el);
//     });

//     return () => {
//       elements.forEach(el => {
//         if (el) observer.unobserve(el);
//       });
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* Navigation */}
//       <nav className="bg-white shadow-md fixed w-full z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <span className="text-orange-500 font-bold text-2xl">Horizon</span>
//               </div>
//               <div className="hidden md:ml-10 md:flex md:space-x-8">
//                 <Link
//                   href="#"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="#features"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Features
//                 </Link>
//                 <Link
//                   href="#testimonials"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Testimonials
//                 </Link>
//                 <Link
//                   href="#discover"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Discover
//                 </Link>
//                 {/* NEW: Inspiration Link */}
//                 <Link
//                   href="#inspiration"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Inspiration
//                 </Link>
//                 <Link
//                   href="#contact"
//                   className="text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center">
//               <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition duration-300">
//                 Get Started
//               </button>
//             </div>
//             <div className="flex items-center md:hidden">
//               <button onClick={toggleMenu} className="text-gray-800">
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {isMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 href="#"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="#features"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Features
//               </Link>
//               <Link
//                 href="#testimonials"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Testimonials
//               </Link>
//               <Link
//                 href="#discover"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Discover
//               </Link>
//               {/* NEW: Inspiration Link in mobile menu */}
//               <Link
//                 href="#inspiration"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Inspiration
//               </Link>
//               <Link
//                 href="#contact"
//                 className="block text-gray-800 hover:text-orange-500 px-3 py-2 font-medium transition duration-300"
//               >
//                 Contact
//               </Link>
//               <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition duration-300">
//                 Get Started
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Full-width Image Slider */}
//       <div className="relative w-full h-screen">
//         {sliderImages.map((img, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               currentSlide === index ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
//             <div className="relative w-full h-full">
//               <img
//                 src={img}
//                 alt={`Slide ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         ))}
//         <div className="absolute inset-0 flex items-center justify-center z-1">
//           <div className="text-center text-white max-w-4xl px-4">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 transform transition-all duration-700 translate-y-0 opacity-100">
//               Create stunning experiences with
//               <span className="text-orange-500"> Horizon</span>
//             </h1>
//             <p className="text-xl mb-8 transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
//               Build beautiful, high-performance websites and applications with
//               our intuitive and powerful platform.
//             </p>
//             <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center transform transition-all duration-700 delay-500 translate-y-0 opacity-100">
//               <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition duration-300">
//                 Get Started
//               </button>
//               <button className="border border-white hover:border-orange-500 text-white hover:text-orange-500 px-8 py-3 rounded-full font-medium transition duration-300">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Slider navigation dots */}
//         <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
//           {sliderImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentSlide === index
//                   ? "bg-orange-500 w-6"
//                   : "bg-white bg-opacity-50"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Featured Destination Section (Thailand Inspired) */}
//       <div id="discover" ref={discoverRef} className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div
//               className={`transition duration-700 transform ${
//                 isVisible.discover ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
//               }`}
//             >
//               <div className="flex items-center space-x-2 mb-3">
//                 <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
//                   <svg
//                     className="h-3 w-3 text-gray-600"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-gray-600 text-sm">Thailand • North Island</span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Sand between
//                 <br />
//                 Your Toes
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Lorem ipsum is simply dummy text of the printing and typesetting
//                 industry. Lorem Ipsum has been the industry's standard dummy
//                 text ever since the 1500s.
//               </p>
//               <p className="text-gray-600 mb-6">
//                 It has survived not only five centuries, but also the leap into
//                 electronic typesetting, remaining essentially unchanged.
//               </p>
//               <div className="mt-8">
//                 <Link
//                   href="#"
//                   className="text-orange-500 font-medium hover:text-orange-600 transition duration-300 flex items-center"
//                 >
//                   Learn more
//                   <svg
//                     className="h-4 w-4 ml-1"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//             <div
//               className={`relative transition duration-700 transform ${
//                 isVisible.discover ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
//               }`}
//               style={{ transitionDelay: "200ms" }}
//             >
//               <div className="grid grid-cols-2 gap-4">
//                 <img
//                   src="/api/placeholder/600/500"
//                   alt="Tropical landscape"
//                   className="w-full h-full object-cover rounded-lg shadow-lg transform -rotate-2 hover:scale-105 transition duration-500"
//                 />
//                 <img
//                   src="/api/placeholder/600/400"
//                   alt="Beach sunset"
//                   className="w-full h-3/4 object-cover rounded-lg shadow-lg mt-12 transform rotate-3 hover:scale-105 transition duration-500"
//                 />
//               </div>
//               <div className="absolute -top-6 -right-6 bg-white text-gray-500 p-3 rounded-lg shadow-md text-sm">
//                 03 | History
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Discover by Interest Section (Dark theme) */}
//       <div className="bg-gray-900 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-white mb-2">
//               Discover Horizon by interest
//             </h2>
//             <div className="h-1 w-16 bg-orange-500"></div>
//           </div>

//           <div className="relative">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="relative overflow-hidden rounded-lg h-96 group">
//                 <div className="absolute inset-0 bg-black opacity-60 z-10 group-hover:opacity-50 transition duration-300"></div>
//                 <img
//                   src="/api/placeholder/800/600"
//                   alt="Lantern Festival"
//                   className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
//                 />
//                 <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
//                   <div className="flex items-center space-x-2 mb-3">
//                     <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center">
//                       <svg
//                         className="h-3 w-3 text-gray-400"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                         />
//                       </svg>
//                     </div>
//                     <span className="text-gray-300 text-sm">Thailand • Wat Pho</span>
//                   </div>
//                   <p className="text-white text-sm mb-6">
//                     Top choice Buddhist temple in Ko Rattanakosin & Thonburi
//                   </p>
//                 </div>
//               </div>

//               <div className="relative overflow-hidden rounded-lg h-96 group">
//                 <div className="absolute inset-0 bg-black opacity-60 z-10 group-hover:opacity-50 transition duration-300"></div>
//                 <img
//                   src="/api/placeholder/800/600"
//                   alt="Cultural Festival"
//                   className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
//                 />
//                 <div className="absolute top-8 right-8 flex space-x-2 z-20">
//                   <button className="h-10 w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-40 transition duration-300">
//                     <svg
//                       className="h-6 w-6 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
//                   <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-orange-50 transition duration-300">
//                     <svg
//                       className="h-6 w-6 text-gray-900"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Tiles Section */}
//       <div id="category" ref={categoryRef} className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
//             {[
//               {
//                 title: "Wedding and honeymoons",
//                 image: "/api/placeholder/600/400",
//                 location: "Top choice Buddhist temple in Ko Rattanakosin & Thonburi"
//               },
//               {
//                 title: "Wellness",
//                 image: "/api/placeholder/600/400",
//                 location: "Top choice Buddhist temple in Ko Rattanakosin & Thonburi"
//               },
//               {
//                 title: "Sports",
//                 image: "/api/placeholder/600/400",
//                 location: "Top choice Buddhist temple in Ko Rattanakosin & Thonburi"
//               }
//             ].map((category, index) => (
//               <div
//                 key={index}
//                 className={`relative overflow-hidden h-80 transition duration-700 transform ${
//                   isVisible.category
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-16 opacity-0"
//                 } hover:scale-105`}
//                 style={{ transitionDelay: `${index * 150}ms` }}
//               >
//                 <div className="absolute inset-0 bg-black opacity-60 z-10 hover:opacity-40 transition duration-300"></div>
//                 <img
//                   src={category.image}
//                   alt={category.title}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end">
//                   <h3 className="text-white text-xl font-medium mb-2">
//                     {category.title}
//                   </h3>
//                   <p className="text-white text-sm opacity-80">{category.location}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Travel Guides Section */}
//       <div id="guides" ref={guidesRef} className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             <div
//               className={`bg-orange-500 p-12 rounded-lg transition duration-700 transform ${
//                 isVisible.guides ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
//               }`}
//             >
//               <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
//                 Horizon
//                 <br />
//                 Travel Guides
//               </h2>
//               <div className="h-1 w-16 bg-white mb-6"></div>
//               <p className="text-white text-opacity-90 mb-8">
//                 Lorem ipsum is simply dummy text of the printing and
//                 typesetting industry. Lorem Ipsum has been the industry's
//                 standard dummy text ever since the 1500s.
//               </p>
//               <button className="bg-white text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition duration-300">
//                 BUYING GUIDES
//               </button>
//               <div className="text-white text-opacity-75 text-sm mt-6">
//                 Starting at €17.99
//               </div>
//             </div>

//             <div
//               className={`relative transition duration-700 transform ${
//                 isVisible.guides ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
//               }`}
//               style={{ transitionDelay: "200ms" }}
//             >
//               <img
//                 src="/api/placeholder/800/900"
//                 alt="Sunset fishing in Thailand"
//                 className="w-full h-full object-cover rounded-lg"
//               />
//               <div className="absolute right-12 top-1/4 transform -translate-y-1/2 rotate-90 origin-bottom-right">
//                 <div className="bg-orange-500 px-8 py-6 rounded-t-lg">
//                   <h3 className="text-white text-5xl font-bold whitespace-nowrap">
//                     Thailand
//                   </h3>
//                 </div>
//               </div>
//               <div className="absolute left-12 bottom-12 bg-orange-500 px-4 py-2 rounded-lg flex items-center space-x-2">
//                 <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
//                   <svg
//                     className="h-3 w-3 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                   </svg>
//                 </div>
//                 <span className="text-white text-sm">Travel Guides</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NEW INSPIRATION SECTION */}
//       <div id="inspiration" ref={inspirationRef} className="py-20 bg-orange-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 transition duration-700 transform ${
//               isVisible.inspiration ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
//             }`}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Inspiration &amp; Culture
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Dive deeper into the rich heritage, hidden gems, and cultural wonders that shape your travel experience.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Traditions",
//                 description:
//                   "Explore ancient customs, vibrant festivals, and local crafts that stand the test of time.",
//                 img: "/api/placeholder/600/600"
//               },
//               {
//                 title: "Local Cuisines",
//                 description:
//                   "Savor the authentic flavors and culinary delights unique to each region.",
//                 img: "/api/placeholder/600/600"
//               },
//               {
//                 title: "Art & Heritage",
//                 description:
//                   "Witness breathtaking temples, historic landmarks, and timeless art forms.",
//                 img: "/api/placeholder/600/600"
//               }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className={`relative rounded-xl overflow-hidden shadow-md group transition duration-700 transform ${
//                   isVisible.inspiration ? "opacity-100 scale-100" : "opacity-0 scale-95"
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="absolute inset-0 bg-black bg-opacity-40 z-10 group-hover:bg-opacity-30 transition duration-300"></div>
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-full h-72 object-cover group-hover:scale-105 transition duration-700"
//                 />
//                 <div className="absolute bottom-0 p-6 z-20 text-white">
//                   <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                   <p className="text-sm text-white text-opacity-90">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* END NEW SECTION */}

//       {/* Original Orange Lines in the Middle (Divider) */}
//       <div className="relative py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="absolute top-0 left-1/4 w-0.5 h-full bg-orange-500 opacity-20"></div>
//           <div className="absolute top-0 left-2/4 w-0.5 h-full bg-orange-500 opacity-50"></div>
//           <div className="absolute top-0 left-3/4 w-0.5 h-full bg-orange-500 opacity-20"></div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Why Choose <span className="text-orange-500">Horizon</span>?
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 Our platform combines cutting-edge technology with intuitive
//                 design to create the most powerful web development experience.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//                     1
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-xl font-medium text-gray-900">
//                       Unmatched Performance
//                     </h3>
//                     <p className="mt-1 text-gray-600">
//                       Blazing fast load times and optimized user experiences.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//                     2
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-xl font-medium text-gray-900">
//                       Intuitive Design Tools
//                     </h3>
//                     <p className="mt-1 text-gray-600">
//                       Create stunning designs without writing a single line of
//                       code.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//                     3
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-xl font-medium text-gray-900">
//                       Enterprise-grade Security
//                     </h3>
//                     <p className="mt-1 text-gray-600">
//                       Keep your data and your customers' information safe.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <div className="absolute inset-0 bg-orange-100 rounded-xl transform rotate-3"></div>
//               <div className="absolute inset-0 bg-orange-500 opacity-10 rounded-xl transform -rotate-3"></div>
//               <div className="relative bg-white shadow-lg rounded-xl p-6">
//                 <div className="text-center">
//                   <div className="text-orange-500 text-5xl font-bold mb-2">
//                     83%
//                   </div>
//                   <p className="text-gray-600 mb-6">
//                     Increase in conversion rates
//                   </p>
//                   <div className="h-1 w-full bg-gray-200 rounded">
//                     <div
//                       className="h-1 w-4/5 bg-orange-500 rounded"
//                       style={{ width: "83%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" ref={featuresRef} className="py-16 bg-orange-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Powerful Features
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Everything you need to create amazing digital experiences.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Responsive Design",
//                 description:
//                   "Build websites that look stunning on any device with our responsive framework.",
//                 icon: (
//                   <svg
//                     className="h-10 w-10 text-orange-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 )
//               },
//               {
//                 title: "Performance Optimized",
//                 description:
//                   "Lightning-fast load times and seamless interactions for the best user experience.",
//                 icon: (
//                   <svg
//                     className="h-10 w-10 text-orange-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 10V3L4 14h7v7l9-11h-7z"
//                     />
//                   </svg>
//                 )
//               },
//               {
//                 title: "Advanced Analytics",
//                 description:
//                   "Gain valuable insights into your visitors' behavior with detailed analytics.",
//                 icon: (
//                   <svg
//                     className="h-10 w-10 text-orange-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                     />
//                   </svg>
//                 )
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className={`bg-white rounded-xl shadow-md p-6 transition duration-700 transform ${
//                   isVisible.features
//                     ? "translate-y-0 opacity-100 rotate-0"
//                     : "translate-y-16 opacity-0 rotate-3"
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div id="testimonials" ref={testimonialRef} className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Hear from our satisfied customers who have transformed their
//               digital presence with Horizon.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "John Doe",
//                 role: "CEO, TechCorp",
//                 testimonial:
//                   "Horizon has completely transformed our online presence. The platform is intuitive and powerful, and the results speak for themselves.",
//                 image: "/api/placeholder/100/100"
//               },
//               {
//                 name: "Jane Smith",
//                 role: "Marketing Director, Innovate Inc.",
//                 testimonial:
//                   "The performance optimization features are a game-changer. Our website loads faster than ever, and our conversion rates have skyrocketed.",
//                 image: "/api/placeholder/100/100"
//               },
//               {
//                 name: "Michael Brown",
//                 role: "Founder, Creative Solutions",
//                 testimonial:
//                   "The design tools are so easy to use, yet they produce professional-grade results. Horizon has made web development a breeze.",
//                 image: "/api/placeholder/100/100"
//               }
//             ].map((testimonial, index) => (
//               <div
//                 key={index}
//                 className={`bg-white rounded-xl shadow-md p-6 transition duration-700 transform ${
//                   isVisible.testimonials
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-16 opacity-0"
//                 }`}
//                 style={{ transitionDelay: `${index * 200}ms` }}
//               >
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                   <div className="ml-4">
//                     <h3 className="text-lg font-bold text-gray-900">
//                       {testimonial.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600">{testimonial.testimonial}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div id="contact" ref={contactRef} className="py-20 bg-orange-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We'd love to hear from you! Reach out to us for any inquiries or
//               to get started with Horizon.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows="4"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition duration-300"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <span className="text-orange-500 font-bold text-2xl">Horizon</span>
//               <p className="text-gray-400 mt-4">
//                 Creating stunning digital experiences with Horizon.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-orange-500">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#features"
//                     className="text-gray-400 hover:text-orange-500"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#testimonials"
//                     className="text-gray-400 hover:text-orange-500"
//                   >
//                     Testimonials
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#contact"
//                     className="text-gray-400 hover:text-orange-500"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-orange-500">
//                     Documentation
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-orange-500">
//                     Tutorials
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-orange-500">
//                     API Reference
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-orange-500">
//                     Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-bold mb-4">Follow Us</h3>
//               <div className="flex space-x-4">
//                 <Link href="#" className="text-gray-400 hover:text-orange-500">
//                   <svg
//                     className="h-6 w-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-orange-500">
//                   <svg
//                     className="h-6 w-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-orange-500">
//                   <svg
//                     className="h-6 w-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 border-t border-gray-800 pt-8 text-center">
//             <p className="text-gray-400">
//               &copy; 2023 Horizon. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Navbar from "./navbar/page";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Hero slider images
  const heroImages = [
    {
      src: "/images/1.jpg",
      alt: "Hero Slide 1",
    },
    {
      src: "/images/8.jpg",
      alt: "Hero Slide 2",
    },
    {
      src: "/images/9.jpg",
      alt: "Hero Slide 3",
    },
  ];

  // Features array (feature slider)
  const features = [
    {
      id: 1,
      title: "DIGITAL LICENSING",
      subtitle: "Streamlined Applications",
      description:
        "Centralize your mining license applications with CeylonMine for efficient processing and transparent oversight.",
      image: "/images/13.jpg",
    },
    {
      id: 2,
      title: "AUTOMATED ROYALTY CALCULATION",
      subtitle: "Transparent & Fair",
      description:
        "Leverage real-time data to ensure accurate and fair royalty computations, reducing manual errors and administrative burdens.",
      image: "/images/8.jpg",
    },
    {
      id: 3,
      title: "SUSTAINABLE MINING OVERSIGHT",
      subtitle: "Environmental Stewardship",
      description:
        "Monitor mining activities with integrated GIS mapping, educational resources, and AI-powered support to promote sustainable practices.",
      image: "/images/9.jpg",
    },
  ];

  // Language translations
  const translations = {
    en: {
      heroSubtitle:
        "Streamlining mining licensing and royalty calculation to promote transparency and sustainability in Sri Lanka.",
      discoverMore: "Discover More",
      explorePlatform: "Explore Platform",
      ourCommitment: "OUR COMMITMENT",
      commitmentText:
        "CeylonMine is dedicated to transforming mining processes through digital innovation, ensuring transparency, efficiency, and sustainable practices.",
      transparency: "TRANSPARENCY",
      efficiency: "EFFICIENCY",
      sustainability: "SUSTAINABILITY",
      featuresHeading: "OUR PLATFORM IN ACTION",
      featuresText:
        "Experience the seamless integration of digital licensing, automated royalty calculation, and sustainable mining oversight with CeylonMine.",
      testimonialsHeading: "WHAT OUR USERS SAY",
      testimonialsText:
        "Hear from industry professionals and stakeholders who have embraced the digital revolution with CeylonMine.",
      userFooter: "All rights reserved.",
    },
    si: {
      heroSubtitle:
        "ශ්‍රී ලංකාවේ läbima නීතිකරණ සහ සිදුරු ගණනය කිරීම ක්‍රියාත්මක කිරීමට විනිවිද පෙනෙනභාවය හා ස්ථාවරතාවය ඉහළ නංවා ගැනීම.",
      discoverMore: "තව දුරටත් සොයා බලන්න",
      explorePlatform: "වේදිකාව සොයා බලන්න",
      ourCommitment: "අපගේ කැපවීම",
      commitmentText:
        "CeylonMine නවීන දීප්තිමත් තාක්ෂණය ඔස්සේ පතල් ක්‍රියාකාරකම් පරිවර්තනය කරමින් විනිවිද පෙනෙනභාවය, දක්ෂතාවය, හා ස්ථාවරතාවය තහවුරු කරයි.",
      transparency: "විනිවිද පෙනෙනභාවය",
      efficiency: "දක්ෂතාවය",
      sustainability: "ස්ථාවරතාවය",
      featuresHeading: "අපගේ වේදිකාව ක්‍රියාකාරීව",
      featuresText:
        "ඉතා ස්ථාවර දත්ත හා ස්වයංක්‍රීය රෝයල්ටි ගණනයක් සමඟ නීතිකරණ ක්‍රියාවලිය ස්වයංක්‍රීය කිරීමෙන් ඔබට අත්දැකීම් ලබා දෙන්න.",
      testimonialsHeading: "අපගේ පරිශීලකයින්ගේ අදහස්",
      testimonialsText:
        "CeylonMine සමඟ ඩිජිටල් විප්ලවය පිළිගෙන ඇති සංවිධානාත්මක වෘත්තිකයින්ගේ අදහස්.",
      userFooter: "සියලු හිමිකම් ඇවිරිණි.",
    },
  };

  const t = translations[language];

  // Theme & language effects
  useEffect(() => {
    const handleThemeChange = (event: any) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("languageChange", handleLanguageChange);

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    const savedLang = localStorage.getItem("language");
    if (savedLang === "si") {
      setLanguage("si");
    } else {
      setLanguage("en");
    }

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  // Framer Motion scroll
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Three.js "sand" effect
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
    // Adjust particle count to your preference
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: isDarkMode ? 0xd2b48c : 0xffd700,
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
    document.addEventListener("mousemove", onDocumentMouseMove);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      // Slowed rotation speed
      particlesMesh.rotation.x += 0.0002 + mouseY * 0.0002;
      particlesMesh.rotation.y += 0.0002 + mouseX * 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    const updateParticleColor = () => {
      particlesMaterial.color.set(isDarkMode ? 0xd2b48c : 0xffd700);
    };

    const themeChangeListener = () => {
      updateParticleColor();
    };
    window.addEventListener("themeChange", themeChangeListener);

    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("themeChange", themeChangeListener);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Feature slider controls
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  // Hero slider controls
  const nextHeroSlide = () => {
    setActiveHeroSlide((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevHeroSlide = () => {
    setActiveHeroSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode
          ? "bg-black text-white"
          : // Updated light theme color for a warmer tone
            "bg-[#fdf4eb] text-gray-900"
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

      {/* Navbar */}
      <Navbar />

      {/* Three.js background canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />

      {/* HERO SLIDER */}
      <section className="relative z-10 pt-20">
        <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeHeroSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeHeroSlide ? 1 : 0 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}

          {/* Overlay text */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center text-center p-4">
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
                isDarkMode ? "opacity-80" : "opacity-90"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.heroSubtitle}
            </motion.p>
          </div>

          {/* Hero Slider Buttons */}
          <button
            onClick={prevHeroSlide}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              isDarkMode
                ? "bg-black bg-opacity-50"
                : "bg-white bg-opacity-50"
            } rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
            aria-label="Previous hero slide"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
            onClick={nextHeroSlide}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
              isDarkMode
                ? "bg-black bg-opacity-50"
                : "bg-white bg-opacity-50"
            } rounded-full p-2 z-20 hover:bg-opacity-70 transition-all`}
            aria-label="Next hero slide"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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

          {/* Hero Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveHeroSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeHeroSlide
                    ? "bg-orange-500"
                    : isDarkMode
                    ? "bg-white bg-opacity-50"
                    : "bg-gray-800 bg-opacity-50"
                }`}
                aria-label={`Go to hero slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SLIDER */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg">
            <div
              className={`feature-slider relative h-96 md:h-[600px] ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
              } rounded-lg overflow-hidden`}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`absolute inset-0 flex items-center ${
                    index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === activeSlide ? 1 : 0,
                    scale: index === activeSlide ? 1 : 0.9,
                    x:
                      index === activeSlide
                        ? 0
                        : index < activeSlide
                        ? -100
                        : 100,
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
                          isDarkMode ? "opacity-80" : "opacity-90"
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
                            isDarkMode ? "border-white" : "border-gray-900"
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
                    ? "bg-black bg-opacity-50"
                    : "bg-white bg-opacity-70"
                } rounded-full p-2 z-20 hover:bg-opacity-80 transition-all`}
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
                    ? "bg-black bg-opacity-50"
                    : "bg-white bg-opacity-70"
                } rounded-full p-2 z-20 hover:bg-opacity-80 transition-all`}
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
                        ? "bg-orange-500"
                        : isDarkMode
                        ? "bg-white bg-opacity-50"
                        : "bg-gray-900 bg-opacity-50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? "bg-gray-900 bg-opacity-50" : "bg-[#f8f4ee]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.ourCommitment}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? "opacity-80" : "opacity-90"
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
                  "Real-time data and centralized systems ensure clear visibility across all operations.",
              },
              {
                title: t.efficiency,
                icon: "⚙️",
                description:
                  "Streamlined processes reduce administrative burdens and improve regulatory compliance.",
              },
              {
                title: t.sustainability,
                icon: "🌱",
                description:
                  "Empowering sustainable mining practices through innovative digital solutions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-8 text-center ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "opacity-80" : "opacity-90"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PLATFORM IN ACTION */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.featuresHeading}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? "opacity-80" : "opacity-90"
              }`}
            >
              {t.featuresText}
            </p>
          </div>

          {/* Example: Two simpler blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden relative">
              <Image
                src="/images/1.jpg"
                alt="Platform Snapshot 1"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Digital Licensing
              </h3>
              <p
                className={`text-base md:text-lg ${
                  isDarkMode ? "opacity-80" : "opacity-90"
                }`}
              >
                Simplify your licensing process with our centralized system,
                offering real-time status updates and streamlined applications.
              </p>
              <Link
                href="#"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-base md:text-lg font-medium transition-colors"
              >
                {t.discoverMore}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="flex flex-col justify-center order-2 md:order-1 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                Automated Royalty Calculation
              </h3>
              <p
                className={`text-base md:text-lg ${
                  isDarkMode ? "opacity-80" : "opacity-90"
                }`}
              >
                Harness real-time data for accurate and fair royalty
                computations, reducing errors and administrative overhead.
              </p>
              <Link
                href="#"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-base md:text-lg font-medium transition-colors"
              >
                {t.discoverMore}
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden relative order-1 md:order-2">
              <Image
                src="/images/9.jpg"
                alt="Platform Snapshot 2"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SECTION (Inspired by your screenshot) */}
      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? "bg-gray-800" : "bg-[#fff4ec]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Left side image or collage */}
            <div className="relative h-80 md:h-auto rounded-lg overflow-hidden">
              <Image
                src="/images/monks.jpg"
                alt="Local Tradition"
                fill
                className="object-cover"
              />
            </div>
            {/* Right side text */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold">
                Sand between Your Toes
              </h2>
              <p
                className={`text-base md:text-lg ${
                  isDarkMode ? "opacity-80" : "opacity-90"
                }`}
              >
                Immerse yourself in a world of cultural richness, natural
                beauty, and sustainable progress. Explore how our platform
                integrates local traditions with modern solutions.
              </p>
              <Link
                href="#"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-base md:text-lg font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Another row of images/features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden relative">
              <Image
                src="/images/wellness.jpg"
                alt="Wellness"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-30 flex items-end p-4`}
              >
                <h3 className="text-white text-xl font-semibold">Wellness</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative">
              <Image
                src="/images/golf.jpg"
                alt="Golf"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-30 flex items-end p-4`}
              >
                <h3 className="text-white text-xl font-semibold">Golf</h3>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden relative">
              <Image
                src="/images/fisherman.jpg"
                alt="Local Fisherman"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-30 flex items-end p-4`}
              >
                <h3 className="text-white text-xl font-semibold">
                  Local Heritage
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? "bg-gray-900 bg-opacity-50" : "bg-[#f8f4ee]"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.testimonialsHeading}
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl max-w-3xl mx-auto ${
                isDarkMode ? "opacity-80" : "opacity-90"
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
                  "CeylonMine has streamlined our licensing process, making monitoring and compliance more efficient than ever.",
              },
              {
                name: "Tech Innovator",
                role: "Digital Transformation Lead",
                testimonial:
                  "The platform's automated royalty calculations ensure fairness and transparency, setting new industry standards.",
              },
              {
                name: "Environmental Advocate",
                role: "Sustainability Consultant",
                testimonial:
                  "By integrating real-time data and GIS mapping, CeylonMine empowers sustainable mining practices that protect our environment.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-8 text-center ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                } shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "opacity-80" : "opacity-90"
                  }`}
                >
                  {testimonial.role}
                </p>
                <p
                  className={`mt-4 ${
                    isDarkMode ? "opacity-80" : "opacity-90"
                  }`}
                >
                  {testimonial.testimonial}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section
        className={`relative z-10 py-16 ${
          isDarkMode ? "bg-gray-800" : "bg-orange-100"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p
            className={`text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 ${
              isDarkMode ? "opacity-80" : "opacity-90"
            }`}
          >
            Join us on our mission to revolutionize the mining industry through
            transparency, efficiency, and sustainability. Let’s build a brighter
            future together.
          </p>
          <Link
            href="#"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md text-base md:text-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`relative z-10 py-8 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-200"
            }`}
          >
            &copy; {new Date().getFullYear()} CeylonMine. {t.userFooter}
          </p>
        </div>
      </footer>
    </div>
  );
}