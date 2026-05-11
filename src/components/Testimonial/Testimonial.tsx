'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import TrueFocus from '@/TextAnimations/TrueFocus/TrueFocus';

const Testimonial = () => {
  return (
    <section className="relative bg-transparent text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 relative z-20 md:absolute md:w-2/3 md:top-1/2 md:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 bg-transparent backdrop-blur-sm p-8 rounded-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                &quot;The one of a kind application that allows us to manage and regulate what your loved one might need!&quot;
              </h2>
              <p className="text-gray-400 text-lg">
                -Anonymous
              </p>
              <a
                href="#stories"
                className="inline-block text-gray-400 hover:text-gray-300 transition-colors text-sm font-medium px-4 py-2 bg-black/40 rounded-full"
              >
                Read customer stories
              </a>
            </motion.div>
          </div>
          <div className="flex-1 relative md:ml-auto w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <Image
                src="/features/hand.jpeg"
                alt="Hand holding a phone"
                width={800}
                height={1000}
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-2xl text-gray-400 font-medium mb-2">Powered by</p>
        
          <h3 className="text-[9rem] font-bold tracking-[-.02em] leading-none">
            <TrueFocus sentence="Ultralytics YOLO" />
          </h3>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;