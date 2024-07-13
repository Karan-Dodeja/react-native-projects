import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenus from "./components/Menus/ScreenMenus";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenus />
    </AuthProvider>
  );
};

export default RootNavigation;
