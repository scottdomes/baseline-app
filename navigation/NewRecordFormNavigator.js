import React from "react";
import { StackNavigator } from 'react-navigation';

import ValueSelection from "../screens/form/ValueSelection";
import TagSelection from "../screens/form/TagSelection";
import SaveConfirmation from "../screens/form/SaveConfirmation";

export default StackNavigator(
  {
    ValueSelection: {
      screen: ValueSelection
    },
    TagSelection: {
      screen: TagSelection
    },
    SaveConfirmation: {
      screen: SaveConfirmation
    }
  },
  {
    navigationOptions: () => ({
    })
  }
);
