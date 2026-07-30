import express, { Application, Request, Response } from 'express';
import cors from 'cors';

export const createApp = (): Application => {
    
  const app: Application = express();

  // 1. Safety Security Guard (CORS)
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  );

  // 2. Data Translators (Parsers)
  app.use(express.json());

  // 3. Health Check Route
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app
};