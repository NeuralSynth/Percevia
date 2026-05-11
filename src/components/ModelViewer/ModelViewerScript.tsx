'use client';

import Script from 'next/script';

export function ModelViewerScript() {
  return (
    <Script 
      src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" 
      type="module"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}