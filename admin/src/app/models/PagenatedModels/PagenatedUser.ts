import { User } from "../User";

export interface PagenatedUser {
    users: User[],
    page: number,
    pages: number,
}