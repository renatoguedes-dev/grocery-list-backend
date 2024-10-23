class ErrorChangingPassword extends Error {
  statusCode: number;

  constructor(message: string) {
      super(message);
      this.statusCode = 500;
      this.name = "ErrorChangingPassword";
  }
}

export default ErrorChangingPassword;
