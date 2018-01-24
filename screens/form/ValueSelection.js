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
class ValueSelection extends React.Component {
  state = { selectedNumber: null, value: 5 };
  static navigationOptions = {
    title: "Value"
  };

  handleSelectNumber(selectedNumber) {
    if (
      this.props.selectedValue &&
      this.props.selectedValue === selectedNumber
    ) {
      this.props.selectNewRecordValue(null);
    } else {
      this.props.selectNewRecordValue(selectedNumber);
    }
  }

  next = () => {
    console.log(this.props.navigation);
    const navigateAction = NavigationActions.navigate({
      routeName: "TagSelection"
    });

    this.props.navigation.dispatch(navigateAction);
  };

  handleValueChange = debounce(value => {
    console.log(value)
    this.setState({ value: 10 - Math.ceil(value * 10) })
    this.scroll.scrollTo({
      y: value * (2000 - Dimensions.get("window").height)
    });
  }, 0);

  render() {
    const { selectedValue } = this.props;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3,
            right: 0,
            bottom: 0,
            height: Dimensions.get("window").height,
          }}
        >
          <Text>{this.state.value}</Text>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Slider
              minimumValue={0}
              maximumValue={.9}
              orientation="vertical"
              onValueChange={this.handleValueChange}
            />
          </View>
        </View>
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
      </View>
    );
    // return (
    //   <ScrollView style={styles.container}>
    //     {arr
    //       .filter(
    //         num =>
    //           !selectedValue || selectedValue === num
    //       )
    //       .map(num => {
    //         return (
    //           <Button
    //             onPress={this.handleSelectNumber.bind(this, num)}
    //             style={styles.button}
    //             backgroundColor={COLORS[num - 1]}
    //             key={num}
    //             title={`${num}`}
    //           />
    //         );
    //       })}
    //     <Button onPress={this.next} title="Next" style={{ marginTop: 20 }} />
    //   </ScrollView>
    // );
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
    height: 1000
  }
});
