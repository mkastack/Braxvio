import mongoose from 'mongoose';
import dns from 'dns';

// Ensure resilient DNS resolution for MongoDB Atlas SRV connection strings
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore in restricted environments
}

const DEFAULT_MONGODB_URI =
  'mongodb+srv://admin_db_user:pa5ox7CGGtPo1ur2@cluster0.utee9iw.mongodb.net/braxvio_proposals?retryWrites=true&w=majority';

const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('[MongoDB] Connected successfully to MongoDB Atlas');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('[MongoDB Error] Failed to connect to MongoDB Atlas:', err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
