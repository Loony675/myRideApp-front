import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { logout } from "../reducers/users";

export default function ProfilScreen({ navigation }) {
  const username = useSelector((state) => state.users.value.username);
  console.log(username);

  const [tokenSave, setTokenSave] = useState("");
  const [asyncU, setAsycnU] = useState();
  const [maMoto, setMaMoto] = useState([]);
  const [fetchDB, setFetchDB] = useState(false);
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [age, setAge] = useState()

  useEffect(() => {
    const retrievedToken = async () => {
      try {
        const tokenSave = await AsyncStorage.getItem("token");
        setTokenSave(tokenSave);
        fetch("https://my-ride-app-back.vercel.app/users/maMoto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenSave }),
        })
          .then((response) => response.json())
          .then((data) => {
            setMaMoto(data.maMoto[0]);
            if (!data) {
              console.log("no data");
            }
          });
        fetch("https://my-ride-app-back.vercel.app/users/mesInfos")
      } catch (error) {
        console.log(error);
      }
    };
    retrievedToken();
  }, []);

  useEffect(() => {
    return setMaMoto([]);
  }, []);
  // useEffect(() => {
  //   fetch("https://my-ride-app-back.vercel.app/users/maMoto", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token: tokenSave }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMaMoto(data.maMoto[0]);
  //       console.log('maMoto ---->', data.maMoto);
  //       if (!data) {
  //         console.log('no data');
  //       }
  //     });
  // }, []);

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

  useEffect(() => {
    return () => {
      setMaMoto("");
    };
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Profil</Text>
      </View>
      <View style={styles.container1}></View>
      <View style={styles.container2}>
        <View style={styles.user}>
          <View>
            <Image
              style={styles.avatar}
              source={require("../assets/P1220112-2.jpg")}
            />
          </View>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.settingsBtn}>
          <FontAwesome name={"cog"} size="40" />
        </View>
      </View>
      <View style={styles.container3}>
        <Text style={styles.titleMoto}>Ma moto</Text>
        <View style={styles.motoInLine}>
          {maMoto && (
            <Text>
              {maMoto.marque} {maMoto.modele} {maMoto.millesime}
            </Text>
          )}
          <TouchableOpacity
            style={styles.motoContainer}
            onPress={() => navigation.navigate("SelectMoto")}
          >
            <View style={styles.viewArrow}>
              <FontAwesome
                name={"arrow-right"}
                size="25"
                style={styles.button}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container4}>
        <Text>Mes infos</Text>
        <View>
          
        </View>
      </View>

      <View style={styles.disconnect}>
        <TouchableOpacity style={styles.menu} onPress={() => disconnect()}>
          <FontAwesome name={"power-off"} size="25" style={styles.button} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: "#778DA9",
  },
  title: {
    fontSize: 40,
    marginTop: "10%",
    fontFamily: "Inter_900Black",
    color: "#E0E1DD",
  },
  container2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  username: {
    marginTop: 5,
    color: "#E0E1DD",
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  settingsBtn: {
    position: "absolute",
    right: 20,
  },
  container3: {
    justifyContent: "center",
    padding: 4,
  },
  titleMoto: {
    padding: 2,
    fontSize: 30,
    color: "#E0E1DD",
    fontFamily: "Inter_700Bold",
  },
  motoInLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  motoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  viewArrow: {},
  button: {
    color: "#E0E1DD",
    fontSize:38,
  },
  container4: {

    margin: 2,
  },
  disconnect: {
    position: "absolute",
    bottom: 50,
    right: 40,
  },
});
// palette couleur E0E1DD, 778DA9, 415A77, 1B263B, 0D1B2A