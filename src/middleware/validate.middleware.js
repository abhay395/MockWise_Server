import { logger } from '../utils/logger.js';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: false
    });

    if (error) {
      // Format validation errors into a more readable structure
      const formattedErrors = error.details.reduce((acc, detail) => {
        const key = detail.path.join('.');
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(detail.message);
        return acc;
      }, {});

      throw new ApiError('Validation Error', 400, formattedErrors);
    }

    next();
  } catch (error) {
    logger.error(`Validation Error: ${error.message}`);
    next(error);
  }
};

export default validate; 