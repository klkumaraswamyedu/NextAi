import { AppError } from './error.middleware.js';

export const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        throw new AppError(
          'Request validation failed',
          400,
          'VALIDATION_FAILED',
          formattedErrors
        );
      }

      // Replace with sanitized/validated data
      req[source] = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};
