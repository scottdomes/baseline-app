import * as firebase from "firebase";

class FirebaseResource {
  setListeners(login, logout, setRecords) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setRecordListener(setRecords, user.uid);
        login(user);
      } else {
        logout();
      }
    });
  }

  setRecordListener(setRecords, userId) {
    firebase
      .database()
      .ref(`${userId}/records/`)
      .on("value", snapshot => {
        if (snapshot.val() === null) {
          setRecords([]);
        } else {
          const records = Object.keys(snapshot.val()).map(key => {
            const record = snapshot.val()[key];
            record.id = key;
            return record;
          });
          setRecords(records);
        }
      });
  }
}

const fb = new FirebaseResource();
export default fb;
