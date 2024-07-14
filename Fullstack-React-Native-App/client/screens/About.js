import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenus from "../components/Menus/FooterMenus";

const About = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenus />
      </View>
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
export default About;
