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
class TagSelection extends React.Component {
  static navigationOptions = {
    title: "Tags"
  };

  handleSelectTag = name => {
    this.props.addNewRecordTag(name);
  };

  handleDeselectTag = name => {
    this.props.removeNewRecordTag(name);
  };

  handleSubmitNewTag = name => {
    this.props.submitNewRecordTag(name);
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
    return (
      <ScrollView style={styles.container}>
        <TagSelector
          colors={COLORS}
          onSelectTag={this.handleSelectTag}
          onRemoveTag={this.handleDeselectTag}
          onSubmitTag={this.handleSubmitNewTag}
          selectedTags={this.props.tags}
        />
        <Button onPress={this.next} title="Next" style={{ marginTop: 20 }} />
      </ScrollView>
    );
  }
}


const mapStateToProps = ({ newRecord }) => {
  return {
    selectedTags: newRecord.tags
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewRecordTag: tag => {
      dispatch(addNewRecordTag(val));
    },
    removeNewRecordTag: tag  => {
      dispatch(removeNewRecordTag(val));
    },
    submitNewRecordTag: tag  => {
      dispatch(submitNewRecordTag(val));
    },
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
  }
});
