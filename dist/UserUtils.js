import { getStringsCommon } from "my-rn-common-resource";
import { PreferenceUtils, RNCommonUtils } from "my-rn-base-utils";
export class UserUtils {
    static getUserObj() {
        if (this.userLogged == undefined)
            this.userLogged = { name: getStringsCommon().Anonymous };
        return this.userLogged;
    }
    static getNameOfUser(user) {
        if (user == undefined)
            user = this.getUserObj();
        if (user.name)
            return user.name;
        if (user.email)
            return user.email;
        if (user.id)
            return user.id;
        return null;
    }
    static isLogged() {
        return (this.userLogged && this.userLogged.id);
    }
    static async getUserLogged() {
        if (this.userLogged && this.userLogged.id)
            return this.userLogged;
        let userSaved = await PreferenceUtils.getObject("USER");
        if (userSaved)
            this.userLogged = userSaved;
        else
            this.userLogged = { name: getStringsCommon().Anonymous };
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
    // static async loginAndGetUser(provider: string): Promise<User> {
    //     let user = await RNLoginMoudule.loginAndGetUser(provider);
    //     if (user) {
    //         await this.setUserLogged(user);
    //         UserUtils.userLogged = user;
    //         return user;
    //     }
    //     return null;
    // }
    static async logout(provider) {
        await PreferenceUtils.deleteKey("USER");
    }
    static async logoutAll() {
        await PreferenceUtils.deleteKey("USER");
    }
    static async setUserLogged(user) {
        UserUtils.userLogged = user;
        console.log("setUserLogged: ", user.id, user.name);
        await PreferenceUtils.saveObject("USER", user);
    }
}
