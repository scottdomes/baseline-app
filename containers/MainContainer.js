import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { AppLoading, Asset, Font, LinearGradient } from "expo";
import { connect } from "react-redux";
import { login, logout, setRecords, setTags } from "../actions";
import { Ionicons } from "@expo/vector-icons";
import RootNavigation from "../navigation/RootNavigation";
import LoginScreen from "../screens/LoginScreen";
import FirebaseResource from "../resources/FirebaseResource";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCzPA1GDgmmJBOnHdIdNAeD9fdW95OO4G4",
  authDomain: "baseline-330bb.firebaseapp.com",
  databaseURL: "https://baseline-330bb.firebaseio.com",
  projectId: "baseline-330bb",
  storageBucket: "",
  messagingSenderId: "1006643764024"
};

class MainContainer extends React.Component {
  state = {
    isLoadingComplete: false,
    isLoggedIn: false,
    userLoaded: false
  };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  componentDidMount() {
    const { login, logout, setRecords, setTags } = this.props;
    FirebaseResource.setListeners(login, logout, setRecords, setTags);
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
    } else if (!this.props.userLoaded || (this.props.user && !this.props.recordsLoaded)) {
      return (
        <View style={styles.loadingContainer}>
          <LinearGradient
            colors={["#FF7C00", "#C751D4", "#2887FF"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              flex: 1
            }}
          />
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
        {Boolean(this.props.user) ? <RootNavigation /> : <LoginScreen />}
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("../assets/images/robot-dev.png"),
        require("../assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf")
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

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      dispatch(login(user));
    },
    setRecords: records => {
      dispatch(setRecords(records));
    },
    logout: () => {
      dispatch(logout());
    },
    setTags: tags => {
      dispatch(setTags(tags));
    }
  };
};

const mapStateToProps = ({ user, userLoaded, recordsLoaded }) => {
  return {
    user,
    userLoaded,
    recordsLoaded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  loadingText: {
    backgroundColor: "transparent",
    fontSize: 20,
    color: "white",
    marginTop: 20
  }
});
