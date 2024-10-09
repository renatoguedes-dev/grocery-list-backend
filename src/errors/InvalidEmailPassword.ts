class InvalidEmailPassword extends Error {
  statusCode: number;

  constructor(message: string) {
      super(message);
      this.statusCode = 400;
      this.name = "InvalidEmailPassword";
  }
}

export default InvalidEmailPassword;
