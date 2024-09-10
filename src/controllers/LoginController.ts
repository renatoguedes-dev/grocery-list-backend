import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import InvalidDataError from "../errors/InvalidDataError";

class LoginController {
    processLogin(req: Request, res: Response, next: NextFunction) {
        try {
            // Check if there were validation errors in express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            if (!email || !password) {
                throw new InvalidDataError("E-mail e Password são obrigatórios");
            }

            return res.status(200).json({
                message: `your e-mail is: ${email} and your password is: ${password}`,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default LoginController;
