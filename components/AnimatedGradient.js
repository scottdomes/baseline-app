import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { LinearGradient } from "expo";
import Chroma from "chroma-js";

var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

const TOP_COLORS = [
  "#EF2A2A",
  "#EF6A2A",
  "#1BD170",
  "#22D2E6",
  "#2A3BEF",
  "#EF2AD2",
  "#EF2AD2"
];
const BOTTOM_COLORS = [
  "#EF6A2A",
  "#EFD82A",
  "#61E822",
  "#26F084",
  "#2ADCEF",
  "#2A3BEF",
  "#EF2A2A"
];
const GRADIENT_COLOR_LENGTH = 700;
const TOP_COLORS_SPECTRUM = Chroma.scale(TOP_COLORS).colors(
  GRADIENT_COLOR_LENGTH
);
const BOTTOM_COLORS_SPECTRUM = Chroma.scale(BOTTOM_COLORS).colors(
  GRADIENT_COLOR_LENGTH
);
const INTERVAL = 50;

export default class AnimatedGradient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topIndex: 0,
      bottomIndex: 0,
      colorTop: TOP_COLORS_SPECTRUM[0],
      colorBottom: BOTTOM_COLORS_SPECTRUM[0]
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let { topIndex, bottomIndex } = this.state;

      topIndex++;
      if (topIndex === TOP_COLORS_SPECTRUM.length) {
        topIndex = 0;
      }

      bottomIndex++;
      if (bottomIndex === BOTTOM_COLORS_SPECTRUM.length) {
        bottomIndex = 0;
      }

      this.setState({
        topIndex: topIndex,
        bottomIndex: bottomIndex,
        colorTop: TOP_COLORS_SPECTRUM[topIndex],
        colorBottom: BOTTOM_COLORS_SPECTRUM[bottomIndex]
      });
    }, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <LinearGradient
        colors={[this.state.colorTop, this.state.colorBottom]}
        style={this.props.style}
      >
        <View style={styles.translucentContainer} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  translucentContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "white",
    opacity: 0.3
  }
});
