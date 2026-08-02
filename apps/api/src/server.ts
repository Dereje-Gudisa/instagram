import 'dotenv/config';
import { createApp } from './app';
import { connectDB } from './db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // 1. First, connect to the database (The Fridge)
  await connectDB();
  // 2. Second, instantiate the Express app (The Engine)
  const app = createApp();
  // 3. Third, start listening on the network port
  app.listen(PORT, () => {
    console.log(`[Server] Engine running on http://localhost:${PORT}`);
  });
};

startServer();