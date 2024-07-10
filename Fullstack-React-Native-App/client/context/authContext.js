import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// context
const AuthContext = createContext();

// provider
const AuthProvider = () => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });
  // initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let parsedData = JSON.parse(data);
      setState({ ...state, user: parsedData?.user, token: data?.token });
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
