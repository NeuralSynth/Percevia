import numpy as np
import cv2
import logging
import torch
import time
import pyttsx3  # Text-to-speech library
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from model_downloader import load_yolo_model

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})
socketio = SocketIO(app, cors_allowed_origins="*")

# YOLO model configuration
CONF_THRESHOLD = 0.05
IOU_THRESHOLD = 0.3
IMG_SIZE = 640

# Initialize text-to-speech engine
tts_engine = pyttsx3.init()
tts_engine.setProperty('rate', 150)  # Set speech rate
tts_engine.setProperty('volume', 1.0)  # Set volume (1.0 is max)

# Load YOLO model
logger.info("Loading YOLO model...")
model = load_yolo_model(model_name='yolov8x')
logger.info("YOLO model loaded successfully.")

def announce_detections(detections):
    """Announce detected objects out loud."""
    if detections:
        detected_classes = [detection["class"] for detection in detections]
        announcement = f"Detected: {', '.join(detected_classes)}"
        logger.info(announcement)
        tts_engine.say(announcement)
        tts_engine.runAndWait()

def process_frame(frame):
    """Process a single video frame using YOLO."""
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
            results = model(img_tensor, conf=CONF_THRESHOLD, iou=IOU_THRESHOLD, verbose=False)

        # Extract detections
        detections = []
        if hasattr(results[0], 'boxes') and len(results[0].boxes) > 0:
            for box in results[0].boxes:
                xyxy = box.xyxy[0].cpu().numpy()
                class_id = int(box.cls[0])
                confidence = float(box.conf[0])
                detections.append({
                    "class": model.names[class_id] if class_id in model.names else f"unknown_{class_id}",
                    "confidence": round(confidence, 4),
                    "bbox": [int(xyxy[0]), int(xyxy[1]), int(xyxy[2] - xyxy[0]), int(xyxy[3] - xyxy[1])]
                })

        # Announce detections
        announce_detections(detections)

        return detections
    except Exception as e:
        logger.error(f"Error processing frame: {e}")
        return []

@socketio.on('connect')
def handle_connect():
    logger.info("Client connected to WebSocket.")

@socketio.on('disconnect')
def handle_disconnect():
    logger.info("Client disconnected from WebSocket.")

@socketio.on('video-feed')
def handle_video_feed(data):
    """Handle incoming video feed frames."""
    try:
        # Decode the incoming frame
        nparr = np.frombuffer(data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Process the frame with YOLO
        detections = process_frame(frame)

        # Emit the detections back to the client
        socketio.emit('detections', detections)
    except Exception as e:
        logger.error(f"Error handling video feed: {e}")

@app.route('/api/status', methods=['GET'])
def api_status():
    """Endpoint to check if the API is running."""
    return jsonify({
        "status": "online",
        "model": "YOLOv8x",
        "timestamp": time.time()
    })

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
