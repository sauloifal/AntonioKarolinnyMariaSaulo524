import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BeerRecipe = ({ name, imageUrl, desc }) => {
  return (
    <View style={stylesBeerRecipe.container}>
      <Image source={{ uri: imageUrl }} style={stylesBeerRecipe.image} />
      <Text style={stylesBeerRecipe.title}>{name}</Text>
      <Text style={stylesBeerRecipe.desc}>{desc}</Text>
    </View>
  );
};

const stylesBeerRecipe = StyleSheet.create({
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#e2e2e2",
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  image: {
    height: 42,
    width: 42,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  desc: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default function App() {
  const [data, setData] = useState([]);

  function getRecipes() {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((res) => setData(res.data));
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Beer Recipes</Text>
      {!data.length && (
        <TouchableOpacity style={styles.btn} onPress={() => getRecipes()}>
          <Text style={[styles.title, { color: "#fff", fontWeight: "300" }]}>
            BUSCAR RECEITAS
          </Text>
        </TouchableOpacity>
      )}
      {data && (
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {data.map((item) => (
            <BeerRecipe
              key={item.id}
              name={item.name}
              imageUrl={item.image_url}
              desc={item.description}
            />
          ))}
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  containerNoData: {
    justifyContent: "center",
    paddingTop: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f2f2f",
    alignSelf: "center",
  },
  logo: {
    height: 64,
    width: 64,
    alignSelf: "center",
  },
  btn: {
    paddingVertical: 10,
    width: "80%",
    backgroundColor: "#2f2f2f",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 4,
    marginVertical: 10,
  },
});
