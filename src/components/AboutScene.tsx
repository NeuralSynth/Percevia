'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { LiquidChrome } from '@/Backgrounds/LiquidChrome/LiquidChrome';

const GlassesModel = () => {
  const MODEL_PATH = '/components/Pricing/perceviatransparentglb.glb';
  
  // Preload the model
  useGLTF.preload(MODEL_PATH);
  
  const { scene } = useGLTF(MODEL_PATH);
  
  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((object) => {
      const child = object as THREE.Mesh;
      if (child.isMesh) {
        if (child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = 0.8;
        }
      }
    });

    return () => {
      scene.traverse((object) => {
        const child = object as THREE.Mesh;
        if (child.isMesh) {
          if (child.material) {
            (child.material as THREE.Material).dispose();
          }
          if (child.geometry) {
            child.geometry.dispose();
          }
        }
      });
      useGLTF.clear(MODEL_PATH);
    };
  }, [scene]);

  if (!scene) return null;
  return <primitive object={scene} scale={2} position={[0, 0, 0]} />;
};

function AboutSceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GlassesModel />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function AboutScene() {
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <LiquidChrome
          baseColor={[0.05, 0.05, 0.1]}
          speed={0.2}
          amplitude={0.4}
          frequencyX={2.5}
          frequencyY={1.5}
        />
      </div>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_50%)]" />
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AboutSceneContent />
        </Canvas>
      </div>
    </>
  );
}
