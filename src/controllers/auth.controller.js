import authService from '../services/auth.service.js';
import { successResponse } from '../utils/helper.js';
import { logger } from '../utils/logger.js';

export default {
  // @desc    Register user
  // @route   POST /api/auth/register
  // @access  Public
  register: async (req, res) => {
    try {
      const result = await authService.registerUser(req.body);
      successResponse(res, 201,result, 'User registered successfully');
    } catch (error) {
      logger.error(`AuthController - register: ${error.message}`);
      throw error;
    }
  },

  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public
  login: async (req, res) => {
    try {
      const result = await authService.loginUser(req.body);
      successResponse(res, 200, result, 'Login successful');
    } catch (error) {
      logger.error(`AuthController - login: ${error.message}`);
      throw error;
    }
  },

  // @desc    Get current logged in user
  // @route   GET /api/auth/me
  // @access  Private
  getMe: async (req, res) => {
    try {
      const user = await authService.getCurrentUser(req.user.id);
      successResponse(res, 200, user, 'User retrieved successfully');
    } catch (error) {
      logger.error(`AuthController - getMe: ${error.message}`);
      throw error;
    }
  }
};