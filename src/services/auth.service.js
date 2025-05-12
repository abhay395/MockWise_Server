import User from '../models/user.model.js';
import { logger } from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

export default {
  async registerUser(userData) {
    try {
      const { name, email, password } = userData;

      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new ApiError('User already exists', 400);
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password
      });
      console.log(user);
      return user.getSignedJwtToken();
    } catch (error) {
      logger.error(`AuthService - registerUser: ${error.message}`);
      throw error;
    }
  },

  async loginUser(credentials) {
    try {
      const { email, password } = credentials;

      // Check for user
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new ApiError('Invalid credentials', 401);
      }

      // Check if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new ApiError('Invalid credentials', 401);
      }

      return user.getSignedJwtToken();
    } catch (error) {
      logger.error(`AuthService - loginUser: ${error.message}`);
      throw error;
    }
  },

  async getCurrentUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError('User not found', 404);
      }
      return user;
    } catch (error) {
      logger.error(`AuthService - getCurrentUser: ${error.message}`);
      throw error;
    }
  }
};