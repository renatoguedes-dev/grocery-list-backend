import InvalidEmailPassword from "../errors/InvalidEmailPassword";
import { comparePassword } from "./helpers/BcryptHelper";
import { createJWT } from "./helpers/JWTHelper";
import UserService from "./UserService";

interface ILogin {
  email: string;
  password: string;
}

class LoginService {
  async execute(data: ILogin) {
    const { email, password } = data;

    const userFound = await UserService.findByEmail(email);

    if (!userFound)
      throw new InvalidEmailPassword("Invalid e-mail and/or password!");

    const comparisonResult = await comparePassword(
      password,
      userFound.password
    );

    if (!comparisonResult)
      throw new InvalidEmailPassword("Invalid e-mail and/or password!!");

    const userSafeData = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };

    const token = createJWT(userSafeData);

    return { token };
  }

  async loginAfterPasswordReset(email: string, newHashedPassword: string) {
    const userFound = await UserService.findByEmail(email);

    if (!userFound)
      throw new InvalidEmailPassword("Invalid e-mail and/or password!");

    const userSafeData = {
      id: userFound.id,
      name: userFound.name,
      email: userFound.email,
    };

    const token = createJWT(userSafeData);

    return { token };
  }
}

export default new LoginService();
