import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || email || password) {
        setLoading(false);
        Alert.alert("Please Fill All Fields");
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        { name, email, password }
      );
      // show message from api call
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register here</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          title={"Name"}
          autoComplete=""
          keyboardType=""
          value={name}
          setValue={setName}
          secureTextEntry=""
        />
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
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already Register Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          LOGIN
        </Text>
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

export default Register;
