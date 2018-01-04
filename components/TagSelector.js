import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import * as firebase from "firebase";

export default class TagSelector extends React.Component {
  state = { newTag: "", tags: [] };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
    firebase
      .database()
      .ref("/tags")
      .on("value", snapshot => {
        const tags = Object.keys(snapshot.val()).map(key => {
          const tag = snapshot.val()[key];
          tag.id = key;
          return tag;
        });
        this.setState({ tags });
      });
  }

  handleNewTagChange = newTag => {
    this.setState({ newTag });
  };

  handleSubmitNewTag = () => {
    if (this.state.newTag) {
      const data = {
        name: this.state.newTag,
        user_id: this.state.user.uid,
        timestamp: Date.now()
      };
      firebase
        .database()
        .ref("tags/")
        .push(data);
    }
  };

  render() {
    return (
      <View>
        {this.state.tags.map(tag => {
          return (
            <View style={styles.tag}>
              <Text>{tag.name}</Text>
            </View>
          );
        })}
        <FormLabel>Enter new tag</FormLabel>
        <FormInput
          onChangeText={this.handleNewTagChange}
          value={this.state.newTag}
        />
        <Button
          onPress={this.handleSubmitNewTag}
          style={styles.button}
          title="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  button: {
    marginTop: 10
  },
  tag: {
    backgroundColor: "purple",
    borderRadius: 20,
    color: "white",
  }
});
