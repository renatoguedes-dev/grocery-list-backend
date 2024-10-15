import { body } from "express-validator";

const validateProfile = [
    // Validate and sanitize email
    body("oldPassword")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must have between 8 and 60 characters.")
        .escape(),

    // validate and sanitize password
    body("newPassword")
        .trim()
        .isLength({ min: 8, max: 60 })
        .withMessage("Password must have between 8 and 60 characters.")
        .escape(),
];

export default validateProfile;
