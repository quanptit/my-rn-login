import { User } from "my-rn-base-utils";
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
    static logout(provider: "facebook" | "google"): Promise<void>;
    static logoutAll(): Promise<void>;
    static setUserLogged(user: User): Promise<void>;
}
