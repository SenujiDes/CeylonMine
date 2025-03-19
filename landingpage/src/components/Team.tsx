

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

// Team.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Linkedin, Github, Instagram, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

// Interface definitions (rest of interfaces remain the same)
interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMemberProps | null;
}

// Social Modal Component
const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#0a1527] p-8 rounded-xl max-w-md w-full mx-4 relative border border-amber-600/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-amber-500/30">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0a1527]">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
          <p className="text-amber-500">{member.role}</p>
        </div>

        <div className="flex justify-center space-x-8">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-all duration-200 transform hover:scale-110"
            >
              <Linkedin size={32} />
              <span className="block text-sm mt-2">LinkedIn</span>
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-all duration-200 transform hover:scale-110"
            >
              <Github size={32} />
              <span className="block text-sm mt-2">GitHub</span>
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-all duration-200 transform hover:scale-110"
            >
              <Instagram size={32} />
              <span className="block text-sm mt-2">Instagram</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// TeamCard Component
const TeamCard: React.FC<TeamMemberProps & { onShowSocials: (member: TeamMemberProps) => void }> = ({ 
  name, 
  role, 
  image, 
  onShowSocials,
  ...member 
}) => {
  return (
    <div className="w-80 transform transition-all duration-300 hover:scale-105 shrink-0 mx-4 snap-center">
      <div className="relative group bg-[#0a1527] rounded-xl border border-amber-600/50 p-8 shadow-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300">
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-amber-500/30">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={160}
              height={160}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0a1527]">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{name}</h3>
          <p className="text-amber-500 font-medium">{role}</p>
        </div>

        <button
          onClick={() => onShowSocials({ name, role, image, ...member })}
          className="mt-6 bg-gradient-to-r from-amber-600/90 to-amber-700/90 text-white py-2.5 px-4 rounded-lg w-full text-center hover:from-amber-500/90 hover:to-amber-600/90 transition-all duration-300 transform active:scale-95 font-medium"
        >
          View Socials
        </button>
      </div>
    </div>
  );
};

// Main Team Component (rest of the component remains the same)
const Team: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle scroll position for button visibility
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      const interval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollContainer.scrollBy({ left: 350, behavior: "smooth" });
          }
        }
      }, 3000);

      return () => {
        clearInterval(interval);
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // Team members data
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Senuji De Silva",
      role: "Team Lead",
      image: "/teamimg/senuji.jpg",
      linkedin: "https://linkedin.com/in/senujidesilva/",
      github: "https://github.com/SenujiDes",
      instagram: "https://instagram.com/notintoyoutho"
    },
    {
      name: "Minsandi De Silva",
      role: "Developer",
      image: "/teamimg/minsandi.jpg",
      linkedin: "https://linkedin.com/in/minsandi-de-silva-3424552a7/",
      github: "https://github.com/MinsandiDeSilva",
      instagram: "https://instagram.com/min_siiiii"
    },
    {
      name: "Janindu Amaraweera",
      role: "Developer",
      image: "/teamimg/janindua.jpg",
      linkedin: "https://linkedin.com/in/janinduamaraweera/",
      github: "https://github.com/Janindu02",
      instagram: "https://instagram.com/janindu_a27/"
    },
    {
      name: "Nisil Liyanage",
      role: "Developer",
      image: "/teamimg/nisil.jpg",
      linkedin: "https://linkedin.com/in/nisil-liyanage/",
      github: "https://github.com/nisilliyanage",
      instagram: "https://instagram.com/nisilliyanage"
    },
    {
      name: "Minidu Thiranjaya",
      role: "Developer",
      image: "/teamimg/minidu.png",
      linkedin: "https://linkedin.com/in/minidu-thiranjaya-988113320/",
      github: "https://github.com/NanayakkaraMiniduThiranjaya",
      instagram: "https://instagram.com/minidu_thiranjaya2003"
    },
    {
      name: "Thisal Induwara",
      role: "Developer",
      image: "/teamimg/thisal.jpg",
      linkedin: "https://linkedin.com/in/thisal-induwara-0b3555294/",
      github: "https://github.com/Thisal03",
      instagram: "https://instagram.com/thi.sal_indu.wara"
    }
  ];

  const handleShowSocials = (member: TeamMemberProps) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <section id="team"className="relative py-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-amber-500">Team</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our talented team of developers and designers working together to create amazing experiences.
          </p>
        </div>

        {/* Team Cards Container */}
        <div className="relative flex items-center">
          {/* Left Scroll Button */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: 'smooth' })}
            className={`absolute left-0 p-3 bg-black/50 text-white rounded-full shadow-lg z-10 hover:bg-black/70 transition-opacity duration-300 ${
              isAtStart ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Team Cards Scrolling Section */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-10 snap-x snap-mandatory scroll-smooth"
          >
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={index} 
                {...member} 
                onShowSocials={handleShowSocials}
              />
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: 'smooth' })}
            className={`absolute right-0 p-3 bg-black/50 text-white rounded-full shadow-lg z-10 hover:bg-black/70 transition-opacity duration-300 ${
              isAtEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
        </div>
      </div>

      {/* Social Modal */}
      <SocialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedMember}
      />
    </section>
  );
};

export default Team;