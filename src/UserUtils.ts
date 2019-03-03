import {NativeModules} from 'react-native'
import {User} from './'
import {getStringsCommon} from "my-rn-common-resource";
import {isIOS, PreferenceUtils, RNCommonUtils} from "my-rn-base-utils";

let loginIOS;
if (isIOS()) {
    let {LoginIOS} = require('./LoginIOS');
    loginIOS = LoginIOS;
}


export class UserUtils {
    private static userLogged: User;

    public static getUserObj(): User {
        if (this.userLogged == undefined)
            this.userLogged = {name: getStringsCommon().Anonymous};
        return this.userLogged;
    }

    static getNameOfUser(user?: User): string {
        if (user == undefined)
            user = this.getUserObj();
        if (user.name) return user.name;
        if (user.email) return user.email;
        if (user.id) return user.id;
        return null;
    }

    static isLogged() {
        return (this.userLogged && this.userLogged.id)
    }

    static async getUserLogged(): Promise<User> {
        if (this.userLogged && this.userLogged.id)
            return this.userLogged;
        let userSaved = await PreferenceUtils.getObject("USER");
        if (userSaved)
            this.userLogged = userSaved;
        else
            this.userLogged = {name: getStringsCommon().Anonymous};
        return this.userLogged;
    }

    static async setVipUser() {
        this.userLogged.isVip = true;
        await PreferenceUtils.saveObject("USER", this.userLogged);
        return RNCommonUtils.setVIPUser();
    }

    /**
     * provider: enum (facebook, google). <br>
     * return: {name, id, email}
     * */
    static async loginAndGetUser(provider: string): Promise<User> {
        let user: User;
        if (isIOS()) {
            user = await loginIOS.loginAndGetUser(provider);
        } else {
            user = await NativeModules.RNLoginMoudule.loginAndGetUser(provider);
        }
        if (user) {
            await this.setUserLogged(user);
            UserUtils.userLogged = user;
            return user;
        }
        return null;
    }

    static async logout(provider: "facebook" | "google") {
        if (isIOS()) {
            await loginIOS.logout(provider);
        }

        await PreferenceUtils.deleteKey("USER");
    }

    static async logoutAll() {
        if (isIOS()) {
            await loginIOS.logout("facebook");
            await loginIOS.logout("google");
        }
        await PreferenceUtils.deleteKey("USER");
    }

    private static async setUserLogged(user: User) {
        console.log("setUserLogged: ", user.id, user.name);
        await PreferenceUtils.saveObject("USER", user);
    }
}
