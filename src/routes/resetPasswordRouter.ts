import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
import {
  validateGetResetPassword,
  validateResetPassword,
} from "../schemas/resetPasswordValidator";

const resetPasswordController = new ResetPasswordController();

const resetPasswordRouter = Router();

resetPasswordRouter.post(
  "/",
  validateResetPassword,
  resetPasswordController.sendEmail
);

resetPasswordRouter.get(
  "/:token",
  validateGetResetPassword,
  resetPasswordController.validateToken
);

resetPasswordRouter.post(
  "/:token",
  validateGetResetPassword,
  resetPasswordController.resetPassword
);

export default resetPasswordRouter;
