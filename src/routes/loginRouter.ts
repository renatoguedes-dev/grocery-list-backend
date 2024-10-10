import { Router } from "express";
import LoginController from "../controllers/LoginController";
import validateLogin from "../schemas/loginValidator";

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post("/", validateLogin, loginController.processLogin);

export default loginRouter;
