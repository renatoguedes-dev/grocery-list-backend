import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import InvalidDataError from "../../errors/InvalidDataError";
import { CreateUserDto } from "../../models/User";

const prisma = new PrismaClient();

class UserPrismaRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userFound = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return userFound;
  }

  async createUser(
    userData: CreateUserDto,
    hashedPassword: string
  ): Promise<User> {
    try {
      const createdUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        },
      });

      return createdUser;
    } catch (error) {
      throw new InvalidDataError("Email already registered.");
    }
  }

  async changePassword(userId: string, email: string, newPassword: string) {
    const createdPassword = await prisma.user.update({
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
