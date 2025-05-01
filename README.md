# Vision Assistance App

## Overview
The **Vision Assistance App** is designed to empower individuals who are completely or heavily partially blind by helping them navigate the real world independently. Leveraging AI-powered object detection, haptic feedback, and emergency features, the app enhances accessibility and safety.

---
## ✨ Key Features

### 🔍 Object Detection & Distance Feedback
- Uses the mobile device’s camera to detect objects in real-time.
- Divides the field of view into a **9-quadrant grid (3x3)** for precise object localization.
- Estimates object distance and provides **intensity-based haptic feedback**.
- Recognizes common household items and human faces accurately.

### 🎛 Interactive Controls
- **On-Screen Buttons:**
  - **Describe Object in Detail:** Short description on tap, detailed info on long press.
  - **Call Emergency Contact:** Quick dial to a preset contact (family, caretaker, etc.).
  - **Customizable Buttons:**
    - Voice commands 🎙
    - Saving object details for later reference 📝
    - Adjusting vibration intensity ⚙
    - Toggling features on/off 📴
  - **Physical Button Shortcuts:** Volume and power button combinations for quick actions.

### 🚨 Emergency Features
- **GPS Functionality:** Navigation and location tracking 🗺
- **Fall Detection:** Auto emergency alert activation 📡
- **Medical Information Storage:** Quick access to health data for emergencies 🏥
- **Automated Emergency Messages:** Sends location and medical info to hospitals and family members 📩

### 🔧 Additional Functionalities
- **Voice Assistance:** Audio cues for enhanced interaction 🎙
- **Customizable Grid Layouts:** Choose between **3x3** or **2x4** grid systems 📐
- **AI-Powered Object Recognition:** Powered by **TensorFlow Lite, OpenCV, or YOLO** 🤖
- **Offline Functionality:** Essential features work without internet ⚡
- **Personalized Vibration Patterns:** Different haptic responses for various object types

---
## 🚀 How It Works
1. **Launch the app** 📲
2. **Point the camera at your surroundings** 🎥
3. **Receive real-time feedback** via haptic cues 📳
4. **Use on-screen or physical controls** for additional assistance 🎛
5. **Enable GPS navigation or emergency alerts** for added security 🗺

---
## 🛠 Tech Stack
- **Mobile Platforms:** Java/Kotlin (Android) | Swift (iOS)
- **Machine Learning:** TensorFlow Lite / OpenCV / YOLO
- **Haptic Feedback:** Android Vibration API, iOS Core Haptics
- **GPS & Emergency Alerts:** Google Maps API, Twilio API

---
## 📌 Future Enhancements
- 🌍 **Multi-language support** for global accessibility
- 🎵 **Dynamic sound cues** to aid navigation
- 🦾 **Integration with smart wearables** (e.g., smart glasses, AI-powered assistants)
- 🗂 **Cloud-based AI training** for improved object recognition

---
## 🏗 Installation & Setup
### Clone the repository:
```sh
git clone https://github.com/yourusername/Vision-Assistance-App.git
```
### Setup Instructions:
1. Open the project in **Android Studio/Xcode**.
2. Build and install the app on a test device.

---
## 📜 License
This project is licensed under the **MIT License**.

