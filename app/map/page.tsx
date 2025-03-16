// import Head from 'next/head';
// import Map from '../components/map.jsx';
// import Navbar from '../navbar/page';
// // _app.js or index.js
// //import '../styles/global.css';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
//       <Head>
//         <title>Sri Lanka Map</title>
//       </Head>
//       <Navbar />
//       <Map />
//     </div>
//   );
// }
"use client";
import Head from 'next/head';
import Map from '../components/map.jsx';
import Navbar from '../navbar/page';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942]' : 'bg-gradient-to-br from-[#f0f4f8] via-[#e0e7ec] to-[#f0f4f8]'} text-${isDarkMode ? 'white' : 'gray-900'}`}>
      <Head>
        <title>Sri Lanka Map</title>
      </Head>
      <Navbar />
      <Map isDarkMode={isDarkMode} />

      {/* Fun Theme Toggle Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#374151] to-[#1f2937] text-yellow-300 hover:bg-gradient-to-br hover:from-[#4b5563] hover:to-[#374151]'
              : 'bg-gradient-to-br from-[#fde68a] to-[#fcd34d] text-gray-900 hover:bg-gradient-to-br hover:from-[#fcd34d] hover:to-[#fbbf24]'
          } transition-all duration-300 ease-in-out`}
        >
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </motion.div>
    </div>
  );
}