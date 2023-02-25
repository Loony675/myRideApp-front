import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../reducers/users";

export default function MainScreen({ navigation }) {
  const username = useSelector((state) => state.users.value.username);

  const dispatch = useDispatch()

  const disconnect = async() =>{
    await AsyncStorage.removeItem('storeToken')
    await AsyncStorage.removeItem('log')
    dispatch(logout())
  }
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Bonjour {username}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Meteo")}
        >
          <Text>Méteo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Itineraire")}
        >
          <Text>Itineraire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Commu")}
        >
          <Text>Commu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Entretien")}
        >
          <Text>Entretien</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Roadtrip")}
        >
          <Text>Roadtrip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Prime")}
        >
          <Text>Prime</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Profil")}
        >
          <Text>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Actu")}
        >
          <Text>Actu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Parametres")}
        >
          <Text>Paramètres</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          style={styles.menu}
          onPress={() => disconnect()}
        >
          <Text>Disconnect</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
  },
  menu: {
    margin: 20,
    height: 40,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
