import { CreateUserDto, User } from "../models/User";
import UserPrismaRepository from "../repositories/prisma/UserPrismaRepository";
import bcrypt from "bcryptjs";
import { comparePassword } from "./helpers/BcryptHelper";
import InvalidOldPassword from "../errors/InvalidOldPassword";
import UserAlreadyExists from "../errors/UserAlreadyExists";
import { createJWT, createTemporaryJWT, verifyJWT } from "./helpers/JWTHelper";
import NotFoundError from "../errors/NotFoundError";
import InvalidEmailPassword from "../errors/InvalidEmailPassword";
import EmailService from "./EmailService";
import { tokensGenerated, tokensUsed } from "../repositories/Tokens";
import ValidateResetPasswordToken from "./helpers/ValidateResetPasswordToken";
import InvalidJWT from "../errors/InvalidJWT";
import LoginService from "./LoginService";
import ErrorChangingPassword from "../errors/ErrorChangingPassword";

interface IChangePassword {
  user: User;
  oldPassword: string;
  newPassword: string;
}

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

  async changePassword(data: IChangePassword) {
    const { user, oldPassword, newPassword } = data;

    const foundUser = await this.findByEmail(user.email);

    if (!foundUser) {
      throw new NotFoundError("User not found.");
    }

    const comparisonResult = await comparePassword(
      oldPassword,
      foundUser.password
    );

    if (!comparisonResult) {
      throw new InvalidOldPassword("Invalid old password!");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const passwordChanged = await UserPrismaRepository.changePassword(
      user.id,
      user.email,
      newHashedPassword
    );

    return passwordChanged;
  }

  async handleResetPasswordRequest(userEmail: string) {
    const userFound = await this.findByEmail(userEmail);

    if (!userFound) throw new InvalidEmailPassword("E-mail not found!");

    const userSafeData = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };

    const token = createTemporaryJWT(userSafeData);

    // add new temporary token to the generated tokens array to check
    // when user access the link
    tokensGenerated.push(token);

    return EmailService.sendPasswordResetEmail(token, userSafeData.email);
  }

  async resetPassword(token: string, password: string) {
    const validateToken = ValidateResetPasswordToken(token);

    if (!validateToken) throw new InvalidJWT("Invalid or expired token.");

    const decodedToken = verifyJWT(token);

    if (typeof decodedToken === "string") {
      throw new InvalidJWT("Invalid or expired token.");
    }

    const { id, email } = decodedToken;

    const newHashedPassword = await bcrypt.hash(password, saltRounds);

    const passwordChanged = await UserPrismaRepository.changePassword(
      id,
      email,
      newHashedPassword
    );

    if (!passwordChanged)
      throw new ErrorChangingPassword(
        "An error occurred while changing the password."
      );

    tokensUsed.push(token);

    return await LoginService.loginAfterPasswordReset(email, newHashedPassword);
  }
}

export default new UserService();
