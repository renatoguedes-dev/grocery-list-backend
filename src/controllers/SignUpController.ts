import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/UserService";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";
import UserAlreadyExists from "../errors/UserAlreadyExists";
import { createJWT } from "../services/helpers/JWTHelper";

class SignUpController {
    async processSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            // Check if there were validation errors in express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationErrorResponse(
                    "Validation failed. Check the input fields.",
                    errors.array()
                );
            }

            const { name, email, password, confirmPassword } = req.body;

            const existingUser = await UserService.findByEmail(email);

            if (existingUser?.email) {
                throw new UserAlreadyExists("E-mail already registered.");
            }

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: "Passwords do not match." });
            }

            const userData = { name, email, password };

            const createdUser = await UserService.createUser(userData);

            if (!createdUser) {
                return res
                    .status(400)
                    .json({ message: "Email already registered." });
            }

            createdUser.password = "";

            const token = createJWT(createdUser);

            return res.status(201).json({
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default SignUpController;
