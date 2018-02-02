import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from "react-native";
import { WebBrowser, LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Button, FormLabel, FormInput } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { facebookLogin, googleLogin } from "../resources/SocialAuth";
import AnimatedGradient from "../components/AnimatedGradient";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  state = {
    showLoginForm: false,
    email: "",
    password: "",
    spinValue: new Animated.Value(0)
  };
  static navigationOptions = {
    header: null
  };

  handleToggleLogin = () => {
    this.setState({ showLoginForm: true });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleEmailLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password);
  };

  handleAdmin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("scottdomes+1@gmail.com", "password");
  };

  handleGoBack = () => {
    this.setState({ showLoginForm: false });
  };

  handleSignup = () => {
    if (!this.state.email || !this.state.password) {
      this.setState({ isSigningUp: true });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
    }
  };

  handleFacebookLogin = () => {
    facebookLogin();
  };

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    this.state.spinValue.setValue(0);
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 80000,
      easing: Easing.linear
    }).start(() => this.runAnimation());
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    if (this.state.showLoginForm) {
      return (
        <View style={styles.container}>
          <AnimatedGradient
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              flex: 1
            }}
          />
          <View style={styles.form}>
            <FormLabel
              labelStyle={{ color: "#fff", backgroundColor: "transparent" }}
            >
              Email
            </FormLabel>
            <FormInput
              onChangeText={this.handleEmailChange}
              placeholder="Your email..."
              placeholderTextColor="#fff"
              keyboardType="email-address"
              value={this.state.email}
            />
            <FormLabel
              labelStyle={{
                color: "#fff",
                backgroundColor: "transparent"
              }}
            >
              Password
            </FormLabel>
            <FormInput
              placeholderTextColor="#fff"
              onChangeText={this.handlePasswordChange}
              placeholder="Your password..."
              secureTextEntry
              value={this.state.password}
            />
          </View>

          {!this.state.isSigningUp && (
            <View>
              <Button
                color="#6c757d"
                backgroundColor="#fff"
                containerViewStyle={styles.button}
                onPress={this.handleEmailLogin}
                title="Login"
              />
              <Text
                style={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  color: "white"
                }}
              >
                OR
              </Text>
            </View>
          )}
          <Button
            color="#6c757d"
            backgroundColor="#fff"
            containerViewStyle={styles.button}
            onPress={this.handleSignup}
            title="Sign up"
          />
          <TouchableOpacity onPress={this.handleGoBack}>
            <Text
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                color: "white",
                marginTop: 20
              }}
            >
              Go back
            </Text>
          </TouchableOpacity>
          <Button
            color="#6c757d"
            backgroundColor="#fff"
            containerViewStyle={styles.button}
            onPress={this.handleAdmin}
            title="Admin Login"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <AnimatedGradient
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1
          }}
        />
        <View style={styles.headerContainer}>
          <Animated.Image
            source={require("../assets/images/transparent_icon.png")}
            style={{ width: 100, height: 100, transform: [{ rotate: spin }] }}
          />
          <Text style={styles.titleText}>Baseline</Text>
          <Text style={styles.taglineText}>Make happier decisions.</Text>
        </View>
        <Button
          color="#6c757d"
          backgroundColor="#fff"
          icon={{
            name: "ios-mail",
            type: "ionicon",
            color: "#6c757d"
          }}
          containerViewStyle={styles.button}
          onPress={this.handleToggleLogin}
          title="Login with Email"
        />
        <Button
          color="#6c757d"
          backgroundColor="#fff"
          icon={{
            name: "logo-facebook",
            type: "ionicon",
            color: "#6c757d"
          }}
          containerViewStyle={styles.button}
          onPress={this.handleFacebookLogin}
          title="Login with Facebook"
        />
        <Button
          color="#6c757d"
          backgroundColor="#fff"
          icon={{
            name: "logo-google",
            type: "ionicon",
            color: "#6c757d"
          }}
          containerViewStyle={styles.button}
          onPress={googleLogin}
          title="Login with Google"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#fff"
  },
  form: {
    margin: 10,
    paddingBottom: 20
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30
  },
  titleText: {
    fontSize: 30,
    backgroundColor: "transparent",
    color: "#fff"
  },
  taglineText: {
    fontSize: 15,
    marginTop: 20,
    backgroundColor: "transparent",
    color: "#fff"
  }
});
