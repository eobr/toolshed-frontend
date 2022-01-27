import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

// components
import ChatRow from "../components/ChatRow";

const InboxListItem = ({ ChatScreen }) => {
  const [inbox, setInbox] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "group"),
        where("members", "array-contains", user.uid)
      ),
      (snapshot) => {
        const inboxArr = [];

        snapshot.forEach((doc) => {
          console.log(doc.data(), "<<<< doc data");
          inboxArr.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setInbox(inboxArr);
      }
    );
    return unsub;
  }, []);

  return (
    <View>
      <Text>Your Direct Messages </Text>
      <FlatList
        data={inbox}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatRow inboxDetails={item} />}
      />
    </View>
  );
};

export default InboxListItem;
