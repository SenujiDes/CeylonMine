
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Navbar from "./navbar/page";
// import Link from "next/link";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Stars, PerspectiveCamera, Sphere, OrbitControls } from "@react-three/drei";

// const images = [
//   "/images/1.jpg",
//   "/images/2.jpg",
//   "/images/3.jpg",
//   "/images/4.jpg"
// ];

// // Enhanced 3D Hand-Responsive Image Component
// function Image3D({ img, index, activeIndex }) {
//   const meshRef = useRef();
//   const isActive = index === activeIndex;

//   useFrame(({ mouse }) => {
//     if (meshRef.current) {
//       meshRef.current.position.x = isActive ? mouse.x * 0.3 : 0;
//       meshRef.current.position.y = isActive ? mouse.y * 0.3 : 0;
//       meshRef.current.rotation.y = isActive ? mouse.x * 0.05 : 0;
//       meshRef.current.rotation.x = isActive ? mouse.y * 0.05 : 0;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={[0, 0, isActive ? 0 : -3]}>
//       <planeGeometry args={[16, 9]} />
//       <meshBasicMaterial>
//         <canvasTexture attach="map" image={img} />
//       </meshBasicMaterial>
//     </mesh>
//   );
// }

// export default function Home() {
//   const [index, setIndex] = useState(0);
//   const heroRef = useRef(null);
//   const imagesRef = useRef([]);

//   useEffect(() => {
//     imagesRef.current = images.map(src => {
//       const img = new Image();
//       img.src = src;
//       return img;
//     });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2500); // Faster transitions
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen w-screen overflow-x-hidden">
//       <Navbar />
//       {/* Hero Section */}
//       <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
//         {/* Background Image with Smooth Transitions */}
//         <div className="absolute inset-0 w-full h-full transition-all duration-800 ease-out">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt={`Slide ${i + 1}`}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ${
//                 i === index ? "opacity-100 scale-110" : "opacity-0"
//               }`}
//             />
//           ))}
//         </div>

//         {/* 3D Parallax Effect with Animated Sphere */}
//         <Canvas className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={70} />
//           <Stars radius={100} depth={50} count={500} factor={4} fade speed={1.5} />
//           <ambientLight intensity={1.2} />
//           <OrbitControls enableZoom={false} />
//           <Sphere args={[1, 32, 32]} position={[0, 2, -5]}>
//             <meshStandardMaterial color="gold" emissive="gold" emissiveIntensity={0.5} />
//           </Sphere>
//           {images.map((img, i) => (
//             <Image3D key={i} img={imagesRef.current[i]} index={i} activeIndex={index} />
//           ))}
//         </Canvas>

//         {/* Overlay Text */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
//           <h1 className="text-7xl font-bold text-amber-400 drop-shadow-2xl tracking-wide">
//             Ceylon Mine
//           </h1>
//           <p className="text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
//             Revolutionizing <span className="text-amber-500">Mining Technology</span> for a Sustainable Future.
//           </p>
//           <Link
//             href="#features"
//             className="mt-8 inline-block px-10 py-4 text-lg font-semibold text-black bg-amber-400 rounded-2xl hover:bg-amber-500 transition-all duration-300 ease-in-out shadow-2xl"
//           >
//             Explore Features
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar/page";
import Link from "next/link";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const imagePaths = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/3.jpg"
];

// 3D Rotating Image Component with Enhanced Animation
function Image3D({ texture, position, rotationSpeed }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = time * rotationSpeed;
      meshRef.current.rotation.x = Math.sin(time * 0.6) * 0.3;
      meshRef.current.position.z = Math.sin(time * 0.5) * 1.5; // Adding slight movement in Z-axis for better depth
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[10, 6]} /> {/* Increased size for better visibility */}
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function Home() {
  const textures = useLoader(THREE.TextureLoader, imagePaths);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-black">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <Canvas className="absolute top-0 left-0 w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={75} />
          <Stars radius={120} depth={60} count={700} factor={4} fade speed={2} />
          <ambientLight intensity={1.5} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />

          {textures.map((texture, i) => (
            <Image3D
              key={i}
              texture={texture}
              position={[
                Math.sin((i / textures.length) * Math.PI * 2) * 9,
                Math.cos((i / textures.length) * Math.PI * 2) * 6,
                -3
              ]}
              rotationSpeed={0.4 + i * 0.08}
            />
          ))}
        </Canvas>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-7xl font-bold text-gold drop-shadow-2xl tracking-wide">
            Ceylon Mine
          </h1>
          <p className="text-2xl text-gray-200 mt-4 max-w-2xl mx-auto">
            Revolutionizing <span className="text-gold">Mining Technology</span> for a Sustainable Future.
          </p>
          <Link
            href="#features"
            className="mt-8 inline-block px-14 py-6 text-lg font-semibold text-black bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:scale-105 transition-all duration-300 ease-in-out shadow-2xl"
          >
            Discover More
          </Link>
        </div>
      </div>
    </div>
  );
}
