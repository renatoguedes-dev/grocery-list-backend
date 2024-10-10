import { Router } from "express";
import InventoryController from "../controllers/InventoryController";
import {
  validateAddItem,
  validateDeleteItem,
  validateUpdateItem,
} from "../schemas/inventoryValidator";

const inventoryRouter = Router();

const inventoryController = new InventoryController();

inventoryRouter.get("/", inventoryController.getUserInventory);
inventoryRouter.post("/", validateAddItem, inventoryController.addItem);
inventoryRouter.delete("/", validateDeleteItem, inventoryController.deleteItem);
inventoryRouter.patch(
  "/:itemId",
  validateUpdateItem,
  inventoryController.updateItem
);

export default inventoryRouter;
