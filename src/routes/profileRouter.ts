import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import validateProfile from "../schemas/profileValidator";

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.put("/", validateProfile, profileController.changePassword);

export default profileRouter;
