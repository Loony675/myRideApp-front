import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_300Light,
  Inter_200ExtraLight,
  Inter_100Thin,
} from "@expo-google-fonts/inter";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
//Bibliothèque Fontwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Import des screens
import HomeScreen from "./screens/HomeScreen";
import PresentationScreen from "./screens/PresentationScreen";
import MainScreen from "./screens/MainScreen";
import ActuScreen from "./screens/ActuScreen";
import AproposScreen from "./screens/AproposScreen";
import CommunauteScreen from "./screens/CommunauteScreen";
import EntretienScreen from "./screens/EntretienScreen";
import ItineraireScreen from "./screens/ItineraireScreen";
import MeteoScreen from "./screens/MeteoScreen";
import ParametreScreen from "./screens/ParametreScreen";
import ProfilScreen from "./screens/ProfilScreen";
import RoadtripScreen from "./screens/RoadtripScreen";
import PrimeScreen from "./screens/PrimeScreen";
import LoginScreen from "./screens/LoginScreen";
import SelectMotoScreen from "./screens/SelectMotoScreen";
//Import redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import users from "./reducers/users";

import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = configureStore({
  reducer: { users },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Actu") {
            iconName = "newspaper-o";
          } else if (route.name === "Commu") {
            iconName = "commenting";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#8DAB7F",
        tabBarInactiveTintColor: "#394032",
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
      })}
    >
      <Tab.Screen name="Accueil" component={MainScreen} />
      <Tab.Screen name="Actu" component={ActuScreen} />
      <Tab.Screen name="Commu" component={CommunauteScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App({ navigation }) {
  const [firstScreen, setFirstScreen] = useState("Home");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn !== null) {
        console.log("GET==>", isLoggedIn);
        // navigation.navigate("Main");
        setFirstScreen("Main");
      } else {
        console.log("get item void");
        // navigation.navigate("Login");
      }
    };
    checkLoggedIn();
  }, []);
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_100Thin,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {firstScreen == "Home" && (
              <Stack.Screen name="Home" component={HomeScreen} />
            )}
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              screen="Profil"
            />
            <Stack.Screen name="Profil" component={ProfilScreen} />

            <Stack.Screen name="Presentation" component={PresentationScreen} />
            <Stack.Screen name="Accueil" component={MainScreen} />
            <Stack.Screen name="Actu" component={ActuScreen} />
            <Stack.Screen name="Apropos" component={AproposScreen} />
            <Stack.Screen name="Commu" component={CommunauteScreen} />
            <Stack.Screen name="Entretien" component={EntretienScreen} />
            <Stack.Screen name="Itineraire" component={ItineraireScreen} />

            <Stack.Screen name="Meteo" component={MeteoScreen} />
            <Stack.Screen name="Parametres" component={ParametreScreen} />
            <Stack.Screen name="Roadtrip" component={RoadtripScreen} />
            <Stack.Screen name="Prime" component={PrimeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SelectMoto" component={SelectMotoScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  containerTabNav: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
