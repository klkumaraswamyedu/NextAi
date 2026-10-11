import { isDbConnected } from '../config/db.js';

export const getHealth = (req, res) => {
  const dbConnected = isDbConnected();

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      service: 'NextStep AI - Modular Web Intelligence Platform API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbConnected,
        status: dbConnected ? 'connected' : 'disconnected/memory-fallback'
      },
      phase: 'Phase 1 - Scaffolding, Schemas & Development Fixtures',
      activeServices: ['STUDENT_OPPORTUNITIES', 'GOVERNMENT_SCHEMES']
    }
  });
};
