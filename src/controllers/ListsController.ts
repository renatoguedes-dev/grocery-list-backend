import { NextFunction, Request, Response } from "express";
import ListPrismaRepository from "../repositories/prisma/ListPrismaRepository";
import { validationResult } from "express-validator";

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
}

export default ListsController;
