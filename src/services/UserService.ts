import { CreateUserDto, User } from "../models/User";
import UserPrismaRepository from "../repositories/prisma/UserPrismaRepository";
import bcrypt from "bcryptjs";

class UserService {
    async findByEmail(email: string): Promise<User | null> {
        return UserPrismaRepository.findByEmail(email);
    }

    async createUser(userData: CreateUserDto): Promise<User | undefined> {
        try {
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(
                userData.password,
                saltRounds
            );

            return UserPrismaRepository.createUser(userData, hashedPassword);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default new UserService();
