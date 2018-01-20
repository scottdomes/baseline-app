import * as firebase from "firebase";

class FirebaseResource {
  userId = null;
  setListeners(login, logout, setRecords, setTags) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
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

  submitNewTag(name) {
    const data = {
      name,
      timestamp: Date.now()
    };
    firebase
      .database()
      .ref(`${this.userId}/tags/`)
      .push(data);
  }

  submitRecord(record) {
    const data = {
      value: record.value,
      type: 'happiness',
      tags: record.tags,
      timestamp: Date.now()
    };
    firebase
      .database()
      .ref(`${this.userId}/records/`)
      .push(data);
  }
}

const fb = new FirebaseResource();
export default fb;
