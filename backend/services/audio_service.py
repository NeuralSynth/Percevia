import pyttsx3
import logging
from config import TTS_RATE, TTS_VOLUME

logger = logging.getLogger(__name__)

class AudioService:
    def __init__(self):
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('rate', TTS_RATE)
            self.engine.setProperty('volume', TTS_VOLUME)
            self.is_active = True
        except Exception as e:
            logger.error(f"Failed to initialize TTS engine: {e}")
            self.is_active = False

    def announce_detections(self, detections):
        """Announce detected objects out loud."""
        if not self.is_active or not detections:
            return

        try:
            detected_classes = [detection["class"] for detection in detections]
            # Deduplicate classes for cleaner announcement
            unique_classes = list(dict.fromkeys(detected_classes))
            announcement = f"Detected: {', '.join(unique_classes)}"
            
            logger.info(f"Audio Announcement: {announcement}")
            self.engine.say(announcement)
            self.engine.runAndWait()
        except Exception as e:
            logger.error(f"Error during audio announcement: {e}")

# Singleton instance
audio_service = AudioService()
