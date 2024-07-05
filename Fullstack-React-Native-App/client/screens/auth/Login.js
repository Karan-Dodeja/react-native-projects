import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!email || password) {
        setLoading(false);
        Alert.alert("Please Fill All Fields");
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          title={"Email"}
          autoComplete="email"
          secureTextEntry=""
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <InputBox
          title={"Password"}
          autoComplete=""
          value={password}
          setValue={setPassword}
          keyboardType=""
          secureTextEntry={true}
        />
      </View>
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a User Please <Text style={styles.link}>REGISTER</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});
export default Login;
