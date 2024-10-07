import { User } from "@prisma/client";
import InvalidDataError from "../../errors/InvalidDataError";
import { CreateUserDto } from "../../models/User";
import { PrismaInstanceFactory } from "../../factories/PrismaInstanceFactory";

class UserPrismaRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userFound = await PrismaInstanceFactory.user.findFirst({
      where: {
        email: email,
      },
    });

    return userFound;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const createdUser = await PrismaInstanceFactory.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
      });

      return createdUser;
    } catch (error) {
      throw new InvalidDataError("Email already registered.");
    }
  }

  async changePassword(userId: string, email: string, newPassword: string) {
    const createdPassword = await PrismaInstanceFactory.user.update({
      where: {
        id: userId,
        email,
      },
      data: {
        password: newPassword,
      },
    });

    if (!createdPassword) return false;

    return true;
  }
}

export default new UserPrismaRepository();
