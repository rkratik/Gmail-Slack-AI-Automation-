const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { createServer } = require('http');
const socketIO = require('socket.io');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');
const responseRoutes = require('./routes/responses');
const slackRoutes = require('./routes/slack');
const templateRoutes = require('./routes/templates');
const analyticsRoutes = require('./routes/analytics');
const rulesRoutes = require('./routes/rules');
const settingsRoutes = require('./routes/settings');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { authenticate } = require('./middleware/auth');
const { requestLogger } = require('./middleware/logger');

// Initialize Express app
const app = express();
const server = createServer(app);

// Initialize Socket.IO for real-time notifications
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(requestLogger); // Custom request logger

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Attach io to app for use in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/slack', slackRoutes);

// Protected routes (require authentication)
app.use('/api/forms', authenticate, formRoutes);
app.use('/api/responses', authenticate, responseRoutes);
app.use('/api/templates', authenticate, templateRoutes);
app.use('/api/analytics', authenticate, analyticsRoutes);
app.use('/api/rules', authenticate, rulesRoutes);
app.use('/api/settings', authenticate, settingsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    path: req.path,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });

  // Join user room for real-time updates
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
  });

  // Leave user room
  socket.on('leave-user', (userId) => {
    socket.leave(`user-${userId}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Database: ${process.env.MONGODB_URI?.split('/')[-1] || 'connecting...'}`);
});

module.exports = { app, io };
