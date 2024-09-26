import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/User";

dotenv.config();

export const criarJWT = (payload: User) => {
    const secret = process.env.JWT_SECRET;

    if (!secret)
        throw new Error(
            "JWT_SECRET is not defined in the environment variables."
        );

    return jwt.sign(payload, secret);
};
