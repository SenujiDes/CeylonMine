
// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// export default function Hero() {
//   return (
//     <section className="min-h-screen relative bg-gray-900 flex items-center overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,rgba(17,24,39,0)_100%)]"></div>
//       </div>
      
//       <div className="container mx-auto px-6 relative z-10">
//         <div className="text-center">
//           <div className="relative mb-12 inline-block">
//             <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
//             <Image 
//               src="/teamimg/logo.jpg"
//               alt="Ceylon Mine Logo"
//               width={160}
//               height={160}
//               className="relative rounded-full border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
//             />
//           </div>
          
//           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
//               Ceylon Mine
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
//             Revolutionizing Mining Industry with Advanced Technology
//           </p>

//           <Link 
//             href="#features"
//             className="relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full group bg-gradient-to-r from-blue-600 to-purple-600"
//           >
//             <span className="absolute w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
//             <span className="relative text-white text-lg font-semibold">
//               Explore Features
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

//--------3d effect-------//
// "use client"; // ✅ Fix: Marks this as a Client Component

// import React from 'react';
// import Link from 'next/link';
// import { Canvas } from '@react-three/fiber'; // ✅ Ensure this import is correct
// import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// export default function Hero() {
//   return (
//     <section className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <div className="relative w-full h-[500px]">
//         {/* Three.js Canvas */}
//         <Canvas className="absolute top-0 left-0 w-full h-full">
//           <OrbitControls enableZoom={false} />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[2, 5, 2]} intensity={1} />
//           <Sphere args={[1, 100, 100]} scale={2.5}>
//             <MeshDistortMaterial
//               color="#2563EB"
//               attach="material"
//               distort={0.5}
//               speed={2}
//             />
//           </Sphere>
//         </Canvas>
//       </div>

//       {/* Text Content */}
//       <div className="absolute text-center">
//         <h1 className="text-6xl font-bold text-white">Ceylon Mine</h1>
//         <p className="text-xl text-gray-300 mt-4">
//           Revolutionizing Mining Industry with <span className="text-blue-400">Advanced Technology</span>
//         </p>

//         {/* CTA Button */}
//         <Link
//           href="#features"
//           className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
//         >
//           Explore Features
//         </Link>
//       </div>
//     </section>
//   );
// }

// //______________


// "use client";  // Ensures the component runs only on the client side

// import React from "react";
// import Link from "next/link";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// export default function Hero() {
//   return (
//     <section className="min-h-screen relative bg-gray-900 flex items-center overflow-hidden">
//       {/* 3D Background Scene */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 0, 3] }}>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[5, 5, 5]} />
//           <OrbitControls enableZoom={false} />
          
//           {/* Animated 3D Sphere */}
//           <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
//             <MeshDistortMaterial color="blue" attach="material" distort={0.5} speed={2} />
//           </Sphere>
//         </Canvas>
//       </div>

//       {/* Hero Content */}
//       <div className="container mx-auto px-6 relative z-10 text-center">
//         <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white">
//           Ceylon Mine
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
//           Revolutionizing Mining Industry with Advanced Technology
//         </p>

//         {/* Call to Action */}
//         <Link href="#features" className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold">
//           Explore Features
//         </Link>
//       </div>
//     </section>
//   );
// }


// -----buwa in 3d


// "use client";

// import React, { Suspense, useEffect } from "react";
// import Link from "next/link";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

// function MinerModel() {
//   const { scene, animations } = useGLTF("/models/worker.glb"); // Load the miner model
//   const { actions } = useAnimations(animations, scene);

//   useEffect(() => {
//     if (actions) {
//       const firstAction = Object.values(actions)[0]; // Safely get the first animation
//       if (firstAction) {
//         firstAction.play();
//       }
//     }
//   }, [actions]);

//   return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
// }

// export default function Hero() {
//   return (
//     <section className="min-h-screen relative bg-gray-900 flex items-center overflow-hidden py-20">
//       {/* 3D Background Scene */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 1, 5] }}>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[5, 5, 5]} />
//           <OrbitControls enableZoom={false} />
          
//           <Suspense fallback={null}>
//             {/* Miner Model */}
//             <MinerModel />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* Hero Content */}
//       <div className="container mx-auto px-6 relative z-10 text-center">
//         <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-12 text-white tracking-wide">
//           Ceylon Mine
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
//           Revolutionizing Mining Industry with Advanced Technology
//         </p>

//         {/* Call to Action */}
//         <Link href="#features" className="relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
//           Explore Features
//         </Link>
//       </div>
//     </section>
//   );
// }

//_________

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Torus, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Animated Main Sphere (Big, Smooth, Glowing)
const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.4; // Floating
      sphereRef.current.rotation.y += 0.003; // Slow rotation
    }
  });

  return (
    <Sphere ref={sphereRef} args={[2.5, 100, 100]} scale={3.5}>
      <MeshDistortMaterial
        color="#2563EB"
        attach="material"
        distort={0.65} // More fluid distortion
        speed={3.2} // Smoother motion
        roughness={0.15} // Glassy effect
        metalness={0.9} // Metallic shine
      />
    </Sphere>
  );
};

// Floating Animated Torus Rings
const AnimatedTorus = ({ position, scale, speed, color }) => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005 * speed;
      torusRef.current.rotation.y += 0.008 * speed;
    }
  });

  return (
    <Torus ref={torusRef} args={[3, 0.2, 32, 100]} position={position} scale={scale}>
      <MeshDistortMaterial color={color} distort={0.4} speed={2} metalness={1} roughness={0.2} />
    </Torus>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="relative w-full h-[700px]">
        {/* Three.js Canvas */}
        <Canvas className="absolute top-0 left-0 w-full h-full">
          <OrbitControls enableZoom={false} />
          
          {/* Ambient Space-Like Glow */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 7, 3]} intensity={1.5} color={"#2563EB"} />
          <pointLight position={[0, 6, 4]} intensity={3} color={"#2563EB"} />
          <spotLight position={[-5, 7, 6]} intensity={1.8} angle={0.4} penumbra={0.7} color={"#4F46E5"} />

          {/* Background Stars */}
          <Stars radius={50} depth={50} count={200} factor={4} saturation={0} fade speed={1} />

          {/* 3D Objects */}
          <AnimatedSphere />
          <AnimatedTorus position={[0, 0, -3]} scale={3} speed={1} color={"#1D4ED8"} />
          <AnimatedTorus position={[0, 0, -5]} scale={2.5} speed={-1} color={"#60A5FA"} />
        </Canvas>
      </div>

      {/* Text Content */}
      <div className="absolute text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Ceylon Mine
        </h1>
        <p className="text-xl text-gray-300 mt-4">
          Revolutionizing Mining Industry with{" "}
          <span className="text-blue-400">Advanced Technology</span>
        </p>

        {/* CTA Button */}
        <Link
          href="#features"
          className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          Explore Features
        </Link>
      </div>
    </section>
  );
}
