import React, { createContext, Component } from "react";

export const DrawerContext = createContext();
class DrawerContextProvider extends Component {
  state = {
    weatherDrawer: false,
    twitterDrawer: false,
    ferryDrawer: false,
    contactDrawer: false,
    terminalDrawer: false,
  };
  render() {
    return (
      <DrawerContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </DrawerContext.Provider>
    );
  }
}

export default DrawerContextProvider;
