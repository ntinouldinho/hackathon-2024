import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as d3 from 'd3';

const RotatingBox = () => {
  const meshRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.01);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  const handleSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setRotationSpeed(speed);
  };

  return (
    <mesh ref={meshRef}>
      <Box args={[2, 2, 2]} /> {/* Box geometry with dimensions 2x2x2 */}
      <meshStandardMaterial color={'orange'} /> {/* Color of the cube */}
    </mesh>
  );
};

const App = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} />
        <OrbitControls />
        <RotatingBox />
      </Canvas>
    </div>
  );
};

export default App;

