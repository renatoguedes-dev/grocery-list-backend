import { Router } from "express";
import SignUpController from "../controllers/SignUpController";
import validateSignUp from "../validators/signUpValidator";

const signUpController = new SignUpController();

const signUpRouter = Router();

signUpRouter.post("/", validateSignUp, signUpController.processSignUp);

export default signUpRouter;
