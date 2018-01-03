import React from "react";
import MainTabNavigator from "./MainTabNavigator";
import { NavigationActions } from "react-navigation";
import * as firebase from 'firebase';

export default class LoginNavigator extends React.Component {
  componentDidMount() {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.props.navigation.dispatch(
          NavigationActions.navigate({
            routeName: "Main",
            action: NavigationActions.navigate({ routeName: "Main" })
          })
        );
      }

      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: "Login",
          action: NavigationActions.navigate({ routeName: "Login" })
        })
      );
    });
  }

  render() {
    return <MainTabNavigator />;
  }
}
