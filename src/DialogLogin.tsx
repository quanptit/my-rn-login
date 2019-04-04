import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {Text, ViewProps} from 'react-native'
import {UserUtils} from './UserUtils'
import {PopupDialog, Toast, Button, ButtonModel, StyleUtils} from "my-rn-base-component";
import {getStringsCommon} from "my-rn-common-resource"
import {User} from "my-rn-base-utils";

const s = StyleUtils.getAllStyle();

interface Props extends ViewProps {
    callbackLoginSuccess: (user: User) => void
}

export class DialogLogin extends Component<Props> {
    private popupDialog: PopupDialog;

    constructor(props) {
        super(props);
        UserUtils.logoutAll();
    }

    loginSuccess(user: User) {
        if (!user) {
            DialogLogin.loginError();
            return
        }
        this.props.callbackLoginSuccess && this.props.callbackLoginSuccess(user)
    }

    static loginError(error?) {
        console.log("====== loginError: ", error);
        Toast.showLongBottom(getStringsCommon().has_error)
    }

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

    private _renderSignGoogle() {
        return (
            <Button model={ButtonModel.primary}
                    style={{backgroundColor: "#F73C2B", alignSelf: "center", width: 250, marginVertical: 25}}
                    onPress={async () => {
                        this.dismiss();
                        try {
                            let id = await UserUtils.loginAndGetUser("google");
                            this.loginSuccess(id);
                        } catch (e) {
                            DialogLogin.loginError(e);
                        }
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

    show(onShowed?: Function) {
        this.popupDialog.show()
    }

    dismiss(onDismissed?: Function) {
        this.popupDialog.dismiss()
    }
}
