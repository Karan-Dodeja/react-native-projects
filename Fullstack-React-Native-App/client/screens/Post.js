import { View, StyleSheet } from "react-native";
import React from "react";

import FooterMenus from "../components/Menus/FooterMenus";

const Post = () => {
  return (
    <View style={styles.container}>
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
export default Post;
