import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const features = [
  {
    title: "Real-time Detection",
    description: "Experience instant object detection powered by YOLOv8x, offering superior accuracy and speed.",
    image: "./images/hero.jpg",
    color: "blue-purple"
  },
  {
    title: "Advanced AI Model",
    description: "Utilizing the latest YOLOv8x model for state-of-the-art object detection and classification.",
    image: "./images/hero3.jpeg",
    color: "green-blue"
  },
  {
    title: "Multiple Objects",
    description: "Detect and track multiple objects simultaneously with high precision and confidence scores.",
    image: "./images/hero2.jpeg",
    color: "purple-pink"
  },
  {
    title: "Optimized Performance",
    description: "Enhanced image processing and detection algorithms for optimal CPU performance.",
    image: "./images/hero4.jpeg",
    color: "orange-red"
  }
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-gradient" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src="./images/herovideo.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1>Real-time Object Detection</h1>
            <p>
              Experience the power of computer vision with our advanced object detection system.
              Powered by YOLOv8x for superior accuracy and real-time performance.
            </p>
            <Link to="/demo" className="cta-button">
              Try Live Demo
              <svg
                className="arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="masonry-grid"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`feature-card gradient-${feature.color}`}
              >
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-image">
                    <img
                      src={feature.image}
                      alt={feature.title}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
