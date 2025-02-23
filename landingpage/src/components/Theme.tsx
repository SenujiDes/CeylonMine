

// import React from 'react';

// const Theme = () => {
//   return (
//     <section id="theme" className="py-20 bg-gray-900 relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,rgba(17,24,39,0)_100%)]"></div>
      
//       <div className="container mx-auto px-6 relative z-10">
//         <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//           Our Vision
//         </h2>
        
//         <div className="max-w-4xl mx-auto text-center">
//           <p className="text-xl text-gray-300 leading-relaxed">
//             At Ceylon Mine, we're pioneering the digital transformation of Sri Lanka's mining industry. 
//             Our platform combines cutting-edge technology with industry expertise to streamline processes, 
//             enhance efficiency, and promote sustainable mining practices.
//           </p>
          
//           <div className="mt-12 grid md:grid-cols-3 gap-8">
//             <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
//               <h3 className="text-lg font-semibold text-white mb-3">Innovation</h3>
//               <p className="text-gray-400">Leveraging latest technology to transform traditional mining processes</p>
//             </div>
            
//             <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
//               <h3 className="text-lg font-semibold text-white mb-3">Efficiency</h3>
//               <p className="text-gray-400">Streamlining operations through digital automation and smart solutions</p>
//             </div>
            
//             <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
//               <h3 className="text-lg font-semibold text-white mb-3">Sustainability</h3>
//               <p className="text-gray-400">Promoting environmentally conscious mining practices for future generations</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Theme;

"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Preload model for optimization
useGLTF.preload("/models/worker.glb");

const WorkerModel = () => {
  const { scene } = useGLTF("/models/worker.glb");
  const modelRef = useRef();

  // Smooth rotation animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; // Slower, smoother rotation
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={5}
      position={[0, -2, 0]}
      rotation={[0, Math.PI / 12, 0]}
    />
  );
};

const Theme = () => {
  return (
    <section id="theme" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle Goldfish Layer Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('/images/goldfish-texture.png')] opacity-10 mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2
            className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 drop-shadow-md"
            aria-label="Vision"
          >
            VISION
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            At <span className="text-amber-500 font-semibold">Ceylon Mine</span>,
            we're pioneering the digital transformation of Sri Lanka's mining
            industry. Our platform integrates cutting-edge technology with
            industry expertise to streamline operations, enhance efficiency, and
            promote sustainable mining practices.
          </p>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Innovation", text: "Leveraging cutting-edge technology to redefine mining processes." },
              { title: "Efficiency", text: "Optimizing operations with AI-driven automation." },
              { title: "Sustainability", text: "Ensuring responsible and eco-friendly mining solutions." },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-black rounded-xl border border-amber-600 shadow-md transition-transform 
                hover:scale-105 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-700"
              >
                <h3 className="text-lg font-semibold text-amber-400 mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Model Section */}
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 relative">
          <div className="w-full h-[700px]">
            {/* Three.js Canvas */}
            <Canvas camera={{ position: [0, 3, 10] }}>
              {/* Enhanced Professional Lighting */}
              <ambientLight intensity={1} />
              <hemisphereLight skyColor={"#FFD700"} groundColor={"#444"} intensity={0.7} />
              <directionalLight position={[3, 5, 2]} intensity={2} color={"#FFDF00"} />
              <pointLight position={[-4, 4, 3]} intensity={2} color={"#FFD700"} />
              <spotLight position={[3, 5, 3]} intensity={2} angle={0.5} penumbra={0.8} color={"#D4AF37"} />

              <Suspense fallback={null}>
                <WorkerModel />
              </Suspense>
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme;
