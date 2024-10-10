import { Router } from "express";
import ListsController from "../controllers/ListsController";
import {
  validateAddCustomList,
  validateAddListItem,
  validateDeleteList,
  validateDeleteListItem,
  validateGetListById,
  validateGetListItems,
  validateUpdateCompleteStatus,
} from "../schemas/listsValidator";

const listsRouter = Router();

const listsController = new ListsController();

listsRouter.get("/", listsController.getUserCustomLists);
listsRouter.post("/", validateAddCustomList, listsController.addCustomList);
listsRouter.get("/:id", validateGetListById, listsController.getListById);
listsRouter.post("/:id", validateAddListItem, listsController.addListItem);
listsRouter.delete("/", validateDeleteList, listsController.deleteList);
listsRouter.get(
  "/:id/list_items",
  validateGetListItems,
  listsController.getListItems
);
listsRouter.post(
  "/:listId/:id",
  validateUpdateCompleteStatus,
  listsController.updateCompleteStatus
);
listsRouter.delete(
  "/:listId/:id",
  validateDeleteListItem,
  listsController.deleteListItem
);

export default listsRouter;
