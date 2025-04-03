"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// --- GlobeMesh Component ---
// This component is rendered INSIDE the Canvas, so useThree works here.
const GlobeMesh = () => {
  const globeGroupRef = useRef(null); // Ref for the main group of the globe
  const wireframeRef = useRef(null);
  const { gl } = useThree(); // Get the WebGLRenderer instance (gl)

  useEffect(() => {
    if (!globeGroupRef.current || !wireframeRef.current) return;

    // --- Logic previously in the parent Globe component's useEffect ---

    // 1. Add user data to the mesh group itself
    globeGroupRef.current.userData.isGlobeMesh = true;
    globeGroupRef.current.userData.className = 'globe-mesh'; // Optional: Keep if needed internally

    // 2. Add class to the CANVAS's PARENT element
    //    We get the canvas DOM element via gl.domElement
    const canvasElement = gl.domElement;
    const containerElement = canvasElement.parentElement; // Get the div wrapping the Canvas
    if (containerElement) {
      containerElement.classList.add('globe-mesh-container');
      console.log('Added globe-mesh-container class to:', containerElement);
    }

    // 3. Store a reference (if absolutely needed, consider alternatives)
    //    Setting globals is often discouraged, manage state within React if possible.
    window.globeMesh = globeGroupRef.current;
    console.log('Set window.globeMesh to:', window.globeMesh);

    // --- End of moved logic ---


    // Initial position showing half the globe
    globeGroupRef.current.rotation.x = -Math.PI / 4;

    // Opacity animation for wireframe
    gsap.fromTo(
      wireframeRef.current.material,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
      }
    );

    // --- Cleanup Function ---
    // Runs when the component unmounts
    return () => {
      if (containerElement) {
        containerElement.classList.remove('globe-mesh-container');
        console.log('Removed globe-mesh-container class');
      }
      // Clean up the global variable if it still points to this mesh
      if (window.globeMesh === globeGroupRef.current) {
         delete window.globeMesh;
         console.log('Cleaned up window.globeMesh');
      }
    };
    // Add gl.domElement to dependencies to ensure it runs after canvas is ready
    // and rerun if the canvas instance somehow changes (unlikely here)
  }, [gl.domElement]);

  useFrame(({ clock }) => {
    if (globeGroupRef.current) {
      // Continuous rotation on y-axis only
      globeGroupRef.current.rotation.y += 0.001;
    }
  });

  return (
    // Use the ref on the group that represents your logical "globe"
    <group ref={globeGroupRef} position={[0, 0, 0]}>
      {/* Wireframe sphere */}
      {/* Assign wireframeRef directly here */}
      <lineSegments ref={wireframeRef}>
        {/* Use BufferGeometry for lineSegments */}
        <sphereGeometry args={[5, 32, 32]} />
        {/* Use LineBasicMaterial for lineSegments */}
        <lineBasicMaterial color="#ffffff" transparent opacity={1} />
        {/* NOTE: Opacity is controlled by GSAP */}
      </lineSegments>

      {/* Additional wireframe details */}
      <mesh>
        <sphereGeometry args={[5.1, 24, 24]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.3, 64]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// --- Globe Component (Parent) ---
// This component now only sets up the Canvas and basic scene elements.
const Globe = () => {
  // No need for canvasRef or useEffect here for accessing the scene.
  // The container div already exists, GlobeMesh will add the class to it.
  return (
    <div className="h-full w-full relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        {/* Render GlobeMesh, which handles its own setup logic */}
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          // enableRotate={false} // You might want to keep rotation enabled?
        />
      </Canvas>
    </div>
  );
};

export default Globe;