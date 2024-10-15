export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface UserSafeData {
    id: string;
    name: string;
    email: string;
}