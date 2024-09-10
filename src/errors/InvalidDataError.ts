class InvalidDataError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.name = "InvalidDataError";
    }
}

export default InvalidDataError;
