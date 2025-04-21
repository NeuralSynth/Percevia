'use client';

import React, { createContext, useContext } from 'react';
import type { CameraContextType } from '../types/camera';

export const CameraContext = createContext<CameraContextType | null>(null);

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};