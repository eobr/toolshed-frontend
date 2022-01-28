import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth, db} from "../../firebase.js";
import SignOut from '../../components/SignOut.jsx';
import {getDoc, doc} from "firebase/firestore";

const UserScreen = ({ navigation }) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid)
        const userDoc = await getDoc(docRef);
        setUser(userDoc.data());
      }
      catch (err) {
        console.log(err);
      }
    })()
  }, []);
  
  if (user.data)
  {
    console.log(user);
  }

  return (
      <View style={styles.container}>
      <Text style={styles.header}>User Page</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.welcome}>Welcome, {user.firstName}</Text>
        <View style={styles.userInfo}>
          <Text>Profile pic: {auth.currentUser.photoURL}</Text>
        </View>
        <SignOut />
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
    width: "100%",
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
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
  welcome: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
  }
});
