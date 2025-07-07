import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import { ReactComponent as MountainSVG } from '../assets/mountain.svg';
import './RevealPage.css';

const RevealPage = () => {
  const [particles, setParticles] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showFinalReveal, setShowFinalReveal] = useState(false);
  const [showSecondOption, setShowSecondOption] = useState(false);
  // const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Start the reveal sequence with longer delays for more suspense
    setTimeout(() => setShowContent(true), 3000); // Longer initial wait
    setTimeout(() => setShowFinalReveal(true), 6000); // More suspense
    setTimeout(() => setShowSecondOption(true), 8000); // Staggered reveal
    // setTimeout(() => setShowButton(true), 10000); // Final button

    // Enhanced celebration particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3 + 6, // Start after the reveal
      duration: 3 + Math.random() * 3,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);

    // Add subtle sound effect simulation (visual feedback)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <div className="reveal-hero-bg">
      {/* Initial loading animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div 
            className="reveal-loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="reveal-loading-text"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing Your Surprise...
            </motion.div>
            <div className="reveal-loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="celebration-particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -1200],
            x: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Hero SVG with ocean theme */}
      <motion.div 
        className="reveal-mountain-bg" 
        initial={{ opacity: 0, scale: 1.2, y: 50 }} 
        animate={{ opacity: 0.15, scale: 1, y: 0 }} 
        transition={{ duration: 3, delay: 2 }}
      >
        {/* <MountainSVG /> */}
      </motion.div>

      {/* Centered glassmorphic card */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            className="reveal-glass-card"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div 
              className="reveal-drum-roll"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <motion.div 
                className="drum-roll-text"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Get Ready For...
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {showFinalReveal && (
                <>
                  <motion.h1 
                    className="reveal-congrats" 
                    initial={{ opacity: 0, y: -40, rotateX: -90 }} 
                    animate={{ opacity: 1, y: 0, rotateX: 0 }} 
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    Congratulations on Your Placement Jaane!
                  </motion.h1>
                  
                  <motion.p 
                    className="reveal-unlock" 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    You've worked so hard, and now it's time for a break...
                  </motion.p>
                  
                  <motion.h2 
                    className="reveal-title" 
                    initial={{ opacity: 0, scale: 0.9, x: -50 }} 
                    animate={{ opacity: 1, scale: 1, x: 0 }} 
                    transition={{ duration: 1.2, delay: 1 }}
                  >
                    A Fully-Sponsored Trek to Pin Bhaba Pass
                  </motion.h2>
                  
                  <AnimatePresence>
                    {showSecondOption && (
                      <>
                        <motion.p
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          OR
                        </motion.p>
                        
                        <motion.h2 
                          className="reveal-title" 
                          initial={{ opacity: 0, scale: 0.9, x: 50 }} 
                          animate={{ opacity: 1, scale: 1, x: 0 }} 
                          transition={{ duration: 1.2, delay: 0.8 }}
                        >
                          A Fully-Sponsored Trip with Aunty and Poopie
                        </motion.h2>
                      </>
                    )}
                  </AnimatePresence>

                  {/* <AnimatePresence>
                    {showButton && (
                      // <motion.div 
                      //   initial={{ opacity: 0, y: 30, scale: 0.9 }} 
                      //   animate={{ opacity: 1, y: 0, scale: 1 }} 
                      //   transition={{ duration: 1, delay: 0.5 }}
                      // >
                      //   <Link to="/trek-details" className="details-button">
                      //     See Your Gift Details
                      //   </Link>
                      // </motion.div>
                    )}
                  </AnimatePresence> */}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevealPage;