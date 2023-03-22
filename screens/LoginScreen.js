import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [emailSU, setEmailSU] = useState();
  const [passwordSU, setPasswordSU] = useState();
  const [usernameSU, setUsernameSU] = useState();
  const [emailSI, setEmailSI] = useState("test@gmail.com");
  const [passwordSI, setPasswordSI] = useState("test");
  const [logToken, setLogToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state.users.value.token);
  const username = useSelector((state) => state.users.value.username)
  const [pseudo, setPseudo] = useState('')

  const image = {
    uri: "https://res.cloudinary.com/dpe2tab7h/image/upload/v1672153139/P1220532-4_fdsyt1.jpg",
  };

  console.log("TOKEN", token);
  useEffect(() => {
    setLogToken(token);
  }, []);

  const dispatch = useDispatch();

  const handleRegister = () => {
    setIsLoading(true);
    // fetch("http://localhost:3000/users/signUp", {
    fetch("https://my-ride-app-back.vercel.app/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailSU,
        username: usernameSU,
        password: passwordSU,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: usernameSU, token: data.token }));
          navigation.navigate("Accueil");
        }
        setIsLoading(false);
      });
  };
  const handleConnection = async () => {
    // fetch("http://localhost:3000/users/signIn", {
    setIsLoading(true);
    fetch("https://my-ride-app-back.vercel.app/users/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailSI, password: passwordSI }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              loggedIn: true,
              username: data.username,
              token: data.token,
            })
          );
          try {
            AsyncStorage.setItem("isLoggedIn", "true");
          } catch (error) {
            console.log(error);
          }
          try {
            AsyncStorage.setItem("token", data.token);
          } catch (error) {
            console.log(error);
          }
          navigation.navigate("TabNavigator", { screen: "Accueil" });
        }
      });

    setIsLoading(false);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        blurRadius={5}
        style={styles.bgImage}
      >
        <View style={styles.signUp}>
          <TextInput
            style={styles.input}
            placeholder="Pseudo"
            autoCapitalize="none"
            onChangeText={(value) => setUsernameSU(value)}
            value={usernameSU}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => setEmailSU(value)}
            value={emailSU}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(value) => setPasswordSU(value)}
            value={passwordSU}
          />
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => handleRegister()}
          >
            <Text>M'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signIn}>
          <Text>déjà un compte ?</Text>
          <View style={styles.signIn}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => setEmailSI(value)}
              value={emailSI}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(value) => setPasswordSI(value)}
              value={passwordSI}
            />
            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => handleConnection()}
            >
              <Text>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <ActivityIndicator size="large" color="#F7AB0A" />}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bgImage: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  signUp: {
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    backgroundColor: "rgb(90,236,93)",
    borderRadius: 99,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderWidth: 2,
    backgroundColor: "orange",
    width: 170,
    height: 40,
    padding: 2,
    margin: 10,
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
