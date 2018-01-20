import React from "react";
import NewRecordFormNavigator from "../navigation/NewRecordFormNavigator";

export default class NewRecordScreen extends React.Component {
  static navigationOptions = {
    title: "New"
  };

  render() {
    return <NewRecordFormNavigator />;
  }
}
