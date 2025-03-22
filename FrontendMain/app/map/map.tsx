"use client";
import Head from 'next/head';
import Map from '../components/map.jsx';

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

      <Map isDarkMode={isDarkMode} />

     
    </div>
  );
}