

// import React from 'react'
// import { LucideIcon, Shield, Wrench, BookOpen, MapPin, DollarSign, Bot } from 'lucide-react'

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   icon: LucideIcon;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
//   return (
//     <div className="group relative">
//       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition-opacity"></div>
//       <div className="relative p-8 bg-gray-900 rounded-xl border border-gray-800 transform transition-transform hover:-translate-y-2">
//         <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//         <Icon className="w-12 h-12 text-blue-400 mb-6" />
//         <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
//         <p className="text-gray-400">{description}</p>
//       </div>
//     </div>
//   )
// }

// export default function Features() {
//   const features: FeatureCardProps[] = [
//     {
//       icon: Shield,
//       title: "Online License Requests",
//       description: "Secure and streamlined digital application process with real-time tracking and automated approvals."
//     },
//     {
//       icon: DollarSign,
//       title: "Automated Royalty Calculations",
//       description: "Precise calculation engine ensuring accurate and transparent royalty computations."
//     },
//     {
//       icon: Bot, // Fixed Robot -> Bot
//       title: "AI-Powered Assistance",
//       description: "24/7 intelligent support system providing instant answers to all mining-related queries."
//     },
//     {
//       icon: MapPin,
//       title: "GIS Mapping System",
//       description: "Advanced geographical information system for optimal site selection and management."
//     },
//     {
//       icon: Wrench, // Fixed Tool -> Wrench
//       title: "Resource Management",
//       description: "Comprehensive tools for efficient allocation and tracking of mining resources."
//     },
//     {
//       icon: BookOpen,
//       title: "Digital Documentation",
//       description: "Paperless system for all mining-related documentation and compliance records."
//     }
//   ]

//   return (
//     <section id="features" className="py-20 bg-gray-900">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//           Advanced Features
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard key={index} {...feature} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"; // Required for Next.js Client Components

import React, { useState } from "react";
import { LucideIcon, Shield, Wrench, BookOpen, MapPin, DollarSign, Bot } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`relative bg-black border border-amber-600 rounded-lg p-8 transition-all duration-300 
      hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-amber-900 hover:border-amber-400 
      hover:shadow-md hover:shadow-amber-700 
      ${clicked ? "shadow-amber-600 scale-105" : ""}`}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300); // Reset effect after animation
      }}
    >
      {/* Icon with elegant gold tone */}
      <Icon className="w-10 h-10 text-amber-500 mb-6 transition-colors group-hover:text-amber-400" />

      {/* Title & Description */}
      <h3 className="text-xl font-semibold text-amber-300 mb-4 group-hover:text-amber-200 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{description}</p>
    </div>
  );
};

export default function Features() {
  const features: FeatureCardProps[] = [
    {
      icon: Shield,
      title: "Online License Requests",
      description: "Secure and streamlined digital application process with real-time tracking and automated approvals."
    },
    {
      icon: DollarSign,
      title: "Automated Royalty Calculations",
      description: "Precise calculation engine ensuring accurate and transparent royalty computations."
    },
    {
      icon: Bot,
      title: "AI-Powered Assistance",
      description: "24/7 intelligent support system providing instant answers to all mining-related queries."
    },
    {
      icon: MapPin,
      title: "GIS Mapping System",
      description: "Advanced geographical information system for optimal site selection and management."
    },
    {
      icon: Wrench,
      title: "Resource Management",
      description: "Comprehensive tools for efficient allocation and tracking of mining resources."
    },
    {
      icon: BookOpen,
      title: "Digital Documentation",
      description: "Paperless system for all mining-related documentation and compliance records."
    }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Professional Metallic Gold Title */}
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 drop-shadow-md">
          Advanced Features
        </h2>

        {/* Grid layout for feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
