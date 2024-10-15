import { NextFunction, Request, Response } from "express";

class StartController {
  async startServer(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ success: true });
  }
}

export default StartController;
