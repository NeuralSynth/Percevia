'use client';

import { motion } from 'framer-motion';

export default function Events() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      
      {/* Coming Soon Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-8">
              Join the Waitlist
            </h1>
            <p className="text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed mb-12">
              We&apos;re preparing something exciting! Stay tuned for upcoming Percevia events.
            </p>

            
            {/* Countdown Timer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
              {[
                { label: 'Days', value: '14' },
                { label: 'Hours', value: '22' },
                { label: 'Minutes', value: '36' },
                { label: 'Seconds', value: '48' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{item.value}</div>
                  <div className="text-blue-100/60">{item.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Notification Form */}
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">
                Get notified when we launch
              </h3>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-blue-100/50"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25">
                  Notify Me
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}