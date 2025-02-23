

// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'

// // Define Team Member Props
// interface TeamMemberProps {
//   name: string
//   role: string
//   image?: string
//   linkedin?: string
//   github?: string
// }

// const TeamCard: React.FC<TeamMemberProps> = ({ name, role, image, linkedin, github }) => (
//   <div className="relative group transition-all duration-300 hover:scale-105">
    
//     {/* Glowing Effect on Hover */}
//     <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-xl opacity-25 group-hover:opacity-75 transition-opacity"></div>

//     <div className="relative bg-gray-800 rounded-xl border border-gray-700 p-6 transition-all duration-300 transform hover:shadow-lg hover:shadow-blue-500/40">
      
//       {/* ✅ Conditionally render the image */}
//       <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-blue-500">
//         {image ? (
//           <Image src={image} alt={name} width={128} height={128} className="object-cover" />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-700">
//             <span className="text-gray-400 text-sm">No Image</span>
//           </div>
//         )}
//       </div>

//       <h3 className="text-xl font-semibold text-white text-center">{name}</h3>
//       <p className="text-blue-400 text-sm text-center mb-4">{role}</p>
    
//       {/* Social Links */}
//       <div className="flex justify-center space-x-4">
//         {linkedin && (
//           <Link href={linkedin} target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//             </svg>
//           </Link>
//         )}
//         {github && (
//           <Link href={github} target="_blank" className="text-gray-400 hover:text-purple-400 transition-colors">
//             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//             </svg>
//           </Link>
//         )}
//       </div>
//     </div>
//   </div>
// )

// const Team = () => {
//   const teamMembers: TeamMemberProps[] = [
//     { name: "Senuji De Silva", role: "Team Lead", image: "/teamimg/senuji.jpg", linkedin: "https://www.linkedin.com/in/senuji", github: "https://github.com/senuji" },
//     { name: "Minsandi De Silva", role: "Developer", image: "/teamimg/minsandi.jpg", linkedin: "https://www.linkedin.com/in/minsandi", github: "https://github.com/minsandi" },
//     { name: "Janindu Amaraweera", role: "Developer", image: "/teamimg/janindua.jpg", linkedin: "https://www.linkedin.com/in/janindu", github: "https://github.com/janindu" },
//     { name: "Nisil Liyanage", role: "Developer", image: "/teamimg/nisil.jpg", linkedin: "https://www.linkedin.com/in/nisil", github: "https://github.com/nisil" },
//     { name: "Minidu Thiranjaya", role: "Developer", image: "/teamimg/minidu.jpg", linkedin: "https://www.linkedin.com/in/minidu", github: "https://github.com/minidu" },
//     { name: "Thisal Induwara", role: "Developer", image: "/teamimg/thisal.jpg", linkedin: "https://www.linkedin.com/in/thisal", github: "https://github.com/thisal" }
//   ]

//   return (
//     <section id="team" className="py-16 px-6 bg-gray-900">
//       <div className="container mx-auto">
//         <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-wide">Meet Our Team</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map((member, index) => (
//             <TeamCard key={index} {...member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Team;
"use client"; // Required for Next.js App Router

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Instagram, X } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

const TeamCard: React.FC<TeamMemberProps> = ({ name, role, image, linkedin, github, instagram }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-[320px] transform transition-all duration-300 hover:scale-105 shrink-0">
      <div className="relative group bg-black rounded-xl border border-amber-600 p-8 shadow-md">
        {/* Image */}
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="160px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-full">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Name & Role */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
          <p className="text-amber-500 font-medium">{role}</p>
        </div>

        {/* View Socials Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 text-sm font-semibold rounded-lg transition-all
              bg-gradient-to-r from-[#4b3a2d] via-[#5e4b3c] to-[#4b3a2d]
              border border-[#6d5a48] text-white shadow-md
              hover:from-[#3d2f25] hover:via-[#4e3d32] hover:to-[#3d2f25]
              hover:border-[#5a4939]"
          >
            View Socials
          </button>
        </div>

        {/* Modal (Pop-Up) */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-lg z-50">
            <div className="bg-black border border-amber-600 rounded-xl p-6 max-w-md w-full text-center relative shadow-lg">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title */}
              <h3 className="text-xl font-bold text-amber-500 mb-4">Connect with {name}</h3>

              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                {linkedin && (
                  <Link href={linkedin} target="_blank" className="p-3 rounded-full bg-black border border-amber-500 hover:bg-amber-700 transition-all">
                    <Linkedin className="w-7 h-7 text-amber-500 hover:text-white" />
                  </Link>
                )}
                {github && (
                  <Link href={github} target="_blank" className="p-3 rounded-full bg-black border border-amber-500 hover:bg-amber-700 transition-all">
                    <Github className="w-7 h-7 text-amber-500 hover:text-white" />
                  </Link>
                )}
                {instagram && (
                  <Link href={instagram} target="_blank" className="p-3 rounded-full bg-black border border-amber-500 hover:bg-amber-700 transition-all">
                    <Instagram className="w-7 h-7 text-amber-500 hover:text-white" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers: TeamMemberProps[] = [
    { name: "Senuji De Silva", role: "Team Lead", image: "/teamimg/senuji.jpg", linkedin: "https://linkedin.com/in/senuji", github: "https://github.com/senuji", instagram: "https://instagram.com/senuji" },
    { name: "Minsandi De Silva", role: "Developer", image: "/teamimg/minsandi.jpg", linkedin: "https://linkedin.com/in/minsandi", github: "https://github.com/minsandi", instagram: "https://instagram.com/minsandi" },
    { name: "Janindu Amaraweera", role: "Developer", image: "/teamimg/janindua.jpg", linkedin: "https://linkedin.com/in/janindu", github: "https://github.com/janindu", instagram: "https://instagram.com/janindu" },
    { name: "Nisil Liyanage", role: "Developer", image: "/teamimg/nisil.jpg", linkedin: "https://linkedin.com/in/nisil", github: "https://github.com/nisil", instagram: "https://instagram.com/nisil" },
    { name: "Minidu Thiranjaya", role: "Developer", image: "/teamimg/minidu.jpg", linkedin: "https://linkedin.com/in/minidu", github: "https://github.com/minidu", instagram: "https://instagram.com/minidu" },
    { name: "Thisal Induwara", role: "Developer", image: "/teamimg/thisal.jpg", linkedin: "https://linkedin.com/in/thisal", github: "https://github.com/thisal", instagram: "https://instagram.com/thisal" },
  ];

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500">
              Team
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developers crafting exceptional experiences
          </p>
        </div>

        <div className="relative overflow-hidden px-4">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
