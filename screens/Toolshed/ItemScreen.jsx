import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import { getDownloadURL, ref } from "@firebase/storage";
import { storage, auth, db } from "../../firebase";
import CalendarComponent from "../../components/CalendarComponent";
import { updateDoc, doc, arrayUnion, addDoc } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const ItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [itemImage, setItemImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const imageUrl = await getDownloadURL(ref(storage, `${item.imageUri}`));
        setItemImage(imageUrl);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handlePress = async () => {
    try {
      const messageId =
        item.userInfo.userUid < auth.currentUser.uid
          ? `${auth.currentUser.uid}-${item.userInfo.userUid}`
          : `${item.userInfo.userUid}-${auth.currentUser.uid}`;
      await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
        chats: arrayUnion(messageId),
      });
      await updateDoc(doc(db, `users/${item.userInfo.userUid}`), {
        chats: arrayUnion(messageId),
      });

      navigation.navigate("ChatScreen", {
        messageId,
        userUsername: `${item.userInfo.userFirstName} ${item.userInfo.userSurname}`,
      });
    } catch (err) {
      alert("Error: Could not load chat");
    }
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolshed</Text>
      </View>
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: itemImage }} />
        <View style={styles.whiteBox}>
          <Text style={styles.subheader}>{item.name}</Text>
          <Text style={styles.bodyText}>
            Posted by {item.userInfo.userUsername} (
            {item.userInfo.userFirstName} {item.userInfo.userSurname})
          </Text>

          <View style={styles.bodyTextWrapper}>
            <Text style={styles.bodyDesc}>{`"${item.description}"`}</Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={handlePress}
          itemOwner={item.owner}
        >
          <Text style={styles.text}>
            MESSAGE <Ionicons name={"paper-plane"} size={16} />
          </Text>
        </Pressable>
        <Pressable
          title="View Map"
          style={styles.button}
          onPress={() => {
            navigation.navigate("MapScreen", { item });
          }}
        >
          <Text style={styles.text}>
            VIEW MAP <Ionicons name={"map"} size={16} />
          </Text>
        </Pressable>
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
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    fontFamily: "Oxygen_400Regular",
  },
  whiteBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    width: "90%",
    padding: "5%",
    margin: "5%",
    borderRadius: 5,
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
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#F36433",
    margin: "3%",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "30%",
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  contentContainer: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
  },
  subheader: {
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
    marginBottom: "2%",
  },
  bodyTextWrapper: {
    width: "80%",
    margin: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#172121",
    borderTopWidth: 1,
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  bodyText: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
  },
  bodyDesc: {
    fontSize: 16,
    color: "#172121",
    fontFamily: "Oxygen_700Bold",
    fontStyle: "italic",
    textAlign: "center",
  },
});
