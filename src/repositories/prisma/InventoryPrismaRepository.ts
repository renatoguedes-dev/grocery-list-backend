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

        console.log("this is the itemAdded:");
        console.log(itemAdded);

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

        console.log("this is the userInventory:");
        console.log(userInventory);

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

        console.log("this is the updatedItem:");
        console.log(updatedItem);

        return updatedItem;
    }

    async deleteItem(userId: string, itemId: string) {
        const deletedItem = await prisma.inventory.delete({
            where: {
                userId,
                id: itemId,
            },
        });

        console.log("this is the deletedItem:");
        console.log(deletedItem);

        return deletedItem;
    }
}

export default new InventoryPrismaRepository();
