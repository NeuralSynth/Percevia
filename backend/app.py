import sys
import os
import numpy as np
import cv2
import logging
import time
from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

# Add current directory to path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import HOST, PORT, CORS_ORIGINS
from services.detection_service import detection_service
from services.audio_service import audio_service

# Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Flask & SocketIO Setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": CORS_ORIGINS}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

@socketio.on('connect')
def handle_connect():
    logger.info("Client connected via Socket.IO")

@socketio.on('disconnect')
def handle_disconnect():
    logger.info("Client disconnected")

@socketio.on('video-feed')
def handle_video_feed(data):
    """Handle incoming video frames for detection."""
    try:
        # data is expected to be a binary blob (bytes)
        nparr = np.frombuffer(data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            logger.warning("Received empty or invalid frame")
            return

        # 1. Detect objects
        detections = detection_service.process_frame(frame)

        # 2. Audio announcement (if enabled)
        audio_service.announce_detections(detections)

        # 3. Emit results back to client
        socketio.emit('detections', detections)

    except Exception as e:
        logger.error(f"Error handling video feed: {e}")

@app.route('/api/status', methods=['GET'])
def get_status():
    """Health check endpoint."""
    return jsonify({
        "status": "online",
        "timestamp": time.time(),
        "services": {
            "detection": "active",
            "audio": "active" if audio_service.is_active else "inactive"
        }
    })

if __name__ == '__main__':
    logger.info(f"Starting Percevia Backend on {HOST}:{PORT}")
    socketio.run(app, host=HOST, port=PORT, debug=False)
