import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Experience: FC = () => {
  return (
    <section className="w-full min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
          viewport={{ once: true }}
          className="mb-32 text-center relative"
        >
          <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-radial from-blue-500/5 to-transparent blur-2xl"></div>
          <h2 className="text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 font-sans leading-[1.1] mb-6">
            An unmatched visual<br />Experience with Percevia
          </h2>
          <p className="text-xl md:text-2xl text-blue-100/80 mt-8 font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
            Experience instant object detection powered by YOLOv8x, offering superior accuracy and speed.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 px-4"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface Feature {
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const features: Feature[] = [
  {
    title: 'Real-time Detection',
    description: 'Experience instant object detection powered by YOLOv8x, offering superior accuracy and speed.',
    image: '/features/hero.jpg',
    gradient: 'from-blue-400/10 to-blue-500/20 hover:from-blue-400/15 hover:to-blue-500/25',
  },
  {
    title: 'Advanced AI Model',
    description: 'Utilizing the latest YOLOv8x model for state-of-the-art object detection and classification.',
    image: '/features/hero2.jpeg',
    gradient: 'from-purple-400/5 to-purple-500/10 hover:from-purple-400/10 hover:to-purple-500/15',
  },
  {
    title: 'Multiple Objects',
    description: 'Detect and track multiple objects simultaneously with high precision and confidence scores.',
    image: '/features/hero3.jpeg',
    gradient: 'from-indigo-400/5 to-indigo-500/10 hover:from-indigo-400/10 hover:to-indigo-500/15',
  },
  {
    title: 'Optimized Performance',
    description: 'Enhanced image processing and detection algorithms for optimal CPU performance.',
    image: '/features/hero4.jpeg',
    gradient: 'from-blue-400/10 to-blue-500/20 hover:from-blue-400/15 hover:to-blue-500/25',
  },
];

const FeatureCard: FC<Feature> = ({ title, description, image, gradient }) => (
  <div
    className={`rounded-3xl overflow-hidden relative group cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/5 ${title === 'Real-time Detection' ? 'md:col-span-4' : title === 'Advanced AI Model' ? 'md:col-span-2' : title === 'Multiple Objects' ? 'md:col-span-3' : 'md:col-span-3'}`}
  >
    <div className={`relative overflow-hidden backdrop-blur-sm ${title === 'Real-time Detection' ? 'aspect-[16/9]' : title === 'Advanced AI Model' ? 'aspect-[3/4]' : 'aspect-video'}`}>
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{title}</h3>
        <p className="text-blue-50/90 text-lg font-light leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default Experience;
