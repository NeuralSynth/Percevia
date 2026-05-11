'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { socketService } from '@/lib/socket';
import { Detection, DetectionContextType } from '@/types';

const DetectionContext = createContext<DetectionContextType | undefined>(undefined);

export const DetectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();

  const [socket, setSocket] = useState<any>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const s = socketService.connect();
    socketRef.current = s;
    setSocket(s);

    s.on('connect', () => setIsConnected(true));
    s.on('disconnect', () => setIsConnected(false));
    s.on('detections', (data: Detection[]) => {
      setDetections(data);
    });

    return () => {
      s.off('connect');
      s.off('disconnect');
      s.off('detections');
    };
  }, []);

  const captureAndSendFrame = useCallback(() => {
    if (!videoRef.current || !socket?.connected) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      requestRef.current = requestAnimationFrame(captureAndSendFrame);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          socket.emit('video-feed', blob);
        }
      }, 'image/jpeg', 0.6); // Reduced quality for faster transmission
    }

    requestRef.current = requestAnimationFrame(captureAndSendFrame);
  }, [socket]);

  const startDetection = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          frameRate: { ideal: 15 } // Limit frame rate for processing
        } 
      });
      
      setStream(mediaStream);
      
      const video = document.createElement('video');
      video.srcObject = mediaStream;
      video.muted = true;
      video.play();
      videoRef.current = video;

      requestRef.current = requestAnimationFrame(captureAndSendFrame);
      setError(null);
    } catch (err) {
      console.error('Error starting detection:', err);
      setError('Failed to access camera');
    }
  }, [captureAndSendFrame]);

  const stopDetection = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setDetections([]);
    videoRef.current = null;
  }, [stream]);

  useEffect(() => {
    return () => stopDetection();
  }, [stopDetection]);

  return (
    <DetectionContext.Provider value={{ 
      stream, 
      detections, 
      isConnected, 
      error, 
      startDetection, 
      stopDetection 
    }}>
      {children}
    </DetectionContext.Provider>
  );
};

export const useDetection = () => {
  const context = useContext(DetectionContext);
  if (context === undefined) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }
  return context;
};
