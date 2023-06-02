import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = ({ route }) => {
  const { username, points } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.subtitle}>Pseudo: {username}</Text>
      <Text style={styles.subtitle}>Points: {points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ProfileScreen;
