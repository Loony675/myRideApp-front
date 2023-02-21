import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.globalContainer}>
      <ImageBackground
        source={require("../assets/P1220112-2.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container1}>
          <Text
            style={{
              fontSize: "50",
              color: "rgb(220, 220, 220)",
              fontWeight: "600",
              textShadowColor: "rgba(0, 0, 0, 1)",
              textShadowOffset: { width: 5, height: 5},
              textShadowRadius: 5,
            }}
          >
            myRide
          </Text>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: "40", color: "rgb(220, 220, 220)", fontWeight: "600" }}>
              Commencer
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "59%",
    width: "70%",
    borderRadius: 25,
  },
  container2: {
    backgroundColor: "black",
    marginTop: "80%",
    marginLeft: "12%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 300,
    borderRadius: 9999,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
