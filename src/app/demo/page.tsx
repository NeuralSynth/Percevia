'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCameraStream } from '@/components/Webcam Detection/WebcamDetection';
import { useDetectionSync } from '@/hooks/useDetectionSync';

// Dynamically import components that use browser APIs with ssr: false
const ModelViewer = dynamic(
  () => import('@/components/ModelViewer/ModelViewer').then(mod => mod.ModelViewer),
  { ssr: false }
);

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);

// Import WebcamDetection with SSR disabled
const WebcamDetection = dynamic(
  () => import('@/components/Webcam Detection/WebcamDetection').then(mod => mod.default),
  { ssr: false }
);

export default function DemoPage() {
  const [activeFeature, setActiveFeature] = useState('vision');
  const [isMounted, setIsMounted] = useState(false);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const { stream } = useCameraStream(); // ✅ FIXED: using stream directly
  const { detections, objectCounts, lastUpdateTime, hasDetections } = useDetectionSync();
  const modelViewerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Load model-viewer script manually when component mounts
    if (!modelViewerLoaded) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      script.type = 'module';
      script.onload = () => {
        setModelViewerLoaded(true);
        console.log("Model Viewer script loaded successfully");
      };
      script.onerror = (e) => {
        console.error("Error loading Model Viewer script:", e);
      };
      document.body.appendChild(script);
    }
  }, [modelViewerLoaded]);

  useEffect(() => {
    console.log("Demo page received detections:", detections?.length || 0);
  }, [detections]);

  const features = [
    {
      id: 'vision',
      title: 'AI Vision Enhancement',
      description: 'Experience real-time object detection and recognition with our advanced AI algorithms.',
      animation: 'fade-right'
    },
    {
      id: 'interface',
      title: 'Intuitive Interface',
      description: 'Control your experience with natural gestures and voice commands.',
      animation: 'fade-left'
    },
    {
      id: 'analytics',
      title: 'Real-time Analytics',
      description: 'Get instant feedback and detailed analysis of your surroundings.',
      animation: 'fade-up'
    }
  ];

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

            {/* WebcamDetection section */}
            {isMounted && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                  Live Object Detection
                </h2>
                <div className="max-w-3xl mx-auto">
                  <WebcamDetection />

                  {hasDetections ? (
                    <div className="mt-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Detection Results (Updated: {lastUpdateTime.toLocaleTimeString()})
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white text-lg mb-2">Objects Detected</h4>
                          <ul className="text-gray-300">
                            {Object.entries(objectCounts).map(([className, count]) => (
                              <li key={className} className="mb-1 flex justify-between">
                                <span>{className}</span>
                                <span className="font-semibold">{count}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white text-lg mb-2">Detection Summary</h4>
                          <p className="text-gray-300">
                            Total objects detected: {detections.length}
                          </p>
                          <p className="text-gray-300">
                            Object types: {Object.keys(objectCounts).length}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
                      <p className="text-gray-300">No objects detected yet. Try moving objects in front of the camera.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative h-[400px] w-full">
                {isMounted && modelViewerLoaded && (
                  <ModelViewer
                    ref={modelViewerRef}
                    src="/models/glasses.glb"
                    poster="/models/glasses-poster.webp"
                    alt="Percevia Smart Glasses"
                    autoRotate={true}
                  />
                )}
              </div>

              <div className="space-y-8">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-6 rounded-lg border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 cursor-pointer ${activeFeature === feature.id ? 'bg-blue-500/10 border-blue-500' : 'bg-black/50'}`}
                    onClick={() => setActiveFeature(feature.id)}
                    data-aos={feature.animation}
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
