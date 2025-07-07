import mongoose from 'mongoose';

const quizProgressSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  currentStep: {
    type: Number,
    required: true,
    default: 1,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // This TTL index automatically deletes the document after 24 hours [cite: 94]
    expires: '24h',
  },
});

const QuizProgress = mongoose.model('QuizProgress', quizProgressSchema);

export default QuizProgress;