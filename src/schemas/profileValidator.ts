import { body } from "express-validator";

const validateProfile = [
    // Validate and sanitize email
    body("oldPassword")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must be at least 8 characters long")
        .escape(),

    // validate and sanitize password
    body("newPassword")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must be at least 8 characters long")
        .escape(),
];

export default validateProfile;
