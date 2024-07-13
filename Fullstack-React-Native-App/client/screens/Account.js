import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenus from "../components/Menus/FooterMenus";

const Account = () => {
  // global state
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenus />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
});
export default Account;
