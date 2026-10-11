import { createApp } from './src/app.js';
import { env } from './src/config/env.js';
import { connectDatabase } from './src/config/db.js';

const startServer = async () => {
  // Connect to Database (gracefully proceeds even if DB is offline in dev)
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`=======================================================`);
    console.log(` NextStep AI Backend Server Running`);
    console.log(` Environment : ${env.NODE_ENV}`);
    console.log(` Port        : ${env.PORT}`);
    console.log(` Healthcheck : http://localhost:${env.PORT}/api/health`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('Shutting down NextStep AI server gracefully...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
