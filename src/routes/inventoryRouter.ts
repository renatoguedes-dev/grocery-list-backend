import { Router } from "express";
import InventoryController from "../controllers/InventoryController";

const inventoryRouter = Router();

const inventoryController = new InventoryController();

inventoryRouter.get("/", inventoryController.getUserInventory);
inventoryRouter.post("/", inventoryController.addItem);
inventoryRouter.delete("/", inventoryController.deleteItem);
inventoryRouter.patch("/:itemId", inventoryController.updateItem);

export default inventoryRouter;
