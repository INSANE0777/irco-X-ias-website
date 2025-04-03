
import React, { useEffect, useRef } from 'react';
import Globe from './Globe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobeSection = () => {
  const sectionRef = useRef(null);
  const globeContainerRef = useRef(null);
  const textContentRef = useRef(null);
  
  useEffect(() => {
    // Create scroll trigger for this section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      }
    });
    
    // Animation sequence
    tl.fromTo(globeContainerRef.current, 
      { x: '-100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 1 }
    );
    
    // Animate in text content
    tl.fromTo(textContentRef.current.children,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      "-=0.5"
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-background p-8 relative overflow-hidden"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center">
        {/* Globe on the left */}
        <div 
          ref={globeContainerRef}
          className="w-full md:w-1/2 h-[50vh] md:h-[80vh]"
        >
          <Globe />
        </div>
        
        {/* Content on the right */}
        <div ref={textContentRef} className="w-full md:w-1/2 text-white p-8">
          <h2 className="text-4xl font-['Sarpanch'] mb-6">
            Global Impact
          </h2>
          <p className="text-lg mb-6">
            Our initiatives extend across continents, creating meaningful change
            in international policy development and diplomatic relations.
          </p>
          <p className="text-lg mb-6">
            Through strategic partnerships and innovative programs, we connect the
            brightest minds in international affairs to address global challenges.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-opacity-90 transition">
              Our Projects
            </button>
            <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition">
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobeSection;