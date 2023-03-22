import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../reducers/users";

export default function MainScreen({ navigation }) {
  const username = useSelector((state) => state.users.value.username);

const [tokenSave, setTokenSave] = useState('')
  useEffect(() => {
    const test = async () => {
      try {
        const tokenSave = await AsyncStorage.getItem("token");
        console.log("test", tokenSave);
        setTokenSave(tokenSave)
      } catch (error) {
        console.log(error);
      }
    };
    test();
  });

  const dispatch = useDispatch();

  const disconnect = async () => {
    await AsyncStorage.removeItem("storeToken");
    await AsyncStorage.removeItem("log");
    await AsyncStorage.removeItem("isLoggedIn");
    dispatch(logout());
    navigation.navigate("Login");
  };
  const image = {
    uri: "https://res.cloudinary.com/dpe2tab7h/image/upload/v1672153139/P1220532-4_fdsyt1.jpg",
  };
  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground source= {image} resizeMode='cover' blurRadius={5} style={styles.bgImage}é> */}
      <View style={styles.hello}>
        <Text>Bonjour {tokenSave}</Text>
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

      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#394032",
  },
  hello: {
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#8DAB7F",
    borderRadius: 99,
  },
});
