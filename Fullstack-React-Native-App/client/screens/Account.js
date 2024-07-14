import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React from "react";
import FooterMenus from "../components/Menus/FooterMenus";
import axios from "axios";

const Account = () => {
  // global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  // local
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  //update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://pixabay.com/vectors/avatar-black-head-monochrome-1299805/",
            }}
            styles={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <View styles={styles.inputContainer}>
          <Text style={styles.inputText}>Name:</Text>
          <TextInput
            value={name}
            style={styles.inputBox}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View styles={styles.inputContainer}>
          <Text style={styles.inputText}>Email:</Text>
          <TextInput value={email} style={styles.inputBox} editable={false} />
        </View>
        <View styles={styles.inputContainer}>
          <Text style={styles.inputText}>Password:</Text>
          <TextInput
            value={password}
            style={styles.inputBox}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        <View styles={styles.inputContainer}>
          <Text style={styles.inputText}>Role:</Text>
          <TextInput
            value={state?.user.role}
            style={styles.inputBox}
            editable={false}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate()}
          >
            <Text style={styles.updateButtonText}>
              {loading ? "Please Wait" : "Update Profile"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <FooterMenus />
        </View>
      </ScrollView>
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
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: "black",
    color: "#ffffff",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Account;
