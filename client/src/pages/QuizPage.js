import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import './QuizPage.css';

const QuizPage = () => {
  const { loading, currentStep, totalSteps, questionData, feedback, selectedAnswer, handleAnswerSubmit } = useQuiz();

  useEffect(() => {
    // Dynamic Color Palette Logic
    console.log(`[DEBUG] Current step is ${currentStep}. Checking for color change.`);
    const root = document.documentElement;
    
    if (currentStep >= 5) {
      console.log('[DEBUG] Applying Desert Vista palette.');
      root.style.setProperty('--main-bg', 'var(--main-bg-desert)');
      root.style.setProperty('--text-color', 'var(--text-color-desert)');
      root.style.setProperty('--accent-color', 'var(--accent-color-desert)');
      root.style.setProperty('--accent-text', 'var(--accent-text-desert)');
      root.style.setProperty('--surface-color', 'var(--surface-color-desert)');
      root.style.setProperty('--border-color', 'var(--border-color-desert)');
    } else if (currentStep >= 3) {
      console.log('[DEBUG] Applying Alpine Pass palette.');
      root.style.setProperty('--main-bg', 'var(--main-bg-alpine)');
      root.style.setProperty('--text-color', 'var(--text-color-alpine)');
      root.style.setProperty('--accent-color', 'var(--accent-color-alpine)');
      root.style.setProperty('--accent-text', 'var(--accent-text-alpine)');
      root.style.setProperty('--surface-color', 'var(--surface-color-alpine)');
      root.style.setProperty('--border-color', 'var(--border-color-alpine)');
    } else {
      console.log('[DEBUG] Applying Lush Valley palette.');
      root.style.setProperty('--main-bg', 'var(--main-bg)');
      root.style.setProperty('--text-color', 'var(--text-color)');
      root.style.setProperty('--accent-color', 'var(--accent-color)');
      root.style.setProperty('--accent-text', 'var(--accent-text)');
      root.style.setProperty('--surface-color', 'var(--surface-color)');
      root.style.setProperty('--border-color', 'var(--border-color)');
    }
  
    // Cleanup function
    return () => {
      console.log('[DEBUG] QuizPage unmounted. Resetting color palette.');
      root.style.setProperty('--main-bg', '#FAF9F6');
      root.style.setProperty('--text-color', '#2C3E50');
      root.style.setProperty('--accent-color', '#7FB069');
      root.style.setProperty('--accent-text', '#FAF9F6');
      root.style.setProperty('--surface-color', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--border-color', 'rgba(127, 176, 105, 0.2)');
    };
  
  }, [currentStep]);

  return (
    <div className="quiz-page-container">
      {totalSteps > 0 && <ProgressBar current={currentStep} total={totalSteps} label="Your Journey" />}
      <div style={{textAlign: 'center', margin: '0 0 1.5rem 0', fontFamily: 'var(--body-font)', color: 'var(--text-color)', fontSize: '1.1rem', opacity: 0.8}}>
        You've already achieved so much—let's see what's next!
      </div>
      <AnimatePresence mode="wait">
        {loading && !questionData && <p className="loading-text">Your adventure is loading...</p>}
        {!loading && questionData && (
          <QuestionCard
            data={questionData}
            onAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
            selectedAnswer={selectedAnswer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;