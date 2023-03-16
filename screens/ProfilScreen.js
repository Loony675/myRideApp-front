import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { logout } from "../reducers/users";

export default function ProfilScreen({ navigation }) {
  // const username = useSelector((state) => state.users.value.username);
  const username = "Loony675";
  const token = useSelector((state) => state.users.value.token);

  AsyncStorage.setItem("storeToken", token);
  console.log("Set Item", token);

  const [asyncU, setAsycnU] = useState();

  // A de-commenter
  // useEffect(async () => {
  //   const value = await AsyncStorage.getItem("storeToken");
  //   console.log("Value -->", value);
  //   if (value) setAsycnU(value);
  // }, []);
  const dispatch = useDispatch();

  const disconnect = async () => {
    await AsyncStorage.removeItem("storeToken");
    await AsyncStorage.removeItem("log");
    await AsyncStorage.removeItem("isLoggedIn");
    dispatch(logout());
    navigation.navigate("Login");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Profil</Text>
      </View>
      <View style={styles.container1}>
        {/* <Text>Use Selector Token: {token}</Text>
        <Text>Async: {asyncU}</Text> */}
      </View>
      <View style={styles.container2}>
        <View style={styles.user}>
          <View style={styles.avatar}></View>
          <Text style={{ fontFamily: "Inter_600SemiBold" }}>{username}</Text>
        </View>
        <View style={styles.settingsBtn}>
          <FontAwesome name={"cog"} size="40" />
        </View>
      </View>
      <View style={styles.container3}>
        <Text>Ma moto</Text>

        <TouchableOpacity
          style={styles.motoContainer}
          onPress={() => navigation.navigate("SelectMoto")}
        >
          <Text>Moto</Text>
          <FontAwesome
            name={"arrow-right"}
            size="25"
            style={styles.arrowNavigation}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Mes infos</Text>
      </View>

      <View style={styles.disconnect}>
        <TouchableOpacity style={styles.menu} onPress={() => disconnect()}>
        <FontAwesome
            name={"power-off"}
            size="25"
            style={styles.arrowNavigation}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 2,
  },
  title: {
    fontSize: 40,
    marginTop: "10%",
    fontFamily: "Inter_900Black",
  },
  container2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  void: {
    height: 100,
    width: 100,
    borderWidth: 1,
    backgroundColor: "red",
  },
  user: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 99,
    backgroundColor: "grey",
  },
  settingsBtn: {
    position: "absolute",
    right: 20,
  },
  container3: {},
  motoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  arrowNavigation: {
    position: "absolute",
    right: 100,
  },
  disconnect:{
    width:'100%',
   marginTop:400,
   marginLeft:75,
  }
});
