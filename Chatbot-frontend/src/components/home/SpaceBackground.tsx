import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpaceBackground: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push((Math.random() - 0.5) * 2000);
      positions.push((Math.random() - 0.5) * 2000);
      positions.push((Math.random() - 0.5) * 2000);
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0009;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starPositions}
          itemSize={3}
          count={starPositions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial color="#05101c" size={0.1} sizeAttenuation />
    </points>
  );
};

export default SpaceBackground;
