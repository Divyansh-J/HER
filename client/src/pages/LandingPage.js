import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitText from '../components/SplitText';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Nature-inspired decorative elements */}
      <div className="nature-decoration top-left"></div>
      <div className="nature-decoration bottom-right"></div>

      <motion.h1 
        className="landing-headline"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        A New Chapter Begins—<br />Mubarka Veere!
      </motion.h1>

      <SplitText
        className="landing-subtitle"
        text="To celebrate your amazing achievement and Relentless efforts, a special surprise awaits..."
        splitType="words"
        delay={50}
        duration={0.8}
        ease="power3.out"
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Link to="/quiz" className="journey-button">
          Unwrap Your Surprise
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;