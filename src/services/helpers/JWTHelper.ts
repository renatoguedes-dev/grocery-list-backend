import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/User";
import InvalidJWT from "../../errors/InvalidJWT";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const createJWT = (payload: User) => {
    if (!secret)
        throw new Error(
            "JWT_SECRET is not defined in the environment variables."
        );

    return jwt.sign(payload, secret);
};

export const verifyJWT = (token: string) => {
    if (!secret)
        throw new Error(
            "JWT_SECRET is not defined in the environment variables."
        );

    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new InvalidJWT("Invalid or expired token.");
    }
};
