import { useDetection } from '@/contexts/DetectionContext';

/**
 * A hook that synchronizes with the camera detection results
 * and maintains a local state that can be used for rendering
 */
export function useDetectionSync() {
  const { detections, isConnected, startDetection, stopDetection, stream } = useDetection();

  // Generate object counts
  const getObjectCounts = () => {
    if (!detections || detections.length === 0) return {};

    const counts: Record<string, number> = {};
    detections.forEach(det => {
      counts[det.class] = (counts[det.class] || 0) + 1;
    });

    return counts;
  };

  return {
    detections,
    isConnected,
    objectCounts: getObjectCounts(),
    hasDetections: detections.length > 0,
    startDetection,
    stopDetection,
    stream
  };
}
