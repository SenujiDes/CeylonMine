

// // Hero.tsx
// "use client";

// import React, { useRef } from "react";
// import Link from "next/link";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Sphere, Torus, Stars, MeshDistortMaterial } from "@react-three/drei";
// import * as THREE from "three";

// // Define types for the Torus props
// interface AnimatedTorusProps {
//   position: [number, number, number];
//   scale: number;
//   speed: number;
//   color: string;
// }

// // Animated Main Sphere (Gold, Glowing)
// const AnimatedSphere = () => {
//   const sphereRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     if (sphereRef.current) {
//       sphereRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.4;
//       sphereRef.current.rotation.y += 0.003;
//     }
//   });

//   return (
//     <Sphere ref={sphereRef} args={[2.5, 100, 100]} scale={3.5}>
//       <MeshDistortMaterial
//         color="#FFD700"
//         attach="material"
//         distort={0.65}
//         speed={3.2}
//         roughness={0.3}
//         metalness={1}
//       />
//     </Sphere>
//   );
// };

// // Floating Animated Torus Rings with proper typing
// const AnimatedTorus: React.FC<AnimatedTorusProps> = ({ position, scale, speed, color }) => {
//   const torusRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (torusRef.current) {
//       torusRef.current.rotation.x += 0.005 * speed;
//       torusRef.current.rotation.y += 0.008 * speed;
//     }
//   });

//   return (
//     <Torus 
//       ref={torusRef} 
//       args={[3, 0.2, 32, 100]} 
//       position={position} 
//       scale={[scale, scale, scale]}
//     >
//       <MeshDistortMaterial 
//         color={color} 
//         distort={0.4} 
//         speed={2} 
//         metalness={1} 
//         roughness={0.2} 
//       />
//     </Torus>
//   );
// };

// const Hero: React.FC = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-amber-900">
//       <div className="relative w-full h-[700px]">
//         <Canvas className="absolute top-0 left-0 w-full h-full">
//           <OrbitControls enableZoom={false} />
          
//           <ambientLight intensity={0.8} />
//           <directionalLight position={[5, 7, 3]} intensity={2} color="#FFD700" />
//           <pointLight position={[0, 6, 4]} intensity={3} color="#FFA500" />
//           <spotLight 
//             position={[-5, 7, 6]} 
//             intensity={1.8} 
//             angle={0.4} 
//             penumbra={0.7} 
//             color="#DAA520" 
//           />

//           <Stars 
//             radius={50} 
//             depth={50} 
//             count={250} 
//             factor={4} 
//             saturation={0} 
//             fade 
//             speed={1} 
//           />

//           <AnimatedSphere />
//           <AnimatedTorus 
//             position={[0, 0, -3]} 
//             scale={3} 
//             speed={1} 
//             color="#FFD700" 
//           />
//           <AnimatedTorus 
//             position={[0, 0, -5]} 
//             scale={2.5} 
//             speed={-1} 
//             color="#FFA500" 
//           />
//         </Canvas>
//       </div>

//       <div className="absolute text-center">
//         <h1 className="text-6xl font-bold text-amber-400 drop-shadow-lg">
//           Ceylon Mine
//         </h1>
//         <p className="text-xl text-gray-300 mt-4">
//           Revolutionizing Mining Industry with{" "}
//           <span className="text-amber-500">Advanced Technology</span>
//         </p>

//         <Link
//           href="#features"
//           className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-500 transition shadow-lg"
//         >
//           Explore Features
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// Hero.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Torus, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Define types for the Torus props
interface AnimatedTorusProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}

// Animated Main Sphere (Gold, Glowing)
const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.4;
      sphereRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[2.5, 100, 100]} scale={3.5}>
      <MeshDistortMaterial
        color="#FFD700"
        attach="material"
        distort={0.65}
        speed={3.2}
        roughness={0.3}
        metalness={1}
      />
    </Sphere>
  );
};

// Floating Animated Torus Rings
const AnimatedTorus: React.FC<AnimatedTorusProps> = ({ position, scale, speed, color }) => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005 * speed;
      torusRef.current.rotation.y += 0.008 * speed;
    }
  });

  return (
    <Torus 
      ref={torusRef} 
      args={[3, 0.2, 32, 100]} 
      position={position} 
      scale={[scale, scale, scale]}
    >
      <MeshDistortMaterial 
        color={color} 
        distort={0.4} 
        speed={2} 
        metalness={1} 
        roughness={0.2} 
      />
    </Torus>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-amber-900 overflow-hidden">
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <OrbitControls enableZoom={false} />
        
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 7, 3]} intensity={2} color="#FFD700" />
        <pointLight position={[0, 6, 4]} intensity={3} color="#FFA500" />
        <spotLight 
          position={[-5, 7, 6]} 
          intensity={1.8} 
          angle={0.4} 
          penumbra={0.7} 
          color="#DAA520" 
        />

        <Stars 
          radius={50} 
          depth={50} 
          count={250} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />

        <AnimatedSphere />
        <AnimatedTorus 
          position={[0, 0, -3]} 
          scale={3} 
          speed={1} 
          color="#FFD700" 
        />
        <AnimatedTorus 
          position={[0, 0, -5]} 
          scale={2.5} 
          speed={-1} 
          color="#FFA500" 
        />
      </Canvas>

      <div className="absolute text-center">
        <h1 className="text-6xl font-bold text-amber-400 drop-shadow-lg">
          Ceylon Mine
        </h1>
        <p className="text-xl text-gray-300 mt-4">
          Revolutionizing Mining Industry with{" "}
          <span className="text-amber-500">Advanced Technology</span>
        </p>

        <Link
          href="#features"
          className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-black bg-amber-400 rounded-lg hover:bg-amber-500 transition shadow-lg"
        >
          Explore Features
        </Link>
      </div>
    </section>
  );
};

export default Hero;


