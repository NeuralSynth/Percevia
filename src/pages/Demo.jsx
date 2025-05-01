import React from 'react';
import VideoProcessor from '../config/Video';

const Demo = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Live Object Detection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience real-time object detection using your webcam. Our system uses the
            advanced YOLOv8x model to detect and identify objects with high accuracy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6">
          <VideoProcessor />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                How it works
              </h3>
              <p className="text-sm text-gray-600">
                The detection is performed in real-time using YOLOv8x, one of the most
                advanced object detection models available. It can identify multiple
                objects simultaneously with high accuracy.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Tips
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Ensure good lighting for better detection</li>
                <li>• Keep objects within frame for accurate detection</li>
                <li>• Try moving objects slowly for better tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
