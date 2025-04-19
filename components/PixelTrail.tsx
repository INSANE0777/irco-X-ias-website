/* eslint-disable react/no-unknown-property */
"use client";
import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useMemo, useEffect } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { BufferAttribute } from 'three';

// Define the shader material using drei's shaderMaterial helper
const DotMaterial = shaderMaterial(
    { time: 0, fade: 0.5, color: new THREE.Color(0.0, 0.5, 1.0) }, // Blue color
    // Vertex Shader
    `
    uniform float time;
    attribute float size;
    attribute vec3 velocity;
    varying float vOpacity;
    void main() {
      vOpacity = 1.0 - (time - position.z) / 2.0; // Fade out based on time elapsed since creation
      vec3 pos = position.xyz;
      pos.xy += velocity.xy * (time - position.z); // Move based on velocity and time elapsed
      vec4 mvPosition = modelViewMatrix * vec4(pos.xy, 0.0, 1.0); // Use position.xy, ignore z for movement plane
      gl_PointSize = size * ( 300.0 / -mvPosition.z ) * vOpacity; // Adjust size and fade
      gl_Position = projectionMatrix * mvPosition;
    }
    `,
    // Fragment Shader
    `
    uniform vec3 color;
    uniform float fade;
    varying float vOpacity;
    void main() {
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 1.0 - smoothstep(0.4, 0.5, distanceToCenter); // Soft edge
      gl_FragColor = vec4(color, strength * vOpacity * fade); // Apply color, fade, and opacity
      if (vOpacity <= 0.0) discard; // Discard if fully faded
    }
    `
);


// Extend THREE namespace to include DotMaterial
extend({ DotMaterial });

// Define the type for the uniforms if needed elsewhere, otherwise it can be inferred
// type DotMaterialUniforms = { // Removed unused type
//   time?: number;
//   fade?: number;
//   color?: THREE.Color;
// };
