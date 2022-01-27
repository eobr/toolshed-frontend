import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, setDoc, collection } from "firebase/firestore";

// components
import NavTabs from "../components/NavTabs";

const ItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const user = auth.currentUser;
  const [group, setGroup] = useState("");
  // chats/gfhbdfvsb£e22rD <-- group id
  //create group
  // members = user +seller
  // get returned group id
  // nav to /Chatscreen/group.id
  const handlePress = async () => {
    const groupDoc = {
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      members: [user.uid, item.owner],
      type: "private",
    };
    try {
      const newChat = await addDoc(collection(db, "group"), groupDoc);
      navigation.navigate("ChatScreen", { group: newChat.id });
      setGroup(newChat.id);
    } catch (e) {
      console.log(e, "err");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Toolshed</Text>
        <Image style={styles.image} source={{ uri: item.uri }} />
        <Text>{item.name}</Text>
        <Text>{item.owner}</Text>
        <Text>{item.description}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          itemOwner={item.owner}
          group={group}
        >
          <Text>Click here to send a direct message</Text>
        </TouchableOpacity>
      </View>
      <NavTabs />
    </SafeAreaView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
  header: {
    margin: "5%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    justifyContent: "center",
  },
});
