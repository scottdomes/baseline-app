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
import { Button, FormLabel, FormInput } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { facebookLogin, googleLogin } from "../resources/SocialAuth";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  state = { showLoginForm: false, email: "", password: "" };
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

  handleFacebookLogin = () => {
    facebookLogin();
  };

  render() {
    if (this.state.showLoginForm) {
      return (
        <View style={styles.container}>
          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={this.handleEmailChange}
            placeholder="Your email..."
            value={this.state.email}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={this.handlePasswordChange}
            placeholder="Your password..."
            value={this.state.password}
          />
          <Button
            style={styles.button}
            icon={{ name: "ios-mail", type: "ionicon" }}
            onPress={this.handleEmailLogin}
            title="Login"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          icon={{ name: "ios-mail", type: "ionicon" }}
          onPress={this.handleToggleLogin}
          title="Login with Email"
        />
        <Button
          style={styles.button}
          icon={{ name: "logo-facebook", type: "ionicon" }}
          onPress={this.handleFacebookLogin}
          title="Login with Facebook"
        />
        <Button
          style={styles.button}
          icon={{ name: "logo-google", type: "ionicon" }}
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
    marginTop: 10
  }
});
