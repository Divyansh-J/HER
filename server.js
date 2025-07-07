// Update your server.js file

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import quizRoutes from './routes/quiz.routes.js'; // <-- IMPORT THE ROUTES

// Establish Database Connection
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

// Mount the API routes [cite: 19]
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));