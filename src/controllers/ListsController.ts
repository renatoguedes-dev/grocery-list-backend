import { NextFunction, Request, Response } from "express";
import ListRepository from "../repositories/ListRepository";

class ListsController {
    async getUserCustomLists(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body.user;

            const userCustomLists = await ListRepository.getUserLists(user.id);

            return res.status(200).json({ userCustomLists });
        } catch (error) {
            next(error);
        }
    }

    async addCustomList(req: Request, res: Response, next: NextFunction) {
        try {

            const { user, name, date } = req.body;

            const addedList = await ListRepository.addList(user.id, name, date);

            return res.status(200).json({ success: true, addedList });
        } catch (error) {
            next(error);
        }
    }
}

export default ListsController;
