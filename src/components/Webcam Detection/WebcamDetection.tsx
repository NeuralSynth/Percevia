'use client';

import React, { useRef, useEffect, useState } from 'react';

// Custom hook for accessing the camera stream
export function useCameraStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function getStreamFromCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
    getStreamFromCamera();
  }, []);

  return { stream };
}

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const WebcamDetection: React.FC = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<BoundingBox[]>([]);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Use our custom hook instead of calling getUserMedia manually here
  const { stream } = useCameraStream();

  // Set the video element's srcObject when the stream is ready
  useEffect(() => {
    if (webcamRef.current && stream) {
      webcamRef.current.srcObject = stream;
    }
  }, [stream]);

  // Periodically capture frames and send them for detection
  useEffect(() => {
    const interval = setInterval(async () => {
      const video = webcamRef.current;
      if (!video) return;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg')
      );
      if (!blob) return;

      const formData = new FormData();
      formData.append('frame', blob);

      try {
        const response = await fetch('http://localhost:5000/detect', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setDetections(data.bounding_boxes || []);
      } catch (err) {
        console.error('Detection request failed:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Draw grid lines and detections on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = webcamRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // match canvas size to the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optionally draw grid lines
    if (showGrid) {
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      const thirdWidth = canvas.width / 3;
      const thirdHeight = canvas.height / 3;

      for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(thirdWidth * i, 0);
        ctx.lineTo(thirdWidth * i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, thirdHeight * i);
        ctx.lineTo(canvas.width, thirdHeight * i);
        ctx.stroke();
      }
    }

    // Draw detection bounding boxes
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    detections.forEach(({ x, y, width, height }) => {
      ctx.strokeRect(x, y, width, height);
    });
  }, [detections, showGrid]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <video
        ref={webcamRef}
        autoPlay
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
      />
      <button
        onClick={() => setShowGrid(prev => !prev)}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 3 }}
      >
        Toggle Grid
      </button>
    </div>
  );
};

export default WebcamDetection;
