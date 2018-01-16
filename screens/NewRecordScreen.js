import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { Button } from "react-native-elements";
import TagSelector from "../components/TagSelector";
import * as firebase from "firebase";
const COLORS = [
  "#ffbd4b",
  "#ffa350",
  "#ff8a54",
  "#ff7359",
  "#ff5e5e",
  "#ff637c",
  "#ff6898",
  "#ff6cb2",
  "#ff71cb",
  "#ff76e3",
  "#ff7bf9",
  "#f17fff",
  "#de84ff",
];
export default class LinksScreen extends React.Component {
  state = { selectedNumber: null, tags: [], user: null };
  static navigationOptions = {
    title: "New"
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleSelectNumber(selectedNumber) {
    if (
      this.state.selectedNumber &&
      this.state.selectedNumber === selectedNumber
    ) {
      this.setState({ selectedNumber: null });
    } else {
      this.setState({ selectedNumber });
    }
  }

  handleSelectTag = name => {
    this.setState({ tags: [...this.state.tags, name] });
  };

  submitRecord = () => {
    if (this.state.selectedNumber) {
      const data = {
        value: this.state.selectedNumber,
        tags: this.state.tags,
        user_id: this.state.user.uid,
        timestamp: Date.now()
      };
      firebase
        .database()
        .ref("records/")
        .push(data);
      this.setState({ selectedNumber: null, tags: [] });
    }
  };

  render() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <ScrollView style={styles.container}>
        {arr
          .filter(
            num =>
              !this.state.selectedNumber || this.state.selectedNumber === num
          )
          .map(num => {
            return (
              <Button
                onPress={this.handleSelectNumber.bind(this, num)}
                style={styles.button}
                backgroundColor={COLORS[num - 1]}
                key={num}
                title={`${num}`}
              />
            );
          })}
        <TagSelector
          user={this.state.user}
          colors={COLORS}
          onSelectTag={this.handleSelectTag}
          selectedTags={this.state.tags}
        />
        <Button
          onPress={this.submitRecord}
          title="Save"
          style={{ marginTop: 20 }}
        />
      </ScrollView>
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
  }
});
