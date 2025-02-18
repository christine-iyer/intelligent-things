import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import openaiRoutes from './routes/openaiRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/todos', todoRoutes); // Routes for CRUD operations
app.use('/api/ai', openaiRoutes);  // Routes for AI-powered features

export default app;