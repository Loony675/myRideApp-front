import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";

export default function SelectMotoScreen({ navigation }) {
  const [tokenSave, setTokenSave] = useState('')

  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedMillesime, setSelectedMillesime] = useState("");
  const [selectedCylindree, setSelectedCylindree] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [listModeles, setListModeles] = useState([]);
  const [retrievedMarques, setRetrievedMarques] = useState([{}]);
  const [allCheck, setAllCheck] = useState(false);
  const [retrievedModele, setRetrievedModele] = useState("");
  const listMarques = [
    { key: "1", value: "Honda" },
    { key: "2", value: "Suzuki" },
    { key: "3", value: "Triumph" },
    { key: "4", value: "Kawasaki", disabled: true },
    { key: "5", value: "Yamaha"},
  ];

  useEffect(() => {}, [retrievedMarques]);
  useEffect(() => {
    const retrievedToken = async () => {
      try {
        const tokenSave = await AsyncStorage.getItem("token");
        console.log("test", tokenSave);
        setTokenSave(tokenSave)
        setFetchDB(true)

      } catch (error) {
        console.log(error);
      }
    };
    retrievedToken();
  },[]);
  useEffect(() => {

    // fetch("https://my-ride-app-back.vercel.app/getMoto")
    fetch("https://my-ride-app-back.vercel.app/marques", {
      // fetch("http://localhost:3000/marques", {
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
  const listUniqueMillesimes = listMillesimes
    .filter((x, i) => listMillesimes.indexOf(x) === i)
    .sort((a, b) => a - b);

  const listCylindrees = retrievedMarques.map((data) => {
    return data.cylindree;
  });

  const listUniqueCylindrees = listCylindrees
    .filter((x, i) => listCylindrees.indexOf(x) === i)
    .sort((a, b) => a - b);
  const listMod = listModeles.map((data) => {
    return data.modele;
  });
  const listUniqueMod = listMod.filter((x, i) => listMod.indexOf(x) === i);

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
  });
  useEffect(() => {
    if (allCheck) {
      fetch("https://my-ride-app-back.vercel.app/findMyBike", {
        // fetch("http://localhost:3000/findMyBike", {
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
              modele: data2.modele,
            };
          });
          console.log(listModels);
          setListModeles(listModels);
        });
    } else {
      console.log("Allcheck state -->", allCheck);
    }
  }, [
    allCheck,
    selectedMarque,
    selectedMillesime,
    selectedCylindree,
    selectedModele,
  ]);

  // post the bike to user account on server
  const postMyBike = () => {
    fetch("http://localhost:3000/users/postMyBike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: tokenSave,
        marque: selectedMarque,
        millesime: selectedMillesime,
        cylindree: selectedCylindree,
        modele:selectedModele
      }),
    })
      .then((tokenFound) => tokenFound.json())
      .then((data) => {
        if (data.result) {
        }
      });
  }

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
        <SelectList
          setSelected={(val) => setSelectedMarque(val)}
          data={listMarques}
          save="value"
          placeholder="Selectionne la marque"
        />

        <SelectList
          setSelected={(val) => setSelectedMillesime(val)}
          data={listUniqueMillesimes}
          save="value"
          placeholder="Selectionne l'année"
        />
        <SelectList
          setSelected={(val) => setSelectedCylindree(val)}
          data={listUniqueCylindrees}
          save="value"
          placeholder="Selectionne la cylindrée"
        />
        <SelectList
          setSelected={(val) => setSelectedModele(val)}
          data={listUniqueMod}
          save="value"
          placeholder="Selectionne le modèle"
        />

        {selectedModele && <View><Text> Ma moto {selectedModele}</Text>
        <TouchableOpacity onPress={() =>postMyBike()}><Text>Enregister ma moto</Text></TouchableOpacity></View>}
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
