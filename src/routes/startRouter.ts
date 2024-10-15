import { Router } from "express";
import StartController from "../controllers/StartController";

const startRouter = Router();

const startController = new StartController();

startRouter.get("/", startController.startServer);

export default startRouter;
