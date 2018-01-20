import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { NavigationActions } from "react-navigation";

export default class SaveConfirmation extends React.Component {
  render() {
    return (
      <Text>Done</Text>
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
