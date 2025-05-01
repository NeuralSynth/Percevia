import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { motion } from 'framer-motion';
import './Video.css';

const VideoProcessor = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('video');
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  // Load the COCO-SSD model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        const loadedModel = await cocossd.load();
        setModel(loadedModel);
        setIsModelLoading(false);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
        setIsModelLoading(false);
      }
    };
    loadModel();
  }, []);

  // Process video frames
  useEffect(() => {
    if (mode === 'video' && model) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          } 
        })
        .then(stream => {
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          alert("Error accessing camera. Please make sure you have granted camera permissions.");
        });
      }

      let animationFrameId;
      let isDetecting = false;

      const detectFrame = async () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA && !isDetecting) {
          // Set canvas dimensions
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          if (!isDetecting) {
            isDetecting = true;
            try {
              // Detect objects
              const predictions = await model.detect(video);
              setDetections(predictions);

              // Draw detections
              predictions.forEach(prediction => {
                const [x, y, width, height] = prediction.bbox;
                
                // Draw bounding box with gradient
                ctx.strokeStyle = '#60A5FA';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);

                // Draw label with modern style
                const label = `${prediction.class} ${Math.round(prediction.score * 100)}%`;
                ctx.font = '16px Inter, sans-serif';
                const labelWidth = ctx.measureText(label).width + 20;

                // Create gradient background for label
                const gradient = ctx.createLinearGradient(x, y, x + labelWidth, y);
                gradient.addColorStop(0, 'rgba(96, 165, 250, 0.9)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.9)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y - 30, labelWidth, 30);

                // Add white text
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(label, x + 10, y - 10);
              });
            } catch (error) {
              console.error('Error detecting objects:', error);
            }
            isDetecting = false;
          }
        }
        animationFrameId = requestAnimationFrame(detectFrame);
      };

      detectFrame();

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (video.srcObject) {
          const tracks = video.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [mode, model]);

  return (
    <motion.div 
      className="demo-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="demo-content">
        <motion.div 
          className="demo-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>Live Object Detection</h1>
          <p>Experience real-time object detection powered by YOLOv8x</p>
        </motion.div>

        <motion.div 
          className="video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isModelLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading YOLOv8x model...</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="video-element"
                playsInline
                muted
              />
              <canvas
                ref={canvasRef}
                className="canvas-element"
              />
            </>
          )}
        </motion.div>

        <motion.div 
          className="detections-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Detected Objects</h2>
          <div className="detections-list">
            {detections.map((detection, index) => (
              <motion.div
                key={index}
                className="detection-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="detection-label">{detection.class}</span>
                <span className="detection-confidence">
                  {Math.round(detection.score * 100)}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoProcessor;
