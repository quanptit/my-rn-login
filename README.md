my-rn-common-resource: Lưu trữ tham chiếu đến cái String
## Installation

##### Thêm Vào package.json
```
"react-native-login": "git+https://gitlab.com/react-native-my-libs/react-native-login.git",
```

Chạy  lệnh sau
```
npm install
react-native link react-native-login
```

## Sử dụng
 <!--TODO - OK  App Test: 2109939162353778-->
    <string name="face_app_id" translatable="false">471377673312673</string>
    <string name="fb_login_protocol_scheme" translatable="false">fb471377673312673</string>

### Android
Thêm vào strings.xml
```xml

```

Thêm vào AndroidManifest.xml
```xml
<!-- ============== Facebook login ===========-->
        <meta-data
            android:name="com.facebook.sdk.ApplicationId"
            android:value="@string/face_app_id"/>

        <activity
            android:name="com.facebook.FacebookActivity"
            android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
            android:label="@string/app_name"/>
        <activity
            android:name="com.facebook.CustomTabActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>

                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>

                <data android:scheme="@string/fb_login_protocol_scheme"/>
            </intent-filter>
        </activity>
       
```
Chỉ cần gọi và sử dụng component. 
nếu login error sẽ không trả về callback mà tự show dialog thông báo rồi

```
 return <DialogLogin callbackLoginSuccess={(user: User) => {
       CommonUtils.openScreen("HomeScreen", {type: "reset", isNeedUpdateDataFireBase: true})
 }}/>
```
