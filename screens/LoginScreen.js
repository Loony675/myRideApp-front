import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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

  const token = useSelector((state) => state.users.value.token);

  console.log('TOKEN', token);
  useEffect(()=> {
    setLogToken(token)
  },[])

  const dispatch = useDispatch();

  const handleRegister = () => {
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
          navigation.navigate("TabNavigator", { screen: "Main" });
        }
      });
  };
  const handleConnection =  () => {
    // fetch("http://localhost:3000/users/signIn", {
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
          navigation.navigate("TabNavigator", { screen: "Main" });
        }
      });
  };


  return (
    <View style={styles.mainContainer}>
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
        <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  signUp: {
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 90,
    backgroundColor: "rgb(90,236,93)",
    borderRadius: 99,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    backgroundColor: "white",
    width: 170,
    height: 40,
    padding: 20,
    margin: 10,
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
  },
});
