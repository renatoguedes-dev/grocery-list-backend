import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/UserService";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";

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

      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      const { name, email, password } = req.body;

      const userData = { name, email, password };

      const result = await UserService.createUser(userData);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default SignUpController;
