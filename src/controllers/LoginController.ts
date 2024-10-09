import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import InvalidDataError from "../errors/InvalidDataError";
import LoginService from "../services/LoginService";

class LoginController {
  async processLogin(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if there were validation errors in express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.body.email || !req.body.password) {
        throw new InvalidDataError("E-mail e/or Password are required!");
      }

      const result = await LoginService.execute(req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
