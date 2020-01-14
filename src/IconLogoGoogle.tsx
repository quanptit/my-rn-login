import React, {Component} from 'react';

import {_RenderCommonIconUtils, CommonIconProps} from "my-rn-base-component/dist/common-icons/_RenderCommonIconUtils";

export class IconLogoGoogle extends Component<CommonIconProps, any> {

    render() {
        return _RenderCommonIconUtils({source: require("../assets/icons/logo-google.png"), ...this.props});
    }

}
