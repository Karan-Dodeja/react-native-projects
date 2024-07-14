import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenus from "./HeaderMenus";
import Post from "../../screens/Post";
import About from "../../screens/About";
import Account from "../../screens/Account";

const ScreenMenus = () => {
  // global state
  const [state] = useContext(AuthContext);
  // Auth condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenus />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenus />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenus />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenus />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenus;
