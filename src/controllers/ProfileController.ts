import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { validationResult } from "express-validator";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";
import { log } from "console";

class ProfileController {
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if there were validation errors in express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidationErrorResponse(
          "Validation failed. Check the input fields.",
          errors.array()
        );
      }

      const passwordChanged = await UserService.changePassword(req.body);

      if (!passwordChanged) {
        return res
          .status(400)
          .json({ success: false, message: "Password could not be changed." });
      }

      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully." });
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
