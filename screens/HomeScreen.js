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
import { Ionicons } from "@expo/vector-icons";

import { MonoText } from "../components/StyledText";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const os = Platform.OS === "ios" ? "ios-" : "md-";
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.bigStatContainer}>
            <Text style={styles.bigNumber}>7.2</Text>
            <Text style={styles.bigStatLabel}>avg happiness</Text>
          </View>
          <View style={styles.littleStatContainer}>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-up`} /> Up .2 from last week
            </Text>
            <Text style={styles.littleStat}>
              <Ionicons size={20} name={`${os}arrow-round-down`} /> Down .3 from last month
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
    textAlign: 'center'
  }
});
