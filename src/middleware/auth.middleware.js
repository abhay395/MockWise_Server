import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

const authMiddleware = {
  protect: asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return 401 Unauthorized
    if (!token) {
      throw new ApiError('Not authorized to access this route', 401);
    }

    try {
      // Verify token and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID from token and attach to request object
      req.user = await User.findById(decoded.id).select('-password');
      
      // If user not found, return 401 Unauthorized
      if (!req.user) {
        throw new ApiError('Not authorized to access this route', 401);
      }
      
      // Proceed to next middleware
      next();
    } catch (error) {
      // Handle token verification errors
      throw new ApiError('Not authorized to access this route', 401);
    }
  }),

  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.status(403);
        throw new Error(`User role ${req.user.role} is not authorized to access this route`);
      }
      next();
    };
  }
};

export default authMiddleware;