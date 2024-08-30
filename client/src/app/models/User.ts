export interface User {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
}

export interface Login{
    username: string;
    password: string;
}

export interface Register{
    username: string;
    email: string;
    password: string;
}