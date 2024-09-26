import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import InvalidDataError from "../errors/InvalidDataError";
import UserService from "../services/UserService";
import { comparePassword } from "../services/helpers/BcryptHelper";
import { criarJWT } from "../services/helpers/JWTHelper";

class LoginController {
    async processLogin(req: Request, res: Response, next: NextFunction) {
        try {
            // Check if there were validation errors in express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            if (!email || !password) {
                throw new InvalidDataError(
                    "E-mail e/or Password are required!"
                );
            }

            const clientData = await UserService.findByEmail(email);

            if (!clientData) throw new Error("Invalid e-mail and/or password!");

            const comparisonResult = await comparePassword(
                password,
                clientData.password
            );

            if (!comparisonResult)
                throw new Error("Invalid e-mail and/or password!");

            clientData.password = "";

            const token = criarJWT(clientData);

            return res.status(200).json({
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default LoginController;
