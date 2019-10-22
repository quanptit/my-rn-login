package com.app.login;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.util.Log;
import android.view.Window;

import com.app.login.RNLoginMoudule;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.GoogleApiClient;


/**
 * Phải tạo và add file config google-playservice.json
 * https://developers.google.com/identity/sign-in/android/start
 */
public class GoogleLoginUtils implements ActivityEventListener {
    private static final int RC_SIGN_IN = 9001;
    private static final int REQUEST_GOOGLE_PLAY_SERVICES = 9000;
    private final ReactApplicationContext reactContext;
    private Promise promiseReturnUser;
    private RNLoginMoudule rnLoginMoudule;

    private GoogleApiClient mGoogleApiClient;

    GoogleLoginUtils(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    private void handleSignInError(String error) {
        if (promiseReturnUser != null)
            promiseReturnUser.reject("0", error);
    }

    private void handleSignInResult(String email, String id, String name) {
        WritableMap map = Arguments.createMap();
        map.putString("email", email);
        map.putString("id", id);
        map.putString("name", name);
        if (promiseReturnUser != null)
            promiseReturnUser.resolve(map);
    }

    public void loginAndGetUser(Promise promise, RNLoginMoudule rnLoginMoudule, Activity activity) {
        if (!checkPlayServices(activity)) return;
        this.rnLoginMoudule = rnLoginMoudule;
        this.promiseReturnUser = promise;

        Log.d("aa", "signInWithGoogle");
        if (mGoogleApiClient != null) {
            mGoogleApiClient.disconnect();
        }

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestEmail().build();
        mGoogleApiClient = new GoogleApiClient.Builder(activity).addApi(Auth.GOOGLE_SIGN_IN_API, gso).build();

        final Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
        activity.startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    public void googleSigninOnActivityResult(int requestCode, int resultCode, Intent data) {
        // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            if (result.isSuccess()) {
                String email = null, id = null, name = null;
                GoogleSignInAccount signInAccount = result.getSignInAccount();
                try {
                    email = signInAccount.getEmail();
                    if (email != null) {
                        id = email;
                    } else {
                        id = signInAccount.getId();
                    }
                    name = signInAccount.getDisplayName();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                handleSignInResult(email, id, name);
            } else {
                handleSignInError(result.getStatus().getStatusMessage());
            }
            releaseAfterComplete();
        }
    }

    //region ActivityEventListener ======
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        googleSigninOnActivityResult(requestCode, resultCode, data);
    }

    public void onNewIntent(Intent intent) {}
    //endregion

    private void releaseAfterComplete() {
        reactContext.removeActivityEventListener(this);
        rnLoginMoudule.facebookLoginUtils = null;
        this.promiseReturnUser = null;
    }

    static boolean checkPlayServices(Activity activity) {
        final int PLAY_SERVICES_RESOLUTION_REQUEST = 9000;
        GoogleApiAvailability apiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = apiAvailability.isGooglePlayServicesAvailable(activity);
        if (resultCode != ConnectionResult.SUCCESS) {
            if (apiAvailability.isUserResolvableError(resultCode)) {
                apiAvailability.getErrorDialog(activity, resultCode, PLAY_SERVICES_RESOLUTION_REQUEST)
                        .show();
            } else {
                AlertDialog.Builder builder = new AlertDialog.Builder(activity);
                String messageStr = "\n" + "This device is not supported. Please intstall Google App first." + "\n";
                builder.setMessage(messageStr);
                builder.setPositiveButton("OK", null);
                AlertDialog dialog = builder.create();
                dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
                dialog.setCancelable(true);
                dialog.show();
            }
            return false;
        }
        return true;
    }
}
