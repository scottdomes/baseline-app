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
import { Button } from "react-native-elements";
import { NavigationActions } from 'react-navigation'
import { facebookLogin } from '../resources/SocialAuth';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleLogin = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "Main",
        action: NavigationActions.navigate({ routeName: "Main" })
      })
    );
  }

  handleFacebookLogin = () => {
    facebookLogin();
  }

  render() {
    return (
      <View style={styles.container}>
              <Button style={styles.button} icon={{name: 'ios-mail', type: 'ionicon'}} onPress={this.handleLogin} title="Login with Email" />
        <Button style={styles.button} icon={{name: 'logo-facebook', type: 'ionicon'}} onPress={this.handleFacebookLogin} title="Login with Facebook" />
        <Button style={styles.button} icon={{name: 'logo-google', type: 'ionicon'}} onPress={this.handleLogin} title="Login with Google" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10
  }
});
