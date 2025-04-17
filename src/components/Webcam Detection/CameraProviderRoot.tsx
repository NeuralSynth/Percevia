// CameraProviderRoot.tsx
'use client';

import React from 'react';
import { CameraProvider } from './CameraContext';

export default function CameraProviderRoot() {
  return (
    <CameraProvider>
      <div id="camera-provider-initialized" data-testid="camera-provider-root" />
    </CameraProvider>
  );
}