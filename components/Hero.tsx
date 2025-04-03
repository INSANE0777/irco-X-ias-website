"use client";

import React, { useEffect, useRef } from "react";
import Globe from "./Globe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypewriterEffectSmooth } from "./typewriter-effect";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Refs for DOM elements and animation control
  const heroSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const globeContainerRef = useRef(null);

  // --- ScrollTrigger Animation Effect for Globe (RESPONSIVE ADJUSTMENTS) ---
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;
    const checkInterval = setInterval(() => {
      attempts++;
      if (
        heroSectionRef.current &&
        secondSectionRef.current &&
        globeContainerRef.current &&
        window.globeMesh
      ) {
        clearInterval(checkInterval);
        initializeResponsiveScrollTrigger();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error("Failed to initialize ScrollTrigger: Refs or window.globeMesh not found.");
      }
    }, 50);

    const initializeResponsiveScrollTrigger = () => {
      const globeMesh = window.globeMesh;
      ScrollTrigger.matchMedia({
        // --- Desktop and Larger Screens (768px and up) ---
        "(min-width: 768px)": function () {
          const tlDesktop = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              endTrigger: secondSectionRef.current,
              end: "top center",
              scrub: 1,
            },
          });
          tlDesktop
            .to(globeContainerRef.current, { y: "0%", duration: 1 }, "<")
            .to(globeMesh.rotation, { x: 0, duration: 1 }, "<")
            .to(globeContainerRef.current, { x: "25vw", duration: 2 }, ">-0.5");

          gsap.to(heroSectionRef.current.querySelector(".z-10"), {
            opacity: 0,
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "center top",
              scrub: true,
              id: "hero-fade-desktop",
            },
          });

          return () => {
            tlDesktop.scrollTrigger?.kill();
            tlDesktop.kill();
            ScrollTrigger.getById("hero-fade-desktop")?.kill();
          };
        },

        // --- Mobile Screens (max-width: 767px) ---
        "(max-width: 767px)": function () {
          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              endTrigger: secondSectionRef.current,
              end: "top center",
              scrub: 1,
            },
          });
          tlMobile
            .to(globeContainerRef.current, { y: "0%", duration: 1 }, "<")
            .to(globeMesh.rotation, { x: 0, duration: 1 }, "<")
            .to(globeContainerRef.current, { x: "0vw", duration: 2 }, ">-0.5");

          gsap.to(heroSectionRef.current.querySelector(".z-10"), {
            opacity: 0,
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "center top",
              scrub: true,
              id: "hero-fade-mobile",
            },
          });

          return () => {
            tlMobile.scrollTrigger?.kill();
            tlMobile.kill();
            ScrollTrigger.getById("hero-fade-mobile")?.kill();
          };
        },

        // --- Default for all sizes ---
        all: function () {
          ScrollTrigger.refresh();
          return () => {};
        },
      });
    };

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  // Single sentence for typewriter effect
  const sentence = "We are International Affairs Society by IRCO";

  return (
    <>
      {/* Fixed Position Globe Container */}
      <div
        ref={globeContainerRef}
        className="fixed left-1/2 bottom-0
                   w-[90vw] max-w-md aspect-square
                   md:w-[80vh] md:max-w-none md:h-[80vh] md:aspect-auto
                   z-0 transform -translate-x-1/2
                   -translate-y-[-35%]
                   md:-translate-y-[-50%]"
      >
        <Globe />
      </div>

      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="hero-section h-screen flex items-center justify-center relative overflow-hidden px-4"
      >
        <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-background"></div>
        <div className="z-10 text-center max-w-4xl animate-fade-in relative">
          {/* Using a div instead of a p to avoid nesting issues */}
          <div className="text-2xl sm:text-3xl md:text-4xl text-white font-heading mb-12 h-12 font-['Sarpanch']">
            <TypewriterEffectSmooth
              words={[{ text: sentence }]}
              className="inline"
              cursorClassName="inline-block ml-2"
            />
          </div>
        </div>
      </section>

      {/* Second Section (Global Network) */}
      <section
        ref={secondSectionRef}
        className="min-h-screen flex items-center bg-background p-4 sm:p-8 relative"
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-y-10 md:gap-y-0 md:gap-x-8">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white relative z-10 order-1 md:order-1 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-['Sarpanch'] mb-4 md:mb-6">
              Global Network
            </h2>
            <p className="text-base md:text-lg mb-6">
              Our worldwide connections span across continents, bringing together
              international experts, students, and policymakers in the field of
              international relations.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4">
              <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-opacity-90 transition mb-2 md:mb-0">
                Join Network
              </button>
              <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition mb-2 md:mb-0">
                Learn More
              </button>
            </div>
          </div>

          {/* Placeholder for Globe or Other Content */}
          <div className="w-full md:w-1/2 order-2 md:order-2">
            <div className="min-h-[30vh] md:min-h-[50vh]"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
