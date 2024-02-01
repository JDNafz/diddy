import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import styles from "./styles.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "@env";

export default function App() {
  const [search, setSearch] = useState("");
  const [song, setSong] = useState([]);

  const handleSearch = () => {
    console.log(search);
    getSong(search);
  };

  useEffect(() => {
    getSong(search);
  }, []);

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
        setSong(response.data.tracks.hits);
        console.log(song);
      })
      .catch((error) => {
        console.log("Error Getting", error);
      });
  };

  return (
    <ScrollView style={{ backgroundColor: "#9ED8DB" }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Diddy</Text>
          <Text style={{ textAlign: "center" }}>
            Enter a song name and the artist!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => setSearch(text)}
              value={search}
              placeholder="Type here to search"
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Search" style={styles.button} color="black" onPress={handleSearch} />
            </View>
          </View>
        </View>
        {Object.keys(song).length ? (
          <>
            {song.map((item, i) => (
              <View style={styles.songContainer} key={i}>
                <Image
                  style={styles.coverart}
                  source={{ uri: `${item.track.images.coverart}` }}
                />
                <Text style={styles.text}>{item.track.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "grey" }}
                  />
                  <View>
                    <Text
                      onPress={() => Linking.openURL(`${item.track.url}`)}
                      style={{
                        textAlign: "center",
                        paddingHorizontal: 8,
                        color: "blue",
                      }}
                    >
                      Shazam
                    </Text>
                  </View>
                  <View
                    style={{ flex: 1, height: 1, backgroundColor: "grey" }}
                  />
                </View>
                <Image
                  style={styles.artistart}
                  source={{ uri: `${item.track.images.background}` }}
                />
                <Text style={styles.text}>{item.track.subtitle}</Text>
              </View>
            ))}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}
