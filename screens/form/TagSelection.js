import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {
  addNewRecordTag,
  removeNewRecordTag,
  resetRecord
} from "../../actions";
import FirebaseResource from "../../resources/FirebaseResource";
import NotificationResource from "../../resources/NotificationResource";

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
class TagSelection extends React.Component {
  state = { newTag: "" };
  static navigationOptions = {
    title: "Tags"
  };

  handleSelectTag(name) {
    if (this.props.newRecord.tags.indexOf(name) > -1) {
      this.props.removeNewRecordTag(name);
    } else {
      this.props.addNewRecordTag(name);
    }
  }

  handleSubmitNewTag = () => {
    FirebaseResource.submitNewTag(this.state.newTag);
    this.props.addNewRecordTag(this.state.newTag);
    this.setState({ newTag: "" });
  };

  handleNewTagChange = newTag => {
    this.setState({ newTag });
  };

  next = () => {
    FirebaseResource.submitRecord(this.props.newRecord);
    NotificationResource.schedule();

    this.props.resetRecord();
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
    const { tags, newRecord } = this.props;
    const selectedTags = newRecord.tags;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tagContainer}>
          {tags.map((tag, i) => {
            const isSelected = selectedTags.indexOf(tag.name) > -1;
            const color = COLORS[i % 10];
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
        <Button onPress={this.next} title="Next" style={{ marginTop: 20 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ newRecord, tags }) => {
  return {
    newRecord,
    tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewRecordTag: tag => {
      dispatch(addNewRecordTag(tag));
    },
    removeNewRecordTag: tag => {
      dispatch(removeNewRecordTag(tag));
    },
    resetRecord: () => {
      dispatch(resetRecord());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagSelection);

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
