// /client/src/hooks/useQuiz.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const useQuiz = () => {
  const [sessionId, setSessionId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', type: '' }); // type: 'correct' or 'incorrect'
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const navigate = useNavigate();

  const fetchQuestion = useCallback(async (step) => {
    if (step > totalSteps && totalSteps > 0) {
      console.log('[DEBUG] Quiz complete! Navigating to the letter page.');
      navigate('/letter');
      return;
    }
    setLoading(true);
    setFeedback({ message: '', type: '' });
    setSelectedAnswer(null);
    try {
      console.log(`[DEBUG] Fetching question for step: ${step}`);
      const response = await axios.get(`${API_URL}/api/quiz/question/${step}`);
      setQuestionData(response.data);
      console.log('[DEBUG] Received question data:', response.data);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, [totalSteps, navigate]);

  const startQuiz = useCallback(async () => {
    try {
      console.log('[DEBUG] Initializing quiz...');
      const response = await axios.get(`${API_URL}/api/quiz/start`);
      const { sessionId, totalSteps } = response.data;
      setSessionId(sessionId);
      setTotalSteps(totalSteps);
      setCurrentStep(1);
      console.log(`[DEBUG] Session started. ID: ${sessionId}, Total Steps: ${totalSteps}`);
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  }, []);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  useEffect(() => {
    if (currentStep > 0) {
      fetchQuestion(currentStep);
    }
  }, [currentStep, fetchQuestion]);

  const handleAnswerSubmit = async (answer) => {
    setSelectedAnswer(answer);
    setLoading(true);
    console.log(`[DEBUG] Submitting answer: "${answer}" for step: ${currentStep}`);
    try {
      const response = await axios.post(`${API_URL}/api/quiz/answer`, {
        sessionId,
        step: currentStep,
        answer,
      });
      console.log('[DEBUG] API Response for answer:', response.data);

      if (response.data.correct) {
        setFeedback({ message: 'Correct!', type: 'correct' });
        setTimeout(() => {
          setCurrentStep(response.data.nextStep);
        }, 1000); // Wait 1 sec before moving to next question
      } else {
        setFeedback({ message: 'Try again!', type: 'incorrect' });
        setTimeout(() => {
          setFeedback({ message: '', type: '' });
          setSelectedAnswer(null); // Reset for another try
        }, 1500); // Show incorrect feedback for 1.5 secs
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, currentStep, totalSteps, questionData, feedback, selectedAnswer, handleAnswerSubmit };
};