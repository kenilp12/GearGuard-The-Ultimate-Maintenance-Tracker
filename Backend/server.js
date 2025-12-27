const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const workOrderRoutes = require('./routes/workOrders');
const equipmentRoutes = require('./routes/equipment');
const taskRoutes = require('./routes/tasks');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handler middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  console.error('Error stack:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gearguard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Please make sure MongoDB is running or check your connection string in .env file');
    process.exit(1);
  }
};

// MongoDB connection state middleware
const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database not connected. Please check MongoDB connection.',
      readyState: mongoose.connection.readyState
    });
  }
  next();
};

connectDB();

// Routes (with DB connection check)
app.use('/api/auth', checkDBConnection, authRoutes);
app.use('/api/workorders', checkDBConnection, workOrderRoutes);
app.use('/api/equipment', checkDBConnection, equipmentRoutes);
app.use('/api/tasks', checkDBConnection, taskRoutes);
app.use('/api/reports', checkDBConnection, reportRoutes);
app.use('/api/users', checkDBConnection, userRoutes);

// Health check (no DB check needed)
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStatusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    status: dbStatus === 1 ? 'OK' : 'WARNING',
    message: 'GearGuard API is running',
    database: dbStatusText[dbStatus] || 'unknown',
    databaseConnected: dbStatus === 1
  });
});

// Test endpoint to check dependencies
app.get('/api/test', async (req, res) => {
  try {
    const bcrypt = require('bcryptjs');
    const testHash = await bcrypt.hash('test', 10);
    const testCompare = await bcrypt.compare('test', testHash);
    
    res.json({
      status: 'OK',
      bcrypt: testCompare ? 'working' : 'not working',
      mongoose: mongoose.connection.readyState === 1 ? 'connected' : 'not connected',
      nodeVersion: process.version
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      stack: error.stack
    });
  }
});

// Global error handler (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);
  console.error('Error stack:', err.stack);
  
  // Don't send response if headers already sent
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? {
      name: err.name,
      stack: err.stack
    } : undefined
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

