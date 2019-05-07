import { Component } from 'react';
import { ViewProps } from 'react-native';
import { User } from "my-rn-base-utils";
interface Props extends ViewProps {
    callbackLoginSuccess: (user: User) => void;
}
declare type States = {
    isSigninInProgress?: boolean;
};
export declare class DialogLogin extends Component<Props, States> {
    private popupDialog;
    constructor(props: any);
    loginSuccess(user: User): Promise<void>;
    static loginError(error?: any): void;
    private _signIn;
    private _renderSignGoogle;
    render(): JSX.Element;
    private _renderSignFacebook;
    show(onShowed?: Function): void;
    dismiss(onDismissed?: Function): void;
}
export {};
