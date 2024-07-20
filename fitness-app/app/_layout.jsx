import { View, Text, LogBox } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  LogBox.ignoreLogs;
  ["Warning: Failed prop type"];
  return (
    <Stack
      screenOptions={{
        headerShow: false,
      }}
    >
      <Stack.Screen
        name="exercises"
        options={{
          presentation: "fullscreenModal",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="exerciseDetails"
        options={{
          presentation: "modal",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
