import db from "./database";

class ListRepository {
    async getUserLists(userId: string) {
        const query = `
            SELECT * FROM lists
            WHERE user_id = $1
        `;

        const values = [userId];

        const result = await db.query(query, values);

        return result;
    }

    async addList(userId: string, name: string, date: string) {
        const query = `
            INSERT INTO lists (user_id, name, date)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const values = [userId, name, date];

        const result = await db.query(query, values);

        return result[0];
    }
}

export default new ListRepository();
