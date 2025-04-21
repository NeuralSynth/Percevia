// CameraContext.tsx
'use client';

import React, { createContext, useContext, useRef, useState } from 'react';

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CameraContextType = {
  webcamRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  detections: BoundingBox[];
  setDetections: React.Dispatch<React.SetStateAction<BoundingBox[]>>;
  showGrid: boolean;
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CameraContext = createContext<CameraContextType | null>(null);

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (!context) throw new Error('useCamera must be used within CameraProvider');
  return context;
};

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<BoundingBox[]>([]);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  return (
    <CameraContext.Provider value={{ webcamRef, canvasRef, detections, setDetections, showGrid, setShowGrid }}>
      {children}
    </CameraContext.Provider>
  );
};