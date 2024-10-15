import { body } from "express-validator";

const validateLogin = [
    // Validate and sanitize email
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    // validate and sanitize password
    body("password")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must have between 8 and 60 characters.")
        .escape(),
];

export default validateLogin;
