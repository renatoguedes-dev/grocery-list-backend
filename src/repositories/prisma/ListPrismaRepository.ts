import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListPrismaRepository {
    async getUserLists(userId: string) {
        const userLists = await prisma.list.findMany({
            where: {
                userId,
                active: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return userLists;
    }

    async addList(userId: string, name: string, date: string) {
        const isoDate = new Date(date).toISOString();

        const listAdded = await prisma.list.create({
            data: {
                userId,
                name,
                date: isoDate,
            },
        });

        return listAdded;
    }

    async deleteList(userId: string, listId: string) {
        const deletedList = await prisma.list.update({
            where: {
                userId,
                id: listId,
            },
            data: {
                active: false,
            },
        });

        return deletedList;
    }

    async getListById(userId: string, listId: string) {
        const requestedList = await prisma.list.findFirst({
            where: {
                userId,
                id: listId,
                active: true,
            },
        });

        return requestedList;
    }
}

export default new ListPrismaRepository();
