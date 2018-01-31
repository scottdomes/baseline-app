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
import { WebBrowser, LinearGradient } from "expo";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Button, List, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { MonoText } from "../components/StyledText";

class HomeScreen extends React.Component {
  state = {
    tagTree: {},
    weekChange: 0,
    monthChange: 0,
    weekAverage: 0,
    monthAverage: 0
  };
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
      this.calculateAverages(next.records);
    }
  }

  calculateAverages(records) {
    let weekAverage = 0;
    let pastWeekAverage = 0;
    let monthAverage = 0;
    let pastMonthAverage = 0;
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const lastLastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 14
    );
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const lastLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 2,
      today.getDate()
    );
    records.forEach(record => {
      const inPastWeek = new Date(record.timestamp) > lastWeek;
      const inPastPastWeek = new Date(record.timestamp) > lastLastWeek;
      const inPastMonth = new Date(record.timestamp) > lastMonth;
      const inPreviousMonth = new Date(record.timestamp) > lastLastMonth;
      if (inPastWeek) {
        weekAverage = (weekAverage + record.value) / 2;
      } else if (inPastPastWeek) {
        pastWeekAverage = (pastWeekAverage + record.value) / 2;
      }
      if (inPastMonth) {
        monthAverage = (monthAverage + record.value) / 2;
      } else if (inPastPastWeek) {
        pastMonthAverage = (pastMonthAverage + record.value) / 2;
      }
    });
    this.setState({
      weekAverage,
      monthAverage,
      weekChange: weekAverage - pastWeekAverage,
      monthChange: monthAverage - pastMonthAverage
    });
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

  sortTree = tagTree => {
    const array = Object.keys(tagTree).map(name => {
      const value = tagTree[name];
      return { name, value };
    });
    return array.sort((a, b) => b.value - a.value);
  };

  handleTagPress(name) {
    const navigateAction = NavigationActions.navigate({
      routeName: "Insights",
      params: { name }
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { records, tags } = this.props;
    const values = records.map(record => record.value);
    const avg =
      values.length > 0 &&
      (values.reduce((x, y) => x + y) / values.length).toFixed(1);

    const os = Platform.OS === "ios" ? "ios-" : "md-";
    const weekIncreased = this.state.weekChange > 0
    const monthIncreased = this.state.monthChange > 0
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF7C00", "#C751D4", "#2887FF"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
        />
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
              <Ionicons size={20} name={`${os}stats`} /> Average this
              week: {this.state.weekAverage.toFixed(1)}
            </Text>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-${weekIncreased ? "up" : "down"}`} /> { weekIncreased ? "Improved" : "Decreased" }{" "}
              {(this.state.weekChange).toFixed(1)}{" "}
              from last week
            </Text>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}stats`} /> Average this
              month: {this.state.monthAverage.toFixed(1)}
            </Text>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-${monthIncreased ? "up" : "down"}`} /> { monthIncreased ? "Improved" : "Decreased" }{" "}
              {(this.state.monthChange).toFixed(1)}{" "}
              from last month
            </Text>
          </View>
          <List>
            <ListItem title={"Your tags"} hideChevron />
            {this.sortTree(this.state.tagTree).map(tag => {
              return (
                <ListItem
                  key={tag.name}
                  onPress={this.handleTagPress.bind(this, tag.name)}
                  title={`${tag.value.toFixed(1)}     ${tag.name}`}
                />
              );
            })}
          </List>

          <Button onPress={this.handleLogout} title="Logout" />
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
    position: "relative"
  },
  whiteText: {
    color: "white"
  },
  bigStatContainer: {
    paddingTop: 50,
    backgroundColor: "transparent"
  },
  littleStatContainer: {
    backgroundColor: "transparent"
  },
  bigNumber: {
    fontSize: 150,
    textAlign: "center",
    color: "white"
  },
  bigStatLabel: {
    fontSize: 20,
    textAlign: "center",
    marginTop: -20,
    marginBottom: 20,
    color: "white"
  },
  littleStat: {
    textAlign: "center",
    color: "white"
  },
  tagContainer: {
    backgroundColor: "transparent"
  },
  centered: {
    textAlign: "center"
  }
});
