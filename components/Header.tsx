import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-15 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12", 
        scrolled ? "py-2" : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row with logos and center text */}
        <div className="flex items-center justify-between">
          {/* Left logo with responsive container */}
          <div className="flex-1 flex justify-start -ml-4">
            <div className="w-40 md:w-[300px]">
              <Image 
                src="/bennett.png" 
                alt="IRCO IAS Logo" 
                width={300} 
                height={158} 
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
          
          {/* Center text with responsive font size */}
          <div className="text-white md:text-5xl text-3xl tracking-wider text-center flex-grow font-['TAN-Pearl']">
            IRCO | IAS
          </div>

          {/* Right logo with responsive container */}
          <div className="flex-1 flex justify-end -mr-4">
            <div className="w-24 md:w-[150px]">
              <Image 
                src="/times.png" 
                alt="Times Group Logo" 
                width={150} 
                height={96} 
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom row with navigation links and an underline covering only the text */}
        <nav className="mt-4 flex justify-center">
          <div className="inline-block">
            <ul className="flex space-x-12 text-white text-2xl font-['Sarpanch']">
              <li>
                <Link href="/team" className="nav-link tracking-wider hover:text-gray-400 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/notice" className="nav-link tracking-wider hover:text-gray-400 transition-colors">
                  Notice
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link tracking-wider hover:text-gray-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
            <div className="border-t border-gray-300 mt-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[1px]"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
