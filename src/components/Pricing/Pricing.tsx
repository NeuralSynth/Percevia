'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Squares from '@/Backgrounds/Squares/Squares';
import { ModelViewer } from '@/components/ModelViewer/ModelViewer';

interface PricingTierProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const PricingTier = ({ title, price, features, isPopular = false }: PricingTierProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`relative p-8 rounded-3xl backdrop-blur-lg border ${isPopular ? 'border-blue-500/50 bg-blue-900/10' : 'border-white/10 bg-white/5'}`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-sm font-medium text-white">
        Most Popular
      </div>
    )}
    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight">{title}</h3>
    <div className="mb-8">
      <span className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tighter">₹{price}</span>
      <span className="text-blue-200/70 ml-2 text-xl tracking-wide font-light">only</span>
    </div>
    <ul className="space-y-5 mb-10">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3 text-blue-100/90 text-xl tracking-wide leading-relaxed font-light">
          <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${isPopular ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' : 'bg-white/10 hover:bg-white/20 text-blue-100'}`}>
      Get Started
    </button>
  </motion.div>
);

const Pricing = () => {
  const [isRotating, setIsRotating] = useState(false);

  const pricingTiers = [
    {
      title: 'Basic',
      price: 7000,
      features: [
        'Real-time object detection',
        'Basic voice feedback',
        'Up to 5 hours battery life',
        'Standard support'
      ]
    },
    {
      title: 'Pro',
      price: 9000,
      features: [
        'Advanced object detection & tracking',
        'Premium voice feedback',
        'Up to 8 hours battery life',
        'Priority support',
        'Customizable alerts'
      ],
      isPopular: true
    },
    {
      title: 'Enterprise',
      price: 15000,
      features: [
        'Full suite of detection features',
        'AI-powered scene understanding',
        'Up to 12 hours battery life',
        '24/7 dedicated support',
        'Custom integration options',
        'Advanced analytics dashboard'
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares direction="diagonal" speed={0.5} borderColor="#1a365d" squareSize={50} hoverFillColor="#2563eb" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-blue-500 font-medium">Empower</span>
              <h1 className="text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 leading-[1.1]">Experience the Future of Vision Assistance</h1>
              <p className="text-xl text-blue-100/80 leading-relaxed">
                Discover our innovative AI-powered glasses designed for the visually challenged. Enhance independence and improve quality of life with cutting-edge technology.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Product Features</h3>
                <p className="text-blue-100/80">High-resolution images, intuitive design, and advanced AI capabilities for real-time assistance.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Pricing Details</h3>
                <p className="text-blue-100/80">Affordable options to suit every budget and need.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">Preorder Now</button>
              <button className="px-8 py-3 border border-blue-400/30 rounded-lg text-blue-100 font-medium hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105">Learn More</button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent blur-2xl" />
            <div className="w-full h-[500px] relative">
              <ModelViewer 
                src="/components/Pricing/perceviatransparentglb.glb"
                poster="/components/Pricing/poster.webp"
                alt="Percevia AI-Powered Glasses"
                autoRotate={isRotating}
                cameraControls={true}
                shadowIntensity={1}
                exposure={1}
                className="w-full h-full"
              />
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-100 hover:bg-white/20 transition-all duration-300"
              >
                {isRotating ? 'Pause Rotation' : 'Start Rotation'}
              </button>
            </div>
          </div>
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tighter leading-none">
            Choose Your Plan
          </h2>
          <p className="text-3xl text-blue-100/90 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
            Select the perfect plan that suits your needs and transform your visual experience with Percevia.
          </p>
        </motion.div>

        {/* 3D Glasses Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full h-[400px] mb-24 relative"
        >
          <ModelViewer 
            src="/components/Pricing/perceviatransparentglb.glb"
            poster="/components/Pricing/poster.webp"
            alt="Percevia AI-Powered Glasses"
            autoRotate={isRotating}
            cameraControls={true}
            shadowIntensity={1}
            exposure={1}
            className="w-full h-full"
          />
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-100 hover:bg-white/20 transition-all duration-300"
          >
            {isRotating ? 'Pause Rotation' : 'Start Rotation'}
          </button>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;