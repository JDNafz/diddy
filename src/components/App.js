import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import styles from "./styles.jsx";

export default function App() {
  function onPress(){
    console.log("Pressed");
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! WOWZA</Text>
      <Text>New text field Open up App.js to start working on your app! WOWZA </Text>
      <Text>LMAOOpen up App.js to start working on your app! WOWZA</Text>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

