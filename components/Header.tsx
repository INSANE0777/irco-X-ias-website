"use client";
import React from "react";
// import Link from "next/link"; // Removed unused import
import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/Aurora";
import Image from "next/image";

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
     
    </header>
  );
};

export default Header;
