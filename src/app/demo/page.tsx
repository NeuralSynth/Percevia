'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCameraStream } from '@/components/Webcam Detection/WebcamDetection';
import { useDetectionSync } from '@/hooks/useDetectionSync';

const ModelViewer = dynamic(
  () => import('@/components/ModelViewer/ModelViewer').then(mod => mod.ModelViewer),
  { ssr: false }
);

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

export default function DemoPage() {
  const [activeFeature, setActiveFeature] = useState('vision');
  const [isMounted, setIsMounted] = useState(false);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const { stream } = useCameraStream();
  const { detections } = useDetectionSync();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);

    if (!modelViewerLoaded) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.type = 'module';
      script.onload = () => setModelViewerLoaded(true);
      script.onerror = (e) => console.error("Error loading Model Viewer script:", e);
      document.body.appendChild(script);
    }
  }, [modelViewerLoaded]);

  useEffect(() => {
    if (stream && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const renderFrame = () => {
        if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the video feed
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Draw 3x3 gridlines
          const rows = 3;
          const cols = 3;
          const cellWidth = canvas.width / cols;
          const cellHeight = canvas.height / rows;

          context.strokeStyle = 'rgba(0, 0, 0, 0.7)'; 
          context.lineWidth = 2;

          // Draw vertical lines
          for (let x = 1; x < cols; x++) {
            const posX = x * cellWidth;
            context.beginPath();
            context.moveTo(posX, 0);
            context.lineTo(posX, canvas.height);
            context.stroke();
          }

          // Draw horizontal lines
          for (let y = 1; y < rows; y++) {
            const posY = y * cellHeight;
            context.beginPath();
            context.moveTo(0, posY);
            context.lineTo(canvas.width, posY);
            context.stroke();
          }

          // Render detections
          if (detections) {
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            detections.forEach((detection) => {
              const { x, y, w, h } = detection as unknown as { x: number; y: number; w: number; h: number }; // Explicitly cast to unknown first
              if (x !== undefined && y !== undefined && w !== undefined && h !== undefined) {
                context.strokeRect(x, y, w, h);
              }
            });
          }
        }
        requestAnimationFrame(renderFrame);
      };

      renderFrame();
    }
  }, [stream, detections]);

  return (
    <>
      <Head>
        <meta name="model-viewer-script-handled" content="true" />
      </Head>

      <div className="min-h-screen bg-black">
        {isMounted && <AnimatedBackground />}

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
                Experience Percevia
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
                Step into the future of vision enhancement technology with our interactive demo.
              </p>
            </div>

            {/* Canvas for video feed */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Live Object Detection
              </h2>
              <div className="max-w-3xl mx-auto">
                <canvas
                  ref={canvasRef}
                  className="w-full border border-gray-700 rounded-lg"
                ></canvas>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative h-[400px] w-full">
                {isMounted && modelViewerLoaded && (
                  <ModelViewer
                    src="/models/glasses.glb"
                    poster="/models/glasses-poster.webp"
                    alt="Percevia Smart Glasses"
                    autoRotate={true}
                  />
                )}
              </div>

              <div className="space-y-8">
                {/* Features */}
                {[
                  {
                    id: 'vision',
                    title: 'AI Vision Enhancement',
                    description: 'Experience real-time object detection and recognition with our advanced AI algorithms.',
                  },
                  {
                    id: 'interface',
                    title: 'Intuitive Interface',
                    description: 'Control your experience with natural gestures and voice commands.',
                  },
                  {
                    id: 'analytics',
                    title: 'Real-time Analytics',
                    description: 'Get instant feedback and detailed analysis of your surroundings.',
                  },
                ].map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-6 rounded-lg border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 cursor-pointer ${
                      activeFeature === feature.id ? 'bg-blue-500/10 border-blue-500' : 'bg-black/50'
                    }`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a
                href="/pricing"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg hover:shadow-blue-500/25"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
