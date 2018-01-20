import React from "react";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-elements";

export default class SaveConfirmation extends React.Component {
  done = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "ValueSelection"
    });

    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <Button onPress={this.done} title="Done" style={{ marginTop: 20 }} />
    );
  }
}
