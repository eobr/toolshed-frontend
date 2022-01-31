import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../firebase.js";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  // const [messageInput, setMessageInput] = useState("");
  const { group } = route.params;

  useLayoutEffect(() => {
    const messagesRef = collection(db, `groups/${group}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length !== 0)
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
    setMessages((previousMessages) => [...previousMessages, messages]);
    // const { _id, createdAt, text, user } = messages[0];
    console.log(group);

    addDoc(collection(db, `group/${group}/messages`), {
      messageInput: "WTF",
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
  },
  textBox: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ChatScreen;
