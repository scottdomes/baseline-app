import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Platform,
  TouchableHighlight
} from "react-native";
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
import WhiteButton from "../../components/WhiteButton";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";

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
  state = { newTag: "", modalOpen: false, deleteTagsOn: false };
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
    this.setState({ newTag: "", modalOpen: false });
  };

  handleNewTagChange = newTag => {
    this.setState({ newTag });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  toggleDeleteTags = () => {
    this.setState(prev => ({ deleteTagsOn: !prev.deleteTagsOn }));
  };

  handleDeleteTag = id => {
    FirebaseResource.deleteTag(id);
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
    const os = Platform.OS === "ios" ? "ios-" : "md-";

    return (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={["#FF7C00", "#C751D4", "#2887FF"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: 1000
          }}
        />
        <View style={styles.iconContainer}>
          <TouchableHighlight style={{ width: 40 }} onPress={this.openModal}>
            <Ionicons color="#9BC155" size={40} name={`${os}add`} />
          </TouchableHighlight>
          <TouchableHighlight
            style={{ width: 40 }}
            onPress={this.toggleDeleteTags}
          >
            <Ionicons size={40} color="#C93E63" name={`${os}close`} />
          </TouchableHighlight>
        </View>
        <View style={styles.tagContainer}>
          {tags.map((tag, i) => {
            const isSelected = selectedTags.indexOf(tag.name) > -1;
            const color = ["#3f51b5", "#C751D4", "#2887FF"][i % 3];
            const textColor =
              this.state.deleteTagsOn || isSelected ? "#fff" : color;
            let backgroundColor = "#fff";
            if (isSelected) {
              backgroundColor = color;
            }
            if (this.state.deleteTagsOn) {
              backgroundColor = "#C93E63";
            }
            return (
              <Button
                containerViewStyle={styles.tag}
                key={tag.id}
                backgroundColor={backgroundColor}
                title={tag.name}
                rounded
                color={textColor}
                onPress={
                  this.state.deleteTagsOn
                    ? this.handleDeleteTag.bind(this, tag.id)
                    : this.handleSelectTag.bind(this, tag.name)
                }
              />
            );
          })}
        </View>
        <Modal
          visible={this.state.modalOpen}
          animationType={"slide"}
          onRequestClose={this.closeModal}
          transparent
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "rgba(256, 256, 256, .5)"
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                paddingBottom: 20,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  padding: 5
                }}
              >
                <TouchableHighlight
                  style={{ width: 40 }}
                  onPress={this.closeModal}
                >
                  <Ionicons size={40} name={`${os}close`} />
                </TouchableHighlight>
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
          </View>
        </Modal>
        <WhiteButton
          onPress={this.next}
          title="Next"
          style={{ marginTop: 20, marginBottom: 20 }}
        />
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
    backgroundColor: "#fff"
  },
  button: {
    marginTop: 10
  },
  tag: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    marginBottom: 5
  },
  tagContainer: {
    paddingTop: 20,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  smallButton: {
    flex: 1,
    marginLeft: 0,

    marginRight: 0
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#fff"
  }
});
