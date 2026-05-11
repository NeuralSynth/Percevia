export interface Detection {
  class: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, w, h]
}

export interface DetectionContextType {
  stream: MediaStream | null;
  detections: Detection[];
  isConnected: boolean;
  error: string | null;
  startDetection: () => Promise<void>;
  stopDetection: () => void;
}
