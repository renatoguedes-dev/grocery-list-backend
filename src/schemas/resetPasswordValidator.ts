import { body, param } from "express-validator";

export const validateResetPasswordSendEmail = [
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

export const validatePostResetPassword = [
  param("token")
    .trim()
    .notEmpty()
    .withMessage("Please provide the token.")
    .isJWT()
    .withMessage("Invalid token format."),

  body("password")
    .trim()
    .isLength({ min: 8, max: 60 })
    .withMessage("Password must have between 8 and 60 characters.")
    .escape(),

  body("confirmPassword")
    .trim()
    .isLength({ min: 8, max: 60 })
    .withMessage("Password must have between 8 and 60 characters.")
    .escape(),
];
