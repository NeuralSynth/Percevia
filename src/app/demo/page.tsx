'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
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
  const { stream, detections, startDetection, stopDetection, isConnected } = useDetectionSync();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
    startDetection();
    return () => stopDetection();
  }, [startDetection, stopDetection]);

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

          context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          context.lineWidth = 1;

          for (let x = 1; x < cols; x++) {
            context.beginPath();
            context.moveTo(x * cellWidth, 0);
            context.lineTo(x * cellWidth, canvas.height);
            context.stroke();
          }
          for (let y = 1; y < rows; y++) {
            context.beginPath();
            context.moveTo(0, y * cellHeight);
            context.lineTo(canvas.width, y * cellHeight);
            context.stroke();
          }

          // Render detections
          context.strokeStyle = '#00ff00';
          context.lineWidth = 2;
          context.fillStyle = '#00ff00';
          context.font = '16px Inter';

          detections.forEach((det) => {
            const [x, y, w, h] = det.bbox;
            context.strokeRect(x, y, w, h);
            context.fillText(`${det.class} (${Math.round(det.confidence * 100)}%)`, x, y > 20 ? y - 5 : y + 20);
          });
        }
        requestRef.current = requestAnimationFrame(renderFrame);
      };

      const requestRef = { current: requestAnimationFrame(renderFrame) };
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [stream, detections]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {isMounted && <AnimatedBackground />}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-6 tracking-tight">
            Live AI Vision
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              Backend {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {!stream && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                  <p className="text-gray-400">Requesting camera access...</p>
                </div>
              )}
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4">Detection Insights</h3>
              <div className="flex flex-wrap gap-4">
                {detections.length === 0 ? (
                  <p className="text-gray-500 italic">No objects detected in frame.</p>
                ) : (
                  Array.from(new Set(detections.map(d => d.class))).map(cls => (
                    <span key={cls} className="px-4 py-2 bg-blue-500/10 border border-blue-500/50 rounded-full text-blue-400 text-sm font-medium">
                      {cls}: {detections.filter(d => d.class === cls).length}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 aspect-square flex items-center justify-center overflow-hidden">
               {isMounted && (
                  <ModelViewer
                    src="/components/Pricing/perceviatransparentglb.glb"
                    poster="/components/Pricing/poster.webp"
                    alt="Percevia Smart Glasses"
                    autoRotate={true}
                  />
                )}
            </div>

            <div className="space-y-4">
              {[
                { id: 'vision', title: 'Spatial Awareness', desc: 'Real-time 3D mapping and object localization.' },
                { id: 'audio', title: 'Vocal Feedback', desc: 'Audio cues and descriptions of your environment.' },
                { id: 'sync', title: 'Cloud Sync', desc: 'Instant updates across all your Percevia devices.' }
              ].map((feature) => (
                <div key={feature.id} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group cursor-pointer">
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
