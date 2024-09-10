import { CreateUserDto, User } from "../models/user";
import DatabaseService from "./DatabaseService";
import bcrypt from "bcryptjs";

class UserService {
    async findByEmail(email: string): Promise<User | null> {
        return DatabaseService.findByEmail(email);
    }

    async createUser(userData: CreateUserDto): Promise<User | undefined> {
        try {
            const saltRounds = 16;
            const hashedPassword = await bcrypt.hash(
                userData.password,
                saltRounds
            );

            return DatabaseService.createUser(userData, hashedPassword);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new UserService();
