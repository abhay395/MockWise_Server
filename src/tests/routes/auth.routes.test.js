import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import User from '../../models/user.model.js';
import { logger } from '../../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config({
  path: ".env.test"
});

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'Password123'
  };

  let authToken;

  beforeAll(async () => {
    try {
      // Close any existing connections
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
      
      // Connect to test database
      await mongoose.connect("mongodb://localhost:27017/mockwise_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      logger.info('Connected to test database');
    } catch (error) {
      logger.error('Test database connection error:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    // Clear all collections before each test
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    try {
      await mongoose.connection.close();
      logger.info('Disconnected from test database');
    } catch (error) {
      logger.error('Error closing test database connection:', error);
    }
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
    //   expect(response.body..user.email).toBe(testUser.email);
    //   expect(response.body.result.user.password).toBeUndefined();
    });

    it('should fail to register with invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          ...testUser,
          email: 'invalid-email'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should fail to register with existing email', async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);
      authToken = registerResponse.body.data;
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      // expect(response.body.data.user.email).toBe(testUser.email);
    });

    it('should fail to login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should fail to login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    beforeEach(async () => {
      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser);
      authToken = registerResponse.body.result;
      console.log(authToken);
    });

    it('should get current user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.email).toBe(testUser.email); // Changed from data to result
      expect(response.body.result.password).toBeUndefined(); // Changed from data to result
    }); // Added timeout of 10 seconds
    it('should fail to get profile without token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    }); // Added timeout of 10 seconds

    it('should fail to get profile with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token');
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined(); // Added check for error message
    });
  });
});