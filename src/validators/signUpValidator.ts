import { body } from "express-validator";

const validateSignUp = [
    // Validate and sanitize name
    body("name")
        .trim()
        .isLength({ min: 2 })
        .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/)
        .withMessage("Name must only contain letters.")
        .escape(),

    // Validate and sanitize email
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Please provide an email address.")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .normalizeEmail(),

    // Validate and sanitize password
    body("password")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must be at least 8 characters long.")
        .escape(),

    // Validate confirm password to ensure it matches the password
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match.");
            }
            return true;
        })
        .escape(),
];

export default validateSignUp;
