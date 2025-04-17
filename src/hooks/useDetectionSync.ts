import { useState, useEffect } from 'react';
import { useCameraStream } from '@/components/Webcam Detection/WebcamDetection';

// Type for detections from the camera context
type Detection = {
  class: string;
  confidence: number;
  bbox: number[];
  quadrant: string;
};

/**
 * A hook that synchronizes with the camera detection results
 * and maintains a local state that can be used for rendering
 */
export function useDetectionSync() {
  const { detections } = useCameraStream();
  const [localDetections, setLocalDetections] = useState<Detection[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  // Update local state when context detections change
  useEffect(() => {
    if (detections && detections.length >= 0) {
      console.log("useDetectionSync: Updating local detections", detections.length);
      setLocalDetections(detections);
      setLastUpdateTime(new Date());
    }
  }, [detections]);

  // Generate object counts
  const getObjectCounts = () => {
    if (!localDetections || localDetections.length === 0) return {};

    const counts: Record<string, number> = {};
    localDetections.forEach(det => {
      counts[det.class] = (counts[det.class] || 0) + 1;
    });

    return counts;
  };

  return {
    detections: localDetections,
    lastUpdateTime,
    objectCounts: getObjectCounts(),
    hasDetections: localDetections.length > 0
  };
}
