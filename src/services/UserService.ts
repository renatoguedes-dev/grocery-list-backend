import { CreateUserDto, User } from "../models/User";
import UserPrismaRepository from "../repositories/prisma/UserPrismaRepository";
import bcrypt from "bcryptjs";
import { comparePassword } from "./helpers/BcryptHelper";
import InvalidOldPassword from "../errors/InvalidOldPassword";

const saltRounds = 12;

class UserService {
  async findByEmail(email: string): Promise<User | null> {
    return UserPrismaRepository.findByEmail(email);
  }

  async createUser(userData: CreateUserDto): Promise<User | undefined> {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    return UserPrismaRepository.createUser(userData, hashedPassword);
  }

  async changePassword(user: User, oldPassword: string, newPassword: string) {
    const comparisonResult = await comparePassword(oldPassword, user.password);

    if (!comparisonResult) {
      throw new InvalidOldPassword("Invalid old password!");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    return await UserPrismaRepository.changePassword(
      user.id,
      user.email,
      newHashedPassword
    );
  }
}

export default new UserService();
