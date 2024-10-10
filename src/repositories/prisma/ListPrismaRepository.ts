import { PrismaInstanceFactory } from "../../factories/PrismaInstanceFactory";

class ListPrismaRepository {
  async getUserLists(userId: string) {
    const userLists = await PrismaInstanceFactory.list.findMany({
      where: {
        userId,
        active: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        listItems: true,
      },
    });

    return userLists;
  }

  async addList(userId: string, name: string, date: string) {
    const isoDate = new Date(date).toISOString();

    const listAdded = await PrismaInstanceFactory.list.create({
      data: {
        userId,
        name,
        date: isoDate,
      },
    });

    return listAdded;
  }

  async deleteList(userId: string, listId: string) {
    const deletedList = await PrismaInstanceFactory.list.update({
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
    const requestedList = await PrismaInstanceFactory.list.findFirst({
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
