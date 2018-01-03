import * as firebase from 'firebase';

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
