# MockWise Server

A robust Node.js backend server for the MockWise application, built with Express.js and MongoDB. This server provides a secure and scalable API for managing mock interviews and user authentication.

## Features

- **Authentication & Security**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Helmet for security headers
  - CORS protection
  - Rate limiting
  - XSS protection

- **Database & Data Management**
  - MongoDB with Mongoose ODM
  - Efficient data modeling
  - Data validation with Joi

- **Development & Production**
  - Environment-based configuration
  - Comprehensive error handling
  - Request logging with Morgan
  - Application logging with Winston
  - ES Modules support
  - Async/await patterns

- **Testing**
  - Jest testing framework
  - Supertest for API testing
  - Test coverage reporting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mockwise-server.git
   cd mockwise-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mockwise
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   JWT_EXPIRE=30d
   ```

## Running the Application

Development mode with hot-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests with watch mode:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

## Project Structure

```
src/
├── config/         # Configuration files (database, environment)
├── controllers/    # Route controllers
├── middleware/     # Custom middleware (auth, error handling)
├── models/         # Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
└── app.js         # Application entry point
```

## API Documentation

### Authentication Endpoints
- POST `/api/v1/auth/register` - Register a new user
- POST `/api/v1/auth/login` - User login
- GET `/api/v1/auth/me` - Get current user profile

### Mock Interview Endpoints
- GET `/api/v1/interviews` - List all interviews
- POST `/api/v1/interviews` - Create new interview
- GET `/api/v1/interviews/:id` - Get interview details
- PUT `/api/v1/interviews/:id` - Update interview
- DELETE `/api/v1/interviews/:id` - Delete interview

## Error Handling

The application implements centralized error handling with:
- Proper HTTP status codes
- Descriptive error messages
- Error logging
- Client-friendly error responses

## Logging

- Request logging via Morgan
- Application logging via Winston
- Log files stored in `logs/` directory
- Different log levels for development and production

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting to prevent abuse
- Security headers with Helmet
- CORS configuration
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 