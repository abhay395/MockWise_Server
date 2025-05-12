import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const authMiddleware = {
  protect: asyncHandler(async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return 401 Unauthorized
    if (!token) {
      res.status(401);
      throw new Error('Not authorized to access this route');
    }

    try {
      // Verify token and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID from token and attach to request object
      req.user = await User.findById(decoded.id).select('-password');
      
      // If user not found, return 401 Unauthorized
      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }
      
      // Proceed to next middleware
      next();
    } catch (error) {
      // Handle token verification errors
      res.status(401);
      throw new Error('Not authorized to access this route');
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