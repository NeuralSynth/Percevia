'use client';

import React, { useEffect, useRef, useState } from 'react';

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

  // Stream video feed to the backend via WebSocket
  useEffect(() => {
    if (!stream) return;

    const socket = new WebSocket('ws://localhost:5000/video-feed');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    const sendVideoFeed = () => {
      const video = webcamRef.current;
      if (!video) return;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a Blob
        canvas.toBlob((blob) => {
          if (blob && socket.readyState === WebSocket.OPEN) {
            socket.send(blob); // Send the video frame as a Blob to the backend
          }
        }, 'image/jpeg');
      }

      requestAnimationFrame(sendVideoFeed); // Continuously send frames
    };

    sendVideoFeed();

    return () => {
      socket.close(); // Clean up the WebSocket connection on component unmount
    };
  }, [stream]);

  return (
    <div className="relative">
      <video
        ref={webcamRef}
        autoPlay
        muted
        playsInline
        className="w-full border border-gray-700 rounded-lg"
      ></video>
      {showGrid && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ></canvas>
      )}
    </div>
  );
};

export default WebcamDetection;
