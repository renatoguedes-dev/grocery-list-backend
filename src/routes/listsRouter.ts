import { Router } from "express";
import ListsController from "../controllers/ListsController";

const listsRouter = Router();

const listsController = new ListsController();

listsRouter.get("/", listsController.getUserCustomLists);
listsRouter.post("/", listsController.addCustomList);

export default listsRouter;
