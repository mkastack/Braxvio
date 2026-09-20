require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB, disconnectDB } = require('./config/db');
const { verifyTransporter } = require('./config/mailer');
const { startEmailWorker, stopEmailWorker } = require('./workers/emailWorker');
const { startInvestmentEmailWorker, stopInvestmentEmailWorker } = require('./workers/investmentEmailWorker');
const { startTalentEmailWorker, stopTalentEmailWorker } = require('./workers/talentEmailWorker');
const { startContactEmailWorker, stopContactEmailWorker } = require('./workers/contactEmailWorker');
const { closeProposalQueue } = require('./queues/proposalQueue');
const { closeInvestmentQueue } = require('./queues/investmentQueue');
const { closeTalentQueue } = require('./queues/talentQueue');
const { closeContactQueue } = require('./queues/contactQueue');

const PORT = parseInt(process.env.PORT || '5000', 10);
const isApiOnly = process.argv.includes('--only-api');

let server = null;

async function bootstrap() {
  console.log('--------------------------------------------------');
  console.log('🚀 Starting Braxvio Partnership Proposal Backend');
  console.log('--------------------------------------------------');

  // 1. Connect to MongoDB
  try {
    await connectDB();
  } catch (err) {
    console.error('[Startup Error] MongoDB initialization failed:', err.message);
    // In local dev without Mongo running, continue to allow API inspection
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  // 2. Verify Hostinger SMTP settings if credentials are provided
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('[Startup] Verifying Hostinger SMTP connection...');
    await verifyTransporter();
  } else {
    console.warn('[Startup Warning] Hostinger SMTP credentials (SMTP_USER, SMTP_PASS) not configured. Real emails will not send until configured in .env.');
  }

  // 3. Start BullMQ Background Email Worker (unless --only-api is specified)
  if (!isApiOnly) {
    try {
      startEmailWorker();
      console.log('[Startup] Background Email Worker initialized and attached.');
    } catch (err) {
      console.warn(`[Startup Warning] BullMQ Worker could not initialize: ${err.message}. Redis might be offline.`);
    }
    try {
      startInvestmentEmailWorker();
      console.log('[Startup] Background Investment Email Worker initialized and attached.');
    } catch (err) {
      console.warn(`[Startup Warning] BullMQ Investment Worker could not initialize: ${err.message}. Redis might be offline.`);
    }
    try {
      startTalentEmailWorker();
      console.log('[Startup] Background Talent Email Worker initialized and attached.');
    } catch (err) {
      console.warn(`[Startup Warning] BullMQ Talent Worker could not initialize: ${err.message}. Redis might be offline.`);
    }
    try {
      startContactEmailWorker();
      console.log('[Startup] Background Contact Email Worker initialized and attached.');
    } catch (err) {
      console.warn(`[Startup Warning] BullMQ Contact Worker could not initialize: ${err.message}. Redis might be offline.`);
    }
  } else {
    console.log('[Startup] Running in API-only mode (worker disabled).');
  }

  // 4. Start HTTP Server
  server = http.createServer(app);

  server.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log(`📡 Braxvio API Server is live on port: ${PORT}`);
    console.log(`👉 Endpoint: POST http://localhost:${PORT}/api/partners/propose`);
    console.log(`👉 Endpoint: POST http://localhost:${PORT}/api/partners/invest`);
    console.log(`👉 Endpoint: POST http://localhost:${PORT}/api/careers/apply`);
    console.log(`👉 Endpoint: POST http://localhost:${PORT}/api/contact`);
    console.log(`👉 Health Check: GET http://localhost:${PORT}/health`);
    console.log('--------------------------------------------------');
  });

  // Graceful Shutdown Logic
  const handleShutdown = async (signal) => {
    console.log(`\n[Shutdown] Received ${signal}. Starting graceful shutdown...`);

    // 1. Stop accepting new HTTP requests
    if (server) {
      await new Promise((resolve) => {
        server.close(() => {
          console.log('[Shutdown] HTTP server closed.');
          resolve();
        });
      });
    }

    // 2. Stop BullMQ Workers
    if (!isApiOnly) {
      await stopEmailWorker();
      await stopInvestmentEmailWorker();
      await stopTalentEmailWorker();
      await stopContactEmailWorker();
    }

    // 3. Close BullMQ Queue connections
    await closeProposalQueue();
    await closeInvestmentQueue();
    await closeTalentQueue();
    await closeContactQueue();

    // 4. Disconnect from MongoDB
    await disconnectDB();

    console.log('[Shutdown] Graceful shutdown complete. Exiting.');
    process.exit(0);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('[Fatal Error during bootstrap]:', err);
  process.exit(1);
});
