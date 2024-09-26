import { CreateUserDto, User } from "../models/User";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcryptjs";

class UserService {
    async findByEmail(email: string): Promise<User | null> {
        return UserRepository.findByEmail(email);
    }

    async createUser(userData: CreateUserDto): Promise<User | undefined> {
        try {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(
                userData.password,
                saltRounds
            );

            return UserRepository.createUser(userData, hashedPassword);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new UserService();
