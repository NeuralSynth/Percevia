'use client';

import './model-viewer.css';
import React, { forwardRef, useRef } from 'react';

// Add type declaration for the model-viewer element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        poster?: string;
        alt?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        'tone-mapping'?: string;
        'shadow-intensity'?: number;
        exposure?: number;
        'auto-rotate'?: boolean;
      };
    }
  }
}

// Declare the custom HTML element type
declare global {
  interface HTMLElementTagNameMap {
    'model-viewer': HTMLElement;
  }
}

type ModelViewerProps = {
  src: string;
  poster: string;
  alt: string;
  autoRotate?: boolean;
  [key: string]: any; // for any additional props
};

const ModelViewer = React.forwardRef<HTMLElement, ModelViewerProps>(
  ({ src, poster, alt, autoRotate, ...rest }, ref) => {
    return (
      <model-viewer
        ref={ref}
        src={src}
        poster={poster}
        alt={alt}
        {...(autoRotate ? { 'auto-rotate': true } : {})}
        {...rest}
      />
    );
  }
);

ModelViewer.displayName = 'ModelViewer';

export { ModelViewer };

const App = () => {
  const modelViewerRef = useRef<HTMLElement>(null);

  return (
    <ModelViewer
      ref={modelViewerRef}
      src="/models/glasses.glb"
      poster="/models/glasses-poster.webp"
      alt="Percevia Smart Glasses"
      autoRotate={true}
    />
  );
};

export default App;