import { Request, Response } from "express";

const NotFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        status: "Error",
        message: "Page not found",
        statusCode: 404,
    });
};

export default NotFoundHandler;
