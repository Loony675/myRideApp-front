import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PresentationScreen({ navigation }) {
  const [test, setTest] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/getMoto")
      .then((dataRetrieved) => dataRetrieved.json())
      .then((data2) => {
        if (data2.result) {
          setTest(data2.listMoto);
        } else {
          console.log("no data");
        }
      });
  }, [setTest]);
  const testMap = test.map((data, i) => {
    return (
      <View key={i} style={styles.retrieved}>
        <Text>{data.marque} </Text>
        <Text>{data.millesime} </Text>
        <Text>{data.cylindree} </Text>
        <Text>{data.modele} </Text>
        <Text>{data.categorie}</Text>
      </View>
    );
  });
  return (
    <View style={styles.globalContainer}>
      <View style={styles.test}>{testMap}</View>
      <FontAwesome name={"home"} size={30} color={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    flexDirection:'column'
  },
  retrieved: {
    flexDirection: "row",
  },
});
