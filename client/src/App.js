import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the LandingPage component
import LandingPage from './pages/LandingPage';

// These will be built next
import QuizPage from './pages/QuizPage';
import RevealPage from './pages/RevealPage';
import TrekInfoPage from './pages/TrekInfoPage';
import LetterPage from './pages/LetterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Activate the route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="/reveal" element={<RevealPage />} /> 
        <Route path="/trek-details" element={<TrekInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;