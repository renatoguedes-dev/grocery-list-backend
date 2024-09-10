import pgPromise from "pg-promise";
import db from "../repositories/database";
import { CreateUserDto, User } from "../models/user";
import InvalidDataError from "../errors/InvalidDataError";

class DatabaseService {
    private db: pgPromise.IDatabase<{}>;

    constructor() {
        this.db = db;
    }

    async findByEmail(email: string): Promise<User | null> {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;

        const values = [email];

        const result = await this.db.query(query, values);

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

            const result = await this.db.query(query, values);
            console.log(result[0]);
            return result[0];
        } catch (error) {
            throw new InvalidDataError("Email already registered.");
        }
    }
}

export default new DatabaseService();
