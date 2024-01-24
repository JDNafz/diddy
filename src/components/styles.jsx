import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9ED8DB",
  },
  button: {
    margin: 10,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "white",
  },
  inputContainer: {
    margin: 15,
    flexDirection: "row",
    display: "flex",
  },
  input: {
    height: 40,
    width: 150,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    margin: 10,
  },
  songContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    margin: 25,
    borderRadius: 25,
    backgroundColor: "white",
  },
  coverart: {
    width: 100,
    height: 100,
    margin: 15,
  },
  artistart: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  searchContainer: {
    marginTop:60,
  },
  title: {
    fontSize: 64,
    textAlign:"center",
    margin: 10
  }
});
