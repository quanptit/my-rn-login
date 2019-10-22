package com.app.login;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
//
//import com.facebook.CallbackManager;
//import com.facebook.FacebookCallback;
//import com.facebook.FacebookException;
//import com.facebook.FacebookRequestError;
//import com.facebook.GraphRequest;
//import com.facebook.GraphResponse;
//import com.facebook.login.LoginManager;
//import com.facebook.login.LoginResult;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

class FacebookLoginUtils{

}

//class FacebookLoginUtils implements ActivityEventListener, FacebookCallback<LoginResult> {
//    private ReactApplicationContext reactContext;
//    private CallbackManager mCallbackManager;
//    private Promise promiseReturnUser;
//    private RNLoginMoudule rnLoginMoudule;
//
//    FacebookLoginUtils(ReactApplicationContext reactContext) {
//        this.reactContext = reactContext;
//        reactContext.addActivityEventListener(this);
//        mCallbackManager = CallbackManager.Factory.create();
//        LoginManager.getInstance().registerCallback(mCallbackManager, this);
//    }
//
//    public void loginAndGetUser(Promise promise, RNLoginMoudule rnLoginMoudule, Activity activity) {
//        this.rnLoginMoudule = rnLoginMoudule;
//        this.promiseReturnUser = promise;
//        List<String> _permissions = new ArrayList<String>();
//        _permissions.add("email");
//
//        LoginManager.getInstance().logInWithReadPermissions(activity, _permissions);
//    }
//
//    private void loginCallbackError(WritableMap map) {
//        try {
//            if (promiseReturnUser != null) {
//                promiseReturnUser.reject("0", map.toString());
//                promiseReturnUser = null;
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    //region Login callback =======
//    @Override
//    public void onSuccess(final LoginResult loginResult) {
//        if (loginResult.getRecentlyGrantedPermissions().size() > 0) {
//
//            GraphRequest request = GraphRequest.newMeRequest(
//                    loginResult.getAccessToken(),
//                    new GraphRequest.GraphJSONObjectCallback() {
//                        @Override
//                        public void onCompleted(JSONObject me, GraphResponse response) {
//                            FacebookRequestError error = response.getError();
//                            if (error != null) {
//                                WritableMap map = Arguments.createMap();
//                                map.putString("errorType", error.getErrorType());
//                                map.putString("message", error.getErrorMessage());
//                                map.putString("recoveryMessage", error.getErrorRecoveryMessage());
//                                map.putString("userMessage", error.getErrorUserMessage());
//                                map.putString("userTitle", error.getErrorUserTitle());
//                                map.putInt("code", error.getErrorCode());
//                                map.putString("eventName", "onError");
//                                loginCallbackError(map);
//                            } else {
//                                try {
//                                    String id = null, name = null, email = null;
//                                    if (me.has("email")) {
//                                        email = me.getString("email");
//                                        id = email;
//                                    } else if (me.has("id"))
//                                        id = me.getString("id");
//                                    if (me.has("name"))
//                                        name = me.getString("name");
//                                    WritableMap map = Arguments.createMap();
//                                    map.putString("email", email);
//                                    map.putString("id", id);
//                                    map.putString("name", name);
//                                    if (promiseReturnUser != null) {
//                                        promiseReturnUser.resolve(map);
//                                        promiseReturnUser = null;
//                                    }
//                                } catch (JSONException e) {
//                                    e.printStackTrace();
//                                    WritableMap map = Arguments.createMap();
//                                    map.putString("message", e.getMessage());
//                                    loginCallbackError(map);
//                                }
//                                releaseAfterComplete();
//                            }
//                        }
//                    });
//            Bundle parameters = new Bundle();
//            String fields = "id,name,email";
//            parameters.putString("fields", fields);
//            request.setParameters(parameters);
//            request.executeAsync();
//        } else {
//            WritableMap map = Arguments.createMap();
//            map.putString("Insufficient permissions", "onPermissionsMissing");
//            loginCallbackError(map);
//        }
//    }
//
//    @Override
//    public void onCancel() {
//        WritableMap map = Arguments.createMap();
//        map.putString("message", "FacebookCallback onCancel event triggered");
//        map.putString("eventName", "onCancel");
//        loginCallbackError(map);
//    }
//
//    @Override
//    public void onError(FacebookException exception) {
//        WritableMap map = Arguments.createMap();
//        map.putString("message", exception.getMessage());
//        map.putString("eventName", "onError");
//        loginCallbackError(map);
//    }
//    //endregion
//
//    //region ActivityEventListener ======
//    @Override
//    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//        try {
//            mCallbackManager.onActivityResult(requestCode, resultCode, data);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public void onNewIntent(Intent intent) {}
//    //endregion
//
//    private void releaseAfterComplete() {
//        reactContext.removeActivityEventListener(this);
//        rnLoginMoudule.facebookLoginUtils = null;
//        this.promiseReturnUser = null;
//    }
//}
