import cv2
import torch
import logging
import numpy as np
from model_downloader import load_yolo_model
from config import MODEL_NAME, CONF_THRESHOLD, IOU_THRESHOLD, IMG_SIZE

logger = logging.getLogger(__name__)

class DetectionService:
    def __init__(self):
        logger.info(f"Initializing DetectionService with model: {MODEL_NAME}")
        self.model = load_yolo_model(model_name=MODEL_NAME)
        logger.info("YOLO model loaded successfully.")

    def process_frame(self, frame):
        """Process a single video frame and return detections."""
        try:
            # Convert the frame to RGB
            img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Resize the image to the model's input size
            img_resized = cv2.resize(img_rgb, (IMG_SIZE, IMG_SIZE))

            # Convert the image to a tensor
            img_tensor = torch.from_numpy(img_resized).float()
            img_tensor = img_tensor.permute(2, 0, 1).unsqueeze(0) / 255.0  # Normalize

            # Run inference
            with torch.no_grad():
                results = self.model(img_tensor, conf=CONF_THRESHOLD, iou=IOU_THRESHOLD, verbose=False)

            # Extract detections
            detections = []
            if hasattr(results[0], 'boxes') and len(results[0].boxes) > 0:
                for box in results[0].boxes:
                    xyxy = box.xyxy[0].cpu().numpy()
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    
                    detections.append({
                        "class": self.model.names[class_id] if class_id in self.model.names else f"unknown_{class_id}",
                        "confidence": round(confidence, 4),
                        "bbox": [
                            int(xyxy[0]), 
                            int(xyxy[1]), 
                            int(xyxy[2] - xyxy[0]), 
                            int(xyxy[3] - xyxy[1])
                        ]
                    })

            return detections
        except Exception as e:
            logger.error(f"Error processing frame: {e}")
            return []

# Singleton instance
detection_service = DetectionService()
