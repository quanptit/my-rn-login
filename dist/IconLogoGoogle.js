import { Component } from 'react';
import { _RenderCommonIconUtils } from "my-rn-base-component/dist/common-icons/_RenderCommonIconUtils";
export class IconLogoGoogle extends Component {
    render() {
        return _RenderCommonIconUtils({ source: require("../assets/icons/logo-google.png"), ...this.props });
    }
}
