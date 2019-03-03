import { Component } from 'react';
import { ViewProps } from 'react-native';
import { User } from './index';
interface Props extends ViewProps {
    /**  Nếu có cái này => không replace HomeScreen nữa */
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
