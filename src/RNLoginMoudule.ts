import {NativeModules} from 'react-native'
import {User} from "my-rn-base-utils";

export class RNLoginMoudule {
    /**
     * provider: enum (facebook, google). <br>
     * */
    static async loginAndGetUser(provider: string): Promise<User> {
        return NativeModules.RNLoginMoudule.loginAndGetUser(provider);
    }
}
