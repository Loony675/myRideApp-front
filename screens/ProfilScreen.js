import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilScreen() {
  const username = useSelector((state) => state.users.value.username);
  // const username="Loony675"
  const token = useSelector((state) => state.users.value.token);

  AsyncStorage.setItem("storeToken", token);
  console.log("Set Item", token);

  const [asyncU, setAsycnU] = useState();

  useEffect(async() => {
      const value = await AsyncStorage.getItem('storeToken');
      console.log('Value -->',value);
      if(value)
      setAsycnU(value);
    
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.container1}>
        {/* <Text>Use Selector User: {username}</Text> */}
        <Text>Use Selector Token: {token}</Text>
        <Text>Async: {asyncU}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginTop: "10%",
  },
});
