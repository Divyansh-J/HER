import crypto from 'crypto';
import QuizProgress from '../models/quiz.model.js';

// Quiz content as defined in the project plan 
const quizQuestions = [
    {
        question: "What was the first movie we watched together in the theatre?",
        options: ["Shaitaan", "Inside Out 2", "Kalki", "Paddington 2"], // [cite: 81]
        correctAnswer: "Shaitaan"
    },
    {
        question: "What is the name of the chocolate that i gave you on our first date?",
        options: ["Silk", "KitKat", "Galaxy", "Milky Bar"], // [cite: 80]
        correctAnswer: "Galaxy"
    },

    {
        question: "Which was the first book you gave me to read?",
        options: ["The Alchemist", "The Kite Runner", "Thousand Splendid Suns", "The Monk who sold his Ferrari"], // [cite: 82]
        correctAnswer: "The Kite Runner"
    },
    {
        question: "When we had our first kiss, what was the song playing in the background?",
        options: ["Until i found you", "Mishri", "Humara Ho Gaya", "One of us cannot be wrong"], // [cite: 79]
        correctAnswer: "One of us cannot be wrong"
    },
    {
        question: "Why is love you so much?", // [cite: 83]
        options: ["Because you are my best friend and i love you", "Because are an amazing person", "Because you are hot and interesting", "All of the above"], // [cite: 84]
        correctAnswer: "All of the above"
    }
];

// @desc    Initializes a new quiz session [cite: 33]
export const startQuiz = async (req, res) => {
    const sessionId = crypto.randomBytes(16).toString('hex');
    try {
        await QuizProgress.create({ sessionId, currentStep: 1, isComplete: false });
        res.status(200).json({ sessionId, totalSteps: quizQuestions.length });
    } catch (error) {
        res.status(500).json({ message: "Error starting quiz", error: error.message });
    }
};

// @desc    Fetches a question for a specific step [cite: 33]
export const getQuestion = (req, res) => {
    const step = parseInt(req.params.step, 10);
    if (step > 0 && step <= quizQuestions.length) {
        const { question, options } = quizQuestions[step - 1];
        res.status(200).json({ question, options });
    } else {
        res.status(404).json({ message: "Question not found" });
    }
};

// @desc    Submits an answer and validates it [cite: 33]
export const submitAnswer = async (req, res) => {
    const { sessionId, step, answer } = req.body;
    const currentQuestion = quizQuestions[step - 1];

    if (!currentQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = currentQuestion.correctAnswer === answer;

    if (isCorrect) {
        try {
            const isLastStep = step === quizQuestions.length;
            const updatedProgress = await QuizProgress.findOneAndUpdate(
                { sessionId },
                { currentStep: step + 1, isComplete: isLastStep },
                { new: true }
            );
            if (!updatedProgress) {
                return res.status(404).json({ message: "Session not found" });
            }
            res.status(200).json({ correct: true, nextStep: step + 1 });
        } catch (error) {
            res.status(500).json({ message: "Error updating progress", error: error.message });
        }
    } else {
        res.status(200).json({ correct: false }); // As per plan, don't reveal the answer [cite: 86]
    }
};

// @desc    Retrieves the current progress for a session [cite: 33]
export const getStatus = async (req, res) => {
    try {
        const session = await QuizProgress.findOne({ sessionId: req.params.sessionId });
        if (session) {
            res.status(200).json({ currentStep: session.currentStep, isComplete: session.isComplete });
        } else {
            res.status(404).json({ message: "Session not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching status", error: error.message });
    }
};