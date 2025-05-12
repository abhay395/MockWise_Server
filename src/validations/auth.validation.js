import Joi from 'joi';

// Password validation schema to be reused
const passwordSchema = Joi.string()
  .min(6)
  .required()
  .messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  });

// Email validation schema to be reused  
const emailSchema = Joi.string()
  .email()
  .required()
  .messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address'
  });

// Register schema
const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: emailSchema,
  password: passwordSchema
});

// Login schema
const loginSchema = Joi.object({
  email: emailSchema,
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});

// Export schemas as named exports for better import syntax
export { registerSchema, loginSchema };