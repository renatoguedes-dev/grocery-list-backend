import { CreateUserDto, User } from "../models/User";
import UserPrismaRepository from "../repositories/prisma/UserPrismaRepository";
import bcrypt from "bcryptjs";
import { comparePassword } from "./helpers/BcryptHelper";
import InvalidOldPassword from "../errors/InvalidOldPassword";
import UserAlreadyExists from "../errors/UserAlreadyExists";
import { createJWT } from "./helpers/JWTHelper";

const saltRounds = 12;

class UserService {
  async findByEmail(email: string): Promise<User | null> {
    return await UserPrismaRepository.findByEmail(email);
  }

  async createUser(userData: CreateUserDto) {
    const existingUser = await this.findByEmail(userData.email);

    if (existingUser) {
      throw new UserAlreadyExists("E-mail already registered.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    userData.password = hashedPassword;

    const createdUser = await UserPrismaRepository.createUser(userData);

    if (!createdUser) {
      throw new UserAlreadyExists("E-mail already registered.");
    }

    const userSafeData = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };

    const token = createJWT(userSafeData);

    return { token };
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
