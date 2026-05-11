'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Create',
      description: 'You need to create and test virtual experience that has awesome and engaging content.',
      image: '/features/create-step.svg'
    },
    {
      title: 'Engage',
      description: 'Get through the parts, get your audience attention and still preserve attention like active participants.',
      image: '/features/engage-step.svg'
    },
    {
      title: 'Analyze',
      description: 'Track your success with real-time deep insights and analytics measured across the entire audience experience.',
      image: '/features/analyze-step.svg'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)] opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 tracking-tight">How it works</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Manage your experience from start to finish, from integrations to registration and from interactive
            stage elements to post-event data, it&apos;s all here.
          </p>
          <a
            href="#learn-more"
            className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            Learn more
          </a>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-start gap-8"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 font-medium">Step {index + 1}</span>
                <h3 className="text-5xl font-bold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
                  {step.title}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform rotate-45"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </h3>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl font-light leading-relaxed">{step.description}</p>
              <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100 p-1 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={step.image}
                  alt={`${step.title} step illustration`}
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="grid grid-cols-3 gap-6 mb-16">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-gradient-to-br from-white to-gray-100 p-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Image
                  src={`/partners/integration-${i + 1}.svg`}
                  alt={`Integration partner ${i + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
          <h2 className="text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 tracking-tight">Integrate your data</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Leverage your existing marketing platforms and sync the data seamlessly
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;