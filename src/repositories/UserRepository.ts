import db from "./database";
import { CreateUserDto, User } from "../models/User";
import InvalidDataError from "../errors/InvalidDataError";

class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;

        const values = [email];

        const result = await db.query(query, values);

        return result[0];
    }

    async createUser(
        userData: CreateUserDto,
        hashedPassword: string
    ): Promise<User | undefined> {
        try {
            const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            returning *
        `;

            const values = [userData.name, userData.email, hashedPassword];

            const result = await db.query(query, values);
            console.log(result[0]);
            return result[0];
        } catch (error) {
            throw new InvalidDataError("Email already registered.");
        }
    }
}

export default new UserRepository();
