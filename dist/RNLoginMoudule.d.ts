import { User } from "./index";
export declare class RNLoginMoudule {
    /**
     * provider: enum (facebook, google). <br>
     * */
    static loginAndGetUser(provider: string): Promise<User>;
}
