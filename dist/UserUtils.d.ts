import { User } from './';
export declare class UserUtils {
    private static userLogged;
    static getUserObj(): User;
    static getNameOfUser(user?: User): string;
    static isLogged(): string;
    static getUserLogged(): Promise<User>;
    static setVipUser(): Promise<void>;
    /**
     * provider: enum (facebook, google). <br>
     * return: {name, id, email}
     * */
    static loginAndGetUser(provider: string): Promise<User>;
    static logout(provider: "facebook" | "google"): Promise<void>;
    static logoutAll(): Promise<void>;
    private static setUserLogged;
}
