import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import RootNavigation from "./navigation/RootNavigation";
import LoginScreen from "./screens/LoginScreen";
import NotificationResource from "./resources/NotificationResource";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCzPA1GDgmmJBOnHdIdNAeD9fdW95OO4G4",
  authDomain: "baseline-330bb.firebaseapp.com",
  databaseURL: "https://baseline-330bb.firebaseio.com",
  projectId: "baseline-330bb",
  storageBucket: "",
  messagingSenderId: "1006643764024"
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isLoggedIn: false
  };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  componentDidMount() {
    NotificationResource.schedule();
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: Boolean(user) });
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {Platform.OS === "android" && (
            <View style={styles.statusBarUnderlay} />
          )}
          {this.state.isLoggedIn ? <RootNavigation /> : <LoginScreen />}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
