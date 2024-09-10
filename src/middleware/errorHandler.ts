import { Request, Response, NextFunction } from "express";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";

// Centralized error handling function
const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`Error: ${err.message}`);

    if (err instanceof ValidationErrorResponse) {
        return res.status(err.statusCode).json({
            status: "Error",
            message: err.message,
            statusCode: err.statusCode,
            errors: err.errors.map((error) => ({
                message: error.msg,
            })),
        });
    }

    // Send a response with a status code and error message
    res.status(err.statusCode || 500).json({
        status: "Error",
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500,
    });
};

export default errorHandler;
