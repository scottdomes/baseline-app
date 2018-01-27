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
import { ExpoConfigView } from "@expo/samples";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { VictoryTheme, VictoryChart, VictoryLine } from "victory-native";
import moment from "moment";
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
class InsightsScreen extends React.Component {
  state = { selectedTags: [] };
  static navigationOptions = {
    title: "Insights"
  };

  handleSelectTag(name) {
    if (this.state.selectedTags.indexOf(name) === -1) {
      console.log([...this.state.selectedTags, ...[name]]);
      this.setState({ selectedTags: [...this.state.selectedTags, ...[name]] });
    } else {
      let arr = [...this.state.selectedTags];
      arr.splice(arr.indexOf(name), 1);
      this.setState({ selectedTags: arr });
    }
  }

  filterRecord = record => {
    if (this.state.selectedTags.length === 0) {
      return true;
    }
    let isMatch = false;
    this.state.selectedTags.some(selectedTag => {
      if (record.tags.indexOf(selectedTag) > -1) {
        isMatch = true;
        return isMatch;
      }
    });
    return isMatch;
  };

  render() {
    const { records, tags } = this.props;
    if (records.length === 0) {
      return null;
    }
    return (
      <View>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            domain={{ y: [1, 10] }}
            data={records.filter(this.filterRecord).map((record, i) => {
              return { y: record.value };
            })}
          />
        </VictoryChart>
        <View style={styles.tagContainer}>
          {tags.map((tag, i) => {
            const isSelected = this.state.selectedTags.indexOf(tag.name) > -1;
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

export default connect(mapStateToProps, null)(InsightsScreen);

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
