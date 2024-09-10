class NotFoundError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}

export default NotFoundError;
