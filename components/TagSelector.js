import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import * as firebase from "firebase";

export default class TagSelector extends React.Component {
  state = { newTag: "", tags: [] };
  componentDidMount() {
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
        user_id: this.props.user.uid,
        timestamp: Date.now()
      };
      firebase
        .database()
        .ref("tags/")
        .push(data);
      this.setState({ newTag: "" });
      this.props.onSelectTag(this.state.newTag);
    }
  };

  handleSelectTag(name) {
    this.props.onSelectTag(name);
  }

  render() {
    const { selectedTags } = this.props;
    return (
      <View>
        <View style={styles.tagContainer}>
          {this.state.tags.map((tag, i) => {
            const isSelected = selectedTags.indexOf(tag.name) > -1;
            const color = this.props.colors[i % 10]
            return (
              <Button
                style={styles.tag}
                key={tag.id}
                backgroundColor={isSelected ? color : "grey"}
                title={tag.name}
                rounded
                margin={0}
                onPress={this.handleSelectTag.bind(this, tag.name)}
              />
            );
          })}
        </View>
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
    margin: 0,
    marginTop: 5,
    marginBottom: 5
  },
  tagContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  }
});
