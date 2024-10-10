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
        complete: true,
      },
    });

    return listItems;
  }

  async updateCompleteStatus(listId: string, id: string, complete: boolean) {
    const updatedItem = await PrismaInstanceFactory.listItem.update({
      where: {
        listId,
        id,
      },
      data: {
        complete,
      },
    });

    return updatedItem;
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

  async deleteItem(listId: string, id: string) {
    const deletedListItem = await PrismaInstanceFactory.listItem.delete({
      where: {
        listId,
        id,
      },
    });

    return deletedListItem;
  }
}

export default new ListItemPrismaRepository();
