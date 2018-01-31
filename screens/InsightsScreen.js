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
  "#f3a683",
  "#3B3B98",
  "#778beb",
  "#e15f41",
  "#c44569",
  "#574b90",
  "#f8a5c2",
  "#63cdda",
  "#596275",
  "#B33771",
  "#9AECDB",
  "#58B19F",
  "#82589F"
];
class InsightsScreen extends React.Component {
  state = { selectedTags: [], tree: {} };
  static navigationOptions = {
    title: "Insights"
  };

  handleSelectTag(name) {
    if (this.state.selectedTags.indexOf(name) === -1) {
      this.setState({ selectedTags: [...this.state.selectedTags, ...[name]] });
    } else {
      let arr = [...this.state.selectedTags];
      arr.splice(arr.indexOf(name), 1);
      this.setState({ selectedTags: arr });
    }
  }

  componentDidMount() {
    this.organizeRecords(this.props.records);
  }

  componentWillReceiveProps(next) {
    if (next.navigation.state.params && next.navigation.state.params.name) {
      this.setState({ selectedTags: [next.navigation.state.params.name] });
    }
    if (next.records.length !== this.props.records.length) {
      this.organizeRecords(next.records);
    }
  }

  organizeRecords(records) {
    const tree = {};
    records.forEach((record, i) => {
      record.tags.forEach(tag => {
        if (tree[tag]) {
          tree[tag].records.push(record);
        } else {
          tree[tag] = { records: [] };
        }
      });
    });
    this.setState({ tree });
  }

  handleSelectAll() {
    this.setState({ selectedTags: [] });
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
      <ScrollView>
        <VictoryChart
          height={350}
          theme={VictoryTheme.material}
          scale={{ x: "time" }}
        >
          {this.state.selectedTags.length > 0 ? (
            this.state.selectedTags.map((tag, i) => {
              if (!this.state.tree[tag]) {
                return null;
              }
              return (
                <VictoryLine
                  key={tag}
                  style={{
                    data: { stroke: COLORS[i] },
                    parent: { border: "1px solid #ccc" }
                  }}
                  domain={{ y: [1, 10] }}
                  data={this.state.tree[tag].records.map((record, i) => {
                    return {
                      y: record.value,
                      x: new Date(record.timestamp)
                    };
                  })}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                />
              );
            })
          ) : (
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              domain={{ y: [1, 10] }}
              data={records.map((record, i) => {
                return {
                  y: record.value,
                  x: new Date(record.timestamp)
                };
              })}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            />
          )}
        </VictoryChart>

        <View style={styles.tagContainer}>
          <Button
            style={styles.tag}
            backgroundColor={
              this.state.selectedTags.length === 0 ? COLORS[0] : "grey"
            }
            title="All"
            rounded
            margin={0}
            onPress={this.handleSelectAll.bind(this)}
          />
          {tags.sort((a, b) => a.name.localeCompare(b.name)).map((tag, i) => {
            if (!this.state.tree[tag.name]) {
              return null;
            }
            if (this.state.tree[tag.name].records.length < 2) {
              return null;
            }
            const isSelected = this.state.selectedTags.indexOf(tag.name) > -1;
            return (
              <Button
                style={styles.tag}
                key={tag.id}
                backgroundColor={
                  isSelected ? COLORS[this.state.selectedTags.indexOf(tag.name)] : "grey"
                }
                title={tag.name}
                rounded
                margin={0}
                onPress={this.handleSelectTag.bind(this, tag.name)}
              />
            );
          })}
        </View>
      </ScrollView>
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
