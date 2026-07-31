import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const connString = process.env.MONGODB_URI;
                                                                                                                 
  if (!connString) {
    console.error('[Database] ERROR: MONGODB_URI is not defined in .env file!');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(connString);
    console.log(`[Database] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Connection failure: ${(error as Error).message}`);
    // Exit process with failure code if database fails to connect
    process.exit(1);
  }
};

// Event listeners for database health monitoring
mongoose.connection.on('disconnected', () => {
  console.warn('[Database] Lost connection to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database] Mongoose connection error: ${err}`);
});