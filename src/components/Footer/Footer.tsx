'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const Footer = () => {
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Demo', href: '#demo' },
        { label: 'Support', href: '#support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Events', href: '#events' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'FAQs', href: '#faqs' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: '/social/twitter.svg', href: '#twitter', label: 'Twitter' },
    { icon: '/social/facebook.svg', href: '#facebook', label: 'Facebook' },
    { icon: '/social/linkedin.svg', href: '#linkedin', label: 'LinkedIn' },
    { icon: '/social/instagram.svg', href: '#instagram', label: 'Instagram' },
  ];

  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
              <Image src="/logo.svg" alt="Percevia" width={32} height={32} className="h-8 w-auto" />
              <span className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Percevia</span>
            </div>
            <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
              Empowering the visually challenged with AI-powered detection glasses for enhanced independence and awareness.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={link.label}
                >
                  <Image src={link.icon} alt={link.label} width={20} height={20} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-blue-100/70 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-blue-100/50 text-sm">
            © {new Date().getFullYear()} Percevia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};