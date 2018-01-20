import * as firebase from "firebase";

class FirebaseResource {
  setListeners(login, logout, setRecords, setTags) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setRecordListener(setRecords, user.uid);
        this.setTagListener(setTags, user.uid);
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

  setTagListener(setTags, userId) {
    firebase
      .database()
      .ref(`${userId}/tags/`)
      .on("value", snapshot => {
        if (snapshot.val() === null) {
          setTags([]);
        } else {
          const tags = Object.keys(snapshot.val()).map(key => {
            const tag = snapshot.val()[key];
            tag.id = key;
            return tag;
          });
          setTags(tags);
        }
      });
  }

  submitNewTag(name, userId) {
    const data = {
      name,
      timestamp: Date.now()
    };
    firebase
      .database()
      .ref(`${userId}/tags/`)
      .push(data);
  }
}

const fb = new FirebaseResource();
export default fb;
