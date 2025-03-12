'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentYear, setCurrentYear] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render anything until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-opacity-90 backdrop-blur-md shadow-lg' 
            : 'bg-opacity-100'
        } bg-[var(--background)] text-[var(--foreground)]`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-xl font-bold gradient-text animate-pulse-slow">
            CeylonMine Admin
          </Link>
          <nav className="space-x-6">
            {[
              ['Applications', '/applications'],
              ['Royalty', '/royalty'],
              ['Status', '/status'],
              ['Complaints', '/complaints'],
              ['Users', '/users'],
            ].map(([title, url]) => (
              <Link
                key={url}
                href={url}
                className="relative group"
              >
                <span className="hover:text-[var(--primary)] transition-colors">
                  {title}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="animate-slide-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--background)] text-[var(--foreground)] p-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="gradient-text font-bold">
              © {currentYear} CeylonMine
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-[var(--primary)] transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 