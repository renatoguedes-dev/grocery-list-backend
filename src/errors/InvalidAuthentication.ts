class InvalidAuthentication extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = 401;
        this.name = "InvalidAuthentication";
    }
}

export default InvalidAuthentication;