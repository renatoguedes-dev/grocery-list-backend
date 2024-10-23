import { Request, Response, NextFunction } from "express";
import ValidationErrorResponse from "../errors/ValidationErrorResponse";

// Centralized error handling function
const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMessage = err.message;

  if (err instanceof ValidationErrorResponse) {
    err.errors.find((error: any) => {
      if (error.msg) {
        errorMessage = error.msg;
        return true;
      }
    });

    console.error(`Error: ${errorMessage}`);

    return res.status(err.statusCode).json({
      status: "Error",
      message: errorMessage,
      statusCode: err.statusCode,
    });
  }

  console.error(`Error: ${errorMessage}`);
  // Send a response with a status code and error message
  res.status(err.statusCode || 500).json({
    status: "Error",
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
  });
};

export default ErrorHandler;
