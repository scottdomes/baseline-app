import * as firebase from "firebase";

export async function facebookLogin() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "415054625594970",
    { permissions: ["public_profile"] }
  );

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        // Handle Errors here.
      });
  }
}

export async function googleLogin() {
  const { type, accessToken } = await Expo.Google.logInAsync({
    androidClientId:
      "1006643764024-j9bbnhb7mbkcd2m5bda0tjk1pvp5iigq.apps.googleusercontent.com",
    iosClientId:
      "1006643764024-3mm375g3jla9icgth5chvofa67nofabs.apps.googleusercontent.com",
    scopes: ["profile", "email"]
  });

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    console.log(accessToken)
    const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);

    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
          console.log(credential, error)
        // Handle Errors here.
      });
  }
}
