import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { MonoText } from "../components/StyledText";

class HomeScreen extends React.Component {
  state = { tagTree: {} };
  static navigationOptions = {
    header: null
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    this.organizeTags(this.props.records, this.props.tags);
  }

  componentWillReceiveProps(next) {
    if (
      next.records.length !== this.props.records.length ||
      next.tags.length !== this.props.tags.length
    ) {
      this.organizeTags(next.records, next.tags);
    }
  }

  organizeTags = (records, tags) => {
    const tree = {};
    const tagNames = tags.map(tag => tag.name);
    records.forEach(record => {
      record.tags.forEach(tag => {
        // If they have not deleted the tag
        if (tagNames.indexOf(tag) > -1) {
          if (tree[tag]) {
            tree[tag] = (tree[tag] + record.value) / 2;
          } else {
            tree[tag] = record.value;
          }
        }
      });
    });
    this.setState({ tagTree: tree });
  };

  render() {
    const { records, tags } = this.props;
    const values = records.map(record => record.value);
    const avg =
      values.length > 0 &&
      (values.reduce((x, y) => x + y) / values.length).toFixed(1);

    const os = Platform.OS === "ios" ? "ios-" : "md-";
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.bigStatContainer}>
            {avg && <Text style={styles.bigNumber}>{avg}</Text>}
            <Text style={styles.bigStatLabel}>avg happiness</Text>
          </View>
          <View style={styles.littleStatContainer}>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-up`} /> Up .2 from
              last week
            </Text>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-down`} /> Down .3 from
              last month
            </Text>
          </View>
          <Button onPress={this.handleLogout} title="Logout" />
          {Object.keys(this.state.tagTree).map(key => {
            const val = this.state.tagTree[key];
            return (
              <Text key={key}>
                {key} {val}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ records, tags }) => {
  return {
    records,
    tags
  };
};

export default connect(mapStateToProps, null)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bigStatContainer: {
    paddingTop: 50
  },
  bigNumber: {
    fontSize: 150,
    textAlign: "center"
  },
  bigStatLabel: {
    fontSize: 20,
    textAlign: "center",
    marginTop: -20,
    marginBottom: 20
  },
  littleStat: {
    textAlign: "center"
  }
});
