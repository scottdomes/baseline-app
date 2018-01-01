import React from "react";
import MainTabNavigator from "./MainTabNavigator";
import { NavigationActions } from 'react-navigation'

export default class LoginNavigator extends React.Component {
  componentDidMount() {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: "Login",
        action: NavigationActions.navigate({ routeName: "Login" })
      })
    );
  }

  render() {
    return <MainTabNavigator />;
  }
}
