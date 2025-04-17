'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { motion } from 'framer-motion-3d';

function Glasses() {
  return (
    <motion.group
      initial={{ scale: 0, rotateY: -Math.PI }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Enhanced frame structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.45, 0.2]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Temple arms */}
      <mesh position={[1.1, 0, 0.1]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[-1.1, 0, 0.1]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
        />
      </mesh>
      
      {/* Enhanced lenses with gradient effect */}
      <mesh position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#4080ff"
          metalness={0.7}
          roughness={0.1}
          transmission={0.95}
          thickness={0.5}
          opacity={0.9}
          transparent={true}
          emissive="#4080ff"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#4080ff"
          metalness={0.7}
          roughness={0.1}
          transmission={0.95}
          thickness={0.5}
          opacity={0.9}
          transparent={true}
          emissive="#4080ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Decorative elements */}
      <mesh position={[0, 0.1, 0.1]}>
        <boxGeometry args={[0.4, 0.05, 0.05]} />
        <meshPhysicalMaterial
          color="#4080ff"
          metalness={1}
          roughness={0}
          clearcoat={1}
          emissive="#4080ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </motion.group>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      
      <Environment preset="studio" />
      
      <Suspense fallback={null}>
        <Glasses />
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={1.5} />
        </EffectComposer>
      </Suspense>
      
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </Canvas>
  );
}