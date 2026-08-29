const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'CampusCart API Server is healthy and running',
    timestamp: new Date().toISOString(),
  });
});

// Authentication Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Product Routes (configured by Chethan in Step 3)
try {
  app.use('/api/products', require('./routes/productRoutes'));
} catch (e) {
  // Graceful fallback before productRoutes are mounted
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[CampusCart Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = { app, server };
