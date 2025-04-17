'use client';

import dynamic from 'next/dynamic';

// Dynamically import the WebcamDetection component
const WebcamDetection = dynamic(
  () => import('@/components/Webcam Detection/WebcamDetection').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ),
  }
);

export default function WebcamPage() {
  return (
    <div className="container mx-auto p-4">
      <WebcamDetection />
    </div>
  );
}