import React from 'react';
//import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Theme from '../components/Theme';
import Timeline from '../components/Timeline';
import Team from '../components/Team';
import FAQ from '@/components/faq';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <Hero />
      <Features />
      <Theme />
      <Team />
      <Timeline />
      <FAQ />
      <Contact />
    </main>
  );
}
