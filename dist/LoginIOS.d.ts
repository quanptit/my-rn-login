export declare class LoginIOS {
    /**
     * provider: enum (facebook, google). <br>
     * return: {name, id, email}
     * */
    static loginAndGetUser(provider: string): Promise<{
        name?: string;
        id?: string;
        email?: string;
    }>;
    /**
     * provider: enum (facebook, google)
     * */
    static logout(provider: "facebook" | "google"): Promise<void>;
}
