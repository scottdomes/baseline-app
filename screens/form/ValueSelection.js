import React from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import { Button, Slider } from "react-native-elements";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
import { selectNewRecordValue } from "../../actions";
import { LinearGradient } from "expo";
var debounce = require("lodash.debounce");

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

const moods = [
  "Unbelievable",
  "Amazing",
  "Fantastic",
  "Great",
  "Good",
  "Fine",
  "Subpar",
  "Bad",
  "Terrible",
  "Horrendous"
].reverse();
class ValueSelection extends React.Component {
  state = { selectedNumber: null, value: 5 };
  static navigationOptions = {
    title: "Value"
  };

  handleSelectNumber = debounce(selectedNumber => {
    this.props.selectNewRecordValue(selectedNumber);
  }, 200);

  next = () => {
    console.log(this.props.navigation);
    const navigateAction = NavigationActions.navigate({
      routeName: "TagSelection"
    });

    this.props.navigation.dispatch(navigateAction);
  };

  handleValueChange = debounce(value => {
    const adjusted = 10 - Math.ceil(value * 10);
    this.setState({ value: adjusted });
    this.scroll.scrollTo({
      y: value * (2000 - Dimensions.get("window").height)
    });
    this.handleSelectNumber(adjusted);
  }, 0);

  render() {
    const { selectedValue } = this.props;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={el => (this.scroll = el)}
          style={styles.scrollContainer}
        >
          <View>
            <LinearGradient
              colors={["#FF7C00", "#C751D4", "#2887FF"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                height: 2000
              }}
            />
          </View>
        </ScrollView>
        <View
          style={{
            zIndex: 2,
            flex: 1,
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <Text style={styles.heading}>{this.state.value}</Text>
          <Text style={styles.heading}>{moods[this.state.value - 1]}</Text>
          <View style={{ height: 375 }}>
            <Slider
              minimumValue={0}
              maximumValue={0.9}
              value={0.4}
              orientation="vertical"
              thumbStyle={{ width: 100, height: 100, borderRadius: 100 }}
              thumbTouchSize={{ width: 100, height: 100 }}
              thumbTintColor={"white"}
              style={{ marginTop: 170 }}
              onValueChange={this.handleValueChange}
            />
          </View>
          <Button onPress={this.next} title="Next" style={{}} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ newRecord }) => {
  return {
    selectedValue: newRecord.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNewRecordValue: val => {
      dispatch(selectNewRecordValue(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValueSelection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  button: {
    marginTop: 10
  },
  scrollContainer: {
    height: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white"
    // marginTop: 40,
    // flex:  1
  }
});
