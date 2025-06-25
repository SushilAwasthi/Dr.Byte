// RotatingIcosahedron.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const RotatingIcosahedron: React.FC = () => {
  const icosahedronRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x += 0.02;
      icosahedronRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Icosahedron ref={icosahedronRef} args={[2, 0]}>
      <meshStandardMaterial color="white" wireframe />
    </Icosahedron>
  );
}

export default RotatingIcosahedron;
