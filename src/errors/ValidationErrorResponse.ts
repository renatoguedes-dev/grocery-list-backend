import { ValidationError } from "express-validator";

class ValidationErrorResponse extends Error {
    statusCode: number;
    errors: ValidationError[];

    constructor(message: string, errors: ValidationError[]) {
        super(message);
        this.statusCode = 400;
        this.name = "ValidationErrorResponse";
        this.errors = errors;
    }
}

export default ValidationErrorResponse;
