'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LiquidChrome } from '@/Backgrounds/LiquidChrome/LiquidChrome';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const GlassesModel = () => {
  const MODEL_PATH = '/components/Pricing/perceviatransparentglb.glb';
  
  // Preload the model to avoid loading issues
  useGLTF.preload(MODEL_PATH);
  
  const { scene } = useGLTF(MODEL_PATH);
  
  useEffect(() => {
    if (!scene) return;
    
    // Configure material properties
    scene.traverse((object) => {
      const child = object as THREE.Mesh;
      if (child.isMesh) {
        if (child.material) {
          (child.material as THREE.Material).transparent = true;
          (child.material as THREE.Material).opacity = 0.8;
        }
      }
    });

    // Cleanup function
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


const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {

      if (!cardRef.current) return;
      const rect = cardRef.current?.getBoundingClientRect() || new DOMRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cardRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
      `;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="transition-transform duration-200 ease-out"
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen text-white pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <LiquidChrome
          baseColor={[0.05, 0.05, 0.1]}
          speed={0.2}
          amplitude={0.4}
          frequencyX={2.5}
          frequencyY={1.5}
        />
      </div>
      {/* Hero Section */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_50%)]" />
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <GlassesModel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <section className="relative min-h-screen flex items-center justify-center py-20">
        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-full"
            />
            <h1 className="relative text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6 tracking-tight">
              About Percevia
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Empowering the visually challenged through innovative AI technology
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingCard>
            <div className="grid md:grid-cols-2 gap-16 items-center bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <div className="space-y-8">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg rounded-lg" />
                  <h2 className="relative text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight">
                    Our Mission
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-blue-100/80 leading-relaxed">
                    At Percevia, we&apos;re dedicated to transforming the lives of visually challenged individuals through cutting-edge AI technology. Our mission is to enhance independence, confidence, and quality of life by providing real-time object detection and environmental awareness.
                  </p>
                  <p className="text-xl text-blue-100/80 leading-relaxed">
                    We believe that technology should be accessible to everyone, and we&apos;re committed to making that vision a reality.
                  </p>

                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-medium"
                  >
                    Learn More
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border border-blue-400/30 rounded-xl text-blue-100 font-medium hover:bg-blue-400/10"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src="/features/hero.jpg"
                    alt="Percevia Mission"
                    className="rounded-2xl shadow-2xl relative z-10 w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FloatingCard>
            <div className="text-center mb-16 relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-2xl rounded-full" />
              <h2 className="relative text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-8 tracking-tight">
                Our Values
              </h2>
            </div>
          </FloatingCard>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing the boundaries of AI technology to create meaningful solutions.',
                icon: '🚀',
                gradient: 'from-blue-500/20 to-purple-500/20'
              },
              {
                title: 'Accessibility',
                description: 'Making advanced technology available and usable for everyone.',
                icon: '🌟',
                gradient: 'from-purple-500/20 to-pink-500/20'
              },
              {
                title: 'Impact',
                description: 'Creating real, measurable improvements in people\'s daily lives.',
                icon: '💫',
                gradient: 'from-pink-500/20 to-blue-500/20'
              },
            ].map((value, index) => (
              <FloatingCard key={index} delay={index * 0.2}>
                <div className="relative group h-full">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${value.gradient} blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-full"
                  >
                    <div className="text-5xl mb-6">{value.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-lg text-blue-100/80 leading-relaxed">{value.description}</p>
                  </motion.div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingCard>
            <div className="text-center mb-20 relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-2xl rounded-full" />
              <h2 className="relative text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-8 tracking-tight">
                Our Team
              </h2>
              <p className="text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-light">
                Meet the passionate individuals behind Percevia
              </p>
            </div>
          </FloatingCard>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                name: 'Priyam Ghosh',
                role: 'Co-Founder',
                image: '/features/hero2.jpeg',
                gradient: 'from-blue-500/20 to-purple-500/20'
              },
              {
                name: 'Shreyas S',
                role: 'Co-Founder',
                image: '/features/hero3.jpeg',
                gradient: 'from-purple-500/20 to-pink-500/20'
              },
              {
                name: 'Tushar Shaw',
                role: 'Technical Director',
                image: '/features/hero4.jpeg',
                gradient: 'from-pink-500/20 to-indigo-500/20'
              },
              {
                name: 'Krushna Sonahawan',
                role: 'Application Developer',
                image: '/features/hero.jpg',
                gradient: 'from-indigo-500/20 to-blue-500/20'
              },
            ].map((member, index) => (
              <FloatingCard key={index} delay={index * 0.2}>
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${member.gradient} blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10"
                  >
                    <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-lg text-blue-100/80 font-light">{member.role}</p>
                    <div className="mt-6 flex justify-center space-x-4">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}