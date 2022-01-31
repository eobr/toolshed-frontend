import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import MapComponent from '../../components/MapComponent';
import { Ionicons } from "@expo/vector-icons";

export default MapScreen = ({route, navigation}) => {

  const {item} = route.params;

    const northCoders = {
        longitude: -2.238332152375383,
        latitude: 53.4723494112368,
      };
    
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolshed</Text>
      </View>
      <View style={styles.subheadingContainer}>
        <Text style={styles.subheading}>Pinch and drag the map to zoom in and move around.</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapComponent location={item.location || northCoders}></MapComponent>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.text}>
          <Ionicons name={"arrow-back-circle"} size={16} />
          {" BACK"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9dd9d2",
    alignItems: "center",
  },
  headerContainer: {
    paddingTop: "10%",
    backgroundColor: "#F36433",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  header: {
    marginTop: "10%",
    margin: "5%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  subheadingContainer: {
    width: "70%",
    alignItems: "center",
    margin: "5%",
    paddingTop: "15%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
    paddingBottom: "5%",
  },
  subheading: {
    fontSize: 20,
    textAlign: "center",
    color: "#172121",
    fontWeight: "bold",
  },
  mapContainer: {
    width: "80%",
    height: "50%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
});