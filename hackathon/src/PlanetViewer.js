import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';

const PlanetViewer = ({ color, distortion }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Stars />
        <Sphere visible args={[3, 64, 64]} scale={1}>
          <MeshDistortMaterial color={color} attach="material" distort={distortion} speed={2} roughness={0.5} />
        </Sphere>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default PlanetViewer;
