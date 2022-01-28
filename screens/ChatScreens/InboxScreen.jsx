import { StyleSheet, Text, View } from "react-native";
import React from "react";

import InboxListItem from "../../components/InboxListItem";

const InboxScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Inbox Screen</Text>
      <InboxListItem />
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});