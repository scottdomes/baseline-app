import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ExpoConfigView } from '@expo/samples';
import { connect } from "react-redux";

class InsightsScreen extends React.Component {
  static navigationOptions = {
    title: 'Insights',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Text style={{marginTop: 100}}>{this.props.records.length}</Text>
  }
}

const mapStateToProps = ({ records, tags }) => {
  return {
    records,
    tags
  };
};

export default connect(mapStateToProps, null)(InsightsScreen);
