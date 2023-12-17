import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../reducers/users";

export default function MainScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const [tokenSave, setTokenSave] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenSave = await AsyncStorage.getItem("token");
        setTokenSave(tokenSave);
        ty;
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    fetch("https://my-ride-app-back.vercel.app/users/findUserInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenSave }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.data.username);
        dispatch(login({ username: username }));
      });
  }, [tokenSave]);

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
        <Text style={styles.helloUsername}>Bonjour {username}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Meteo")}
        >
          <Text style={styles.txtButton}>Méteo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Itineraire")}
        >
          <Text style={styles.txtButton}>Itineraire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Commu")}
        >
          <Text style={styles.txtButton}>Commu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Entretien")}
        >
          <Text style={styles.txtButton}>Entretien</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Roadtrip")}
        >
          <Text style={styles.txtButton}>Roadtrip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Prime")}
        >
          <Text style={styles.txtButton}>Prime</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Profil")}
        >
          <Text style={styles.txtButton}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Actu")}
        >
          <Text style={styles.txtButton}>Actu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menu}
          onPress={() => navigation.navigate("Parametres")}
        >
          <Text style={styles.txtButton}>Paramètres</Text>
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
    backgroundColor: "#778DA9",
  },
  hello: {
    alignItems: "center",
  },
  helloUsername: {
    color: "#E0E1DD",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
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
    backgroundColor: "#415A77",
    borderRadius: 99,
  },
  txtButton: {
    color: "#E0E1DD",
  },
});
// palette couleur E0E1DD, 778DA9, 415A77, 1B263B, 0D1B2A
