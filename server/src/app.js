import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, AppError } from './middleware/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import studentRoutes from './routes/student.routes.js';
import governmentRoutes from './routes/government.routes.js';
import jobsRoutes from './routes/jobs.routes.js';

export const createApp = () => {
  const app = express();

  // Basic Security & Parsing Middleware
  app.use(cors({
    origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // API Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/government', governmentRoutes);
  app.use('/api/jobs', jobsRoutes);

  // Catch-all 404 handler
  app.use('*', (req, res, next) => {
    next(new AppError(`Endpoint '${req.originalUrl}' not found on this server`, 404, 'NOT_FOUND'));
  });

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};
