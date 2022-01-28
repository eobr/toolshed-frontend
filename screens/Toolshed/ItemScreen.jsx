import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button
} from "react-native";
import React, {useState, useEffect} from "react";
import { getDownloadURL, ref} from "@firebase/storage";
import { storage, auth, db} from "../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

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
      members: [user.uid, item.uid],
      type: "private",
    };
    try {
      const newChat = await addDoc(collection(db, "group"), groupDoc);
      navigation.navigate("ChatScreen", { group: newChat.id });
      setGroup(newChat.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Toolshed</Text>
      <View style={styles.contentContainer}>
        {/* <Image style={styles.image} source={{uri: itemImage}} /> */}
        <Text>{item.name}</Text>
        <Text>{item.userInfo.userFirstName}</Text>
        <Text>{item.userInfo.userSurname}</Text>                  
        <Text>{item.description}</Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          itemOwner={item.owner}
          group={group}
        >
          <Text>Click here to send a direct message</Text>
        </TouchableOpacity>
      <Button title="View Map" style={styles.button} onPress={() => {navigation.navigate("MapScreen", {item})}}/>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
  },
  header: {
    marginTop: "10%",
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
    height: "60%",
    width: "60%",
  },
  contentContainer: {
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
});
