import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const PORT = process.env.PORT || 5000;

const startServer = () => {
  const app = createApp();
  
  app.listen(PORT, () => {
    console.log(`[Server] Engine running on http://localhost:${PORT}`);
  });
};

startServer();