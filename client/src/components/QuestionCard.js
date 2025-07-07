import React from 'react';
import { motion } from 'framer-motion';
import './QuestionCard.css';

const QuestionCard = ({ data, onAnswerSubmit, feedback, selectedAnswer }) => {
  if (!data) return null;

  const getButtonClass = (option) => {
    if (option !== selectedAnswer) return 'option-button';
    return `option-button ${feedback.type}`; // 'correct' or 'incorrect'
  };

  return (
    <motion.div
      className="question-card"
      key={data.question} // Animate when question changes
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="question-text">{data.question}</h2>
      <div className="options-grid">
        {data.options.map((option, index) => (
          <button
            key={index}
            className={getButtonClass(option)}
            onClick={() => onAnswerSubmit(option)}
            disabled={!!selectedAnswer} // Disable buttons after an answer is selected
          >
            {option}
          </button>
        ))}
      </div>
      {feedback.message && (
         <p className={`feedback-text ${feedback.type}`}>{feedback.message}</p>
      )}
    </motion.div>
  );
};

export default QuestionCard;