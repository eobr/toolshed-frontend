import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../firebase.js";
// import { useUser } from "../hooks/useUser";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { SafeAreaView } from "react-native";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { group } = route.params;

  useLayoutEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
