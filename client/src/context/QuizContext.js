import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL
  });

  const startNewQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/quiz/start');
      const { sessionId, totalSteps } = response.data;
      setSessionId(sessionId);
      setTotalSteps(totalSteps);
      setCurrentStep(1); // Start at the first question
    } catch (error) {
      console.error("Failed to start quiz", error);
    }
  }, [api]);

  const fetchQuestion = useCallback(async (step) => {
    if (step > 0 && step <= totalSteps) {
        try {
            setLoading(true);
            const response = await api.get(`/api/quiz/question/${step}`);
            setCurrentQuestion(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch question", error);
            setLoading(false);
        }
    }
  }, [api, totalSteps]);

  const submitAnswer = async (answer) => {
      if (!sessionId) return;
      try {
          const response = await api.post('/api/quiz/answer', { sessionId, step: currentStep, answer });
          if(response.data.correct) {
              const nextStep = response.data.nextStep;
              if (nextStep > totalSteps) {
                  setIsComplete(true);
              } else {
                  setCurrentStep(nextStep);
              }
          } else {
              // Handle incorrect answer feedback here if needed
              alert("Try again!"); // Simple feedback as per the plan
          }
      } catch (error) {
          console.error("Failed to submit answer", error);
      }
  };

  useEffect(() => {
    // This effect runs when the component mounts to start the quiz
    startNewQuiz();
  }, [startNewQuiz]);

  useEffect(() => {
    // This effect fetches a new question whenever the step changes
    if (currentStep > 0) {
        fetchQuestion(currentStep);
    }
  }, [currentStep, fetchQuestion]);

  useEffect(() => {
      if (isComplete) {
          navigate('/reveal');
      }
  }, [isComplete, navigate]);

  const value = { currentStep, totalSteps, currentQuestion, loading, submitAnswer };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};