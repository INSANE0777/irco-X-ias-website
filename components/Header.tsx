"use client";
import React, { useState, useEffect } from "react"; // Removed unused useState and useEffect for now, assuming they might be used later. Add back if needed.
// import Link from "next/link"; // Removed unused import
// import { motion } from "framer-motion"; // Removed unused import
// import { AuroraBackground } from "./ui/Aurora"; // Removed unused import
// import Image from "next/image"; // Removed unused import
import { cn } from "@/lib/utils"; // Assuming cn is used, added import if missing, otherwise adjust as needed.

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
  }, [scrolled]); // Added scrolled dependency based on usage

  return (
    <header
      className={cn(
        "fixed top-15 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        scrolled ? "py-2" : "py-6"
      )}
    >
      {/* Header content goes here */}
    </header>
  );
};

export default Header;
