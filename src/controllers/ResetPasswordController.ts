import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { validationResult } from "express-validator";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";
import ValidateResetPasswordToken from "../services/helpers/ValidateResetPasswordToken";

class ResetPasswordController {
  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if there were validation errors in express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidationErrorResponse(
          "Validation failed. Check the input fields.",
          errors.array()
        );
      }

      const isEmailSent = await UserService.handleResetPasswordRequest(
        req.body.email
      );

      res.status(200).json({ success: "Email sent" });
    } catch (error) {
      next(error);
    }
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if there were validation errors in express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidationErrorResponse(
          "Validation failed. Check the input fields.",
          errors.array()
        );
      }

      const { token } = req.params;

      const validateToken = ValidateResetPasswordToken(token);

      return res.status(200).json(validateToken);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      const result = await UserService.resetPassword(token, password);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ResetPasswordController;
