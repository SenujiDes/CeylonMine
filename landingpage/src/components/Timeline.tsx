// export default function Timeline() {
//   return (
//     <section id="timeline" className="py-16 px-6">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
//         <div className="max-w-3xl mx-auto space-y-8">
//           <div className="flex gap-4">
//             <div className="w-24 text-sm font-semibold">2023</div>
//             <div>
//               <h3 className="font-semibold mb-2">Project Inception</h3>
//               <p className="text-gray-600">Initial research and planning phase for Ceylon Mine</p>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div className="w-24 text-sm font-semibold">2024</div>
//             <div>
//               <h3 className="font-semibold mb-2">Development Phase</h3>
//               <p className="text-gray-600">Building and testing the core features</p>
//             </div>
//           </div>
//           {/* Add more timeline items as needed */}
//         </div>
//       </div>
//     </section>
//   )
// } 

"use client";

import React from "react";
import { CalendarDays } from "lucide-react"; // ✅ Fixed import issue

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
    <section id="timeline" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Our Journey
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative pl-10 pb-12 group">
              {/* Timeline Line */}
              <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 group-last:h-1/2"></div>

              {/* Timeline Dot with Icon */}
              <div className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 ring-4 ring-purple-500/20 shadow-lg">
                <CalendarDays className="text-white w-6 h-6" />
              </div>

              {/* Timeline Content */}
              <div className="group-hover:translate-x-2 transition-transform">
                <div className="text-blue-400 font-semibold mb-2">{item.year}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
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
