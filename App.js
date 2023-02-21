import { StyleSheet, Text, View } from "react-native";
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
//Import redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import users from "./reducers/users";

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

        tabBarActiveTintColor: "#61BEFF",
        tabBarInactiveTintColor: "#335561",
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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Presentation" component={PresentationScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Actu" component={ActuScreen} />
          <Stack.Screen name="Apropos" component={AproposScreen} />
          <Stack.Screen name="Commu" component={CommunauteScreen} />
          <Stack.Screen name="Entretien" component={EntretienScreen} />
          <Stack.Screen name="Itineraire" component={ItineraireScreen} />
          <Stack.Screen name="Meteo" component={MeteoScreen} />
          <Stack.Screen name="Parametres" component={ParametreScreen} />
          <Stack.Screen name="Profil" component={ProfilScreen} />
          <Stack.Screen name="Roadtrip" component={RoadtripScreen} />
          <Stack.Screen name="Prime" component={PrimeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerTabNav: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
