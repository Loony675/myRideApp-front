import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilScreen() {
  const username = useSelector((state) => state.users.value.username);
  const [asyncU, setAsycnU] = useState()
  const getUsername = () => {
    AsyncStorage.getItem('storeUsername').then((value) => {
      console.log(value);
      setAsycnU(value)
    })

    
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.container1}>
        <Text>Use Selector: {username}</Text>
        <TouchableOpacity onPress={() => getUsername()}>
          <Text>Click</Text></TouchableOpacity>
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
