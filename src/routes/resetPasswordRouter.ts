import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
import {
  validateGetResetPassword,
  validatePostResetPassword,
  validateResetPasswordSendEmail,
} from "../schemas/resetPasswordValidator";

const resetPasswordController = new ResetPasswordController();

const resetPasswordRouter = Router();

resetPasswordRouter.post(
  "/",
  validateResetPasswordSendEmail,
  resetPasswordController.sendEmail
);

resetPasswordRouter.get(
  "/:token",
  validateGetResetPassword,
  resetPasswordController.validateToken
);

resetPasswordRouter.post(
  "/:token",
  validatePostResetPassword,
  resetPasswordController.resetPassword
);

export default resetPasswordRouter;
