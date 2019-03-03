// import OAuthManager from "react-native-oauth";
// const manager = new OAuthManager(Keys.iosId);
/* https://github.com/fullstackreact/react-native-oauth
 1. Đăng nhập qua facebook
 + Tạo ứng dụng facebook và live nó ở phần "Xét duyệt ứng dụng"
 + Thêm nền tảng IOS vào ứng dụng, với Id gói có dạng; fb{YOUR_APP_FB_ID}
 + Thêm sản phẩm "Đăng nhập facebook". Trong mục cài đặt của sản phầm này thiết lập "URI chuyển hướng OAuth hợp lệ" = http://localhost/facebook
 + Ios project tạo Schemes: Name = Facebook, URL Schemes = fb{YOUR_APP_FB_ID}

 2. Đăng nhập qua google
 + Tạo ứng dụng google: https://console.developers.google.com/
 + enable the Identity Toolkit API API
 + Navigate to the Credentials tab and create a new credential. Create an iOS API credential.
 Take note of the client_id and the iOS URL scheme.
 In addition, make sure to set the bundle ID as the bundle id in our application in Xcode:
 + Ios project tạo Schemes: Name = Google, URL Schemes = iOS URL scheme ở bước trên

 Chỉnh sửa cái config bên dưới
 */
//TODO -OK
// manager.configure({
//     facebook: {
//         client_id: '326576314540769',
//         client_secret: '69666dca0e301903ccce433b0d29fe30'
//     },
//     google: {
//         callback_url: "com.googleusercontent.apps.514111253398-j6gmq5l013i87h1gj6pbvl48r2cmb3dg:/google",
//         client_id: '514111253398-j6gmq5l013i87h1gj6pbvl48r2cmb3dg.apps.googleusercontent.com'
//     }
// });
export class LoginIOS {
    /**
     * provider: enum (facebook, google). <br>
     * return: {name, id, email}
     * */
    static async loginAndGetUser(provider) {
        // console.log("IOS loginAndGetUser");
        // let response = await manager.authorize(provider, {scopes: "email"});
        // console.log("Login SUCCESS", provider, response);
        // let data;
        // if (provider === "facebook") {
        //     data = await manager.makeRequest('facebook', '/me?fields=id,name,email');
        // } else {
        //     const googleUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        //     data = await manager.makeRequest('google', googleUrl);
        //     console.log("GetUser: ", data)
        // }
        // if (data.data) {
        //     data = data.data;
        //     return {name: data.name, id: (data.email ? data.email : data.id), email: data.email};
        // }
        return null;
    }
    /**
     * provider: enum (facebook, google)
     * */
    static async logout(provider) {
        // await manager.deauthorize(provider);
    }
}
