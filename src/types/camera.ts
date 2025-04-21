export type Detection = {
  class: string;
  confidence: number;
  bbox: number[];
  quadrant: string;
};

export type DetectionResult = {
  detections: Detection[];
  performance: {
    total_detections: number;
    filtered_detections: number;
    image_size: number[];
    confidence_threshold: number;
  };
};

export type CameraContextType = {
  stream: MediaStream | null;
  getStream: () => Promise<MediaStream | null>;
  error: string | null;
  frameData: string | null;
  detections: Detection[];
  captureFrame: () => Promise<string | null>;
  updateDetections: (detections: Detection[]) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
};