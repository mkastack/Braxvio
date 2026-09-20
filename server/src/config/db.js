const mongoose = require('mongoose');
const dns = require('dns');

/**
 * Connects to MongoDB with connection pooling, DNS fallback for SRV, and retry defaults.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/braxvio_proposals';

  // Ensure SRV records can resolve reliably on Windows/ISP DNS environments
  if (uri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {
      // Ignore if cannot override
    }
  }

  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });

    console.log(`[Database] MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database] MongoDB connection failed: ${error.message}`);
    throw error;
  }
}

/**
 * Disconnects from MongoDB gracefully.
 */
async function disconnectDB() {
  try {
    await mongoose.connection.close();
    console.log('[Database] MongoDB connection closed.');
  } catch (error) {
    console.error(`[Database] Error while closing MongoDB connection: ${error.message}`);
  }
}

module.exports = {
  connectDB,
  disconnectDB,
};
