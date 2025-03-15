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
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const modelRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);

  // Hero slider images with enhanced content
  const heroImages = [
    {
      src: "/images/1.jpg",
      alt: "Hero Slide 1",
      title: "Digital Transformation",
      subtitle: "Revolutionizing mining licensing in Sri Lanka",
    },
    {
      src: "/images/8.jpg",
      alt: "Hero Slide 2",
      title: "Sustainable Mining",
      subtitle: "Promoting environmental responsibility through technology",
    },
    {
      src: "/images/9.jpg",
      alt: "Hero Slide 3",
      title: "Regulatory Excellence",
      subtitle: "Setting new standards for compliance and efficiency",
    },
    {
      src: "/images/miners.jpg",
      alt: "Hero Slide 4",
      title: "Community Empowerment",
      subtitle: "Supporting local communities through responsible mining practices",
    },
    {
      src: "/images/tech-mining.jpg",
      alt: "Hero Slide 5",
      title: "Advanced Analytics",
      subtitle: "Data-driven insights for better decision making",
    },
  ];

  // Enhanced features array (feature slider)
  const features = [
    {
      id: 1,
      title: "DIGITAL LICENSING",
      subtitle: "Streamlined Applications",
      description:
        "Centralize your mining license applications with CeylonMine for efficient processing and transparent oversight.",
      image: "/images/13.jpg",
      icon: "📱",
    },
    {
      id: 2,
      title: "AUTOMATED ROYALTY CALCULATION",
      subtitle: "Transparent & Fair",
      description:
        "Leverage real-time data to ensure accurate and fair royalty computations, reducing manual errors and administrative burdens.",
      image: "/images/8.jpg",
      icon: "💰",
    },
    {
      id: 3,
      title: "SUSTAINABLE MINING OVERSIGHT",
      subtitle: "Environmental Stewardship",
      description:
        "Monitor mining activities with integrated GIS mapping, educational resources, and AI-powered support to promote sustainable practices.",
      image: "/images/9.jpg",
      icon: "🌿",
    },
    {
      id: 4,
      title: "COMMUNITY ENGAGEMENT",
      subtitle: "Local Empowerment",
      description:
        "Foster transparent communication between mining operations and local communities through our integrated feedback and reporting system.",
      image: "/images/community.jpg",
      icon: "👥",
    },
    {
      id: 5,
      title: "DATA ANALYTICS DASHBOARD",
      subtitle: "Actionable Insights",
      description:
        "Access comprehensive analytics on mining activities, environmental impact, and regulatory compliance through our intuitive dashboard.",
      image: "/images/analytics.jpg",
      icon: "📊",
    },
  ];

  // New 3D Features
  const newFeatures = [
    {
      id: 6,
      title: "REAL-TIME ANALYTICS",
      subtitle: "Data-Driven Decisions",
      description:
        "Get real-time insights into mining operations, environmental impact, and compliance metrics with our advanced analytics dashboard.",
      icon: "📈",
      color: "#FF6B6B",
    },
    {
      id: 7,
      title: "ENVIRONMENTAL MONITORING",
      subtitle: "Sustainable Practices",
      description:
        "Track environmental metrics in real-time, including air quality, water usage, and carbon emissions, to ensure sustainable mining practices.",
      icon: "🌍",
      color: "#4ECDC4",
    },
    {
      id: 8,
      title: "COMMUNITY ENGAGEMENT",
      subtitle: "Empowering Local Communities",
      description:
        "Engage with local communities through transparent communication, feedback systems, and community development programs.",
      icon: "👥",
      color: "#FFE66D",
    },
  ];

  // Additional Features
  const additionalFeatures = [
    {
      id: 9,
      title: "AUTOMATED REPORTING",
      subtitle: "Efficient Documentation",
      description:
        "Generate automated reports for compliance, environmental impact, and operational efficiency with just a few clicks.",
      icon: "📄",
      color: "#6B5B95",
    },
    {
      id: 10,
      title: "MOBILE ACCESS",
      subtitle: "On-the-Go Management",
      description:
        "Access all platform features from your mobile device, ensuring you stay connected and in control wherever you are.",
      icon: "📱",
      color: "#F7CAC9",
    },
    {
      id: 11,
      title: "AI-POWERED INSIGHTS",
      subtitle: "Smart Decision Making",
      description:
        "Leverage AI-driven insights to optimize mining operations, reduce costs, and improve sustainability.",
      icon: "🤖",
      color: "#92A8D1",
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
      featuresHeading: "OUR PLATFORM IN ACTION",
      featuresText:
        "Experience the seamless integration of digital licensing, automated royalty calculation, and sustainable mining oversight with CeylonMine.",
      testimonialsHeading: "WHAT OUR USERS SAY",
      testimonialsText:
        "Hear from industry professionals and stakeholders who have embraced the digital revolution with CeylonMine.",
      userFooter: "All rights reserved.",
      digitalLicensing: "Digital Licensing",
      licensingDescription:
        "Simplify your licensing process with our centralized system, offering real-time status updates and streamlined applications.",
      automatedRoyalty: "Automated Royalty Calculation",
      royaltyDescription:
        "Harness real-time data for accurate and fair royalty computations, reducing errors and administrative overhead.",
      additionalFeatures: "Key Features",
      readyNextStep: "Ready to Take the Next Step?",
      joinMission:
        "Join us on our mission to revolutionize the mining industry through transparency, efficiency, and sustainability. Let's build a brighter future together.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      caseStudies: "Case Studies",
      exploreAll: "Explore All Features",
      supportCenter: "Support Center",
      sustainabilityHeading: "Sustainability",
      sustainabilityText:
        "Our commitment to sustainable mining practices ensures a greener future for all.",
      communityImpactHeading: "Community Impact",
      communityImpactText:
        "We empower local communities through education, employment, and health initiatives.",
    },
    si: {
      heroSubtitle:
        "ශ්‍රී ලංකාවේ පතල් කැණීම් බලපත්‍ර ක්‍රියාවලිය සහ රාජකීය ගණනය කිරීම් ක්‍රමවත් කිරීම.",
      discoverMore: "තව දුරටත් සොයා බලන්න",
      explorePlatform: "වේදිකාව සොයා බලන්න",
      ourCommitment: "අපගේ කැපවීම",
      commitmentText:
        "CeylonMine ඩිජිටල් නවෝත්පාදන හරහා පතල් ක්‍රියාවලිය පරිවර්තනය කරයි, විනිවිදභාවය, කාර්යක්ෂමතාව සහ තිරසාර භාවය තහවුරු කරයි.",
      featuresHeading: "අපගේ වේදිකාව ක්‍රියාකාරීව",
      featuresText:
        "CeylonMine සමඟ ඩිජිටල් බලපත්‍ර ක්‍රියාවලිය, ස්වයංක්‍රීය රාජකීය ගණනය කිරීම් සහ තිරසාර පතල් කැණීම් අධීක්ෂණය අත්දැකීම් කරන්න.",
      testimonialsHeading: "අපගේ පරිශීලකයින්ගේ අදහස්",
      testimonialsText:
        "CeylonMine සමඟ ඩිජිටල් විප්ලවය පිළිගෙන ඇති කර්මාන්ත වෘත්තිකයින්ගේ අදහස්.",
      userFooter: "සියලු හිමිකම් ඇවිරිණි.",
      digitalLicensing: "ඩිජිටල් බලපත්‍ර නිකුත් කිරීම",
      licensingDescription:
        "අපගේ මධ්‍යගත පද්ධතිය සමඟ ඔබේ බලපත්‍ර ක්‍රියාවලිය සරල කරන්න, සත්‍ය කාලීන තත්ත්ව යාවත්කාලීන කිරීම් සහ ක්‍රමවත් අයදුම්පත් ලබා දෙයි.",
      automatedRoyalty: "ස්වයංක්‍රීය රාජකීය ගණනය කිරීම",
      royaltyDescription:
        "නිවැරදි සහ සාධාරණ රාජකීය ගණනය කිරීම් සඳහා සත්‍ය-කාලීන දත්ත භාවිතා කරන්න, දෝෂ සහ පරිපාලන අධික වියදම් අඩු කරන්න.",
      additionalFeatures: "ප්‍රධාන විශේෂාංග",
      readyNextStep: "ඊළඟ පියවර ගැනීමට සූදානම්ද?",
      joinMission:
        "විනිවිදභාවය, කාර්යක්ෂමතාව සහ තිරසාරභාවය හරහා පතල් කර්මාන්තය විප්ලවකරණය කිරීමේ අපගේ මෙහෙවරට එක්වන්න. අපි එකට වඩාත් දීප්තිමත් අනාගතයක් ගොඩනගමු.",
      getStarted: "ආරම්භ කරන්න",
      learnMore: "තව දැනගන්න",
      caseStudies: "සිද්ධි අධ්‍යයන",
      exploreAll: "සියලු විශේෂාංග ගවේෂණය කරන්න",
      supportCenter: "සහාය මධ්‍යස්ථානය",
      sustainabilityHeading: "තිරසාරභාවය",
      sustainabilityText:
        "අපගේ තිරසාර පතල් කැණීම් පිළිවෙත් සියලු දෙනාටම හිතකර අනාගතයක් සහතික කරයි.",
      communityImpactHeading: "ප්‍රජා බලපෑම",
      communityImpactText:
        "අපි දේශීය ප්‍රජාවන් අධ්‍යාපනය, රැකියා සහ සෞඛ්‍ය උපක්‍රම හරහා බලගන්වමු.",
    },
  };

  const t = translations[language];

  // Theme & language effects
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    const handleLanguageChange = (event) => {
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

  // Autoplay for hero slider
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveHeroSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, heroImages.length]);

  // Framer Motion scroll effects
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.8, 1], [0, 1, 1, 1, 0]);

  // Reduced Three.js "sand" effect
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
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Reduced sand particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000; // Reduced from 5000
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Create colors array with golden/amber shades
    for (let i = 0; i < particlesCount; i++) {
      // Position
      posArray[i * 3] = (Math.random() - 0.5) * 5;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 5;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Colors - variations of gold/amber
      const goldTone = Math.random() * 0.2 + 0.8; // Range between 0.8 and 1.0
      colorArray[i * 3] = isDarkMode ? 0.82 * goldTone : 1.0 * goldTone; // R
      colorArray[i * 3 + 1] = isDarkMode ? 0.71 * goldTone : 0.84 * goldTone; // G
      colorArray[i * 3 + 2] = isDarkMode ? 0.55 * goldTone : 0.0; // B
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      vertexColors: true,
      transparent: true,
      opacity: 0.5, // Reduced opacity
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add ambient light to better illuminate the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffd700, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    camera.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    }
    document.addEventListener("mousemove", onDocumentMouseMove);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    // Animate with more complex movement
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth follow for mouse movement
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      // Add some gentle wave motion
      particlesMesh.rotation.x += 0.0005 + targetY * 0.02;
      particlesMesh.rotation.y += 0.0005 + targetX * 0.02;

      // Add subtle pulsing
      const pulseFactor = Math.sin(elapsedTime * 0.5) * 0.05 + 1;
      particlesMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const updateParticleColor = () => {
      const newColors = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const goldTone = Math.random() * 0.2 + 0.8; // Range between 0.8 and 1.0
        newColors[i * 3] = isDarkMode ? 0.82 * goldTone : 1.0 * goldTone; // R
        newColors[i * 3 + 1] = isDarkMode ? 0.71 * goldTone : 0.84 * goldTone; // G
        newColors[i * 3 + 2] = isDarkMode ? 0.55 * goldTone : 0.0; // B
      }
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(newColors, 3)
      );
      particlesGeometry.attributes.color.needsUpdate = true;
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
      scene.clear();
    };
  }, [isDarkMode]);

  // Feature slider controls with autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [features.length]);

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

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-[#fdf4eb] text-gray-900"
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

      {/* HERO SLIDER with enhanced transitions */}
      <section className="relative z-10 pt-20">
        <div
          className="w-full h-[85vh] md:h-[90vh] overflow-hidden relative"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <AnimatePresence>
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 ${
                  index === activeHeroSlide ? "z-10" : "z-0"
                }`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: index === activeHeroSlide ? 1 : 0,
                  scale: index === activeHeroSlide ? 1 : 1.1,
                }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Enhanced overlay text with motion effects */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-20">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CeylonMine
            </motion.h1>
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-orange-400">
                {heroImages[activeHeroSlide].title}
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/90">
                {heroImages[activeHeroSlide].subtitle}
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                {t.explorePlatform}
              </button>
              <button className="border-2 border-white hover:border-orange-400 hover:bg-white/10 text-white py-3 px-8 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105">
                {t.discoverMore}
              </button>
            </motion.div>
          </div>

          {/* Enhanced Hero Slider Controls */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20">
            <button
              onClick={prevHeroSlide}
              className="bg-white/20 backdrop-blur-md hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous hero slide"
            >
              <svg
                className="w-5 h-5"
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

            {/* Slide indicators */}
            <div className="flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveHeroSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeHeroSlide
                      ? "bg-orange-500 w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to hero slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextHeroSlide}
              className="bg-white/20 backdrop-blur-md hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next hero slide"
            >
              <svg
                className="w-5 h-5"
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
        </div>
      </section>

      {/* Floating 3D cube section */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <motion.div
                className="w-64 h-64 md:w-80 md:h-80 mx-auto relative"
                style={{
                  rotateX,
                  rotateY,
                  scale,
                  opacity,
                }}
              >
                {/* 3D Cube faces */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full transform-style-3d">
                    {/* Front face */}
                    <div
                      className={`absolute inset-0 transform translate-z-32 ${
                        isDarkMode ? "bg-orange-600/80" : "bg-orange-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateZ(8rem)",
                      }}
                    >
                      <span className="text-6xl">📱</span>
                    </div>
                    {/* Back face */}
                    <div
                      className={`absolute inset-0 transform -translate-z-32 rotate-y-180 ${
                        isDarkMode ? "bg-blue-600/80" : "bg-blue-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateZ(-8rem) rotateY(180deg)",
                      }}
                    >
                      <span className="text-6xl">💰</span>
                    </div>
                    {/* Left face */}
                    <div
                      className={`absolute inset-0 transform -translate-x-32 rotate-y-90 ${
                        isDarkMode ? "bg-green-600/80" : "bg-green-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateX(-8rem) rotateY(-90deg)",
                      }}
                    >
                      <span className="text-6xl">🌿</span>
                    </div>
                    {/* Right face */}
                    <div
                      className={`absolute inset-0 transform translate-x-32 rotate-y-90 ${
                        isDarkMode ? "bg-purple-600/80" : "bg-purple-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateX(8rem) rotateY(90deg)",
                      }}
                    >
                      <span className="text-6xl">📊</span>
                    </div>
                    {/* Top face */}
                    <div
                      className={`absolute inset-0 transform translate-y-32 rotate-x-90 ${
                        isDarkMode ? "bg-yellow-600/80" : "bg-yellow-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateY(-8rem) rotateX(90deg)",
                      }}
                    >
                      <span className="text-6xl">👥</span>
                    </div>
                    {/* Bottom face */}
                    <div
                      className={`absolute inset-0 transform -translate-y-32 rotate-x-90 ${
                        isDarkMode ? "bg-pink-600/80" : "bg-pink-500/80"
                      } rounded-lg flex items-center justify-center`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translateY(8rem) rotateX(-90deg)",
                      }}
                    >
                      <span className="text-6xl">✅</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content section */}
            <div className="text-center md:text-left">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t.ourCommitment}
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.commitmentText}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  {t.getStarted}
                </button>
                <button className="border-2 border-white hover:border-orange-400 hover:bg-white/10 text-white py-3 px-8 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105">
                  {t.learnMore}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Slider Section */}
      <section className="relative z-10 py-16 bg-black/10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t.featuresHeading}
          </motion.h2>
          <div className="relative">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`absolute inset-0 ${
                    index === activeSlide ? "z-10" : "z-0"
                  }`}
                  initial={{ opacity: 0, x: index > activeSlide ? 100 : -100 }}
                  animate={{
                    opacity: index === activeSlide ? 1 : 0,
                    x: index === activeSlide ? 0 : index > activeSlide ? 100 : -100,
                  }}
                  exit={{ opacity: 0, x: index > activeSlide ? 100 : -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-96">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg mb-4">{feature.subtitle}</p>
                      <p className="text-lg mb-8">{feature.description}</p>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        {t.learnMore}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Feature Slider Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-white/20 backdrop-blur-md hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous feature slide"
            >
              <svg
                className="w-5 h-5"
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
              className="bg-white/20 backdrop-blur-md hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next feature slide"
            >
              <svg
                className="w-5 h-5"
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
        </div>
      </section>

      {/* New 3D Features Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Advanced Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white/10 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg mb-4">{feature.subtitle}</p>
                <p className="text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="relative z-10 py-16 bg-black/10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            More Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white/10 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg mb-4">{feature.subtitle}</p>
                <p className="text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-black/20 text-center">
        <p className="text-sm">{t.userFooter}</p>
      </footer>
    </div>
  );
}