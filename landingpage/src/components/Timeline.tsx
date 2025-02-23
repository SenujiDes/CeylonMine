

// "use client";

// import React from "react";
// import { CalendarDays } from "lucide-react"; // ✅ Fixed import issue

// const Timeline = () => {
//   const timelineItems = [
//     {
//       year: "2023",
//       title: "Project Inception",
//       description:
//         "Initial research and planning phase for Ceylon Mine. Established core team and project vision.",
//     },
//     {
//       year: "2024 Q1",
//       title: "Development Phase",
//       description: "Building core features and establishing the technical infrastructure.",
//     },
//     {
//       year: "2024 Q2",
//       title: "Beta Testing",
//       description: "Launching beta version with selected mining partners for real-world testing.",
//     },
//     {
//       year: "2024 Q3",
//       title: "Official Launch",
//       description: "Full-scale deployment of Ceylon Mine platform across Sri Lanka.",
//     },
//   ];

//   return (
//     <section id="timeline" className="py-20 bg-gray-900">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//           Our Journey
//         </h2>

//         <div className="max-w-4xl mx-auto relative">
//           {timelineItems.map((item, index) => (
//             <div key={index} className="relative pl-10 pb-12 group">
//               {/* Timeline Line */}
//               <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 group-last:h-1/2"></div>

//               {/* Timeline Dot with Icon */}
//               <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 ring-4 ring-purple-500/20 shadow-lg">
//                 <CalendarDays className="text-white w-6 h-6" />
//               </div>

//               {/* Timeline Content */}
//               <div className="group-hover:translate-x-2 transition-transform">
//                 <div className="text-blue-400 font-semibold mb-2">{item.year}</div>
//                 <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//                 <p className="text-gray-400">{item.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Timeline;

"use client";

import React from "react";
import { CalendarDays } from "lucide-react";

const Timeline = () => {
  const timelineItems = [
    {
      year: "2023",
      title: "Project Inception",
      description:
        "Initial research and planning phase for Ceylon Mine. Established core team and project vision.",
    },
    {
      year: "2024 Q1",
      title: "Development Phase",
      description: "Building core features and establishing the technical infrastructure.",
    },
    {
      year: "2024 Q2",
      title: "Beta Testing",
      description: "Launching beta version with selected mining partners for real-world testing.",
    },
    {
      year: "2024 Q3",
      title: "Official Launch",
      description: "Full-scale deployment of Ceylon Mine platform across Sri Lanka.",
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-black relative">
      {/* Subtle Goldfish Texture & Glow */}
      <div className="absolute inset-0 bg-[url('/images/goldfish-texture.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_10%,rgba(0,0,0,0.9)_80%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* 3D Gold Gradient Title */}
        <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 drop-shadow-[0_3px_6px_rgba(255,215,0,0.6)]">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative pl-10 pb-14 group">
              {/* 3D Gold Gradient Timeline Line */}
              <div className="absolute left-5 top-0 h-full w-[3px] bg-gradient-to-b from-amber-700 to-yellow-500 group-last:h-1/2 shadow-lg"></div>

              {/* Floating 3D Timeline Dot */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-amber-600 shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-amber-500">
                <CalendarDays className="text-amber-500 w-7 h-7 transition-all duration-300 group-hover:text-white" />
              </div>

              {/* Timeline Content with Gold Accents */}
              <div className="pl-6 group-hover:translate-x-2 transition-transform">
                <div className="text-amber-400 font-semibold text-lg mb-1">{item.year}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
