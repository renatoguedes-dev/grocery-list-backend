class InvalidJWT extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 403;
        this.name = "InvalidJWT";
    }
}

export default InvalidJWT;