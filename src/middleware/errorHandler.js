import { logger } from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.err,
      status: err.status
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: errors
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
      error: err.message
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

const notFoundError = (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

export {
  errorHandler,
  notFoundError
};