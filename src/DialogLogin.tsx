import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {Text, ViewProps} from 'react-native'
import {UserUtils} from './UserUtils'
import {PopupDialog, Toast, Button, ButtonModel, StyleUtils} from "my-rn-base-component";
import {getStringsCommon} from "my-rn-common-resource"
import {User} from "my-rn-base-utils";
// @ts-ignore
import {GoogleSignin, statusCodes} from 'react-native-google-signin';

const s = StyleUtils.getAllStyle();
let isConfiged: boolean;

interface Props extends ViewProps {
    callbackLoginSuccess: (user: User) => void
}

type States = { isSigninInProgress?: boolean };

export class DialogLogin extends Component<Props, States> {
    private popupDialog: PopupDialog;

    constructor(props) {
        super(props);
        this.state = {};
        UserUtils.logoutAll();
        if (!isConfiged)
            GoogleSignin.configure({
                iosClientId: "73244794492-rsraslt811jtsk57qqri0p0unro0c046.apps.googleusercontent.com"
            })
    }

    async loginSuccess(user: User) {
        if (!user) {
            DialogLogin.loginError();
            return
        }
        await UserUtils.setUserLogged(user);

        console.log("LOGIN SUCCESS: ", user);
        this.props.callbackLoginSuccess && this.props.callbackLoginSuccess(user)
    }

    static loginError(error?) {
        console.log("====== loginError: ", error);
        Toast.showLongBottom(getStringsCommon().has_error)
    }

    private async _signIn() {
        this.setState({isSigninInProgress: true});
        try {
            // let user = await UserUtils.loginAndGetUser("google");
            // this.loginSuccess(user);

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            let {email, id, name} = userInfo.user;
            if (email != null)
                id = email;

            let user: User = {id: id, email: email, name: name};
            this.loginSuccess(user);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("user cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("operation (f.e. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play services not available or outdated")
            } else {
                console.log("some other error happened")
            }
            DialogLogin.loginError(error);
        }
        this.setState({isSigninInProgress: false});
    }

    private _renderSignGoogle() {
        // return (
        //     <GoogleSigninButton
        //         style={{width: 250, height: 48, marginVertical: 12, alignSelf: "center"}}
        //         size={GoogleSigninButton.Size.Wide}
        //         color={GoogleSigninButton.Color.Dark}
        //         onPress={this._signIn.bind(this)}
        //         // disabled={this.state.isSigninInProgress}
        //     />
        // );
        return (
            <Button model={ButtonModel.primary}
                    disabled={this.state.isSigninInProgress}
                    style={{backgroundColor: "#F73C2B", alignSelf: "center", width: 250, marginVertical: 25}}
                    onPress={async () => {
                        this.dismiss();
                        await this._signIn();
                    }}>
                <Icon name="logo-google" style={{fontSize: 25, color: "white", marginRight: 16}}/>
                <Text style={[s.f_lar, s.white]}>{"Sign-in with Google     "}</Text>
            </Button>
        );
    }

    render() {
        return (
            <PopupDialog
                width={290}
                ref={(popupDialog) => { this.popupDialog = popupDialog }}>
                {/*{this._renderSignFacebook()}*/}
                {this._renderSignGoogle()}
            </PopupDialog>

        )
    }

    //region hide
    private _renderSignFacebook() {
        return (
            <Button model={ButtonModel.primary}
                    style={{backgroundColor: "#2A4787", alignSelf: "center", width: 250, marginTop: 30}}
                    onPress={async () => {
                        this.dismiss();
                        try {
                            let user = await UserUtils.loginAndGetUser("facebook");
                            this.loginSuccess(user)
                        } catch (e) {
                            DialogLogin.loginError(e)
                        }
                    }}>
                <Icon name="logo-facebook" style={{fontSize: 25, color: "white", marginRight: 16}}/>
                <Text style={[s.f_lar, s.white]}>Sign-in with Facebook</Text>
            </Button>
        );
    }

    show(onShowed?: Function) {
        this.popupDialog.show()
    }

    dismiss(onDismissed?: Function) {
        this.popupDialog.dismiss()
    }

    //endregion
}
