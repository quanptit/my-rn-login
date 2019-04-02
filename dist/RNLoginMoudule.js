import { NativeModules } from 'react-native';
export class RNLoginMoudule {
    /**
     * provider: enum (facebook, google). <br>
     * */
    static async loginAndGetUser(provider) {
        return NativeModules.RNLoginMoudule.loginAndGetUser(provider);
    }
}
