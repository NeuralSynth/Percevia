import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import './animations.css';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation/Navigation';
import { Footer } from '@/components/Footer/Footer';
import { ModelViewerScript } from '@/components/ModelViewer/ModelViewerScript';
import { DetectionProvider } from '@/contexts/DetectionContext';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Percevia - Vision Enhancement Technology',
  description: 'Experience the future of vision enhancement technology with Percevia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-black text-white overflow-x-hidden font-poppins">
        <DetectionProvider>
          {/* Load ModelViewerScript only once per page */}
          <ModelViewerScript />
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </DetectionProvider>
      </body>

    </html>
  );
}
