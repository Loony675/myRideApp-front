import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";

export default function SelectMotoScreen({ navigation }) {
  const token = useSelector((state) => state.users.value.token);

  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedMillesime, setSelectedMillesime] = useState("");
  const [selectedCylindree, setSelectedCylindree] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [listModeles, setListModeles] = useState([{}])
  const [retrievedMarques, setRetrievedMarques] = useState([{}]);
  const [allCheck, setAllCheck] = useState(false);
  const [retrievedModele, setRetrievedModele] = useState("");
  const listMarques = [
    { key: "1", value: "Honda" },
    { key: "2", value: "Suzuki" },
    { key: "3", value: "Triumph" },
    { key: "4", value: "Kawasaki", disabled: true },
  ];

  useEffect(() => {}, [retrievedMarques]);

  useEffect(() => {
    // fetch("https://my-ride-app-back.vercel.app/getMoto")
    fetch("http://localhost:3000/marques", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        marque: selectedMarque,
      }),
    })
      .then((dataRetrieved) => dataRetrieved.json())
      .then((data2) => {
        if (data2) {
          const listRetrieved = data2.listMarques.map((data) => {
            return {
              // key: i,
              marque: data.marque,
              millesime: data.millesime,
              cylindree: data.cylindree,
              modele: data.modele,
            };
          });
          setRetrievedMarques(listRetrieved);
        } else {
          console.log("no data");
        }
      });
  }, [selectedMarque]);

  const listMillesimes = retrievedMarques.map((data) => {
    return data.millesime;
  });
  const listMod = listModeles.map((data) => {
    return data.modele;
  });

  useEffect(() => {
    if (
      selectedMarque != "" &&
      selectedMillesime != "" &&
      selectedCylindree != ""
    ) {
      console.log("AllCheck = true");

      setAllCheck(true);
    } else {
      console.log("AllCheck = false");
      setAllCheck(false);
    }
    console.log(
      "Moto choisie=",
      selectedMarque,
      selectedMillesime,
      selectedCylindree
    );
    if (allCheck) {
      fetch("http://localhost:3000/findMyBike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marque: selectedMarque,
          millesime: selectedMillesime,
          cylindree: selectedCylindree,
        }),
      })
        .then((dataRetrieved) => dataRetrieved.json())
        .then((data) => {
          const listModels = data.maMoto.map((data2) => {
            return {
              modele:data2.modele
            }
          })
          console.log(listModels);
          setListModeles(listModels)
        });
    }
  },[listModeles]);
  const listCylindrees = retrievedMarques.map((data) => {
    return data.cylindree;
  });

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Profil" })
          }
        >
          <FontAwesome
            name={"arrow-left"}
            size="25"
            style={styles.arrowNavigation}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Ma moto</Text>
      </View>
      <View style={styles.container2}>
        {/* <Text>Use Selector Token: {token}</Text>
        <Text>Async: {asyncU}</Text> */}
        <SelectList
          setSelected={(val) => setSelectedMarque(val)}
          data={listMarques}
          save="value"
          placeholder="Selectionne la marque"
        />

        <SelectList
          setSelected={(val) => setSelectedMillesime(val)}
          data={listMillesimes}
          save="value"
          placeholder="Selectionne l'année"
        />
        <SelectList
          setSelected={(val) => setSelectedCylindree(val)}
          data={listCylindrees}
          save="value"
          placeholder="Selectionne la cylindrée"
        />
        <SelectList
          setSelected={(val) => setSelectedModele(val)}
          data={listMod}
          save="value"
          placeholder="Selectionne le modèle"
        />

        <Text>{selectedMarque}</Text>
        <Text>{selectedMillesime}</Text>
        <Text>{selectedCylindree}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
  },
  container1: {
    alignItems: "center",
    width: "100%",
  },
  arrowNavigation: {
    position: "absolute",
    left: -170,
    marginTop: "14%",
    color: "#F7AB0A",
  },
  title: {
    fontSize: 40,
    marginTop: "10%",
    fontFamily: "Inter_900Black",
  },
  container2: {
    position: "absolute",
    top: 150,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
