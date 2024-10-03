import { PrismaClient } from "@prisma/client";
import { InventoryDto, InventoryUpdate } from "../../models/Inventory";

const prisma = new PrismaClient();

class InventoryPrismaRepository {
    async addItem(newItem: InventoryDto) {
        const itemAdded = await prisma.inventory.create({
            data: {
                userId: newItem.userId,
                item: newItem.item,
                currentAmount: newItem.currentAmount,
                minimumAmount: newItem.minimumAmount,
            },
        });

        return itemAdded;
    }

    async getUserInventory(userId: string) {
        const userInventory = await prisma.inventory.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return userInventory;
    }

    async updateItem(updatedData: InventoryUpdate) {
        const updatedItem = await prisma.inventory.update({
            where: {
                userId: updatedData.userId,
                id: updatedData.itemId,
            },
            data: {
                currentAmount: updatedData.currentAmount,
                minimumAmount: updatedData.minimumAmount,
            },
        });

        return updatedItem;
    }

    async deleteItem(userId: string, itemId: string) {
        const deletedItem = await prisma.inventory.delete({
            where: {
                userId,
                id: itemId,
            },
        });

        return deletedItem;
    }
}

export default new InventoryPrismaRepository();
