import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
const OPTIONS = [
  "All",
  "DIY",
  "Household",
  "Kitchen",
  "Electronics",
  "Arts and Crafts",
  "Garden",
  "Furniture",
];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";
import AppLoading from "expo-app-loading";

const ModalPicker = ({ changeModalVisibility, setData }) => {
  const onPressItem = (option) => {
    changeModalVisibility(false);
    setData(option);
  };
  const option = OPTIONS.map((option, index) => {
    return (
      <View style={styles.option}>
        <TouchableOpacity key={index} onPress={() => onPressItem(option)}>
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      onPress={() => changeModalVisibility(false)}
      style={styles.container}
    >
      <View style={styles.modal}>
        <View>{option}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignSelf: "center",
    width: "100%",
  },
  modal: {
    borderRadius: 10,
    padding: 20,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "white",
    margin: 20,
    fontSize: 20,
    fontFamily: "Oxygen_700Bold",
  },
});

export default ModalPicker;
