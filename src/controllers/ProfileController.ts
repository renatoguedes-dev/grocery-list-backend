import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class ProfileController {
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, oldPassword, newPassword } = req.body;

      const foundUser = await UserService.findByEmail(user.email);

      if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
      }

      const passwordChanged = await UserService.changePassword(
        foundUser,
        oldPassword,
        newPassword
      );

      if (!passwordChanged) {
        return res
          .status(400)
          .json({ message: "Password could not be changed." });
      }

      return res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
