import os

# Server Configuration
HOST = '0.0.0.0'
PORT = 5000
CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5173"]

# YOLO Configuration
MODEL_NAME = 'yolov8x'
CONF_THRESHOLD = 0.05
IOU_THRESHOLD = 0.3
IMG_SIZE = 640

# Audio Configuration
TTS_RATE = 150
TTS_VOLUME = 1.0

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_DIR = os.path.join(BASE_DIR, 'weights')
COCO_NAMES_PATH = os.path.join(BASE_DIR, 'coco.names')
