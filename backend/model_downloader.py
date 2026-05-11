import torch
import os
import logging
import urllib.request

logger = logging.getLogger(__name__)

# Model URLs - you can choose the appropriate one
MODEL_URLS = {
    'yolov8n': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt',
    'yolov8s': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8s.pt',
    'yolov8m': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8m.pt',
    'yolov8l': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8l.pt',
    'yolov8x': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8x.pt',
    #'yolov8x-seg': 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8x-seg.pt'
}

def download_model(model_name='yolov8x', models_dir='models'):
    """
    Downloads the specified YOLOv8 model if it doesn't exist locally.
    
    Args:
        model_name: Name of the model to download ('yolov8n', 'yolov8s', 'yolov8m', 'yolov8l', 'yolov8x')
        models_dir: Directory to save the model
        
    Returns:
        Path to the downloaded model
    """
    # Create models directory if it doesn't exist
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = os.path.join(models_dir, f"{model_name}.pt")
    
    # Check if model already exists
    if not os.path.exists(model_path):
        logger.info(f"Downloading {model_name} model...")
        if model_name not in MODEL_URLS:
            raise ValueError(f"Model {model_name} not found in available models")
        
        # Download the model
        try:
            urllib.request.urlretrieve(MODEL_URLS[model_name], model_path)
            logger.info(f"Model downloaded to {model_path}")
        except Exception as e:
            logger.error(f"Error downloading model: {e}")
            raise
    else:
        logger.info(f"Model already exists at {model_path}")
    
    return model_path

def load_yolo_model(model_name='yolov8x', device='cuda'):
    """Load a YOLO model and return it for inference."""
    try:
        # Check if CUDA is available
        if not torch.cuda.is_available() and device == 'cuda':
            logger.warning("CUDA not available, using CPU instead")
            device = 'cpu'
        
        # Import here to avoid importing unnecessary modules
        from ultralytics import YOLO
        
        logger.info(f"Loading {model_name} model on {device}...")
        
        # Path to model weights
        weights_path = f'weights/{model_name}.pt'
        
        # Check if model exists, if not download it
        if not os.path.exists(weights_path):
            os.makedirs('weights', exist_ok=True)
            logger.info(f"Model not found, downloading {model_name}...")
            # This will download the model if it doesn't exist
            model = YOLO(model_name)
        else:
            logger.info(f"Loading model from {weights_path}")
            model = YOLO(weights_path)
        
        # Move model to device
        model.to(device)
        
        logger.info(f"Model {model_name} loaded successfully")
        return model
    
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise