'use client';

import GooeyNav from '@/components/GooeyNav/GooeyNav';
import Image from 'next/image';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Percevia" width={32} height={32} className="h-8 w-auto" />
            <span className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Percevia</span>
          </div>
          <div className="hidden md:block">
            <GooeyNav
              items={[
                { label: 'Features', href: '/#experience' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Events', href: '/events' },
                { label: 'About', href: '/about' },
                { label: 'Support', href: '/#support' },
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
            <a href="/demo" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-colors shadow-lg hover:shadow-blue-500/25">Demo</a>
          </div>
        </div>
      </div>
    </nav>
  );
};