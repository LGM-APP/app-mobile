// EquipeDetails.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EquipeDetails = ({ route }) => {
  const { team } = route.params;
  const { name, game, region, description, players } = team;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Game: {game}</Text>
      <Text style={styles.subtitle}>Region: {region}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.playersTitle}>Players:</Text> 
      {players.map((player, index) => (
        <Text key={index} style={styles.player}>{player}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  player: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EquipeDetails;
