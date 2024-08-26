import { isCelebrateError } from "celebrate";
import MESSAGE_KEYS from "../constants/messageKeys.js";

const customErrorHandler = (err, req, res, next) => {
  // Check if the error is a celebrate validation error
  if (isCelebrateError(err)) {
    const validationError = {};

    err.details.forEach((value, key) => {
      // Collect all error messages for the segment
      validationError[key] = value.details.map((detail) => detail.message);
    });

    // Return a custom response with validation errors
    return res.status(400).json({
      status: "error",
      message: MESSAGE_KEYS.VALIDATION,
      errors: validationError,
    });
  }

  // Pass to the next error handler if it's not a celebrate error
  return next(err);
};

export default customErrorHandler;
