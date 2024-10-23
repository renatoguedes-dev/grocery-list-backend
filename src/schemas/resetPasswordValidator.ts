import { body, param } from "express-validator";

export const validateResetPassword = [
  // Validate and sanitize email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
];

export const validateGetResetPassword = [
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Please provide the token.")
    .isJWT()
    .withMessage("Invalid token format."),
];
