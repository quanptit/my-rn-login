package com.app.login;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RNLoginMoudule extends ReactContextBaseJavaModule {

    public RNLoginMoudule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNLoginMoudule";
    }

    @ReactMethod
    public void loginAndGetUser(String provider, Promise promise) { //provider: enum (facebook, google), return: {name, id, email}
        Log.d("aa", "loginAndGetUser: " + provider);
        if (provider.equals("google"))
            loginAndGetUserGoogle(promise);
        else
            loginAndGetUserFacebook(promise);
    }

    FacebookLoginUtils facebookLoginUtils;
    GoogleLoginUtilsNewAPI googleLoginUtils;

    private void loginAndGetUserFacebook(Promise promise) {
//        try {
//            facebookLoginUtils = new FacebookLoginUtils(getReactApplicationContext());
//            facebookLoginUtils.loginAndGetUser(promise, this, this.getCurrentActivity());
//        } catch (Exception e) {
//            e.printStackTrace();
//            promise.reject("0", e.getMessage());
//        }
    }

    private void loginAndGetUserGoogle(Promise promise) {
        try {
            googleLoginUtils = new GoogleLoginUtilsNewAPI(getReactApplicationContext());
            googleLoginUtils.loginAndGetUser(promise, this, this.getCurrentActivity());
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("0", e.getMessage());
        }
    }
}
