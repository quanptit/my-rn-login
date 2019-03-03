export { UserUtils } from './UserUtils';
export { DialogLogin } from './DialogLogin';
export interface User {
    id?: string;
    name?: string;
    email?: string;
    lastTimeOpenApp?: number;
    isIOS?: boolean;
    isVip?: boolean;
}
