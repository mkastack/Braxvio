const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const proposalRoutes = require('./routes/proposalRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const talentRoutes = require('./routes/talentRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://www.braxvio.com,http://localhost:3000').split(',').map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive default in dev mode
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Braxvio Proposal Processing Service',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Mount proposal routes
app.use('/api/partners', proposalRoutes);
app.use('/', proposalRoutes); // Also ensures root-level mounting for /api/partners/propose works

// Mount investment interest routes
app.use('/api/partners', investmentRoutes);
app.use('/', investmentRoutes);

// Mount talent application routes
app.use('/api/careers', talentRoutes);
app.use('/', talentRoutes);

// Mount contact inquiry routes
app.use('/api/contact', contactRoutes);
app.use('/', contactRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error('[Server Error]', err);

  const status = err.statusCode || err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'An internal server error occurred'
    : err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

module.exports = app;
