import { Component } from 'react';
import { ViewProps } from 'react-native';
import { User } from "my-rn-base-utils";
interface Props extends ViewProps {
    callbackLoginSuccess: (user: User) => void;
}
export declare class DialogLogin extends Component<Props> {
    private popupDialog;
    constructor(props: any);
    loginSuccess(user: User): void;
    static loginError(error?: any): void;
    render(): JSX.Element;
    show(onShowed?: Function): void;
    dismiss(onDismissed?: Function): void;
}
export {};
