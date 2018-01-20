import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import TagSelector from "../../components/TagSelector";

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
  "#de84ff"
];
export default class TagSelection extends React.Component {
  state = { tags: [] };
  static navigationOptions = {
    title: "Tags"
  };

  handleSelectTag = name => {
    this.setState({ tags: [...this.state.tags, name] });
  };

  next = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "ValueSelection" }),
        NavigationActions.navigate({ routeName: "SaveConfirmation" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <ScrollView style={styles.container}>
        <TagSelector
          colors={COLORS}
          onSelectTag={this.handleSelectTag}
          selectedTags={this.state.tags}
        />
        <Button onPress={this.next} title="Next" style={{ marginTop: 20 }} />
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
