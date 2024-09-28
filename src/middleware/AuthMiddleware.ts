import { NextFunction, Request, Response } from "express";
import InvalidAuthentication from "../errors/InvalidAuthentication";
import { verifyJWT } from "../services/helpers/JWTHelper";

const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw new InvalidAuthentication("User most be logged in.");

        const decodedToken = verifyJWT(token);

        req.body.user = decodedToken;

        next();
        return;
    } catch (error) {
        next(error);
    }
};

export default AuthMiddleware;
