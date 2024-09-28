import { InventoryDto, Inventory, InventoryUpdate } from "../models/Inventory";
import db from "./database";

class InventoryRepository {
    async addItem(newItem: InventoryDto) {
        const query = `
            INSERT INTO inventory (user_id, item, current_amount, minimum_amount) 
            VALUES ($1, $2, $3, $4)
            returning *
        `;

        const values = [
            newItem.userId,
            newItem.item,
            newItem.currentAmount,
            newItem.minimumAmount,
        ];

        const result = await db.query(query, values);

        return result[0];
    }

    async getUserInventory(userId: string) {
        const query = `
            SELECT * FROM inventory
            WHERE user_id = $1
        `;

        const values = [userId];

        const result = await db.query(query, values);

        return result;
    }

    async updateItem(updatedData: InventoryUpdate) {
        const query = `
            UPDATE inventory
            SET current_amount = $3, minimum_amount = $4
            WHERE user_id = $1
            AND id = $2
            RETURNING *
        `;

        const values = [
            updatedData.userId,
            updatedData.itemId,
            updatedData.currentAmount,
            updatedData.minimumAmount,
        ];

        const result = await db.query(query, values);

        console.log("result from inventoryRepository.updateItem");
        console.log(result[0]);

        return result[0];
    }

    async deleteItem(userId: string, itemId: string) {
        const query = `
            DELETE FROM inventory
            WHERE user_id = $1
            AND id = $2
            RETURNING *
        `;

        const values = [userId, itemId];

        const result = await db.query(query, values);

        return result[0];
    }
}

export default new InventoryRepository();
