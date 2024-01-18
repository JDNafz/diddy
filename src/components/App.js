import { Text, View, TextInput, Button, Image, Linking } from "react-native";
import styles from "./styles.jsx";
import { useState } from "react";
import axios from "axios";
import { API_KEY } from "@env";

export default function App() {
  const [search, setSearch] = useState("");
  const [song, setSong] = useState({});

  const handleSearch = () => {
    console.log(search);
    getSong(search);
  };

  // const handleChange = (event) => {
  //   let search=this.state.search;
  //   setSearch(search)
  // }

  //GET request
  const getSong = (search) => {
    axios({
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: `${search}`,
        locale: "en-US",
        offset: "0",
        limit: "5",
      },
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(
          "Get Success:",
          response.data.tracks.hits[0].track.images.coverart
        );
        setSong(response.data.tracks.hits[0].track);
        console.log(song);
      })
      .catch((error) => {
        console.log("Error Getting", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Enter a song name!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder="Type here to search"
          style={styles.input}
        />
      </View>
      <View style={styles.button}>
        <Button title="Search" color={"black"} onPress={handleSearch} />
      </View>
      {Object.keys(song).length ? (
        <View style={styles.songContainer}>
          <Image
            style={styles.coverart}
            source={{ uri: `${song.images.coverart}` }}
          />
          <Text style={styles.text}>{song.title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
            <View>
              <Text
                onPress={() => Linking.openURL(`${song.url}`)}
                style={{
                  textAlign: "center",
                  paddingHorizontal: 8,
                  color: "blue",
                }}
              >
                Shazam
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
          </View>
          <Image
            style={styles.artistart}
            source={{ uri: `${song.images.background}` }}
          />
          <Text style={styles.text}>{song.subtitle}</Text>
        </View>
      ) : null}
    </View>
  );
}
