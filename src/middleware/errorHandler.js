import { logger } from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Handle ApiError instances
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.err,
      status: err.status
    });
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    const formattedErrors = err.details.reduce((acc, detail) => {
      const key = detail.path.join('.');
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(detail.message);
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: formattedErrors,
      status: 'fail'
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).reduce((acc, error) => {
      const key = error.path;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(error.message);
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors,
      status: 'fail'
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
      errors: {
        [field]: [`${field} already exists`]
      },
      status: 'fail'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      status: 'fail'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
      status: 'fail'
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    status: 'error'
  });
};

const notFoundError = (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
    status: 'fail'
  });
};

export {
  errorHandler,
  notFoundError
};