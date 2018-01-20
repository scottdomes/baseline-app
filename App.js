import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import MainContainer from "./containers/MainContainer";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer />
      </Provider>
    );
  }
}
