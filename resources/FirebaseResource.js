import * as firebase from "firebase";

class FirebaseResource {
  setListeners(login, logout, setRecords) {
    firebase.auth().onAuthStateChanged(user => {
      login(user);
    });
  }
}

const fb = new FirebaseResource();
export default fb;
