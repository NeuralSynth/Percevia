'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDetection } from '@/contexts/DetectionContext';

const WebcamDetection: React.FC = () => {
  const { stream, detections, startDetection, stopDetection, isConnected } = useDetection();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  useEffect(() => {
    startDetection();
    return () => stopDetection();
  }, [startDetection, stopDetection]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      const draw = () => {
        if (!ctx || video.videoWidth === 0) {
          requestAnimationFrame(draw);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (showGrid) {
          const rows = 3;
          const cols = 3;
          const cellWidth = canvas.width / cols;
          const cellHeight = canvas.height / rows;

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;

          for (let i = 1; i < cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellWidth, 0);
            ctx.lineTo(i * cellWidth, canvas.height);
            ctx.stroke();
          }
          for (let i = 1; i < rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * cellHeight);
            ctx.lineTo(canvas.width, i * cellHeight);
            ctx.stroke();
          }
        }

        // Draw Detections
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.fillStyle = '#00ff00';
        ctx.font = '18px sans-serif';

        detections.forEach(det => {
          const [x, y, w, h] = det.bbox;
          ctx.strokeRect(x, y, w, h);
          ctx.fillText(`${det.class} (${Math.round(det.confidence * 100)}%)`, x, y > 20 ? y - 10 : y + 25);
        });

        requestAnimationFrame(draw);
      };

      const animId = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(animId);
    }
  }, [detections, showGrid]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-medium uppercase tracking-widest text-gray-300">
            {isConnected ? 'Backend Active' : 'Backend Offline'}
          </span>
        </div>
        <button 
          onClick={() => setShowGrid(!showGrid)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
      </div>

      <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Initializing vision system...</p>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        ></canvas>
      </div>
      
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
        <h3 className="text-lg font-bold mb-4">Detected Objects</h3>
        <div className="flex flex-wrap gap-3">
          {detections.length === 0 ? (
            <p className="text-gray-500 italic">Scanning environment...</p>
          ) : (
            Array.from(new Set(detections.map(d => d.class))).map(cls => (
              <div key={cls} className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-blue-100 font-medium">{cls}</span>
                <span className="text-blue-400/60 text-xs">x{detections.filter(d => d.class === cls).length}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamDetection;
