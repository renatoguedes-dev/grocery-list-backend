import bcrypt from "bcryptjs";

export const comparePassword = async (
    formPassword: string,
    dbPassword: string
): Promise<boolean> => {
    return bcrypt.compare(formPassword, dbPassword);
};
