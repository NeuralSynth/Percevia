'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DecryptedText from '@/TextAnimations/DecryptedText/DecryptedText';
import GooeyNav from '@/components/GooeyNav/GooeyNav';
import Experience from '@/components/Experience/Experience';
import FlowingMenu from '@/components/FlowingMenu/FlowingMenu';
import Testimonial from '@/components/Testimonial/Testimonial';
import HowItWorks from '@/components/HowItWorks/HowItWorks';

// Dynamically import components to avoid SSR issues
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });
const Dither = dynamic(() => import('@/Backgrounds/Dither/Dither'), { ssr: false });

// Background animation component
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30 animate-gradient" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        animation: 'dither 12s linear infinite'
      }} />
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Percevia" className="h-8" />
              <span className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Percevia</span>
            </div>
            <div className="hidden md:block">
              <GooeyNav
                items={[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Events', href: '#events' },
                  { label: 'About', href: '#about' },
                  { label: 'Support', href: '#support' },
                ]}
                colors={[1, 2, 3, 4, 5]}
                particleCount={12}
                particleDistances={[60, 8]}
                particleR={80}
                timeVariance={200}
              />
            </div>
            <div className="flex items-center space-x-4">
              <a href="#login" className="text-blue-100 hover:text-white transition-colors font-medium">Login</a>
              <a href="demo" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25">Demo</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-5xl max-h-[700px] transform scale-110">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
        </div>
        <div className="absolute inset-0 -z-5">
          <Suspense fallback={null}>
            <Dither 
              waveSpeed={0.03}
              waveFrequency={2}
              waveAmplitude={0.4}
              waveColor={[0.2, 0.4, 0.8]}
              colorNum={5}
              pixelSize={3}
              enableMouseInteraction={true}
              mouseRadius={0.8}
            />
          </Suspense>
        </div>
        <div className="text-center space-y-10 max-w-4xl mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.4, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="text-8xl md:text-9xl font-extrabold tracking-tighter relative"
          >
            <motion.span
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-4xl md:text-5xl block mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text font-light tracking-wide drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]"
            >
              Introducing
            </motion.span>
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-2xl"
              initial={{ opacity: 0, filter: 'blur(15px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              Percevia
            </motion.span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center space-x-6 pt-4"
          >
            <a
              href="#demo"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Watch Demo
            </a>
            <a
              href="#features"
              className="px-8 py-3 border border-blue-400/30 rounded-lg text-blue-100 font-medium hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <Experience />

      {/* State of the Art Section */}
      <section className="py-32 bg-black/50 backdrop-blur-lg relative overflow-hidden" style={{ zIndex: 20 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-radial from-blue-500/5 to-transparent blur-2xl"></div>
                <DecryptedText
                  text="State-of-the-Art Real-Time Object Detection System"
                  className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tight leading-[1.1]"
                  speed={50}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  parentClassName="relative z-10"
                />
                <br />
                <br />
                <p className="text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light tracking-wide max-w-4xl">
                  This revolutionary wearable transforms daily life for the visually challenged by providing real-time object
                  detection, enabling greater independence, confidence, and freedom like never before.
                </p>
              </div>
              <div className="mt-12">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-green-400 text-3xl">↗</span>
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-300">73%</span>
                  <span className="text-xl text-blue-100/80 font-light">visibility capacity</span>
                </div>
                <p className="text-lg text-blue-200/60 font-light">avg percentage for Percevia customers</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 relative p-4">
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent blur-2xl"></div>
              {/* Partner Logos */}
              {[
                { src: "/partners/adobe.svg", alt: "Adobe", height: "h-10" },
                { src: "/partners/Nvidia-Vertical-Black-Logo.wine.svg", alt: "Nvidia", height: "h-8" },
                { src: "/partners/1password.svg", alt: "1Password", height: "h-8" },
                { src: "/partners/symbol-1.svg", alt: "Symbol 1", height: "h-8" },
                { src: "/partners/meta-logo-facebook.svg", alt: "Meta", height: "h-8" },
                { src: "/partners/broadcom.svg", alt: "Broadcom", height: "h-8" }
              ].map((logo, index) => (
                <div key={index} className="bg-white/95 p-6 rounded-2xl flex items-center justify-center group hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-gray-100 hover:border-blue-200">
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className={`${logo.height} opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105`} 
                  />
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-12 left-0 w-full text-center"
              >
                <p className="text-lg font-light tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
                  Spreading the power of technology to the visually impaired 💗
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Flowing Menu Section */}
      <section className="relative w-full min-h-screen bg-black/80 backdrop-blur-lg flex items-center justify-center">
        <div className="w-full">
          <FlowingMenu
            items={[
              {
                link: "#real-time",
                text: "Real-time Detection",
                image: "/features/interactive-overlay.svg"
              },
              {
                link: "#ai-model",
                text: "Advanced AI Model",
                image: "/features/hd-video.svg"
              },
              {
                link: "#multi-object",
                text: "Multiple Objects",
                image: "/features/interactive-polls.svg"
              },
              {
                link: "#performance",
                text: "Optimized Performance",
                image: "/features/chat.svg"
              }
            ]}
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonial />

      {/* How It Works Section */}
      <HowItWorks />
    </main>
  );
}