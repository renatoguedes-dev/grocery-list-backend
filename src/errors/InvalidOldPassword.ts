class InvalidOldPassword extends Error {
  statusCode: number;

  constructor(message: string) {
      super(message);
      this.statusCode = 400;
      this.name = "InvalidOldPassword";
  }
}

export default InvalidOldPassword;
