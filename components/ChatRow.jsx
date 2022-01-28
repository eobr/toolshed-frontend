import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { auth } from "../firebase";

const ChatRow = ({ inboxDetails }) => {
  const user = auth.currentUser;

  return (
    <TouchableOpacity>
      <Text>Hi</Text>
    </TouchableOpacity>
  );
};

export default ChatRow;