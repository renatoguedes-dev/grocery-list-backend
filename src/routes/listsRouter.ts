import { Router } from "express";
import ListsController from "../controllers/ListsController";
import {
  validateAddCustomList,
  validateAddListItem,
  validateDeleteList,
  validateGetListById,
} from "../validators/listsValidator";

const listsRouter = Router();

const listsController = new ListsController();

listsRouter.get("/", listsController.getUserCustomLists);
listsRouter.post("/", validateAddCustomList, listsController.addCustomList);
listsRouter.get("/:id", validateGetListById, listsController.getListById);
listsRouter.post("/:id", validateAddListItem, listsController.addListItem);
listsRouter.delete("/", validateDeleteList, listsController.deleteList);
listsRouter.get("/:id/list_items", listsController.getListItems)

export default listsRouter;
