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
import { VictoryTheme, VictoryChart, VictoryLine } from "victory-native";
import moment from "moment";

class InsightsScreen extends React.Component {
  static navigationOptions = {
    title: "Insights"
  };

  render() {
    console.log('render')
    const { records } = this.props;
    if (records.length === 0) {
      return null;
    }
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          domain={{ y: [1, 10] }}
          data={records.map((record, i) => {
            return { y: record.value };
          })}
        />
      </VictoryChart>
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
