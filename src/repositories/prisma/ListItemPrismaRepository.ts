import { PrismaInstanceFactory } from "../../factories/PrismaInstanceFactory";

class ListItemPrismaRepository {
  async getItems(listId: string) {
    const listItems = await PrismaInstanceFactory.listItem.findMany({
      where: {
        listId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        listId: true,
        name: true,
        amount: true,
      },
    });

    return listItems;
  }

  async addItem(listId: string, name: string, amount: number) {
    const itemAdded = await PrismaInstanceFactory.listItem.create({
      data: {
        listId,
        name,
        amount,
      },
    });

    return itemAdded;
  }
}

export default new ListItemPrismaRepository();
