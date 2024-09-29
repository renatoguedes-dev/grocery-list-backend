import { NextFunction, Request, Response } from "express";
import InventoryRepository from "../repositories/InventoryRepository";

class InventoryController {
    async getUserInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body.user;

            const userInventory = await InventoryRepository.getUserInventory(
                user.id
            );

            return res.status(200).json({ userInventory });
        } catch (error) {
            next(error);
        }
    }

    async addItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { user, item, currentAmount, minimumAmount } = req.body;

            const itemAdded = await InventoryRepository.addItem({
                userId: user.id,
                item,
                currentAmount,
                minimumAmount,
            });

            if (!itemAdded)
                throw new Error(
                    "Something went wrong while adding the new item."
                );

            return res.status(200).json({ success: true, itemAdded });
        } catch (error) {
            next(error);
        }
    }

    async updateItem(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body.user;

            const itemId = req.params.itemId;

            const { currentAmount, minimumAmount } = req.body;

            const updatedItem = await InventoryRepository.updateItem({
                userId: user.id,
                itemId,
                currentAmount,
                minimumAmount,
            });

            if (!updatedItem)
                throw new Error(
                    "Something went wrong while updating the item."
                );

            return res.status(200).json({ success: true, updatedItem });
        } catch (error) {
            next(error);
        }
    }

    async deleteItem(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body.user;

            const { itemId } = req.body;

            const deletedItem = await InventoryRepository.deleteItem(
                user.id,
                itemId
            );

            if (!deletedItem)
                throw new Error(
                    "Something went wrong while deleting the item."
                );

            return res.status(200).json({ success: true, deletedItem });
        } catch (error) {
            next(error);
        }
    }
}

export default InventoryController;
