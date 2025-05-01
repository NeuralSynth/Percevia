import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Vision</h3>
            <p>Advanced Object Detection with YOLOv8x</p>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/demo">Live Demo</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://yolov8.com/" target="_blank" rel="noopener noreferrer">YOLOv8 Documentation</a></li>
                <li><a href="https://github.com/ultralytics/ultralytics/blob/main/docs/en/models/yolov8.md" target="_blank" rel="noopener noreferrer">YOLOv8 GitHub</a></li>
                <li><a href="https://github.com/STusharADS/Vision" target="_blank" rel="noopener noreferrer">Project Repository</a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {new Date().getFullYear()} Vision. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;