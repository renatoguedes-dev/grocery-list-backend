import { NextFunction, Request, Response } from "express";
import ListPrismaRepository from "../repositories/prisma/ListPrismaRepository";
import { validationResult } from "express-validator";
import ListItemPrismaRepository from "../repositories/prisma/ListItemPrismaRepository";

class ListsController {
  async getUserCustomLists(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body.user;

      const userCustomLists = await ListPrismaRepository.getUserLists(user.id);

      return res.status(200).json({ userCustomLists });
    } catch (error) {
      next(error);
    }
  }

  async addCustomList(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user, name, date } = req.body;

      const addedList = await ListPrismaRepository.addList(user.id, name, date);

      return res.status(200).json({ success: true, addedList });
    } catch (error) {
      next(error);
    }
  }

  async getListById(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = req.body.user;

      const { id } = req.params;

      const requestedList = await ListPrismaRepository.getListById(user.id, id);

      if (!requestedList) {
        return res.status(404).json({ message: "List not found." });
      }

      const listSafeData = {
        id: requestedList.id,
        userId: requestedList.userId,
        name: requestedList.name,
        date: requestedList.date,
      };

      return res.status(200).json({ requestedList: listSafeData });
    } catch (error) {
      next(error);
    }
  }

  async deleteList(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, user } = req.body;

      await ListPrismaRepository.deleteList(user.id, id);

      return res.status(200).json({ success: true, message: "List deleted." });
    } catch (error) {
      next(error);
    }
  }

  async getListItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const listItems = await ListItemPrismaRepository.getItems(id);

      return res.status(200).json(listItems);
    } catch (error) {
      next(error);
    }
  }

  async addListItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { name, amount } = req.body;

      const itemAdded = await ListItemPrismaRepository.addItem(
        id,
        name,
        amount
      );

      if (!itemAdded)
        throw new Error("Something went wrong while adding the new item.");

      return res.status(200).json({ success: true, itemAdded });
    } catch (error) {
      next(error);
    }
  }

  async updateCompleteStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId, id } = req.params;
      const { complete } = req.body;

      const updatedItem = await ListItemPrismaRepository.updateCompleteStatus(
        listId,
        id,
        complete
      );

      if (!updatedItem)
        throw new Error("Something went wrong while updating the item.");

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async deleteListItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId, id } = req.params;

      const deletedListItem = await ListItemPrismaRepository.deleteItem(
        listId,
        id
      );

      

      if (!deletedListItem)
        throw new Error("Something went wrong while deleting the item.");

      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default ListsController;
