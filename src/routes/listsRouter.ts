import { Router } from "express";
import ListsController from "../controllers/ListsController";
import { validateAddCustomList, validateGetListById } from "../validators/listsValidator";

const listsRouter = Router();

const listsController = new ListsController();

listsRouter.get("/", listsController.getUserCustomLists);
listsRouter.post("/", validateAddCustomList, listsController.addCustomList);
listsRouter.get("/:id", validateGetListById, listsController.getListById)

export default listsRouter;
