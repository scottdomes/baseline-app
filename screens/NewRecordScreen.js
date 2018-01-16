import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { Button } from "react-native-elements";
import TagSelector from "../components/TagSelector";

export default class LinksScreen extends React.Component {
  state = { selectedNumber: null, tags: [] };
  static navigationOptions = {
    title: "New"
  };

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
    this.setState({ tags: [...this.state.tags, name] })
  }

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
                key={num}
                title={`${num}`}
              />
            );
          })}
        <TagSelector onSelectTag={this.handleSelectTag} selectedTags={this.state.tags} />
        <Button onPress={this.submitRecord} title="Save" />
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
