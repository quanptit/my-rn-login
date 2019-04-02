import { User } from "my-rn-base-utils";
export declare class RNLoginMoudule {
    /**
     * provider: enum (facebook, google). <br>
     * */
    static loginAndGetUser(provider: string): Promise<User>;
}
