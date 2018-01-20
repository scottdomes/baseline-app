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
  static navigationOptions = {
    header: null
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { records } = this.props;
    const values = records.map(record => record.value)
    const avg =
      values.length > 0 &&
      values.reduce((x, y) => x + y) / values.length;

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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ records }) => {
  return {
    records
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
