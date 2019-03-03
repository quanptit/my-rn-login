package com.app.login;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.Window;
import com.facebook.react.bridge.*;
import com.google.android.gms.auth.api.signin.*;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

/**
 * Phải tạo và add file config google-playservice.json
 * https://developers.google.com/identity/sign-in/android/start
 */
public class GoogleLoginUtilsNewAPI implements ActivityEventListener {
    private static final int RC_SIGN_IN = 9001;
    private final ReactApplicationContext reactContext;
    private Promise promiseReturnUser;
    private RNLoginMoudule rnLoginMoudule;

    private GoogleSignInClient mGoogleSignInClient;

    GoogleLoginUtilsNewAPI(ReactApplicationContext reactContext) {
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

    private void handleSignInResult(@Nullable GoogleSignInAccount account, String error) {
        if (account != null) {
            String email, id, name;
            email = account.getEmail();
            if (email != null)
                id = email;
            else
                id = account.getId();
            name = account.getDisplayName();
            handleSignInResult(email, id, name);
        } else
            handleSignInError(error);
        releaseAfterComplete();
    }

    public void loginAndGetUser(Promise promise, RNLoginMoudule rnLoginMoudule, Activity activity) {
        if (!checkPlayServices(activity)) return;
        this.rnLoginMoudule = rnLoginMoudule;
        this.promiseReturnUser = promise;

        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(activity);
        if (account != null && (account.getEmail() != null || account.getId() != null)) {
            Log.d("aa", "Has LastSignedInAccount");
            handleSignInResult(account, null);
            return;
        }

        Log.d("aa", "signInWithGoogle");
        if (mGoogleSignInClient == null) {
            GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestEmail().build();
            mGoogleSignInClient = GoogleSignIn.getClient(activity, gso);
        }

        final Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        activity.startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            // Signed in successfully, show authenticated UI.
            handleSignInResult(account, null);
        } catch (ApiException e) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            String errorMsg = "signInResult:failed code=" + e.getStatusCode();
            Log.w("aa", errorMsg);
            handleSignInResult(null, errorMsg);
        } catch (Exception e1) {
            String errorMsg = "signInResult:failed, " + e1.getMessage();
            Log.w("aa", errorMsg);
            handleSignInResult(null, errorMsg);
        }
    }

    //region ActivityEventListener ======
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    public void onNewIntent(Intent intent) {}
    //endregion

    private void releaseAfterComplete() {
        reactContext.removeActivityEventListener(this);
        rnLoginMoudule.facebookLoginUtils = null;
        this.promiseReturnUser = null;
    }

    private static boolean checkPlayServices(Activity activity) {
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
