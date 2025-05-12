import { logger } from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      throw new ApiError(errorMessage, 400);
    }

    next();
  } catch (error) {
    logger.error(`Validation Error: ${error.message}`);
    next(error);
  }
};

export default validate; 